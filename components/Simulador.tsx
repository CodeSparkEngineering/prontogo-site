"use client";

import { useState } from "react";
import {
  servicosPreco,
  DESCONTO_CONTRATO,
  CARGA_MAX_KG,
} from "@/lib/precos";

// Simulador de preço. Ao pedir o serviço, dispara um evento que o
// ContactForm ouve para pré-preencher a mensagem — evita que o visitante
// tenha de repetir o que já escolheu aqui.
export const EVENTO_SIMULACAO = "prontogo:simulacao";

const eur = (v: number) =>
  new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(v);

export default function Simulador() {
  const [servicoId, setServicoId] = useState(servicosPreco[0].id);
  const [escalaoIdx, setEscalaoIdx] = useState(0);

  const servico =
    servicosPreco.find((s) => s.id === servicoId) ?? servicosPreco[0];
  const escalao = servico.escaloes[Math.min(escalaoIdx, servico.escaloes.length - 1)];
  const preco = escalao.preco;

  function escolherServico(id: string) {
    setServicoId(id);
    setEscalaoIdx(0);
  }

  function pedir() {
    const detalhe = preco
      ? `Simulei no site: ${servico.nome} (${servico.descricao}), ${escalao.rotulo} — ${eur(preco)}. Gostaria de avançar.`
      : `Simulei no site: ${servico.nome} (${servico.descricao}), ${escalao.rotulo}. Preciso de um orçamento para este peso.`;
    window.dispatchEvent(
      new CustomEvent(EVENTO_SIMULACAO, {
        detail: { servico: servico.nome, mensagem: detalhe },
      })
    );
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="precos" className="section section-alt">
      <div className="container">
        <div className="section-head head-center" data-reveal>
          <div className="kicker">Preços</div>
          <h2>Saiba quanto custa antes de nos contactar</h2>
          <p>
            Sem tabelas escondidas nem &quot;peça orçamento para saber&quot;.
            Escolha o serviço e o peso — o preço aparece aqui.
          </p>
        </div>

        <div className="sim" data-reveal>
          <div className="sim-passo">
            <span className="sim-num">1</span>
            <span className="sim-label">Que serviço precisa?</span>
          </div>
          <div className="sim-opcoes" role="group" aria-label="Tipo de serviço">
            {servicosPreco.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`sim-opcao${s.id === servicoId ? " on" : ""}`}
                onClick={() => escolherServico(s.id)}
                aria-pressed={s.id === servicoId}
              >
                <span className="sim-opcao-nome">{s.nome}</span>
                <span className="sim-opcao-desc">{s.descricao}</span>
                <span className="sim-opcao-prazo">{s.prazo}</span>
              </button>
            ))}
          </div>

          <div className="sim-passo">
            <span className="sim-num">2</span>
            <span className="sim-label">Quanto pesa?</span>
          </div>
          <div className="sim-opcoes sim-pesos" role="group" aria-label="Peso">
            {servico.escaloes.map((e, i) => (
              <button
                key={e.rotulo}
                type="button"
                className={`sim-peso${i === escalaoIdx ? " on" : ""}`}
                onClick={() => setEscalaoIdx(i)}
                aria-pressed={i === escalaoIdx}
              >
                {e.rotulo}
              </button>
            ))}
          </div>

          <div className="sim-resultado">
            {preco !== null ? (
              <>
                <div className="sim-preco-bloco">
                  <span className="sim-preco-label">Preço</span>
                  {/* A key faz o número remontar a cada mudança, disparando
                      a animação que sinaliza que o valor mudou */}
                  <span className="sim-preco" key={`${servico.id}-${escalaoIdx}`}>
                    {eur(preco)}
                  </span>
                  <span className="sim-preco-nota">
                    por entrega, sem IVA
                  </span>
                </div>
                <div className="sim-contrato">
                  <span className="sim-contrato-selo">
                    Poupa {Math.round(DESCONTO_CONTRATO * 100)}%
                  </span>
                  Com contrato regular, a partir de 20 envios por mês:{" "}
                  <strong key={`d-${servico.id}-${escalaoIdx}`}>
                    {eur(preco * (1 - DESCONTO_CONTRATO))}
                  </strong>{" "}
                  por entrega
                </div>
              </>
            ) : (
              <div className="sim-preco-bloco">
                <span className="sim-preco-label">Preço</span>
                <span
                  className="sim-preco sim-preco-consulta"
                  key={`c-${servico.id}-${escalaoIdx}`}
                >
                  Sob consulta
                </span>
                <span className="sim-preco-nota">
                  Acima de 30 kg o valor depende do volume e da distância.
                  Transportamos até {CARGA_MAX_KG} kg.
                </span>
              </div>
            )}
            <button type="button" className="btn btn-primary sim-cta" onClick={pedir}>
              {preco !== null ? "Pedir este serviço" : "Pedir orçamento"}
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
            nunca cobramos mais do que o acordado.
          </p>
        </div>
      </div>
    </section>
  );
}
