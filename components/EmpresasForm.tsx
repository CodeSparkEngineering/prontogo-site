"use client";

import { useState, type FormEvent } from "react";
import {
  tiposServico,
  volumesEnvio,
  zonasEntrega,
  frequenciasEnvio,
} from "@/lib/content";
import { contactoEmail, whatsappLink } from "@/lib/site";

type Estado = "inicial" | "enviando";

// Formulário da landing /empresas (destino dos anúncios). O pedido segue por
// duas vias: abre o WhatsApp com a mensagem já escrita — é aí que a equipa
// responde mais depressa — e envia uma cópia por email, para o pedido não se
// perder se o visitante fechar o WhatsApp sem carregar em enviar.
export default function EmpresasForm() {
  const [estado, setEstado] = useState<Estado>("inicial");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    const campo = (nome: string) => String(dados.get(nome) ?? "").trim();
    const observacoes = campo("mensagem");

    // Bot preencheu o honeypot: não abre o WhatsApp; a API descarta o pedido.
    if (!campo("empresa")) {
      const linhas = [
        "Olá! Vim da página Empresas do site e queria uma proposta.",
        `Empresa: ${campo("nomeEmpresa")}`,
        `Nome: ${campo("nome")}`,
        `Serviço: ${campo("servico")}`,
        campo("volume") && `Volume: ${campo("volume")}`,
        campo("frequencia") && `Frequência: ${campo("frequencia")}`,
        campo("zona") && `Zona de entrega: ${campo("zona")}`,
        observacoes && `Observações: ${observacoes}`,
      ].filter(Boolean);
      // Tem de abrir dentro do gesto do clique — depois de um await o browser
      // trata a janela como pop-up e bloqueia-a.
      window.open(whatsappLink(linhas.join("\n")), "_blank", "noopener");
    }

    setEstado("enviando");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // keepalive: em telemóvel o WhatsApp tira a página de primeiro plano
        keepalive: true,
        body: JSON.stringify({
          nomeEmpresa: campo("nomeEmpresa"),
          nome: campo("nome"),
          email: campo("email"),
          telefone: campo("telefone"),
          servico: campo("servico"),
          volume: campo("volume"),
          frequencia: campo("frequencia"),
          zona: campo("zona"),
          mensagem: observacoes || "Pedido feito na página /empresas, sem observações.",
          empresa: campo("empresa"),
        }),
      });
    } catch {
      // O pedido já seguiu pelo WhatsApp; a cópia por email é só reserva.
    }
    window.location.href = "/pedido-enviado";
  }

  return (
    <form id="pedido" className="form-card modern-form-card" onSubmit={handleSubmit}>
      <div className="form-card-header">
        <div className="form-header-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
          </svg>
          <span>Proposta para empresas</span>
        </div>
        <h2 className="form-card-title">Conte-nos a sua operação</h2>
        <p className="form-card-desc">
          Um minuto a preencher. Respondemos com um valor fechado, por escrito.
        </p>
      </div>

      <div className="form-row">
        <label className="form-field-group">
          <span className="form-field-label">Empresa *</span>
          <input
            required
            name="nomeEmpresa"
            type="text"
            placeholder="Nome da empresa"
            autoComplete="organization"
          />
        </label>
        <label className="form-field-group">
          <span className="form-field-label">O seu nome *</span>
          <input
            required
            name="nome"
            type="text"
            placeholder="Com quem falamos"
            autoComplete="name"
          />
        </label>
      </div>

      <div className="form-row">
        <label className="form-field-group">
          <span className="form-field-label">Email *</span>
          <input
            required
            name="email"
            type="email"
            placeholder="nome@empresa.pt"
            autoComplete="email"
          />
        </label>
        <label className="form-field-group">
          <span className="form-field-label">Telefone *</span>
          <input
            required
            name="telefone"
            type="tel"
            placeholder="912 345 678"
            autoComplete="tel"
          />
        </label>
      </div>

      <div className="form-row">
        <label className="form-field-group">
          <span className="form-field-label">Tipo de serviço *</span>
          <select name="servico">
            {tiposServico.map((tipo) => (
              <option key={tipo}>{tipo}</option>
            ))}
          </select>
        </label>
        <label className="form-field-group">
          <span className="form-field-label">
            Volume por mês <span className="form-opt">(opcional)</span>
          </span>
          <select name="volume" defaultValue="">
            <option value="">Selecione o volume…</option>
            {volumesEnvio.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label className="form-field-group">
          <span className="form-field-label">
            Frequência <span className="form-opt">(opcional)</span>
          </span>
          <select name="frequencia" defaultValue="">
            <option value="">Selecione a frequência…</option>
            {frequenciasEnvio.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <label className="form-field-group">
          <span className="form-field-label">
            Zona de entrega <span className="form-opt">(opcional)</span>
          </span>
          <select name="zona" defaultValue="">
            <option value="">Selecione o destino…</option>
            {zonasEntrega.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="form-field-group">
        <span className="form-field-label">
          Observações <span className="form-opt">(opcional)</span>
        </span>
        <textarea
          name="mensagem"
          rows={3}
          maxLength={1000}
          placeholder="O que transporta, moradas de recolha e entrega, horários…"
        />
      </label>

      {/* Honeypot anti-spam */}
      <label className="hp-field" aria-hidden="true">
        Empresa
        <input name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        className="btn-submit btn-submit--wa"
        disabled={estado === "enviando"}
      >
        {estado === "enviando" ? (
          <>
            <span className="btn-spinner" />
            <span>A abrir o WhatsApp…</span>
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23z" />
            </svg>
            <span>Enviar pedido pelo WhatsApp</span>
          </>
        )}
      </button>
      <p className="lp-nota">
        Abre o WhatsApp com o pedido já escrito — basta carregar em enviar.
        {contactoEmail && " Fica também uma cópia no nosso email."}
      </p>

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
