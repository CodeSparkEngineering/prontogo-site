"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";
import { rolarPara } from "@/lib/lenis";

// O ficheiro mantém o nome, e a secção mantém o id #precos, para não partir
// ligações externas nem os anúncios que já apontam para /#precos. Não mostra
// valores: recolhe o que é preciso para orçamentar uma viagem dedicada
// (recolha, entrega, dia e carga) e entrega o pedido no WhatsApp já escrito.
// Não se pergunta a distância: as carrinhas saem de Sangalhos e quem faz essa
// conta somos nós. Não se pergunta o peso nem se mostram preços.
export const EVENTO_SIMULACAO = "prontogo:simulacao";

const DIAS = ["Hoje", "Amanhã", "Outro dia"] as const;
type Dia = (typeof DIAS)[number];

function IconeWhatsapp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  );
}

export default function Simulador() {
  const [recolha, setRecolha] = useState("");
  const [entrega, setEntrega] = useState("");
  const [dia, setDia] = useState<Dia>("Hoje");
  const [data, setData] = useState("");
  const [cargaTexto, setCargaTexto] = useState("");

  const quando =
    dia === "Outro dia"
      ? data
        ? new Date(`${data}T12:00:00`).toLocaleDateString("pt-PT")
        : ""
      : dia;

  // Só entram no pedido as linhas preenchidas: quem carrega no botão com o
  // formulário vazio abre na mesma a conversa, e completamos por lá.
  const linhas = [
    "Olá! Vim do site e queria um orçamento de viagem dedicada.",
    recolha.trim() && `Recolha: ${recolha.trim()}`,
    entrega.trim() && `Entrega: ${entrega.trim()}`,
    quando && `Quando: ${quando}`,
    cargaTexto.trim() && `Carga: ${cargaTexto.trim()}`,
  ].filter(Boolean) as string[];

  // Alternativa para quem está ao computador ou prefere escrever: leva o
  // mesmo pedido ao formulário, com a mensagem já preenchida.
  function pedirPorFormulario() {
    window.dispatchEvent(
      new CustomEvent(EVENTO_SIMULACAO, {
        detail: {
          servico: "Viagem dedicada",
          mensagem: linhas.slice(1).join("\n"),
        },
      })
    );
    rolarPara("#contacto");
  }

  return (
    <section id="precos" className="h-sec h-claro-2 q">
      <div className="h-wrap q-grelha">
        <div className="q-lado">
          <h2 className="h-titulo">Peça um orçamento</h2>
          <p className="h-lead">
            Diga-nos de onde para onde e em que dia. A carrinha sai de
            Sangalhos (Anadia), recolhe a carga e leva-a diretamente ao local
            que indicar. O orçamento é por viagem e fica fechado por escrito
            antes da recolha.
          </p>

          {/* Rota fixa contratada: viatura afeta a uma operação. O valor
              depende do percurso e da frequência, por isso vai direto à
              conversa. */}
          <div className="q-rota" data-reveal>
            <p className="q-rota-selo">Contrato mensal</p>
            <h3>Rota fixa contratada</h3>
            <p>
              Para quem faz o mesmo percurso todos os dias úteis: viatura e
              condutor afetos à sua operação, a partir de 20 operações por
              mês.
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
          <div className="q-linha">
            <label className="q-campo">
              <span className="q-campo-rotulo">Recolha</span>
              <input
                type="text"
                value={recolha}
                onChange={(e) => setRecolha(e.target.value)}
                placeholder="Localidade ou morada"
                autoComplete="off"
              />
            </label>
            <label className="q-campo">
              <span className="q-campo-rotulo">Entrega</span>
              <input
                type="text"
                value={entrega}
                onChange={(e) => setEntrega(e.target.value)}
                placeholder="Localidade ou morada"
                autoComplete="off"
              />
            </label>
          </div>

          <div className="q-campo">
            <span className="q-campo-rotulo" id="q-quando">
              Quando
            </span>
            <div className="q-escaloes" role="group" aria-labelledby="q-quando">
              {DIAS.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`q-escalao${d === dia ? " is-ativo" : ""}`}
                  onClick={() => setDia(d)}
                  aria-pressed={d === dia}
                >
                  {d}
                </button>
              ))}
              {dia === "Outro dia" && (
                <input
                  type="date"
                  className="q-data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  aria-label="Dia da recolha"
                />
              )}
            </div>
          </div>

          <label className="q-campo">
            <span className="q-campo-rotulo">O que vai transportar</span>
            <input
              type="text"
              value={cargaTexto}
              onChange={(e) => setCargaTexto(e.target.value)}
              placeholder="Por exemplo: 2 paletes, 12 caixas, uma máquina"
              autoComplete="off"
            />
          </label>

          <div className="q-resultado">
            <a
              className="h-btn h-btn--laranja q-cta"
              href={whatsappLink(linhas.join("\n"))}
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
        </div>
      </div>
    </section>
  );
}
