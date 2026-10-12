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
    titulo: "Viagem dedicada",
    texto:
      "A carrinha vai só para si, à hora que marcar: recolhemos na sua empresa e entregamos diretamente no destino, sem paragens pelo caminho.",
    tone: "accent",
    icon: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
    img: "/assets/prontogo-servico-expresso.webp",
    imgAlt: "Carrinha de entregas a circular numa rua histórica portuguesa",
  },
  {
    titulo: "Mercadorias e paletes",
    texto:
      "Volumes, cargas e paletes entre armazéns, fornecedores e lojas, numa viagem só sua, sem transbordos.",
    tone: "blue",
    icon: '<path d="M14 17h-9V5h9v12z"/><path d="M14 8h4l3 4v5h-7V8z"/><circle cx="7.5" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>',
    img: "/assets/prontogo-servico-mercadorias.webp",
    imgAlt: "Empilhador a carregar paletes de mercadoria num camião",
  },
  {
    titulo: "Rota fixa contratada",
    texto:
      "O mesmo percurso, todos os dias úteis, com viatura e condutor afetos à sua operação. Contrato mensal, a partir de 20 operações por mês.",
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
      "Peça por WhatsApp, telefone ou pelo formulário. Confirmamos o orçamento e a janela de recolha em minutos.",
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
    texto: "Rotas planeadas ao detalhe e recolhas no próprio dia, sem esperas.",
    icon: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  },
  {
    titulo: "Rastreamento em tempo real",
    texto: "Saiba onde está cada envio, da recolha à entrega.",
    icon: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  },
  {
    titulo: "Cobertura nacional e europeia",
    texto:
      "De Aveiro para todo o continente e, com frota própria, para a Europa, a mesma carrinha faz a viagem toda, sem transbordos.",
    icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  },
  {
    titulo: "Do envelope à palete",
    texto:
      "Documentos, encomendas ou paletes, a mesma carrinha, a mesma operação.",
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
      "Cada pedido de orçamento é analisado e respondido por uma pessoa, com uma proposta concreta, não por um autoresponder.",
    img: "/assets/prontogo-compromisso-resposta.webp",
    imgAlt: "Responsável da ProntoGo a responder a um pedido de orçamento",
  },
  {
    titulo: "Orçamento fechado antes da recolha",
    texto:
      "O valor que acordamos é o valor que fatura. Sobretaxas e condições ficam claras antes de fechar, não depois.",
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
  "Viagem dedicada",
  "Rota fixa contratada",
  "Viagem dedicada para a Europa",
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

// Só o formulário de /empresas pergunta a frequência: é o que separa um
// envio pontual de uma rota regular.
export const frequenciasEnvio = [
  "Pontual",
  "Semanal",
  "Várias vezes por semana",
  "Todos os dias úteis",
];

export const zonasEntrega = [
  "Aveiro e arredores",
  "Norte",
  "Centro",
  "Lisboa e Vale do Tejo",
  "Sul",
  "Todo o continente",
  "Europa / internacional",
];

// Preencher com as URLs reais para cada rede aparecer no rodapé.
// Redes com URL vazia ficam ocultas (evita links mortos em produção).
export const redesSociais = {
  linkedin: "",
  instagram: "",
  facebook: "",
};

// App de rotas em desenvolvimento. É um projeto em curso, não um produto
// disponível — o texto tem de o deixar claro em qualquer alteração futura.
export interface CapacidadeApp {
  titulo: string;
  texto: string;
}

export const capacidadesApp: CapacidadeApp[] = [
  {
    titulo: "Rotas calculadas por IA",
    texto:
      "A ordem das paragens deixa de ser decidida no papel: o sistema pesa trânsito, janelas horárias e proximidade para propor o percurso mais curto do dia.",
  },
  {
    titulo: "Menos quilómetros, mesma carga",
    texto:
      "Menos tempo ao volante significa mais entregas por dia, menos combustível gasto e uma pegada menor por encomenda.",
  },
  {
    titulo: "Prova de entrega no telemóvel",
    texto:
      "Assinatura e fotografia no momento da entrega, associadas à encomenda, sem papel, sem dúvidas sobre quem recebeu.",
  },
  {
    titulo: "Horas de chegada mais fiáveis",
    texto:
      "Com a rota calculada, a janela horária que damos ao cliente deixa de ser um palpite e passa a ser uma estimativa a sério.",
  },
];

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
      "A ProntoGo faz entregas dedicadas para todo Portugal continental, sempre a partir da nossa base em Sangalhos (Anadia, distrito de Aveiro): na região de Aveiro, até 100 km (Porto, Coimbra, Viseu) e no resto do país. A carrinha vai exclusivamente para a sua carga, à hora marcada, sem paragens pelo caminho. Além do território nacional, fazemos também viagens para a Europa, com frota própria.",
  },
  {
    pergunta: "De onde partem as carrinhas?",
    resposta:
      "De Sangalhos, no concelho de Anadia (distrito de Aveiro). É daí que saímos para recolher a sua carga, onde quer que esteja, e levá-la ao local que indicar. Ainda não temos carrinhas noutras regiões do país, por isso todas as viagens começam em Sangalhos, e é a contar com esse percurso que combinamos a hora de recolha e fechamos o orçamento.",
  },
  {
    pergunta: "Fazem entregas para fora de Portugal?",
    resposta:
      "Sim. Fazemos entregas internacionais para a Europa com frota própria: a mesma carrinha ProntoGo faz a viagem completa até ao destino, sem transbordos nem passagem por centros de triagem. Transportamos cargas, paletes e volumes de empresas, com rastreamento de ponta a ponta. Cada viagem é orçamentada à medida do destino, peça-nos uma proposta.",
  },
  {
    pergunta: "O que é uma entrega dedicada?",
    resposta:
      "É uma viagem exclusiva: a carrinha leva só a sua carga, sai à hora que marcar e vai diretamente da recolha ao destino, sem paragens, transbordos nem centros de triagem. O tempo de entrega é o tempo da viagem, com rastreamento em tempo real do início ao fim.",
  },
  {
    pergunta: "Como é calculado o preço?",
    resposta:
      "Pela distância da viagem, não pelo peso da carga. Como a carrinha vai só para si, o que conta é o percurso: de Sangalhos até à recolha e daí até ao destino. Diga-nos de onde para onde e enviamos o valor fechado, por escrito, antes da recolha.",
  },
  {
    pergunta: "Como peço um orçamento?",
    resposta:
      "A forma mais rápida é por WhatsApp (+351 913 942 714): diga-nos o que precisa de enviar, de onde para onde e quando, e respondemos com o valor. Pode também usar o formulário do site, ligar-nos ou escrever para geral@prontogo.pt. Cada pedido é respondido por uma pessoa em menos de 24 horas úteis, com uma proposta à medida da sua operação.",
  },
  {
    pergunta: "Posso contratar uma rota fixa para a minha empresa?",
    resposta:
      "Sim. Na rota fixa contratada fazemos a recolha e a entrega no mesmo percurso, todos os dias úteis, com viatura e condutor afetos à sua operação. É um contrato mensal, a partir de 20 operações por mês, com o valor definido pelo percurso e pela frequência.",
  },
  {
    pergunta: "Que tipos de mercadoria transportam?",
    resposta:
      "Desde documentos e volumes pequenos até cargas e paletes, transportados na nossa própria carrinha entre armazéns, fornecedores, lojas e empresas clientes. Diga-nos o que precisa de levar e confirmamos se segue na carrinha.",
  },
  {
    pergunta: "Posso acompanhar a minha encomenda em tempo real?",
    resposta:
      "Sim. Todas as entregas ProntoGo têm rastreamento em tempo real, do momento da recolha até à entrega, com prova de receção imediata.",
  },
  {
    pergunta: "Trabalham com pequenas e médias empresas?",
    resposta:
      "Sim, é para elas que trabalhamos: viagens dedicadas avulsas, sem mínimos, e rotas fixas contratadas para quem envia com regularidade, sempre com alguém que conhece a sua operação.",
  },
];
