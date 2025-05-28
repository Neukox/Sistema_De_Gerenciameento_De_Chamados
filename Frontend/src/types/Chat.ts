type messageTypes =
  | "register"
  | "unregister"
  | "chat_message"
  | "historico"
  | "error";

export interface ChatMessage {
  usuario_id: number;
  de: string;
  data_envio: string;
  conteudo: string;
}

export interface SocketMessage {
  type: messageTypes;
  chamado_id: number;
  usuario_id: number;
  conteudo?: string;
  error?: string;
}
