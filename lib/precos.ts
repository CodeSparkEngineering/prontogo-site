// Catálogo público de serviços — o que a secção #precos mostra.
//
// IMPORTANTE: este ficheiro é importado por um componente de cliente, por
// isso tudo o que estiver aqui vai dentro do JavaScript que o browser
// descarrega — mesmo que não apareça no ecrã. Nenhum valor de tarifa pode
// entrar aqui. As tarifas vivem em lib/tarifario.ts, que nada importa e por
// isso nunca chega ao browser.
//
// Dois critérios, porque o custo real obedece a lógicas diferentes:
//   - `peso`      → a entrega segue numa rota com outras. O que pesa é o
//                   manuseamento, não os quilómetros.
//   - `distancia` → viagem exclusiva para essa entrega. O custo é
//                   quilómetros, portagens e horas ao volante.
//
// Limite operacional: 640 kg de carga útil (Citroën Berlingo).

export type Criterio = "peso" | "distancia";

export interface ServicoPreco {
  id: string;
  nome: string;
  descricao: string;
  prazo: string;
  criterio: Criterio;
  // Apenas rótulos. O valor de cada escalão está em lib/tarifario.ts.
  escaloes: string[];
  nota?: string;
}

export const CARGA_MAX_KG = 640;

export const servicosPreco: ServicoPreco[] = [
  {
    id: "urbano",
    nome: "Urbano",
    descricao: "Aveiro e concelhos limítrofes",
    prazo: "No próprio dia",
    criterio: "peso",
    escaloes: ["Até 5 kg", "5 a 15 kg", "15 a 30 kg", "Mais de 30 kg"],
  },
  {
    id: "regional",
    nome: "Regional",
    descricao: "Até 100 km — Porto, Coimbra, Viseu",
    prazo: "24 horas",
    criterio: "peso",
    escaloes: ["Até 5 kg", "5 a 15 kg", "15 a 30 kg", "Mais de 30 kg"],
    nota: "Entrega direta por nós, sem passar por centros de triagem.",
  },
  {
    id: "nacional",
    nome: "Nacional",
    descricao: "Todo o continente",
    prazo: "24 horas úteis",
    criterio: "peso",
    escaloes: [
      "Até 5 kg",
      "5 a 10 kg",
      "10 a 20 kg",
      "20 a 30 kg",
      "Mais de 30 kg",
    ],
    nota: "Recolhemos consigo e a entrega segue pela nossa rede parceira.",
  },
  {
    id: "dedicada",
    nome: "Dedicada",
    descricao: "Viagem exclusiva, sem paragens",
    prazo: "À hora marcada",
    criterio: "distancia",
    escaloes: [
      "Aveiro e limítrofes",
      "Até 100 km",
      "Até 150 km",
      "Até 250 km",
      "Mais de 250 km",
    ],
    nota: "A carrinha vai só para si, à hora que marcar. Preço por viagem, com qualquer peso até 640 kg e até 1,20 m de altura carregada.",
  },
];
