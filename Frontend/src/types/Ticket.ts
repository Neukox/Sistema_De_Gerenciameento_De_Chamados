export type TicketStatusType =
  | "aberto"
  | "em andamento"
  | "pendente"
  | "resolvido"
  | "fechado"
  | "cancelado";

export type TicketServiceType = "email" | "chat";

export interface Ticket {
  id: number;
  titulo: string;
  descricao: string;
  status: TicketStatusType;
  usuario_id: number;
  usuario_nome?: string;
  data_criacao: string;
  data_encerramento: string | null;
  tipo_atendimento: TicketServiceType;
}
