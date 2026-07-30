import type { Bloco } from "@/lib/guias";

// Renderiza os blocos tipados de um guia com estilo consistente.
export default function GuiaConteudo({ blocos }: { blocos: Bloco[] }) {
  return (
    <>
      {blocos.map((bloco, i) => {
        switch (bloco.tipo) {
          case "h2":
            return <h2 key={i}>{bloco.texto}</h2>;
          case "p":
            return <p key={i}>{bloco.texto}</p>;
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
