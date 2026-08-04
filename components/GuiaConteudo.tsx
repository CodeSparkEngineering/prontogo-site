import Link from "next/link";
import type { ReactNode } from "react";
import type { Bloco } from "@/lib/guias";

// Converte [texto](/destino) em ligações reais, sem recorrer a HTML por
// injeção. Só aceita caminhos internos — evita que uma edição futura ao
// conteúdo introduza uma ligação externa por engano.
const PADRAO_LIGACAO = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

function comLigacoes(texto: string): ReactNode {
  const partes: ReactNode[] = [];
  let ultimo = 0;
  let m: RegExpExecArray | null;
  PADRAO_LIGACAO.lastIndex = 0;
  while ((m = PADRAO_LIGACAO.exec(texto)) !== null) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
    partes.push(
      <Link key={`${m[2]}-${m.index}`} href={m[2]}>
        {m[1]}
      </Link>
    );
    ultimo = m.index + m[0].length;
  }
  if (ultimo === 0) return texto;
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

// Renderiza os blocos tipados de um guia com estilo consistente.
export default function GuiaConteudo({ blocos }: { blocos: Bloco[] }) {
  return (
    <>
      {blocos.map((bloco, i) => {
        switch (bloco.tipo) {
          case "h2":
            return <h2 key={i}>{bloco.texto}</h2>;
          case "p":
            return <p key={i}>{comLigacoes(bloco.texto)}</p>;
          case "lista":
            return (
              <ul key={i}>
                {bloco.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "destaque":
            return (
              <aside className="guia-destaque" key={i}>
                <div className="guia-destaque-titulo">{bloco.titulo}</div>
                <p>{bloco.texto}</p>
              </aside>
            );
          case "citacao":
            return (
              <blockquote className="guia-citacao" key={i}>
                <p>{bloco.texto}</p>
                <cite>{bloco.autor}</cite>
              </blockquote>
            );
          case "tabela":
            return (
              <div className="guia-tabela-wrap" key={i}>
                <table className="guia-tabela">
                  <thead>
                    <tr>
                      {bloco.cabecalho.map((c, ci) => (
                        <th key={ci}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bloco.linhas.map((linha, li) => (
                      <tr key={li}>
                        {linha.map((celula, ci) => (
                          <td key={ci}>{celula}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}
