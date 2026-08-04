// Conteúdo do site — espelha os dados do design original (renderVals do DCLogic)

export type Tone = "accent" | "blue";

export interface Servico {
  titulo: string;
  texto: string;
  tone: Tone;
  icon: string;
  img: string;
  imgAlt: string;
}

export const servicos: Servico[] = [
  {
    titulo: "Entregas expressas urbanas",
    texto:
      "Recolha e entrega no próprio dia dentro das principais cidades, com estafetas dedicados.",
    tone: "accent",
    icon: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
    img: "/assets/prontogo-servico-expresso.webp",
    imgAlt: "Carrinha de entregas a circular numa rua histórica portuguesa",
  },
  {
    titulo: "Last-mile para e-commerce",
    texto:
      "Distribuição final integrada com a sua loja online, com notificações ao cliente em cada etapa.",
    tone: "blue",
    icon: '<path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"/><path d="m3 8 2.4-4.2A2 2 0 0 1 7.1 3h9.8a2 2 0 0 1 1.7.8L21 8"/><path d="M3 8h18"/><path d="M9 12h6"/>',
    img: "/assets/prontogo-servico-lastmile.webp",
    imgAlt: "Estafeta a entregar uma encomenda à porta de casa da cliente",
  },
  {
    titulo: "Transporte de mercadorias",
    texto:
      "Volumes e cargas até 640 kg entre armazéns, lojas e clientes finais — o que não cabe numa encomenda normal.",
    tone: "blue",
    icon: '<path d="M14 17h-9V5h9v12z"/><path d="M14 8h4l3 4v5h-7V8z"/><circle cx="7.5" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>',
    img: "/assets/prontogo-servico-mercadorias.webp",
    imgAlt: "Empilhador a carregar paletes de mercadoria num camião",
  },
  {
    titulo: "Logística para PMEs",
    texto:
      "Planos regulares e flexíveis para pequenas e médias empresas, sem mínimos exagerados.",
    tone: "accent",
    icon: '<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/><path d="M9 10h.01M15 10h.01"/>',
    img: "/assets/prontogo-servico-pmes.webp",
    imgAlt: "Lojista a entregar encomendas da sua loja a um estafeta",
  },
];

export interface Passo {
  num: string;
  titulo: string;
  texto: string;
  img: string;
}

export const passos: Passo[] = [
  {
    num: "1",
    titulo: "Solicite",
    texto:
      "Peça o serviço online ou por telefone. Confirmamos preço e janela de recolha em minutos.",
    img: "/assets/prontogo-passo-solicite.webp",
  },
  {
    num: "2",
    titulo: "Recolhemos",
    texto:
      "Um estafeta ProntoGo recolhe a encomenda no local e hora combinados, com registo digital.",
    img: "/assets/prontogo-passo-recolhemos.webp",
  },
  {
    num: "3",
    titulo: "Entregamos",
    texto:
      "Acompanhe o percurso em tempo real até à entrega, com prova de receção imediata.",
    img: "/assets/prontogo-passo-entregamos.webp",
  },
];

export interface Diferencial {
  titulo: string;
  texto: string;
  icon: string;
}

// Capacidade operacional — o que a operação faz. As promessas de
// atendimento vivem em `compromissos` e o percurso da empresa em About,
// para não repetir a mesma ideia em três secções.
export const diferenciais: Diferencial[] = [
  {
    titulo: "Rapidez real",
    texto: "Rotas otimizadas por tecnologia própria e recolhas no próprio dia.",
    icon: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  },
  {
    titulo: "Rastreamento em tempo real",
    texto: "Saiba onde está cada encomenda, do armazém à porta do cliente.",
    icon: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  },
  {
    titulo: "Cobertura nacional",
    texto: "De Aveiro para todo o território — continente, de norte a sul.",
    icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  },
  {
    titulo: "Do envelope à palete",
    texto: "Documentos, encomendas ou cargas paletizadas — a mesma operação.",
    icon: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  },
];

export interface Numero {
  valor: string;
  legenda: string;
}

// Apenas factos e promessas de serviço verificáveis — nada de estatísticas
// que a empresa ainda não pode provar.
export const numeros: Numero[] = [
  { valor: "24h", legenda: "serviço expresso em todo o continente" },
  { valor: "Mesmo dia", legenda: "recolha e entrega nas principais cidades" },
  { valor: "100%", legenda: "das encomendas com rastreio e prova de receção" },
  { valor: "Sem mínimos", legenda: "planos à medida do volume de cada negócio" },
];

// Compromissos de serviço — promessas que a empresa consegue cumprir desde
// o primeiro dia. Quando houver clientes reais dispostos a dar testemunho,
// esta secção pode voltar a ser de depoimentos.
export interface Compromisso {
  titulo: string;
  texto: string;
  img: string;
  imgAlt: string;
}

