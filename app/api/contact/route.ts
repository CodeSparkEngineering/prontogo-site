import { NextResponse } from "next/server";
import { tiposServico } from "@/lib/content";

// Envio via Resend (https://resend.com) — REST API, sem dependências.
// Variáveis de ambiente necessárias em produção:
//   RESEND_API_KEY      — chave da API do Resend (obrigatória)
//   CONTACT_TO_EMAIL    — destino dos pedidos (default: geral@prontogo.pt)
//   CONTACT_FROM_EMAIL  — remetente verificado no Resend
//                         (default: onboarding@resend.dev, apenas para testes)

const MAX_CAMPO = 200;
const MAX_MENSAGEM = 5000;

// Rate limit em memória: N pedidos por IP por janela. Em Fluid Compute a
// instância é reutilizada entre pedidos, por isso isto trava abuso básico
// sem infraestrutura extra (reinicia em cold start — aceitável para spam).
const LIMITE_PEDIDOS = 5;
const JANELA_MS = 10 * 60 * 1000;
const historico = new Map<string, number[]>();

function excedeuLimite(ip: string): boolean {
  const agora = Date.now();
  const anteriores = (historico.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  if (anteriores.length >= LIMITE_PEDIDOS) {
    historico.set(ip, anteriores);
    return true;
  }
  anteriores.push(agora);
  historico.set(ip, anteriores);
  // Limpeza oportunista para o Map não crescer sem limite
  if (historico.size > 5000) {
    for (const [chave, tempos] of historico) {
      if (tempos.every((t) => agora - t >= JANELA_MS)) historico.delete(chave);
    }
  }
  return false;
}

interface Pedido {
  nome: string;
  email: string;
  servico: string;
  mensagem: string;
  empresa?: string; // honeypot — humanos nunca preenchem este campo
}

function campoValido(valor: unknown, max: number): valor is string {
  return typeof valor === "string" && valor.trim().length > 0 && valor.length <= max;
}

// Remove caracteres de controlo (incl. quebras de linha em campos de linha
// única) — evita injeção de conteúdo estranho no email construído.
function limpar(valor: string, permitirQuebras = false): string {
  const padrao = permitirQuebras ? /[^\P{C}\n\r\t]/gu : /\p{C}/gu;
  return valor.replace(padrao, " ").trim();
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "desconhecido";
  if (excedeuLimite(ip)) {
    return NextResponse.json(
      { error: "Demasiados pedidos. Tente novamente dentro de alguns minutos." },
      { status: 429 }
    );
  }

  let pedido: Pedido;
  try {
    pedido = (await request.json()) as Pedido;
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  // Bot preencheu o honeypot: responder "ok" sem enviar nada.
  if (typeof pedido.empresa === "string" && pedido.empresa.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (
    !campoValido(pedido.nome, MAX_CAMPO) ||
    !campoValido(pedido.email, MAX_CAMPO) ||
    !campoValido(pedido.mensagem, MAX_MENSAGEM) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pedido.email) ||
    typeof pedido.servico !== "string" ||
    !tiposServico.includes(pedido.servico)
  ) {
    return NextResponse.json(
      { error: "Preencha todos os campos com dados válidos." },
      { status: 400 }
    );
  }

  const nome = limpar(pedido.nome);
  const mensagem = limpar(pedido.mensagem, true);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contacto] RESEND_API_KEY não configurada — pedido de orçamento NÃO foi enviado.",
      { nome, email: pedido.email, servico: pedido.servico }
    );
    return NextResponse.json(
      { error: "O envio automático está indisponível de momento." },
      { status: 503 }
    );
  }

  let resposta: Response;
  try {
    resposta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "ProntoGo <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? "geral@prontogo.pt"],
        reply_to: pedido.email,
        subject: `Pedido de orçamento — ${nome} (${pedido.servico})`,
        text: [
          `Nome: ${nome}`,
          `Email: ${pedido.email}`,
          `Tipo de serviço: ${pedido.servico}`,
          "",
          "Mensagem:",
          mensagem,
        ].join("\n"),
      }),
    });
  } catch (erro) {
    console.error("[contacto] Erro de rede ao contactar o Resend:", erro);
    return NextResponse.json(
      { error: "Não foi possível enviar o pedido." },
      { status: 502 }
    );
  }

  if (!resposta.ok) {
    console.error("[contacto] Falha no envio via Resend:", resposta.status, await resposta.text());
    return NextResponse.json(
      { error: "Não foi possível enviar o pedido." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
