import Image from "next/image";
import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import PalavraMarca from "@/components/home/PalavraMarca";
import { redesSociais } from "@/lib/content";
import {
  contactoEmail,
  contactoTelefone,
  contactoTelefoneDisplay,
  contactoWhatsapp,
} from "@/lib/site";

const nomesRedes: Record<keyof typeof redesSociais, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
};

export default function Footer() {
  const redesAtivas = (
    Object.entries(redesSociais) as [keyof typeof redesSociais, string][]
  ).filter(([, url]) => url.trim() !== "");

  return (
    <footer className="rp">
      <div className="h-wrap">
        <div className="rp-grelha">
          <div className="rp-marca">
            <p className="rp-frase">
              Quem recolhe <span className="h-serif h-enfase">é quem entrega.</span>
            </p>
            {/* O selo TEM de vir do servidor da Zaask: é esse pedido que
                dispara a verificação do perfil. Servi-lo de /assets deixava
                a validação pendente. Por isso o www.zaask.pt está no img-src
                da CSP, em next.config.ts. */}
            <a
              className="rp-selo"
              href="https://www.zaask.pt/user/prontogo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://www.zaask.pt/widget?user=1075679&widget=pro-since"
                alt="ProntoGo, profissional verificado no Zaask — ver perfil"
                width={72}
                height={72}
              />
            </a>
          </div>

          <nav className="rp-col" aria-label="Rodapé">
            <p className="rp-titulo">Navegação</p>
            <a href="/#servicos">Serviços</a>
            <a href="/#como-funciona">Como funciona</a>
            <a href="/#cobertura">Cobertura</a>
            <a href="/#precos">Orçamento</a>
            <a href="/#sobre">Sobre</a>
            <Link href="/guias">Guias</Link>
            <a href="/#faq">Perguntas frequentes</a>
          </nav>

          <div className="rp-col">
            <p className="rp-titulo">Contactos</p>
            {contactoWhatsapp && (
              <a href={contactoWhatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            )}
            {contactoTelefone && (
              <a href={`tel:${contactoTelefone}`}>{contactoTelefoneDisplay}</a>
            )}
            {contactoEmail && <a href={`mailto:${contactoEmail}`}>{contactoEmail}</a>}
            <span>Aveiro · Portugal</span>
            <span>Seg – Sex · 08:00 – 19:00</span>
          </div>

          {redesAtivas.length > 0 && (
            <div className="rp-col">
              <p className="rp-titulo">Siga-nos</p>
              {redesAtivas.map(([rede, url]) => (
                <a key={rede} href={url} target="_blank" rel="noopener noreferrer">
                  {nomesRedes[rede]}
                </a>
              ))}
            </div>
          )}
        </div>

        <PalavraMarca />

        <div className="rp-base">
          <span>
            © {new Date().getFullYear()} ProntoGo · Site por{" "}
            <a
              href="https://www.codesparkengineering.com/pt"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodeSpark Engineering
            </a>
          </span>
          <div className="rp-legal">
            <Link href="/privacidade">Política de Privacidade</Link>
            <CookieSettingsLink />
            {/* Selo obrigatório para empresas em Portugal (DL 156/2005) */}
            <a
              href="https://www.livroreclamacoes.pt/inicio"
              target="_blank"
              rel="noopener noreferrer"
              className="selo-livro"
              aria-label="Livro de Reclamações Eletrónico (abre em nova janela)"
            >
              <Image
                src="/assets/livro-reclamacoes.png"
                alt="Livro de Reclamações"
                width={420}
                height={166}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
