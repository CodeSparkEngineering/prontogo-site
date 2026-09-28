"use client";

import { useState } from "react";
import { servicosPreco, CARGA_MAX_KG } from "@/lib/precos";
import { whatsappLink } from "@/lib/site";
import { rolarPara } from "@/lib/lenis";
import Icone, { type NomeIcone } from "@/components/home/Icones";

// O ficheiro mantém o nome, e a secção mantém o id #precos, para não partir
// ligações externas nem os anúncios que já apontam para /#precos. Deixou de
// ser um simulador: não mostra valores. Serve para qualificar o pedido —
// serviço e escalão — e entregá-lo no WhatsApp já escrito.
export const EVENTO_SIMULACAO = "prontogo:simulacao";

// Ícone de cada modalidade (conjunto em components/home/Icones.tsx)
const iconesServico: Record<string, NomeIcone> = {
  urbano: "expresso",
  regional: "carrinha",
  nacional: "continente",
  dedicada: "dedicada",
};

function IconeWhatsapp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  );
}

export default function Simulador() {
  const [servicoId, setServicoId] = useState(servicosPreco[0].id);
  const [escalaoIdx, setEscalaoIdx] = useState(0);

  const servico =
    servicosPreco.find((s) => s.id === servicoId) ?? servicosPreco[0];
  // Agora um rótulo, não um objeto: o valor ficou em lib/tarifario.ts.
  const escalao =
    servico.escaloes[Math.min(escalaoIdx, servico.escaloes.length - 1)];

  const pedido = `${servico.nome} (${servico.descricao}), ${escalao}`;

  function escolherServico(id: string) {
    setServicoId(id);
    setEscalaoIdx(0);
  }

  // Alternativa para quem está ao computador ou prefere escrever: leva o
  // mesmo pedido ao formulário, com a mensagem já preenchida.
  function pedirPorFormulario() {
    window.dispatchEvent(
      new CustomEvent(EVENTO_SIMULACAO, {
        detail: {
          servico: servico.nome,
          mensagem: `Vim do site e queria um orçamento: ${pedido}.`,
        },
      })
    );
    rolarPara("#contacto");
  }

  return (
    <section id="precos" className="h-sec h-claro-2 q">
      <div className="h-wrap q-grelha">
        <div className="q-lado">
          <p className="h-eyebrow">
            <span className="h-ponto" />
            Orçamento
          </p>
          <h2 className="h-titulo">
            Diga-nos o que precisa.{" "}
            <span className="h-serif h-enfase">Respondemos em minutos.</span>
          </h2>
          <p className="h-lead">
            Cada percurso tem uma conta diferente — distância, peso, horário e
            frequência. Escolha o serviço e o escalão: o pedido segue para o
            WhatsApp já escrito e devolvemos um valor fechado, por escrito,
            antes da recolha.
          </p>

          {/* Rota fixa contratada: viatura afeta a uma operação. O valor
              depende do percurso e da frequência, por isso vai direto à
              conversa. */}
          <div className="q-rota" data-reveal>
            <p className="q-rota-selo">Contrato mensal</p>
            <h3>Rota fixa contratada</h3>
            <p>
              Recolha e entrega no mesmo dia, no mesmo percurso, todos os dias
              úteis. Viatura e condutor afetos à sua operação, a partir de 20
              operações por mês.
            </p>
            <a
              className="q-link"
              href={whatsappLink(
                "Olá! Vim do site e tenho interesse numa rota fixa contratada: recolha e entrega no mesmo percurso, todos os dias úteis. Percurso e frequência previstos: "
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar sobre a rota <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="q-painel" data-reveal>
          <div className="q-passo">
            <span className="q-passo-num">01</span>
            <span className="q-passo-txt">Que serviço precisa?</span>
          </div>
          <div className="q-opcoes" role="group" aria-label="Tipo de serviço">
            {servicosPreco.map((s) => {
              const ativo = s.id === servicoId;
              const icone = iconesServico[s.id] ?? "expresso";
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`q-opcao${ativo ? " is-ativo" : ""}`}
                  onClick={() => escolherServico(s.id)}
                  aria-pressed={ativo}
                >
                  <Icone nome={icone} tamanho={44} className="q-opcao-icone" />
                  <span className="q-opcao-nome">{s.nome}</span>
                  <span className="q-opcao-desc">{s.descricao}</span>
                  <span className="q-opcao-prazo">{s.prazo}</span>
                </button>
              );
            })}
          </div>

          <div className="q-passo">
            <span className="q-passo-num">02</span>
            <span className="q-passo-txt">
              {servico.criterio === "peso"
                ? "Quanto pesa a encomenda?"
                : "Qual a distância estimada?"}
            </span>
          </div>
          <div
            className="q-escaloes"
            role="group"
            aria-label={servico.criterio === "peso" ? "Peso" : "Distância"}
          >
            {servico.escaloes.map((e, i) => (
              <button
                key={e}
                type="button"
                className={`q-escalao${i === escalaoIdx ? " is-ativo" : ""}`}
                onClick={() => setEscalaoIdx(i)}
                aria-pressed={i === escalaoIdx}
              >
                {e}
              </button>
            ))}
          </div>

          {servico.nota && <p className="q-nota">{servico.nota}</p>}

          <div className="q-resultado">
            <span className="q-resultado-rotulo">O seu pedido</span>
            <span className="q-resultado-resumo" key={`${servico.id}-${escalaoIdx}`}>
              {servico.nome} · {escalao}
            </span>
            <a
              className="h-btn h-btn--laranja q-cta"
              href={whatsappLink(
                `Olá! Vim do site e queria um orçamento: ${pedido}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconeWhatsapp />
              Pedir orçamento no WhatsApp
            </a>
            <button type="button" className="q-alt" onClick={pedirPorFormulario}>
              Prefere escrever? Use o formulário
            </button>
          </div>

          <p className="q-rodape">
            Capacidade até {CARGA_MAX_KG} kg por viagem. O preço é confirmado
            por escrito antes da recolha — sem surpresas nem taxas escondidas.
          </p>
        </div>
      </div>
    </section>
  );
}
