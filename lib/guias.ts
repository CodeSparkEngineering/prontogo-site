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
      texto: "Ver os preços das viagens dedicadas",
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
          ["Viagem dedicada, até 100 km", "No próprio dia", "70 € – 90 €"],
          ["Viagem dedicada, até 250 km", "No próprio dia", "180 € – 250 €"],
        ],
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
          "Pagar 130 € por algo que custaria 50 € em grupagem só faz sentido se estiver a comprar mais do que transporte. Normalmente é uma destas cinco coisas:",
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
          "Uma europalete por viagem, até 640 kg de carga.",
          "Preço por viagem e não por quilo: 19 € em Aveiro e concelhos limítrofes, 75 € até 100 km, 130 € até 150 km e 210 € até 250 km.",
          "Sem centros de triagem pelo meio — quem recolhe é quem entrega.",
          "Acima de 250 km ou de 640 kg damos orçamento à medida, em vez de inventar uma tabela que não cumpríamos.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Pode ver todos os valores e simular o seu envio na [tabela de preços](/#precos). Se está a comparar propostas de vários operadores, os [sete critérios que separam uma boa transportadora de uma barata](/guias/escolher-transportadora-loja-online) ajudam a decidir. E se o que envia são encomendas e não paletes, o guia de [quanto custa uma entrega expressa](/guias/quanto-custa-entrega-expressa-portugal) é o mais adequado.",
      },
    ],
    faq: [
      {
        pergunta: "Quanto custa enviar uma palete em Portugal?",
        resposta:
          "Em grupagem, uma palete nacional custa tipicamente entre 40 € e 90 €, consoante o peso, a altura e a urgência — os operadores anunciam a partir de cerca de 40 € no serviço económico, com entrega em 24 a 72 horas. Numa viagem dedicada, em que a viatura vai direta ao destino no próprio dia, os valores começam em cerca de 19 € dentro do mesmo concelho e sobem com a distância: cerca de 75 € até 100 km e 210 € até 250 km.",
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
          "Um euro poupado por envio deixa de compensar à primeira encomenda perdida, ao primeiro cliente que não repete a compra, ou às horas que a sua equipa passa a responder a «onde está a minha encomenda?». Se está a comparar propostas, os [sete critérios que separam uma boa transportadora de uma barata](/guias/escolher-transportadora-loja-online) ajudam a decidir com cabeça.",
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
    faq: [
      {
        pergunta:
          "O que devo perguntar antes de contratar uma transportadora?",
        resposta:
          "Peça a taxa de entregas no prazo nas suas três zonas mais frequentes (não a média nacional), a hora limite de recolha, o preço final com todas as taxas incluídas, o custo de uma segunda tentativa de entrega, e o prazo de resolução de uma reclamação. Se alguma destas respostas for vaga, é sinal de alerta.",
      },
      {
        pergunta: "Devo escolher a transportadora mais barata?",
        resposta:
          "Não sem olhar ao resto. Um euro poupado por envio deixa de compensar à primeira encomenda perdida ou ao primeiro cliente que não repete a compra. Para o consumidor, quem entrega é a sua loja — se a entrega corre mal, é a sua marca que leva a culpa, não a transportadora.",
      },
      {
        pergunta: "Como testo uma transportadora sem arriscar a operação?",
        resposta:
          "Faça uma lista curta de dois ou três operadores, teste com um lote pequeno durante duas a três semanas e meça três indicadores: entregas no prazo, tempo de resposta do apoio ao cliente e número de contactos que recebe sobre entregas. Só depois negoceie volume, já com dados na mão.",
      },
      {
        pergunta: "A transportadora precisa de integrar com a minha loja online?",
        resposta:
          "Se copia moradas à mão todos os dias, está a pagar em tempo o que julgava poupar em portes — e a introduzir erros. Confirme se existe integração com a sua plataforma ou, no mínimo, importação de ficheiro com as encomendas do dia.",
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
          "É precisamente esse o serviço que fazemos: distribuição final integrada com a sua loja, com notificações ao cliente em cada etapa e prova de receção imediata. Se ainda está a decidir com quem trabalhar, veja [o que perguntar antes de contratar](/guias/escolher-transportadora-loja-online) — e [quanto deve custar](/guias/quanto-custa-entrega-expressa-portugal).",
      },
    ],
    faq: [
      {
        pergunta: "O que significa last-mile?",
        resposta:
          "Last-mile, ou última milha, é o troço final da viagem de uma encomenda: do último ponto de distribuição até à porta do cliente. É o troço mais curto em quilómetros, mas aquele onde se concentra a maior parte do custo e toda a perceção que o cliente fica da marca.",
      },
      {
        pergunta: "Porque é que a última milha é a parte mais cara?",
        resposta:
          "Porque troca uma viagem longa com mil volumes por centenas de paragens curtas com um volume em cada. Somam-se tempos de estacionamento, prédios sem elevador, clientes ausentes e segundas tentativas. Estima-se que represente mais de metade do custo total de transporte de uma encomenda.",
      },
      {
        pergunta: "Como reduzo as entregas falhadas?",
        resposta:
          "A taxa de entregas à primeira tentativa é o indicador com maior retorno. Avisar o cliente na véspera e no dia, com uma janela horária realista, reduz drasticamente as ausências. Ter alternativas — entregar a um vizinho, deixar em ponto de recolha, reagendar num clique — resolve a maioria dos casos restantes.",
      },
      {
        pergunta: "Compensa fazer as entregas com frota própria?",
        resposta:
          "Só a partir de um volume que poucas lojas atingem. A frota própria exige investimento em viaturas e equipa, tem custo por entrega alto sem escala e pouca flexibilidade em picos de procura. Para a maioria das lojas online e PMEs, um parceiro logístico é a opção mais racional até o volume justificar o contrário.",
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
