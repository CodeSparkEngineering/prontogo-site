import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { contactoEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a ProntoGo recolhe, utiliza e protege os dados pessoais dos visitantes do site, em conformidade com o RGPD.",
  // Sem isto herdaria o canonical "/" do layout, dizendo ao Google que
  // esta página é a homepage
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <div className="container legal-content">
          <div className="kicker">Legal</div>
          <h1>Política de Privacidade</h1>
          <p className="legal-intro">
            Esta política explica que dados pessoais a ProntoGo recolhe através
            de <strong>prontogo.pt</strong>, para que os utiliza e quais os seus
            direitos, ao abrigo do Regulamento Geral sobre a Proteção de Dados
            (RGPD).
          </p>

          <h2>Quem é o responsável pelo tratamento</h2>
          <p>
            A ProntoGo, sediada em Aveiro, Portugal, é a entidade responsável
            pelo tratamento dos dados recolhidos neste site.
            {contactoEmail ? (
              <>
                {" "}
                Para qualquer questão sobre privacidade, contacte{" "}
                <a href={`mailto:${contactoEmail}`}>{contactoEmail}</a>.
              </>
            ) : null}
          </p>

          <h2>Que dados recolhemos</h2>
          <p>
            Recolhemos apenas os dados que nos fornece voluntariamente no
            formulário de pedido de orçamento:
          </p>
          <ul>
            <li>Nome</li>
            <li>Endereço de email</li>
            <li>Tipo de serviço pretendido</li>
            <li>Mensagem que escrever</li>
          </ul>
          <p>
            Se preferir contactar-nos por WhatsApp ou email, aplicam-se as
            políticas de privacidade dessas plataformas para o transporte da
            mensagem, além desta.
          </p>

          <h2>Para que utilizamos os dados</h2>
          <p>
            Exclusivamente para responder ao seu pedido e, se avançar, para gerir
            a relação comercial. Não vendemos, alugamos nem partilhamos os seus
            dados com terceiros para fins de marketing, e não lhe enviamos
            comunicações promocionais que não tenha pedido.
          </p>
          <p>
            A base legal é o seu consentimento ao submeter o formulário e o
            interesse legítimo em responder a um contacto comercial.
          </p>

          <h2>Quem processa os dados por nós</h2>
          <p>
            Recorremos a prestadores de serviço que atuam como subcontratantes:
          </p>
          <ul>
            <li>
              <strong>Vercel</strong> — alojamento do site e registos técnicos de
              acesso.
            </li>
            <li>
              <strong>Resend</strong> — entrega do email gerado pelo formulário.
            </li>
            <li>
              <strong>Google Workspace</strong> — receção e arquivo do email.
            </li>
          </ul>

          <h2>Cookies e análise de tráfego</h2>
          <p>
            Este site <strong>não utiliza cookies de rastreamento</strong>, nem
            ferramentas de publicidade ou de análise de comportamento. Por esse
            motivo não apresentamos banner de consentimento de cookies.
          </p>

          <h2>Durante quanto tempo guardamos</h2>
          <p>
            Os pedidos de orçamento são conservados enquanto forem necessários
            para responder e para efeitos de histórico comercial. Pode pedir a
            eliminação a qualquer momento.
          </p>

          <h2>Os seus direitos</h2>
          <p>
            Tem direito a aceder aos seus dados, corrigi-los, pedir a sua
            eliminação ou limitação, opor-se ao tratamento e solicitar a sua
            portabilidade. Para exercer qualquer destes direitos, escreva-nos
            {contactoEmail ? (
              <>
                {" "}
                para <a href={`mailto:${contactoEmail}`}>{contactoEmail}</a>
              </>
            ) : null}
            . Tem também o direito de apresentar reclamação junto da Comissão
            Nacional de Proteção de Dados (CNPD).
          </p>

          <h2>Alterações a esta política</h2>
          <p>
            Podemos atualizar esta política sempre que necessário. A versão em
            vigor é sempre a publicada nesta página.
          </p>

          <Link href="/" className="btn btn-primary legal-voltar">
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
