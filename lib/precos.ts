// Catálogo público da viagem dedicada — o que as secções #cobertura e #precos
// mostram.
//
// IMPORTANTE: este ficheiro é importado por componentes de cliente, por isso
// tudo o que estiver aqui vai dentro do JavaScript que o browser descarrega —
// mesmo que não apareça no ecrã. Nenhum valor de tarifa pode entrar aqui. As
// tarifas vivem em lib/tarifario.ts, que nada importa e por isso nunca chega
// ao browser.
//
// A ProntoGo vende um só serviço: a viagem dedicada, exclusiva para a carga de
// um cliente. O preço é calculado pela distância, não pelo peso. O site
// diz isso sem mostrar valores: o orçamento é dado por uma pessoa.
//
// O peso só entra como limite da carrinha: 640 kg por viagem.

export const CARGA_MAX_KG = 640;

// Escalões de distância que a secção #precos pergunta. Apenas rótulos: o
// valor de cada um está em lib/tarifario.ts.
export const escaloesDedicada = [
  "Aveiro e limítrofes",
  "Até 100 km",
  "Até 150 km",
  "Até 250 km",
  "Mais de 250 km",
];

export interface Alcance {
  id: string;
  nome: string;
  descricao: string;
  // Etiqueta à direita na lista da secção #cobertura
  selo: string;
}

// Os mesmos anéis do gráfico da secção #cobertura.
export const alcances: Alcance[] = [
  {
    id: "local",
    nome: "Aveiro e limítrofes",
    descricao: "Na cidade e nos concelhos vizinhos",
    selo: "À hora marcada",
  },
  {
    id: "regional",
    nome: "Até 100 km",
    descricao: "Porto, Coimbra, Viseu",
    selo: "À hora marcada",
  },
  {
    id: "continente",
    nome: "Todo o continente",
    descricao: "Lisboa e o resto do país, sem transbordos",
    selo: "À hora marcada",
  },
  {
    id: "europa",
    nome: "Europa",
    descricao: "Frota própria, a mesma carrinha faz a viagem toda",
    selo: "Orçamento à medida",
  },
];
