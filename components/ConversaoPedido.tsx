"use client";

import { useEffect } from "react";
import { registarConversao } from "@/lib/conversoes";

// Dispara a conversão "pedido_formulario" ao abrir /pedido-enviado — a
// página só existe para quem acabou de submeter o formulário.
export default function ConversaoPedido() {
  useEffect(() => {
    registarConversao("pedido_formulario");
  }, []);
  return null;
}
