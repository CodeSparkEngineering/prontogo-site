import { NextResponse } from "next/server";

// Envio via Resend (https://resend.com) — REST API, sem dependências.
// Variáveis de ambiente necessárias em produção:
//   RESEND_API_KEY      — chave da API do Resend (obrigatória)
//   CONTACT_TO_EMAIL    — destino dos pedidos (default: geral@prontogo.pt)
//   CONTACT_FROM_EMAIL  — remetente verificado no Resend
//                         (default: onboarding@resend.dev, apenas para testes)

const MAX_CAMPO = 200;
const MAX_MENSAGEM = 5000;

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

export async function POST(request: Request) {
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
    !campoValido(pedido.servico, MAX_CAMPO) ||
    !campoValido(pedido.mensagem, MAX_MENSAGEM) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pedido.email)
  ) {
    return NextResponse.json(
      { error: "Preencha todos os campos com dados válidos." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contacto] RESEND_API_KEY não configurada — pedido de orçamento NÃO foi enviado.",
      { nome: pedido.nome, email: pedido.email, servico: pedido.servico }
    );
    return NextResponse.json(
      { error: "O envio automático está indisponível de momento." },
      { status: 503 }
    );
  }

  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "ProntoGo <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? "geral@prontogo.pt"],
      reply_to: pedido.email,
      subject: `Pedido de orçamento — ${pedido.nome} (${pedido.servico})`,
      text: [
        `Nome: ${pedido.nome}`,
        `Email: ${pedido.email}`,
        `Tipo de serviço: ${pedido.servico}`,
        "",
        "Mensagem:",
        pedido.mensagem,
      ].join("\n"),
    }),
  });

  if (!resposta.ok) {
    console.error("[contacto] Falha no envio via Resend:", resposta.status, await resposta.text());
    return NextResponse.json(
      { error: "Não foi possível enviar o pedido." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
