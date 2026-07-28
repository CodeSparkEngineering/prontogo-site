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
      "Cargas paletizadas e volumes de maior dimensão entre armazéns, lojas e clientes finais.",
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
    titulo: "Atendimento personalizado",
    texto: "Um gestor dedicado que conhece a sua operação pelo nome.",
    icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  },
];

export interface Numero {
  valor: string;
  legenda: string;
}

export const numeros: Numero[] = [
  { valor: "98%", legenda: "de entregas no prazo" },
  { valor: "+120", legenda: "empresas parceiras" },
  { valor: "24h", legenda: "expresso em todo o país" },
  { valor: "4.9★", legenda: "satisfação média dos clientes" },
];

export interface Depoimento {
  iniciais: string;
  nome: string;
  cargo: string;
  texto: string;
}

export const depoimentos: Depoimento[] = [
  {
    iniciais: "MS",
    nome: "Marta Silveira",
    cargo: "Loja online de cerâmica · Ílhavo",
    texto:
      "Desde que passámos o last-mile para a ProntoGo, as reclamações por atrasos praticamente desapareceram. Os clientes adoram as notificações.",
  },
  {
    iniciais: "RC",
    nome: "Rui Carvalho",
    cargo: "Diretor de operações · PME industrial, Águeda",
    texto:
      "Flexibilidade que não encontrámos em operadores maiores. Ajustam as recolhas ao nosso ritmo de produção sem burocracia.",
  },
  {
    iniciais: "AF",
    nome: "Ana Ferreira",
    cargo: "Farmácia · Aveiro",
    texto:
      "Entregas urbanas no próprio dia, sempre com o mesmo cuidado. É raro encontrar este nível de atendimento personalizado.",
  },
];

export const tiposServico = [
  "Entregas expressas urbanas",
  "Last-mile para e-commerce",
  "Transporte de mercadorias",
  "Logística para PMEs",
  "Outro",
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
      "Dentro das principais cidades, a recolha e a entrega acontecem no próprio dia. Para o restante território continental, o serviço expresso entrega em 24 horas, com 98% das entregas a chegar dentro do prazo.",
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
      "Desde encomendas urbanas e volumes de e-commerce até cargas paletizadas e volumes de maior dimensão entre armazéns, lojas e clientes finais.",
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
