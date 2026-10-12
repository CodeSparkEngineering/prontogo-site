// Guias ProntoGo — conteúdo editorial do site.
//
// Cada guia é composto por blocos tipados, renderizados por
// components/GuiaConteudo.tsx. Evita dependências de Markdown/MDX e mantém
// o estilo consistente entre artigos.
//
// Para publicar um guia novo: acrescentar uma entrada a `guias`, colocar a
// imagem de capa em /public/assets e fazer deploy. O sitemap, a listagem e
// os dados estruturados atualizam-se sozinhos.

// Nos blocos de parágrafo, [texto](/destino) vira ligação. É a forma mais
// simples de ter ligações contextuais sem dependência de Markdown.
export type Bloco =
  | { tipo: "p"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "destaque"; titulo: string; texto: string }
  | { tipo: "citacao"; texto: string; autor: string }
  | { tipo: "tabela"; cabecalho: string[]; linhas: string[][] };

// Perguntas no fim do artigo. Alimentam o schema FAQPage, que é o formato
// que os motores de resposta (AI Overviews, ChatGPT, Perplexity) mais
// citam — respostas curtas e autónomas funcionam melhor que parágrafos.
export interface PerguntaGuia {
  pergunta: string;
  resposta: string;
}

export interface Guia {
  slug: string;
  titulo: string;
  resumo: string;
  data: string; // ISO, usada no schema Article e na listagem
  dataDisplay: string;
  minutos: number;
  autor: string;
  img: string;
  imgAlt: string;
  blocos: Bloco[];
  faq?: PerguntaGuia[];
  // Serviço relacionado — liga o artigo à secção correspondente da
  // homepage (ligação interna que ajuda SEO e conversão)
  servico?: { texto: string; href: string };
}

