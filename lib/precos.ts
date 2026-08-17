// Tabela de preços ProntoGo — fonte única do simulador.
//
// Para alterar preços: editar apenas este ficheiro e fazer deploy.
// Valores em euros, sem IVA. `preco: null` = sob consulta.
//
// Dois critérios de preço, porque o custo real obedece a lógicas
// diferentes:
//   - `peso`      → a entrega segue numa rota com outras. O que pesa é o
//                   manuseamento, não os quilómetros.
//   - `distancia` → viagem exclusiva para essa entrega. O custo é
//                   quilómetros, portagens e horas ao volante.
//
// Limite operacional: 640 kg de carga útil (Citroën Berlingo).

export type Criterio = "peso" | "distancia";

export interface Escalao {
  rotulo: string;
  preco: number | null;
}

export interface ServicoPreco {
  id: string;
  nome: string;
  descricao: string;
  prazo: string;
  criterio: Criterio;
  escaloes: Escalao[];
  nota?: string;
}

export const CARGA_MAX_KG = 640;

// Desconto para clientes com contrato regular (20+ envios por mês)
export const DESCONTO_CONTRATO = 0.15;

export const servicosPreco: ServicoPreco[] = [
  {
    id: "urbano",
    nome: "Urbano",
    descricao: "Aveiro e concelhos limítrofes",
    prazo: "No próprio dia",
    criterio: "peso",
    escaloes: [
      { rotulo: "Até 5 kg", preco: 9 },
      { rotulo: "5 a 15 kg", preco: 13 },
      { rotulo: "15 a 30 kg", preco: 17 },
      { rotulo: "Mais de 30 kg", preco: null },
    ],
  },
  {
    id: "regional",
    nome: "Regional",
    descricao: "Até 100 km — Porto, Coimbra, Viseu",
    prazo: "24 horas",
    criterio: "peso",
    escaloes: [
      { rotulo: "Até 5 kg", preco: 16 },
      { rotulo: "5 a 15 kg", preco: 21 },
      { rotulo: "15 a 30 kg", preco: 27 },
      { rotulo: "Mais de 30 kg", preco: null },
    ],
    nota: "Entrega direta por nós, sem passar por centros de triagem.",
  },
  {
    id: "nacional",
    nome: "Nacional",
    descricao: "Todo o continente",
    prazo: "24 horas úteis",
    criterio: "peso",
    escaloes: [
      { rotulo: "Até 5 kg", preco: 8 },
      { rotulo: "5 a 10 kg", preco: 10 },
      { rotulo: "10 a 20 kg", preco: 13 },
      { rotulo: "20 a 30 kg", preco: 16 },
      { rotulo: "Mais de 30 kg", preco: null },
    ],
    nota: "Recolhemos consigo e a entrega segue pela nossa rede parceira.",
  },
  {
    id: "dedicada",
    nome: "Dedicada",
    descricao: "Viagem exclusiva, sem paragens",
    prazo: "À hora marcada",
    criterio: "distancia",
    // Acima de 150 km a viagem exclusiva paga o retorno vazio e portagens
    // pesadas (Aveiro–Lisboa ~39 € ida e volta) — a margem fica no fio,
    // por isso orçamenta-se caso a caso.
    escaloes: [
      { rotulo: "Aveiro e limítrofes", preco: 19 },
      { rotulo: "Até 100 km", preco: 75 },
      { rotulo: "Até 150 km", preco: 130 },
      { rotulo: "Mais de 150 km", preco: null },
    ],
    nota: "A carrinha vai só para si, à hora que marcar. Preço por viagem, com qualquer peso até 640 kg.",
  },
];
