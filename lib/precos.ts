// Tabela de preços ProntoGo — fonte única do simulador.
//
// Para alterar preços: editar apenas este ficheiro e fazer deploy.
// Valores em euros, sem IVA. `null` = sob consulta (pedido de orçamento).
//
// Limite operacional: a viatura tem 640 kg de carga útil, pelo que acima
// de 30 kg o preço depende do volume, distância e meios de carga.

export interface Escalao {
  ateKg: number;
  rotulo: string;
  preco: number | null;
}

export interface ServicoPreco {
  id: string;
  nome: string;
  descricao: string;
  prazo: string;
  escaloes: Escalao[];
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
    escaloes: [
      { ateKg: 5, rotulo: "Até 5 kg", preco: 9 },
      { ateKg: 15, rotulo: "5 a 15 kg", preco: 13 },
      { ateKg: 30, rotulo: "15 a 30 kg", preco: 17 },
      { ateKg: CARGA_MAX_KG, rotulo: "Mais de 30 kg", preco: null },
    ],
  },
  {
    id: "urgente",
    nome: "Urgente",
    descricao: "Aveiro, entrega em 2 horas",
    prazo: "2 horas",
    escaloes: [
      { ateKg: 5, rotulo: "Até 5 kg", preco: 19 },
      { ateKg: 30, rotulo: "Mais de 5 kg", preco: null },
      { ateKg: CARGA_MAX_KG, rotulo: "Mais de 30 kg", preco: null },
    ],
  },
  {
    id: "nacional",
    nome: "Nacional",
    descricao: "Todo o continente",
    prazo: "24 horas úteis",
    escaloes: [
      { ateKg: 5, rotulo: "Até 5 kg", preco: 8 },
      { ateKg: 10, rotulo: "5 a 10 kg", preco: 10 },
      { ateKg: 20, rotulo: "10 a 20 kg", preco: 13 },
      { ateKg: 30, rotulo: "20 a 30 kg", preco: 16 },
      { ateKg: CARGA_MAX_KG, rotulo: "Mais de 30 kg", preco: null },
    ],
  },
];
