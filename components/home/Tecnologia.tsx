import { capacidadesApp } from "@/lib/content";
import Icone, { type NomeIcone } from "@/components/home/Icones";
import FundoVivo from "@/components/home/FundoVivo";

// App de rotas em desenvolvimento. Esta secção substitui o antigo painel
// "AI Dispatch Engine", que tinha latência, relógio a correr e percentagens
// de poupança — telemetria de um sistema que ainda não existe. Aqui diz-se o
// que é: um projeto em curso, com o que vai fazer, sem números inventados.

const ICONES: NomeIcone[] = ["rota-ia", "km", "prova", "janela"];

export default function Tecnologia() {
  return (
    <section id="tecnologia" className="h-sec h-escuro tc">
      <FundoVivo />
      <div className="h-wrap tc-grelha">
        <div className="tc-lado" data-reveal>
          <p className="tc-selo">
            <span className="tc-selo-ponto" aria-hidden="true" />
            Em desenvolvimento
          </p>
          <h2 className="h-titulo">
            Estamos a construir{" "}
            <span className="h-serif h-enfase">a nossa própria app de rotas.</span>
          </h2>
          <p className="h-lead">
            Ainda não está ao serviço: está a ser desenvolvida e testada na
            nossa própria operação. Quando entrar, os clientes ProntoGo
            beneficiam dela sem terem de mudar nada.
          </p>
        </div>
        <ul className="tc-lista">
          {capacidadesApp.map((c, i) => (
            <li className="tc-item" key={c.titulo} data-reveal>
              <Icone nome={ICONES[i % ICONES.length]} tamanho={60} />
              <h3>{c.titulo}</h3>
              <p>{c.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
