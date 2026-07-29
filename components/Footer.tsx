import Image from "next/image";
import Link from "next/link";
import { redesSociais } from "@/lib/content";
import {
  contactoEmail,
  contactoTelefone,
  contactoTelefoneDisplay,
  contactoWhatsapp,
} from "@/lib/site";

const socialIcons: Record<keyof typeof redesSociais, { label: string; svg: React.ReactNode }> = {
  linkedin: {
    label: "LinkedIn",
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14.8H.2V8zm7.6 0h4.4v2h.06c.61-1.16 2.1-2.38 4.33-2.38 4.63 0 5.48 3.05 5.48 7.02v8.16h-4.6v-7.23c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.77 1.88-2.77 3.82v7.35H7.8V8z" />
      </svg>
    ),
  },
  instagram: {
    label: "Instagram",
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.8" cy="6.2" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  facebook: {
    label: "Facebook",
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
};

export default function Footer() {
  const redesAtivas = (
    Object.entries(redesSociais) as [keyof typeof redesSociais, string][]
  ).filter(([, url]) => url.trim() !== "");

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <Image
                src="/assets/prontogo-icone-dark.svg"
                alt="ProntoGo"
                width={52}
                height={52}
              />
              <span className="footer-brand-word">
                Pronto<span className="brand-go">Go</span>
              </span>
            </div>
            <p className="footer-tagline">
              Logística inteligente. Entregas que conectam. Aveiro, Portugal.
            </p>
          </div>
          <div>
            <div className="footer-title">Navegação</div>
            <div className="footer-links">
              <a href="/#servicos">Serviços</a>
              <a href="/#como-funciona">Como funciona</a>
              <a href="/#diferenciais">Diferenciais</a>
              <a href="/#sobre">Sobre</a>
              <a href="/#faq">Perguntas frequentes</a>
              <a href="/#contacto">Contacto</a>
            </div>
          </div>
          <div>
            <div className="footer-title">Contactos</div>
            <div className="footer-links">
              {contactoTelefone && (
                <a href={`tel:${contactoTelefone}`}>{contactoTelefoneDisplay}</a>
              )}
              {contactoWhatsapp && (
                <a
                  href={contactoWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              )}
              {contactoEmail && (
                <a href={`mailto:${contactoEmail}`}>{contactoEmail}</a>
              )}
              <span>Aveiro · Portugal</span>
            </div>
          </div>
          {redesAtivas.length > 0 && (
            <div>
              <div className="footer-title">Siga-nos</div>
              <div className="socials">
                {redesAtivas.map(([rede, url]) => (
                  <a
                    key={rede}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialIcons[rede].label}
                  >
                    {socialIcons[rede].svg}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ProntoGo. Todos os direitos reservados.</span>
          <div className="footer-legal">
            <Link href="/privacidade">Política de Privacidade</Link>
            {/* Link obrigatório para empresas em Portugal (DL 156/2005) */}
            <a
              href="https://www.livroreclamacoes.pt/inicio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Livro de Reclamações
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
