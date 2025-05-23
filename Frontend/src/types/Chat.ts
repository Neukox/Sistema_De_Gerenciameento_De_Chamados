type messageTypes = "register" | "unregister" | "chat_message" | "historico";

export interface ChatMessageRequest {
  type: messageTypes;
  chamado_id: string;
  usuario_id: string;
  conteudo?: string;
}

export interface ChatMessage {
  usuario_id: number;
  de: string;
  data_envio: string;
  conteudo: string;
}