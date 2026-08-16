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
      // Só pré-selecciona quando o serviço bate certo com uma opção do
      // formulário — os nomes do simulador (Urbano, Regional…) não batem,
      // e nesse caso o dropdown fica como está.
      if (servicoRef.current && servico && tiposServico.includes(servico)) {
        servicoRef.current.value = servico;
      }
      setDestacado(true);
      window.setTimeout(() => setDestacado(false), 1800);
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
      // Redireciona para a página de confirmação: dá um URL próprio ao Google
      // Ads para medir conversões e mostra o "obrigado" com os passos
      // seguintes. Navegação real (não SPA) para o tag de conversão disparar.
      window.location.href = "/pedido-enviado";
    } catch {
      setEstado("erro");
    }
  }

  return (
    <form
      className={`form-card${destacado ? " preenchido" : ""}`}
      onSubmit={handleSubmit}
    >
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
        Telefone <span className="form-opt">(opcional)</span>
        <input
          name="telefone"
          type="tel"
          placeholder="Para respondermos mais depressa"
          autoComplete="tel"
        />
      </label>
      <label>
        Tipo de serviço
        <select name="servico" ref={servicoRef}>
          {tiposServico.map((tipo) => (
            <option key={tipo}>{tipo}</option>
          ))}
        </select>
      </label>
      <div className="form-row">
        <label>
          Volume estimado <span className="form-opt">(opcional)</span>
          <select name="volume" defaultValue="">
            <option value="">Selecione…</option>
            {volumesEnvio.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          Zona de entrega <span className="form-opt">(opcional)</span>
          <select name="zona" defaultValue="">
            <option value="">Selecione…</option>
            {zonasEntrega.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Mensagem
        <textarea
          required
          ref={msgRef}
          name="mensagem"
          rows={4}
          defaultValue={mensagemInicial}
          placeholder="O que precisa de enviar, de onde para onde, com que urgência…"
        />
      </label>
      {/* Honeypot anti-spam: invisível para humanos, bots tendem a preenchê-lo */}
      <label className="hp-field" aria-hidden="true">
        Empresa
        <input name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="form-consent">
        Ao enviar, concorda com o tratamento dos seus dados para lhe
        respondermos, nos termos da{" "}
        <a href="/privacidade">Política de Privacidade</a>.
      </p>
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
