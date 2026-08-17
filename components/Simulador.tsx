"use client";

import { useState } from "react";
import {
  servicosPreco,
  DESCONTO_CONTRATO,
  CARGA_MAX_KG,
} from "@/lib/precos";

export const EVENTO_SIMULACAO = "prontogo:simulacao";

const eur = (v: number) =>
  new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(v);

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

export default function Simulador() {
  const [servicoId, setServicoId] = useState(servicosPreco[0].id);
  const [escalaoIdx, setEscalaoIdx] = useState(0);

  const servico =
    servicosPreco.find((s) => s.id === servicoId) ?? servicosPreco[0];
  const escalao =
    servico.escaloes[Math.min(escalaoIdx, servico.escaloes.length - 1)];
  const preco = escalao.preco;

  function escolherServico(id: string) {
    setServicoId(id);
    setEscalaoIdx(0);
  }

  function pedir() {
    const detalhe = preco
      ? `Simulei no site: ${servico.nome} (${servico.descricao}), ${escalao.rotulo} — ${eur(preco)}. Gostaria de avançar.`
      : `Simulei no site: ${servico.nome} (${servico.descricao}), ${escalao.rotulo}. Preciso de um orçamento.`;
    window.dispatchEvent(
      new CustomEvent(EVENTO_SIMULACAO, {
        detail: { servico: servico.nome, mensagem: detalhe },
      })
    );
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="precos" className="section section-alt section-sim-wrapper">
      <div className="container">
        <div className="section-head head-center" data-reveal>
          <div className="kicker">Simulador Online</div>
          <h2>Saiba quanto custa antes de nos contactar</h2>
          <p>
            Sem tabelas escondidas nem &quot;peça orçamento para saber&quot;.
            Selecione o serviço e o peso — obtenha a estimativa imediata.
          </p>
        </div>

        <div className="sim sim-card-enhanced" data-reveal>
          {/* Header do Simulador */}
          <div className="sim-header-strip">
            <div className="sim-header-badge">
              <span className="sim-header-dot" />
              <span>Calculadora de Tarifas em Tempo Real</span>
            </div>
            <span className="sim-header-note">Valores base sem IVA</span>
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
                  key={e.rotulo}
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
                  <span className="sim-peso-txt">{e.rotulo}</span>
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

          {/* Bloco de Resultado e CTA */}
          <div className="sim-resultado">
            {preco !== null ? (
              <div className="sim-result-box">
                <div className="sim-preco-bloco">
                  <span className="sim-preco-label">Valor Estimado</span>
                  <span className="sim-preco" key={`${servico.id}-${escalaoIdx}`}>
                    {eur(preco)}
                  </span>
                  <span className="sim-preco-nota">
                    {servico.criterio === "peso"
                      ? "por entrega • sem IVA"
                      : "por viagem exclusiva • sem IVA"}
                  </span>
                </div>

                <div className="sim-contrato">
                  <div className="sim-contrato-header">
                    <span className="sim-contrato-selo">
                      Poupa {Math.round(DESCONTO_CONTRATO * 100)}%
                    </span>
                    <span className="sim-contrato-title">Contrato Regular (20+ envios/mês)</span>
                  </div>
                  <div className="sim-contrato-val">
                    Apenas{" "}
                    <strong key={`d-${servico.id}-${escalaoIdx}`}>
                      {eur(preco * (1 - DESCONTO_CONTRATO))}
                    </strong>{" "}
                    / entrega
                  </div>
                </div>
              </div>
            ) : (
              <div className="sim-preco-bloco sim-consulta-bloco">
                <span className="sim-preco-label">Valor Estimado</span>
                <span
                  className="sim-preco sim-preco-consulta"
                  key={`c-${servico.id}-${escalaoIdx}`}
                >
                  Sob Consulta
                </span>
                <span className="sim-preco-nota">
                  {servico.criterio === "peso"
                    ? `Acima de 30 kg ajustamos o valor ao volume e destino (capacidade até ${CARGA_MAX_KG} kg).`
                    : "Para distâncias superiores fazemos um orçamento personalizado à medida do percurso."}
                </span>
              </div>
            )}

            <button type="button" className="btn btn-primary sim-cta" onClick={pedir}>
              <span>{preco !== null ? "Pedir este serviço" : "Pedir cotação"}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <p className="sim-rodape">
            Valores indicativos para recolha e entrega dentro da área
            indicada. O preço final é confirmado por escrito antes da recolha —
            sem surpresas nem taxas escondidas.
          </p>
        </div>
      </div>
    </section>
  );
}