export const compromissos: Compromisso[] = [
  {
    titulo: "Resposta em menos de 24 horas úteis",
    texto:
      "Cada pedido de orçamento é analisado e respondido por uma pessoa, com uma proposta concreta — não por um autoresponder.",
    img: "/assets/prontogo-compromisso-resposta.webp",
    imgAlt: "Responsável da ProntoGo a responder a um pedido de orçamento",
  },
  {
    titulo: "Sem surpresas no preço",
    texto:
      "O valor que acordamos é o valor que fatura. Sobretaxas e condições ficam claras antes de fechar — não depois.",
    img: "/assets/prontogo-compromisso-preco.webp",
    imgAlt: "Aperto de mão entre a ProntoGo e um lojista ao balcão",
  },
  {
    titulo: "Fala sempre com quem resolve",
    texto:
      "Somos uma equipa próxima: quem atende conhece a sua operação e decide na hora, sem tickets nem centrais de atendimento.",
    img: "/assets/prontogo-compromisso-contacto.webp",
    imgAlt: "Estafeta da ProntoGo ao telefone junto à carrinha",
  },
];

export const tiposServico = [
  "Entregas expressas urbanas",
  "Last-mile para e-commerce",
  "Transporte de mercadorias",
  "Logística para PMEs",
  "Outro",
];

// Campos de qualificação do formulário. São opcionais de propósito: cada
// campo obrigatório a mais reduz a taxa de submissão, mas respondidos
// permitem enviar uma proposta em vez de mais perguntas.
export const volumesEnvio = [
  "Ainda não sei",
  "Até 20 envios por mês",
  "20 a 100 por mês",
  "100 a 500 por mês",
  "Mais de 500 por mês",
  "Envio pontual",
];

export const zonasEntrega = [
  "Aveiro e arredores",
  "Norte",
  "Centro",
  "Lisboa e Vale do Tejo",
  "Sul",
  "Todo o continente",
];

// Preencher com as URLs reais para cada rede aparecer no rodapé.
// Redes com URL vazia ficam ocultas (evita links mortos em produção).
export const redesSociais = {
  linkedin: "",
  instagram: "",
  facebook: "",
};

// FAQ — alimenta a secção da página e o schema FAQPage (SEO/AEO).
// Respostas curtas e factuais: é este o texto que os motores de resposta
// (Google AI Overviews, ChatGPT, Perplexity) tendem a citar.
export interface PerguntaFrequente {
  pergunta: string;
  resposta: string;
}

export const perguntasFrequentes: PerguntaFrequente[] = [
  {
    pergunta: "Em que zonas é que a ProntoGo faz entregas?",
    resposta:
      "A ProntoGo tem sede em Aveiro e entrega em todo Portugal continental. Nas principais cidades fazemos entregas expressas urbanas com recolha e entrega no próprio dia; para o resto do país temos serviço expresso em 24 horas.",
  },
  {
    pergunta: "Quanto tempo demora uma entrega expressa?",
    resposta:
      "Dentro das principais cidades, a recolha e a entrega acontecem no próprio dia. Para o restante território continental, o serviço expresso entrega em 24 horas úteis, com rastreamento em tempo real do início ao fim.",
  },
  {
    pergunta: "Como peço um orçamento?",
    resposta:
      "Pode pedir orçamento através do formulário do site, por telefone ou por email para geral@prontogo.pt. A nossa equipa responde em menos de 24 horas úteis com uma proposta à medida da sua operação.",
  },
  {
    pergunta: "Fazem integração com lojas online?",
    resposta:
      "Sim. O serviço de last-mile para e-commerce integra-se com a sua loja online e envia notificações ao cliente final em cada etapa da entrega, do armazém à porta.",
  },
  {
    pergunta: "Que tipos de mercadoria transportam?",
    resposta:
      "Desde documentos e encomendas de e-commerce até volumes de maior dimensão e cargas até 640 kg, entre armazéns, lojas e clientes finais. Para cargas acima desse peso ou paletizadas, fale connosco: encaminhamos ou articulamos com parceiros.",
  },
  {
    pergunta: "Posso acompanhar a minha encomenda em tempo real?",
    resposta:
      "Sim. Todas as encomendas ProntoGo têm rastreamento em tempo real, do momento da recolha até à entrega, com prova de receção imediata.",
  },
  {
    pergunta: "Trabalham com pequenas e médias empresas?",
    resposta:
      "Sim, é uma das nossas especialidades: planos regulares e flexíveis para PMEs, sem mínimos exagerados, e um gestor dedicado que conhece a sua operação.",
  },
];
