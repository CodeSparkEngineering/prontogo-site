// Guias ProntoGo — conteúdo editorial do site.
//
// Cada guia é composto por blocos tipados, renderizados por
// components/GuiaConteudo.tsx. Evita dependências de Markdown/MDX e mantém
// o estilo consistente entre artigos.
//
// Para publicar um guia novo: acrescentar uma entrada a `guias`, colocar a
// imagem de capa em /public/assets e fazer deploy. O sitemap, a listagem e
// os dados estruturados atualizam-se sozinhos.

export type Bloco =
  | { tipo: "p"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "destaque"; titulo: string; texto: string }
  | { tipo: "citacao"; texto: string; autor: string }
  | { tipo: "tabela"; cabecalho: string[]; linhas: string[][] };

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
  // Serviço relacionado — liga o artigo à secção correspondente da
  // homepage (ligação interna que ajuda SEO e conversão)
  servico?: { texto: string; href: string };
}

export const guias: Guia[] = [
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
          ["Palete nacional", "até 500 kg", "45 € – 90 €"],
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
          "Um euro poupado por envio deixa de compensar à primeira encomenda perdida, ao primeiro cliente que não repete a compra, ou às horas que a sua equipa passa a responder a «onde está a minha encomenda?». Ao comparar propostas, ponha na balança a taxa de entregas no prazo, a existência de rastreamento e a facilidade de falar com alguém quando algo corre mal.",
      },
      {
        tipo: "p",
        texto:
          "Se quiser um valor concreto para a sua operação, diga-nos o que envia, para onde e com que frequência. Respondemos em menos de 24 horas úteis com uma proposta à medida — sem taxas escondidas.",
      },
    ],
  },
  {
    slug: "escolher-transportadora-loja-online",
    titulo: "Como escolher a transportadora da sua loja online: 7 critérios",
    resumo:
      "A entrega é o último passo da sua venda e o primeiro contacto físico com a marca. Sete critérios objetivos para decidir com cabeça, e não pelo preço.",
    data: "2026-07-30",
    dataDisplay: "30 de julho de 2026",
    minutos: 7,
    autor: "Israel Vieira da Silva",
    img: "/assets/guia-ecommerce.webp",
    imgAlt: "Lojista online a preparar encomendas rodeado de caixas de cartão",
    servico: {
      texto: "Conhecer o nosso last-mile para e-commerce",
      href: "/#servicos",
    },
    blocos: [
      {
        tipo: "p",
        texto:
          "Pode ter o melhor produto e o site mais bonito: se a encomenda chega tarde ou amassada, é a sua marca que leva a culpa — não a transportadora. Para o cliente, quem entrega é você. Por isso a escolha do parceiro logístico merece o mesmo cuidado que dá aos fornecedores.",
      },
      { tipo: "h2", texto: "1. Cobertura real, não a do folheto" },
      {
        tipo: "p",
        texto:
          "Quase todas dizem «cobertura nacional». O que interessa é o desempenho nos destinos onde os seus clientes estão. Peça a taxa de entregas no prazo para as suas três zonas mais frequentes, e não uma média nacional que esconde os casos maus.",
      },
      { tipo: "h2", texto: "2. Prazos que a sua loja pode prometer" },
      {
        tipo: "p",
        texto:
          "Se a transportadora entrega em 24 horas mas só recolhe às 18h, a sua promessa real é de 48. Confirme a hora limite de recolha e alinhe-a com o horário a que fecha as encomendas do dia.",
      },
      { tipo: "h2", texto: "3. Rastreamento que o cliente entende" },
      {
        tipo: "p",
        texto:
          "Um código de rastreio que só mostra «em trânsito» durante dois dias gera mais emails de apoio do que sossego. Procure notificações automáticas em cada etapa e um estado legível por quem não trabalha em logística.",
      },
      { tipo: "h2", texto: "4. Integração com a sua plataforma" },
      {
        tipo: "p",
        texto:
          "Se todos os dias copia moradas à mão da loja para o portal da transportadora, está a pagar em tempo o que julgava poupar em portes — e a introduzir erros. Confirme se há integração com a sua plataforma ou, no mínimo, importação de ficheiro.",
      },
      { tipo: "h2", texto: "5. O que acontece quando corre mal" },
      {
        tipo: "p",
        texto:
          "Extravios e danos acontecem a todos os operadores. O que distingue é a resposta. Pergunte, antes de assinar: qual o prazo de resolução de uma reclamação, que valor está coberto por omissão, e quem é a pessoa com quem vai falar.",
      },
      {
        tipo: "destaque",
        titulo: "O teste do telefone",
        texto:
          "Antes de decidir, tente falar com um humano do apoio a clientes num dia útil de manhã. O tempo que demorar a conseguir é o mesmo que vai demorar no dia em que tiver uma encomenda perdida e um cliente irritado à espera.",
      },
      { tipo: "h2", texto: "6. Devoluções sem fricção" },
      {
        tipo: "p",
        texto:
          "No comércio online, a logística inversa faz parte do negócio. Perceba como se marca uma recolha de devolução, quanto custa e quantos dias demora a chegar de volta a si — é dinheiro parado até o produto voltar a estar disponível para venda.",
      },
      { tipo: "h2", texto: "7. Estrutura de preço transparente" },
      {
        tipo: "tabela",
        cabecalho: ["Pergunte por", "Sinal de alerta"],
        linhas: [
          ["Preço final com todas as taxas", "«Depois vemos isso» na proposta"],
          ["Como é calculado o peso volumétrico", "Fórmula que não sabem explicar"],
          ["Custo de segunda tentativa", "Não vem na tabela"],
          ["Condições de revisão de preço", "Aumentos sem aviso prévio"],
        ],
      },
      {
        tipo: "citacao",
        texto:
          "Desde que passámos o last-mile para uma operação mais próxima, as reclamações por atraso praticamente desapareceram. O que mudou o jogo foram as notificações ao cliente, não o preço.",
        autor: "Um padrão que ouvimos em quase todas as lojas com que falamos",
      },
      { tipo: "h2", texto: "Como decidir na prática" },
      {
        tipo: "lista",
        itens: [
          "Faça uma lista curta de dois ou três operadores e peça proposta com os seus números reais.",
          "Teste com um lote pequeno durante duas ou três semanas antes de mudar tudo.",
          "Meça o que interessa: entregas no prazo, tempo de resposta ao apoio e número de contactos de clientes sobre entregas.",
          "Só depois negoceie volume — com dados na mão, a conversa muda.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Na ProntoGo trabalhamos exatamente assim com as lojas que nos procuram: começamos pequeno, medimos, e crescemos quando os números justificarem. Se quiser fazer esse teste connosco, peça-nos uma proposta.",
      },
    ],
  },
  {
    slug: "last-mile-o-que-e",
    titulo: "Last-mile: o que é e porque decide a experiência do cliente",
    resumo:
      "É o troço mais curto do percurso e o que consome mais custo e mais reputação. Perceba o que é a última milha e o que a faz correr bem.",
    data: "2026-07-30",
    dataDisplay: "30 de julho de 2026",
    minutos: 5,
    autor: "Israel Vieira da Silva",
    img: "/assets/guia-lastmile.webp",
    imgAlt: "Estafeta a entregar uma encomenda à porta de um prédio",
    servico: {
      texto: "Ver como funciona a nossa operação, passo a passo",
      href: "/#como-funciona",
    },
    blocos: [
      {
        tipo: "p",
        texto:
          "Chama-se last-mile — ou última milha — ao troço final da viagem de uma encomenda: do último ponto de distribuição até à porta do cliente. Pode ser o mais curto em quilómetros, mas é aquele onde se joga a maior fatia do custo e, sobretudo, a perceção que o cliente fica da sua marca.",
      },
      { tipo: "h2", texto: "Porque é a parte mais cara" },
      {
        tipo: "p",
        texto:
          "Um camião que leva mil volumes de Lisboa para Aveiro faz uma viagem, com um condutor. Esses mesmos mil volumes, distribuídos porta a porta, são centenas de paragens, tempos de estacionamento, prédios sem elevador, clientes ausentes e segundas tentativas. Estima-se que a última milha represente mais de metade do custo total de transporte de uma encomenda.",
      },
      {
        tipo: "lista",
        itens: [
          "Muitas paragens curtas com pouca carga em cada uma",
          "Trânsito e estacionamento em zonas urbanas densas",
          "Tentativas falhadas quando o destinatário não está",
          "Janelas horárias apertadas pedidas pelos clientes",
        ],
      },
      { tipo: "h2", texto: "Porque é a parte que o cliente recorda" },
      {
        tipo: "p",
        texto:
          "O seu cliente não vê o armazém, nem o camião, nem a triagem noturna. Vê a pessoa que toca à campainha e o estado da caixa que recebe. Toda a experiência de compra — o site, o atendimento, o produto — passa por esse único momento físico. Quando corre mal, é a sua loja que ele vai avaliar mal.",
      },
      {
        tipo: "destaque",
        titulo: "O número que vale a pena vigiar",
        texto:
          "A taxa de entregas à primeira tentativa. Cada falhanço custa-lhe dinheiro em nova deslocação, atrasa o cliente e gera um contacto de apoio que também custa. Melhorar este indicador costuma dar mais retorno do que negociar cêntimos no preço.",
      },
      { tipo: "h2", texto: "O que faz uma última milha correr bem" },
      {
        tipo: "lista",
        itens: [
          "Notificações úteis — avisar na véspera e no dia, com uma janela horária realista, reduz drasticamente as ausências.",
          "Rastreamento em tempo real — dá autonomia ao cliente e evita que ele tenha de perguntar.",
          "Rotas otimizadas — menos quilómetros por entrega significa mais entregas por dia e menos emissões.",
          "Estafetas que conhecem a zona — quem já sabe onde estacionar e que prédio tem porteiro entrega mais depressa.",
          "Alternativas em caso de ausência — entregar a um vizinho, deixar em ponto de recolha ou reagendar num clique.",
          "Prova de entrega imediata — protege-o a si e ao cliente em caso de disputa.",
        ],
      },
      { tipo: "h2", texto: "Fazer em casa ou entregar a um parceiro" },
      {
        tipo: "tabela",
        cabecalho: ["", "Operação própria", "Parceiro logístico"],
        linhas: [
          ["Investimento inicial", "Alto (viaturas, equipa)", "Nenhum"],
          ["Custo por entrega", "Baixo só com escala", "Previsível desde o início"],
          ["Flexibilidade em picos", "Limitada", "Absorve variações"],
          ["Foco da sua equipa", "Dividido", "No produto e nas vendas"],
        ],
      },
      {
        tipo: "p",
        texto:
          "Para a maioria das lojas online e PMEs, montar frota própria só compensa a partir de um volume que poucas atingem. Até lá, um parceiro que trate da última milha com o mesmo cuidado que você teria é a opção mais racional.",
      },
      {
        tipo: "citacao",
        texto:
          "A última milha é a única parte da logística que o seu cliente vê. Tratá-la como um custo a minimizar, em vez de um momento de marca, é o erro mais comum que encontramos.",
        autor: "Israel Vieira da Silva, ProntoGo",
      },
      {
        tipo: "p",
        texto:
          "É precisamente esse o serviço que fazemos: distribuição final integrada com a sua loja, com notificações ao cliente em cada etapa e prova de receção imediata. Se quiser perceber como funcionaria no seu caso, fale connosco.",
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
