"use client";

import { useState } from "react";
import { servicosPreco, CARGA_MAX_KG } from "@/lib/precos";
import { whatsappLink } from "@/lib/site";
import { rolarPara } from "@/lib/lenis";

// O ficheiro mantém o nome, e a secção mantém o id #precos, para não partir
// ligações externas nem os anúncios que já apontam para /#precos. Deixou de
// ser um simulador: não mostra valores. Serve para qualificar o pedido —
// serviço e escalão — e entregá-lo no WhatsApp já escrito.
export const EVENTO_SIMULACAO = "prontogo:simulacao";

// Ícones temáticos para cada modalidade
const iconesServico: Record<string, string> = {
  urbano:
    '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />',
  regional:
    '<rect x="1" y="3" width="15" height="13" rx="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />',
  nacional:
    '<circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />',
  dedicada:
    '<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />',
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
    <section id="precos" className="section section-alt section-sim-wrapper">
      <div className="container">
        <div className="section-head head-center" data-reveal>
          <div className="kicker">Orçamento</div>
          <h2>Diga-nos o que precisa e respondemos em minutos</h2>
          <p>
            Cada percurso tem uma conta diferente — distância, peso, horário e
            frequência. Selecione o serviço e o escalão: o pedido segue para o
            WhatsApp já escrito e devolvemos um valor fechado.
          </p>
        </div>

        <div className="sim sim-card-enhanced" data-reveal>
          {/* Header do pedido */}
          <div className="sim-header-strip">
            <div className="sim-header-badge">
              <span className="sim-header-dot" />
              <span>Resposta no WhatsApp em minutos</span>
            </div>
            <span className="sim-header-note">Orçamento sem compromisso</span>
          </div>

          {/* Passo 1: Escolha do Serviço */}
          <div className="sim-passo">
            <span className="sim-num">1</span>
            <div>
              <span className="sim-label">Que serviço precisa?</span>
              <span className="sim-sublabel">Escolha o raio de abrangência da entrega</span>
            </div>
          </div>
          <div className="sim-opcoes-grid" role="group" aria-label="Tipo de serviço">
            {servicosPreco.map((s) => {
              const ativo = s.id === servicoId;
              const icone = iconesServico[s.id] ?? iconesServico.urbano;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`sim-card-opt${ativo ? " on" : ""}`}
                  onClick={() => escolherServico(s.id)}
                  aria-pressed={ativo}
                >
                  <div className="sim-card-top">
                    <div className="sim-icon-circle">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        dangerouslySetInnerHTML={{ __html: icone }}
                      />
                    </div>
                    {ativo && <span className="sim-check-badge">✓</span>}
                  </div>
                  <span className="sim-opcao-nome">{s.nome}</span>
                  <span className="sim-opcao-desc">{s.descricao}</span>
                  <span className="sim-opcao-prazo">{s.prazo}</span>
                </button>
              );
            })}
          </div>

          {/* Passo 2: Escalão de Peso / Distância */}
          <div className="sim-passo">
            <span className="sim-num">2</span>
            <div>
              <span className="sim-label">
                {servico.criterio === "peso" ? "Quanto pesa a encomenda?" : "Qual a distância estimada?"}
              </span>
              <span className="sim-sublabel">
                {servico.criterio === "peso" ? "Selecione o escalão de peso" : "Selecione o percurso pretendido"}
              </span>
            </div>
          </div>

          <div
            className="sim-pesos-grid"
            role="group"
            aria-label={servico.criterio === "peso" ? "Peso" : "Distância"}
          >
            {servico.escaloes.map((e, i) => {
              const ativo = i === escalaoIdx;
              return (
                <button
                  key={e}
                  type="button"
                  className={`sim-peso-btn${ativo ? " on" : ""}`}
                  onClick={() => setEscalaoIdx(i)}
                  aria-pressed={ativo}
                >
                  <span className="sim-peso-icon">
                    {servico.criterio === "peso"
                      ? i === 0
                        ? "✉️"
                        : i === 1
                          ? "📦"
                          : i === 2
                            ? "📦"
                            : "🏗️"
                      : "📍"}
                  </span>
                  <span className="sim-peso-txt">{e}</span>
                </button>
              );
            })}
          </div>

          {servico.nota && (
            <div className="sim-nota-servico">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>{servico.nota}</span>
            </div>
          )}

          {/* O pedido montado, pronto a seguir para o WhatsApp */}
          <div className="sim-resultado">
            <div className="sim-pedido-bloco">
              <span className="sim-preco-label">O seu pedido</span>
              <span
                className="sim-pedido-resumo"
                key={`${servico.id}-${escalaoIdx}`}
              >
                {servico.nome} · {escalao}
              </span>
              <span className="sim-preco-nota">
                Orçamento à medida do percurso e da frequência, confirmado por
                escrito antes da recolha.
              </span>
            </div>

            <div className="sim-acoes">
              <a
                className="btn btn-primary sim-cta"
                href={whatsappLink(
                  `Olá! Vim do site e queria um orçamento: ${pedido}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconeWhatsapp />
                <span>Pedir orçamento no WhatsApp</span>
              </a>
              <button
                type="button"
                className="sim-alt"
                onClick={pedirPorFormulario}
              >
                Prefere escrever? Use o formulário
              </button>
            </div>
          </div>

          <p className="sim-rodape">
            Recolha e entrega dentro da área indicada, com capacidade até{" "}
            {CARGA_MAX_KG} kg por viagem. O preço é confirmado por escrito antes
            da recolha — sem surpresas nem taxas escondidas.
          </p>
        </div>

        {/* Rota fixa contratada: viatura afeta a uma operação, receita
            recorrente. O valor depende do percurso e da frequência, por isso
            nunca teria tabela — vai direto à conversa. */}
        <div className="rota-fixa" data-reveal>
          <div className="rota-fixa-icone" aria-hidden="true">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3v4M16 3v4M3 10h18" />
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M8 15h8" />
            </svg>
          </div>
          <div className="rota-fixa-body">
            <div className="rota-fixa-kicker">Contrato • Receita Recorrente</div>
            <h3>Rota fixa contratada</h3>
            <p>
              Recolha e entrega no mesmo dia, no mesmo percurso, todos os dias
              úteis. Viatura e condutor afetos à sua operação. A partir de 20
              operações por mês.
            </p>
            <span className="rota-fixa-nota">
              Orçamento à medida do percurso e da frequência.
            </span>
          </div>
          <a
            className="btn btn-primary rota-fixa-cta"
            href={whatsappLink(
              "Olá! Vim do site e tenho interesse numa rota fixa contratada: recolha e entrega no mesmo percurso, todos os dias úteis. Percurso e frequência previstos: "
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconeWhatsapp />
            <span>Falar sobre a rota</span>
          </a>
        </div>
      </div>
    </section>
  );
}