export const guias: Guia[] = [
  {
    slug: "quanto-custa-enviar-palete-portugal",
    titulo: "Quanto custa enviar uma palete em Portugal?",
    resumo:
      "Entre 40 € e mais de 200 € para o mesmo percurso. O que explica a diferença, quanto se paga hoje no mercado e quando compensa pagar uma viagem dedicada.",
    data: "2026-08-17",
    dataDisplay: "17 de agosto de 2026",
    minutos: 7,
    autor: "Israel Vieira da Silva",
    img: "/assets/guia-palete.webp",
    imgAlt:
      "Europalete embalada com caixas e película retrátil pronta para carregamento num cais logístico com carrinha de transporte",
    servico: {
      texto: "Pedir orçamento para uma palete",
      href: "/#precos",
    },
    blocos: [
      {
        tipo: "p",
        texto:
          "Peça três orçamentos para enviar a mesma palete de Aveiro para Lisboa e é provável que receba 45 €, 90 € e 210 €. Nenhum está errado — estão a vender coisas diferentes. Este guia explica o que separa esses números, para conseguir comparar propostas que à primeira vista parecem incomparáveis.",
      },
      { tipo: "h2", texto: "O que conta como uma palete" },
      {
        tipo: "p",
        texto:
          "Quando um transportador fala em «palete» sem mais nada, está quase sempre a falar da europalete — o modelo normalizado EPAL que domina o transporte rodoviário na Europa. Saber as medidas é o primeiro passo para ler qualquer tabela de preços.",
      },
      {
        tipo: "lista",
        itens: [
          "Medidas: 1200 × 800 mm de base, com cerca de 14 cm de altura só na estrutura de madeira.",
          "Peso em vazio: aproximadamente 25 kg — que contam para o peso total faturado.",
          "Carga nominal: até 1500 kg, embora poucas transportadoras de mercadoria geral aceitem tanto numa palete só.",
          "Altura carregada: o limite habitual anda entre 1,80 m e 2,20 m, consoante o operador e o tipo de camião.",
        ],
      },
      {
        tipo: "destaque",
        titulo: "A altura é preço, não é pormenor",
        texto:
          "Duas paletes com o mesmo peso mas alturas diferentes raramente custam o mesmo. O transportador vende espaço no camião: uma palete de 2,20 m ocupa o dobro do lugar de uma de 1,10 m e é faturada em conformidade. Meça a altura final já com o filme retrátil aplicado, antes de pedir orçamento.",
      },
      {
        tipo: "h2",
        texto: "Grupagem ou viagem dedicada: é aqui que o preço se decide",
      },
      {
        tipo: "p",
        texto:
          "Esta é a escolha que mais mexe na fatura e a que quase ninguém explica a quem pede orçamento pela primeira vez. Em grupagem, a sua palete viaja num camião partilhado com carga de outros clientes e passa por um ou mais centros de triagem. Numa viagem dedicada, a viatura sai com a sua carga e vai direta ao destino.",
      },
      {
        tipo: "tabela",
        cabecalho: ["", "Grupagem", "Viagem dedicada"],
        linhas: [
          [
            "Preço de uma palete",
            "Mais baixo — o custo é dividido",
            "Mais alto — paga a viagem inteira",
          ],
          ["Prazo", "24 a 72 horas", "No próprio dia, à hora marcada"],
          [
            "Manuseamentos",
            "Vários, em cada centro de triagem",
            "Nenhum entre a recolha e a entrega",
          ],
          ["Risco de dano", "Maior, por causa dos transbordos", "Menor"],
          [
            "Faz sentido quando",
            "A carga não é urgente nem frágil",
            "É urgente, frágil ou de valor alto",
          ],
        ],
      },
      {
        tipo: "p",
        texto:
          "Não há aqui um vencedor absoluto. Se está a enviar material sem pressa e que aguenta ser empilhado, a grupagem é quase sempre a decisão certa e não vale a pena pagar mais. Se está a enviar equipamento que não pode chegar daqui a três dias nem chegar partido, a conta muda de figura.",
      },
      { tipo: "h2", texto: "Valores de referência no mercado português" },
      {
        tipo: "p",
        texto:
          "Os intervalos seguintes refletem o que se pratica em envios nacionais no continente, com IVA excluído. Servem para perceber se o orçamento que recebeu está dentro do razoável.",
      },
      {
        tipo: "tabela",
        cabecalho: ["Serviço", "Prazo típico", "Intervalo habitual"],
        linhas: [
          ["Grupagem económica, 1 palete", "48 a 72 horas", "40 € – 60 €"],
          ["Grupagem prioritária, 1 palete", "24 a 48 horas", "70 € – 90 €"],
          ["Viagem dedicada, até 100 km", "No próprio dia", "70 € – 120 €"],
          ["Viagem dedicada, até 250 km", "No próprio dia", "180 € – 300 €"],
        ],
      },
      {
        tipo: "p",
        texto:
          "Os valores mais baixos destes intervalos são praticados por operadores que conseguem combinar carga de retorno na mesma viagem. Numa viagem verdadeiramente dedicada, sem partilha, os valores situam-se no topo do intervalo ou acima.",
      },
      {
        tipo: "p",
        texto:
          "Os operadores de grupagem anunciam tarifas a partir de cerca de 40 € no serviço mais económico, com recolha em 24 a 48 horas e entrega em 24 a 72 horas. É um bom ponto de partida, mas raramente é o valor final — o que interessa é confirmar o que fica de fora.",
      },
      { tipo: "h2", texto: "As taxas que não vêm no anúncio" },
      {
        tipo: "lista",
        itens: [
          "Sobretaxa de combustível — uma percentagem sobre o valor base, revista mensalmente por quase todos os operadores.",
          "Zonas de difícil acesso — interior, ilhas e certos centros históricos têm valores próprios.",
          "Descarga sem cais nem empilhador — se o destino não tem meios, é preciso plataforma elevatória na viatura, e isso paga-se.",
          "Segunda tentativa de entrega — se não houver ninguém para receber, a nova deslocação é faturada.",
          "Seguro de valor declarado — a cobertura por omissão costuma ser baixa e calculada por quilo, não pelo valor real da mercadoria.",
        ],
      },
      {
        tipo: "destaque",
        titulo: "A pergunta que evita a maior parte das surpresas",
        texto:
          "«Este preço inclui a descarga?» Muita mercadoria paletizada chega a moradas sem cais de carga nem empilhador. Se ninguém confirmar isso antes, a palete pode simplesmente não sair da viatura — e a viagem é faturada na mesma.",
      },
      {
        tipo: "citacao",
        texto:
          "Metade dos problemas com paletes que nos chegam não são de preço nem de prazo: é mercadoria que chegou ao destino e não houve como a descarregar. Cinco minutos ao telefone antes da recolha resolvem isso.",
        autor: "Israel Vieira da Silva, ProntoGo",
      },
      { tipo: "h2", texto: "Quando é que a viagem dedicada compensa" },
      {
        tipo: "p",
        texto:
          "Pagar 200 € por algo que custaria 50 € em grupagem só faz sentido se estiver a comprar mais do que transporte. Normalmente é uma destas cinco coisas:",
      },
      {
        tipo: "lista",
        itens: [
          "Prazo — precisa da carga no destino hoje, não daqui a três dias.",
          "Integridade — a mercadoria é frágil, não se aguenta bem em pé, ou não pode levar nada empilhado por cima.",
          "Valor — o custo de uma palete danificada ultrapassa largamente a diferença de preço entre os dois serviços.",
          "Paragem de produção — uma linha parada à espera de uma peça custa por hora muito mais do que qualquer transporte.",
          "Controlo — quer saber exatamente por onde andou a carga e quem lhe tocou.",
        ],
      },
      { tipo: "h2", texto: "Como fazemos na ProntoGo" },
      {
        tipo: "p",
        texto:
          "Preferimos ser claros sobre o que fazemos e o que não fazemos. Não somos operador de grupagem: se procura o preço mais baixo para uma palete sem urgência, um operador de rede vai bater-nos e essa é a escolha certa. O que fazemos é viagem dedicada — a carrinha sai com a sua carga e vai direta ao destino, à hora que marcar.",
      },
      {
        tipo: "lista",
        itens: [
          "Uma europalete por viagem, até 640 kg e 1,20 m de altura carregada. Acima disso, orçamento à medida.",
          "Preço por viagem e não por quilo, orçamentado ao percurso concreto — recebe o valor fechado, sem IVA, antes de confirmar a recolha.",
          "Sem centros de triagem pelo meio — quem recolhe é quem entrega.",
          "Acima de 250 km ou de 640 kg avaliamos o percurso antes de aceitar, em vez de prometer o que não cumpríamos.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Diga-nos o percurso e o que vai na palete e devolvemos o valor no mesmo dia — [peça o orçamento aqui](/#precos). E se o que envia são encomendas e não paletes, o guia de [quanto custa uma entrega expressa](/guias/quanto-custa-entrega-expressa-portugal) é o mais adequado.",
      },
    ],
    faq: [
      {
        pergunta: "Quanto custa enviar uma palete em Portugal?",
        resposta:
          "Em grupagem, uma palete nacional custa tipicamente entre 40 € e 90 €, consoante o peso, a altura e a urgência — os operadores anunciam a partir de cerca de 40 € no serviço económico, com entrega em 24 a 72 horas. Numa viagem dedicada, em que a viatura vai direta ao destino no próprio dia, paga-se a viagem inteira e não o peso: no mercado português isso significa cerca de 70 € a 120 € até 100 km e 180 € a 300 € até 250 km, sempre sem IVA. Como o valor depende do percurso concreto, das portagens e do horário, a ProntoGo orçamenta caso a caso.",
      },
      {
        pergunta: "Quanto pesa e quanto mede uma europalete?",
        resposta:
          "A europalete normalizada (EPAL) mede 1200 × 800 mm de base e cerca de 14 cm de altura só na estrutura de madeira. Em vazio pesa aproximadamente 25 kg, que contam para o peso faturado. Suporta uma carga nominal até 1500 kg, embora a maioria das transportadoras de mercadoria geral trabalhe com limites bastante inferiores por palete.",
      },
      {
        pergunta: "É mais barato grupagem ou viagem dedicada?",
        resposta:
          "A grupagem é sempre mais barata para uma palete isolada, porque o custo do camião é dividido por vários clientes. Em contrapartida demora 24 a 72 horas e a carga passa por centros de triagem, com mais manuseamentos e maior risco de dano. A viagem dedicada custa mais, mas entrega no próprio dia e sem transbordos.",
      },
      {
        pergunta: "Quanto tempo demora a entrega de uma palete em Portugal?",
        resposta:
          "Em grupagem económica conte com recolha em 24 a 48 horas e entrega em 24 a 72 horas dentro do continente. Em serviço prioritário, 24 a 48 horas no total. Numa viagem dedicada a entrega é feita no próprio dia, à hora combinada, porque a viatura não faz outras paragens pelo caminho.",
      },
    ],
  },
  {
    slug: "quanto-custa-entrega-expressa-portugal",
    titulo: "Quanto custa uma entrega expressa em Portugal?",
    resumo:
      "O que faz mesmo subir o preço de uma entrega, quanto se paga em média no mercado português e como reduzir a fatura sem perder prazo.",
    data: "2026-07-30",
    dataDisplay: "30 de julho de 2026",
    minutos: 6,
    autor: "Israel Vieira da Silva",
    img: "/assets/guia-precos.webp",
    imgAlt:
      "Lojista a calcular custos de envio ao balcão, com encomendas numa balança",
    servico: {
      texto: "Ver os nossos serviços de entregas",
      href: "/#servicos",
    },
    blocos: [
      {
        tipo: "p",
        texto:
          "É a primeira pergunta de quem procura uma transportadora — e a que costuma ter a resposta mais vaga. A verdade é que não existe um preço único: o mesmo volume pode custar 4 € ou 14 € consoante meia dúzia de fatores. Este guia explica quais são, para que consiga ler qualquer orçamento com olhos de quem percebe.",
      },
      { tipo: "h2", texto: "Os 5 fatores que definem o preço" },
      {
        tipo: "p",
        texto:
          "Praticamente todas as transportadoras em Portugal calculam o preço a partir das mesmas variáveis. Conhecê-las permite-lhe perceber onde tem margem para poupar.",
      },
      {
        tipo: "lista",
        itens: [
          "Peso e volume — paga-se pelo maior dos dois. Uma caixa grande e leve pode custar como uma pequena e pesada, por causa do chamado peso volumétrico.",
          "Distância e zona — dentro da mesma cidade é sempre mais barato. Zonas de difícil acesso, ilhas e interior profundo têm sobretaxas.",
          "Urgência — entrega no próprio dia custa mais do que 24 horas, que por sua vez custa mais do que serviço económico a 48–72 horas.",
          "Volume mensal — quem envia 200 encomendas por mês paga menos por unidade do que quem envia 5. É aqui que estão os maiores descontos.",
          "Serviços adicionais — recolha ao domicílio, seguro de valor declarado, entrega ao sábado ou prova de entrega assinada acrescentam custo.",
        ],
      },
      { tipo: "h2", texto: "Valores de referência no mercado português" },
      {
        tipo: "p",
        texto:
          "Os intervalos abaixo refletem o que se pratica no mercado para envios de empresa (não balcão), com IVA excluído. Servem como termo de comparação — o seu orçamento deve encaixar aqui.",
      },
      {
        tipo: "tabela",
        cabecalho: ["Tipo de envio", "Peso típico", "Intervalo habitual"],
        linhas: [
          ["Urbano no próprio dia", "até 5 kg", "5 € – 12 €"],
          ["Nacional 24 horas", "até 5 kg", "4 € – 8 €"],
          ["Nacional 24 horas", "5 – 20 kg", "7 € – 15 €"],
          ["Palete nacional", "até 500 kg", "40 € – 90 €"],
        ],
      },
      {
        tipo: "destaque",
        titulo: "Cuidado com o preço de tabela",
        texto:
          "Um preço baixo à unidade pode esconder sobretaxas de combustível, de zona ou de segunda tentativa de entrega. Peça sempre o valor final, com todas as taxas incluídas, para o seu perfil real de envios.",
      },
      { tipo: "h2", texto: "Como baixar a fatura sem perder qualidade" },
      {
        tipo: "lista",
        itens: [
          "Ajuste a embalagem ao produto — cada centímetro a mais de caixa é peso volumétrico que está a pagar sem transportar nada.",
          "Concentre as recolhas — uma recolha diária com 10 volumes é mais barata que 10 recolhas avulsas.",
          "Separe o que é urgente do que não é. Nem toda a encomenda precisa de chegar amanhã; misturar tudo no serviço mais rápido é o erro mais caro que vemos.",
          "Negoceie com base em dados. Leve o número de envios por mês, o peso médio e os destinos mais frequentes — é isso que permite a uma transportadora dar-lhe um preço a sério.",
          "Reduza entregas falhadas. Cada segunda tentativa é um custo, e muitas vezes evita-se apenas com o número de telefone certo e notificações ao cliente.",
        ],
      },
      {
        tipo: "citacao",
        texto:
          "A conversa mais útil que temos com um cliente novo não é sobre o preço à unidade — é sobre o que ele está a enviar, para onde e com que frequência. É daí que sai a poupança real.",
        autor: "Israel Vieira da Silva, ProntoGo",
      },
      { tipo: "h2", texto: "E quando o mais barato sai caro" },
      {
        tipo: "p",
        texto:
          "Um euro poupado por envio deixa de compensar à primeira encomenda perdida, ao primeiro cliente que não repete a compra, ou às horas que a sua equipa passa a responder a «onde está a minha encomenda?».",
      },
      {
        tipo: "p",
        texto:
          "Se quiser um valor concreto para a sua operação, diga-nos o que envia, para onde e com que frequência. Respondemos em menos de 24 horas úteis com uma proposta à medida — sem taxas escondidas.",
      },
    ],
    faq: [
      {
        pergunta: "Qual é o preço médio de uma entrega expressa em Portugal?",
        resposta:
          "Para um envio nacional em 24 horas até 5 kg, o mercado pratica entre 4 € e 8 € por encomenda em contratos de empresa. Ao balcão, sem contrato, os valores sobem: os CTT cobram cerca de 5,47 € por uma encomenda até 2 kg. Entregas urbanas no próprio dia custam tipicamente entre 5 € e 12 €.",
      },
      {
        pergunta: "O que é o peso volumétrico e porque me cobram por ele?",
        resposta:
          "O peso volumétrico converte o espaço que a encomenda ocupa num valor equivalente em quilos. Como uma carrinha enche antes de atingir o peso máximo, as transportadoras cobram pelo maior valor entre o peso real e o volumétrico. Na prática: uma caixa grande e leve pode custar como uma pequena e pesada.",
      },
      {
        pergunta: "Vale a pena fazer contrato com uma transportadora?",
        resposta:
          "Sim, a partir de cerca de 20 envios por mês. Os descontos de volume são o fator com maior impacto no preço unitário — quem envia 200 encomendas por mês paga substancialmente menos por unidade do que quem envia cinco. Leve dados reais (envios por mês, peso médio, destinos frequentes) para a negociação.",
      },
      {
        pergunta: "Porque é que o mesmo envio tem preços tão diferentes?",
        resposta:
          "Cinco fatores explicam quase toda a diferença: peso e volume, distância e zona de entrega, urgência, volume mensal contratado e serviços adicionais como recolha ao domicílio, seguro ou prova de entrega assinada. Um mesmo volume pode custar 4 € ou 14 € consoante estas variáveis.",
      },
    ],
  },
];

export function guiaPorSlug(slug: string): Guia | undefined {
  return guias.find((g) => g.slug === slug);
}

// Guias relacionados para a secção "Leia também"
export function outrosGuias(slug: string, limite = 2): Guia[] {
  return guias.filter((g) => g.slug !== slug).slice(0, limite);
}
