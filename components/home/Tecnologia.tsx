import { capacidadesApp } from "@/lib/content";

// App de rotas em desenvolvimento. Esta secção substitui o antigo painel
// "AI Dispatch Engine", que tinha latência, relógio a correr e percentagens
// de poupança — telemetria de um sistema que ainda não existe. Aqui diz-se o
// que é: um projeto em curso, com o que vai fazer, sem números inventados.

// Conjunto desenhado na grelha de 24, traço de 2, um só realce a laranja.
const ICONES = [
  // 1. Rotas calculadas por IA — percurso com paragens, a do meio realçada
  //    (a que o cálculo reposicionou).
  <svg key="rota" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.2 18.6C8 18.6 8 12.4 12 12.4C16 12.4 16 5.6 19.8 5.6" />
    <circle cx="4.2" cy="18.6" r="1.9" />
    <circle cx="19.8" cy="5.6" r="1.9" />
    <circle cx="12" cy="12.4" r="2.2" stroke="#F5820B" />
  </svg>,
  // 2. Menos quilómetros, mesma carga — conta-quilómetros com a seta a descer.
  //    Formas grandes, sem tracejado: é o que sobrevive aos 20 px reais.
  <svg key="km" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.6 16.8a8.4 8.4 0 0 1 12.8-7.2" />
    <path d="M12 16.8 9.4 12" />
    <circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" />
    <path d="M19.4 5.6v5.2M17.3 8.7 19.4 10.8 21.5 8.7" stroke="#F5820B" />
  </svg>,
  // 3. Prova de entrega no telemóvel — a assinatura é a prova. A linha de base
  //    ficou a 19.2 para não colidir com o traço do laço, que desce a 17.15.
  <svg key="assinatura" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2.2" width="14" height="19.6" rx="3" />
    <path d="M10.4 5.2h3.2" />
    <path d="M8.2 14.4c1-2.6 1.9-2.6 2.7 0 .8 2.6 1.7 2.6 2.6 0 .5-1.5 1.3-1.1 2.3.7" stroke="#F5820B" />
    <path d="M8.2 19.2h7.6" opacity="0.5" />
  </svg>,
  // 4. Horas de chegada mais fiáveis — a cunha marca a janela horária, não uma
  //    hora. Raio 6.8 contra os 8.8 do mostrador: 2 unidades entre eixos, que é
  //    a folga mínima para dois traços de 2 não encostarem.
  <svg key="janela" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 12V5.2A6.8 6.8 0 0 1 17.89 8.6Z" fill="rgba(245,130,11,0.18)" stroke="#F5820B" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>,
];

export default function Tecnologia() {
  return (
    <section id="tecnologia" className="h-sec h-escuro tc">
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
              <span className="tc-icone">{ICONES[i % ICONES.length]}</span>
              <h3>{c.titulo}</h3>
              <p>{c.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
