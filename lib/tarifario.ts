// Tarifário interno da ProntoGo — NÃO é publicado no site.
//
// Este ficheiro não é importado por nenhum componente, de propósito: assim
// os valores nunca entram no JavaScript que o browser descarrega. O site
// mostra serviços e escalões (lib/precos.ts) e recolhe o pedido; o preço é
// dado por WhatsApp, a partir desta tabela.
//
// Base de cálculo das viagens dedicadas, sempre sobre os km de ida e volta:
//   combustível 0,1346 €/km + desgaste e depreciação 0,08 €/km
//   + portagens estimadas + motorista 12,80 €/h
// Preço praticado = custo + 20%.
//
// Valores em euros, sem IVA. `preco: null` = sem referência de tabela,
// orçamento sempre à medida.

export interface Tarifa {
  servico: string;
  escalao: string;
  preco: number | null;
}

export const tarifario: Tarifa[] = [
  { servico: "Urbano", escalao: "Até 5 kg", preco: 9 },
  { servico: "Urbano", escalao: "5 a 15 kg", preco: 13 },
  { servico: "Urbano", escalao: "15 a 30 kg", preco: 17 },
  { servico: "Urbano", escalao: "Mais de 30 kg", preco: null },

  { servico: "Regional", escalao: "Até 5 kg", preco: 16 },
  { servico: "Regional", escalao: "5 a 15 kg", preco: 21 },
  { servico: "Regional", escalao: "15 a 30 kg", preco: 27 },
  { servico: "Regional", escalao: "Mais de 30 kg", preco: null },

  { servico: "Nacional", escalao: "Até 5 kg", preco: 8 },
  { servico: "Nacional", escalao: "5 a 10 kg", preco: 10 },
  { servico: "Nacional", escalao: "10 a 20 kg", preco: 13 },
  { servico: "Nacional", escalao: "20 a 30 kg", preco: 16 },
  { servico: "Nacional", escalao: "Mais de 30 kg", preco: null },

  // Viagem dedicada: custo + 20%, sobre os km de ida e volta.
  //   Aveiro e limítrofes  40 km  → custo 21,38 €
  //   Até 100 km          200 km  → custo 93,32 €
  //   Até 150 km          300 km  → custo 139,98 €
  //   Até 250 km          500 km  → custo 226,90 €
  // Abaixo de 29 € a viagem local só fecha as contas com três ou mais
  // paragens na mesma rota — como viagem dedicada única, dá prejuízo.
  { servico: "Dedicada", escalao: "Aveiro e limítrofes", preco: 29 },
  { servico: "Dedicada", escalao: "Até 100 km", preco: 117 },
  { servico: "Dedicada", escalao: "Até 150 km", preco: 175 },
  { servico: "Dedicada", escalao: "Até 250 km", preco: 284 },
  { servico: "Dedicada", escalao: "Mais de 250 km", preco: null },
];

// Desconto para clientes com contrato regular (20+ envios por mês).
// Cuidado ao aplicá-lo às viagens dedicadas: esses preços são custo + 20%, e
// 20% de margem menos 15% de desconto deixa cerca de 2% acima do custo. Para
// quem envia com regularidade compensa mais negociar uma rota fixa do que
// descontar a viagem avulsa.
export const DESCONTO_CONTRATO = 0.15;
