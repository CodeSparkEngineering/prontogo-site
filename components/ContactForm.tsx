"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { tiposServico, volumesEnvio, zonasEntrega } from "@/lib/content";
import { contactoEmail, contactoWhatsapp } from "@/lib/site";
import { EVENTO_SIMULACAO } from "@/components/Simulador";

type Estado = "inicial" | "enviando" | "erro";

export default function ContactForm() {
  const [estado, setEstado] = useState<Estado>("inicial");
  const [mensagemInicial, setMensagemInicial] = useState("");
  const [destacado, setDestacado] = useState(false);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const servicoRef = useRef<HTMLSelectElement>(null);

  // O simulador de preços e os cartões de serviços avisam quando o visitante
  // escolhe um serviço, para chegar aqui com a mensagem já escrita e o tipo
  // de serviço pré-selecionado. O destaque temporário confirma visualmente
  // que o preenchimento aconteceu.
  useEffect(() => {
    function onSimulacao(e: Event) {
      const { mensagem, servico } = (
        e as CustomEvent<{ mensagem: string; servico?: string }>
      ).detail;
      setEstado("inicial");
      setMensagemInicial(mensagem);
      if (msgRef.current) msgRef.current.value = mensagem;
      if (servicoRef.current && servico && tiposServico.includes(servico)) {
        servicoRef.current.value = servico;
      }
      setDestacado(true);
      window.setTimeout(() => setDestacado(false), 2400);
    }
    window.addEventListener(EVENTO_SIMULACAO, onSimulacao);
    return () => window.removeEventListener(EVENTO_SIMULACAO, onSimulacao);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const dados = new FormData(form);
    setEstado("enviando");

    try {
      const resposta = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: dados.get("nome"),
          email: dados.get("email"),
          telefone: dados.get("telefone"),
          servico: dados.get("servico"),
          volume: dados.get("volume"),
          zona: dados.get("zona"),
          mensagem: dados.get("mensagem"),
          empresa: dados.get("empresa"),
        }),
      });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      form.reset();
      window.location.href = "/pedido-enviado";
    } catch {
      setEstado("erro");
    }
  }

  return (
    <form
      className={`form-card modern-form-card${destacado ? " preenchido" : ""}`}
      onSubmit={handleSubmit}
    >
      {/* Form Header */}
      <div className="form-card-header">
        <div className="form-header-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
          </svg>
          <span>Formulário de Cotação</span>
        </div>
        <h3 className="form-card-title">Detalhes do seu envio</h3>
        <p className="form-card-desc">
          Preencha os campos abaixo para receber a proposta por email ou telefone.
        </p>
      </div>

      {/* Alerta quando dados são importados da simulação */}
      {destacado && (
        <div className="form-sim-alert" role="status">
          <span className="form-sim-dot" />
          <span>Dados do simulador importados com sucesso!</span>
        </div>
      )}

      {/* Linha 1: Nome e Email */}
      <div className="form-row">
        <label className="form-field-group">
          <span className="form-field-label">Nome completo *</span>
          <div className="form-input-wrapper">
            <svg className="form-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              required
              name="nome"
              type="text"
              placeholder="O seu nome ou da empresa"
              autoComplete="name"
            />
          </div>
        </label>

        <label className="form-field-group">
          <span className="form-field-label">Email de contacto *</span>
          <div className="form-input-wrapper">
            <svg className="form-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 6L2 7" />
            </svg>
            <input
              required
              name="email"
              type="email"
              placeholder="nome@empresa.pt"
              autoComplete="email"
            />
          </div>
        </label>
      </div>

      {/* Linha 2: Telefone e Tipo de Serviço */}
      <div className="form-row">
        <label className="form-field-group">
          <span className="form-field-label">
            Telefone <span className="form-opt">(opcional)</span>
          </span>
          <div className="form-input-wrapper">
            <svg className="form-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z" />
            </svg>
            <input
              name="telefone"
              type="tel"
              placeholder="912 345 678"
              autoComplete="tel"
            />
          </div>
        </label>

        <label className="form-field-group">
          <span className="form-field-label">Tipo de serviço *</span>
          <div className="form-input-wrapper">
            <svg className="form-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 17h-9V5h9v12z" />
              <path d="M14 8h4l3 4v5h-7V8z" />
              <circle cx="7.5" cy="17.5" r="2" />
              <circle cx="17.5" cy="17.5" r="2" />
            </svg>
            <select name="servico" ref={servicoRef}>
              {tiposServico.map((tipo) => (
                <option key={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
        </label>
      </div>

      {/* Linha 3: Volume e Zona */}
      <div className="form-row">
        <label className="form-field-group">
          <span className="form-field-label">
            Volume estimado <span className="form-opt">(opcional)</span>
          </span>
          <div className="form-input-wrapper">
            <svg className="form-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
            <select name="volume" defaultValue="">
              <option value="">Selecione o volume…</option>
              {volumesEnvio.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
        </label>

        <label className="form-field-group">
          <span className="form-field-label">
            Zona de entrega <span className="form-opt">(opcional)</span>
          </span>
          <div className="form-input-wrapper">
            <svg className="form-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <select name="zona" defaultValue="">
              <option value="">Selecione o destino…</option>
              {zonasEntrega.map((z) => (
                <option key={z}>{z}</option>
              ))}
            </select>
          </div>
        </label>
      </div>

      {/* Linha 4: Mensagem */}
      <label className="form-field-group">
        <span className="form-field-label">O que precisa de enviar? *</span>
        <textarea
          required
          ref={msgRef}
          name="mensagem"
          rows={4}
          defaultValue={mensagemInicial}
          placeholder="Descreva mercadoria, locais de recolha e entrega, datas ou requisitos específicos…"
        />
      </label>

      {/* Honeypot anti-spam */}
      <label className="hp-field" aria-hidden="true">
        Empresa
        <input name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      {/* Erro */}
      {estado === "erro" && (
        <div className="form-error" role="alert">
          <p>
            Não foi possível enviar o pedido. Tente novamente — ou fale
            connosco agora por outra via:
          </p>
          <div className="form-error-vias">
            {contactoWhatsapp && (
              <a
                href={contactoWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="form-via form-via-wa"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23z" />
                </svg>
                WhatsApp
              </a>
            )}
            {contactoEmail && (
              <a href={`mailto:${contactoEmail}`} className="form-via">
                {contactoEmail}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Botão de Envio com Ícone e Loading State */}
      <button
        type="submit"
        className="btn-submit btn-submit-modern"
        disabled={estado === "enviando"}
      >
        {estado === "enviando" ? (
          <>
            <span className="btn-spinner" />
            <span>A processar pedido de cotação…</span>
          </>
        ) : (
          <>
            <span>Enviar pedido de orçamento gratuito</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>

      {/* Trust & Privacy Guarantee */}
      <div className="form-footer-guarantee">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <p className="form-consent">
          Sem compromisso. Ao enviar, concorda com os termos da{" "}
          <a href="/privacidade">Política de Privacidade</a>.
        </p>
      </div>
    </form>
  );
}
