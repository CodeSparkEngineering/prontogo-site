"use client";

import { useState, type FormEvent } from "react";
import { tiposServico } from "@/lib/content";
import { contactoEmail } from "@/lib/site";

type Estado = "inicial" | "enviando" | "enviado" | "erro";

export default function ContactForm() {
  const [estado, setEstado] = useState<Estado>("inicial");

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
          servico: dados.get("servico"),
          mensagem: dados.get("mensagem"),
          empresa: dados.get("empresa"),
        }),
      });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      form.reset();
      setEstado("enviado");
    } catch {
      setEstado("erro");
    }
  }

  if (estado === "enviado") {
    return (
      <div className="success-panel">
        <div className="success-icon">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div className="success-title">Pedido enviado!</div>
        <p>
          Obrigado pelo contacto. A nossa equipa responderá em menos de 24
          horas úteis.
        </p>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => setEstado("inicial")}
        >
          Enviar novo pedido
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Nome
          <input
            required
            name="nome"
            type="text"
            placeholder="O seu nome"
            autoComplete="name"
          />
        </label>
        <label>
          Email
          <input
            required
            name="email"
            type="email"
            placeholder="nome@empresa.pt"
            autoComplete="email"
          />
        </label>
      </div>
      <label>
        Tipo de serviço
        <select name="servico">
          {tiposServico.map((tipo) => (
            <option key={tipo}>{tipo}</option>
          ))}
        </select>
      </label>
      <label>
        Mensagem
        <textarea
          required
          name="mensagem"
          rows={4}
          placeholder="Descreva a sua necessidade: volumes, frequência, destinos…"
        />
      </label>
      {/* Honeypot anti-spam: invisível para humanos, bots tendem a preenchê-lo */}
      <label className="hp-field" aria-hidden="true">
        Empresa
        <input name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      {estado === "erro" && (
        <p className="form-error" role="alert">
          Não foi possível enviar o pedido. Tente novamente
          {contactoEmail ? (
            <>
              {" "}
              ou escreva-nos diretamente para{" "}
              <a href={`mailto:${contactoEmail}`}>{contactoEmail}</a>.
            </>
          ) : (
            "."
          )}
        </p>
      )}
      <button
        type="submit"
        className="btn-submit"
        disabled={estado === "enviando"}
      >
        {estado === "enviando" ? "A enviar…" : "Enviar pedido de orçamento"}
      </button>
    </form>
  );
}
