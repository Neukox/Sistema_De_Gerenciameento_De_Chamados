import { Chamado } from "@prisma/client";

export interface ChamadoCompleto extends Chamado {
  nome_usuario?: string;
}

export interface ChamadoFiltros {
  type?: string; // Tipo de atendimento (opcional)
  search?: string; // Termo de busca no título (opcional)
  status?: string; // Status do chamado (opcional)
}

export interface ChamadoUpdate {
  titulo?: string; // Título do chamado (opcional)
  descricao?: string; // Descrição do chamado (opcional)
}

export interface ChamadoCreate {
  titulo: string; // Título do chamado (obrigatório)
  descricao: string; // Descrição do chamado (obrigatório)
  tipo_atendimento: string; // Tipo de atendimento (obrigatório)
  usuario_id: number; // ID do usuário que está criando o chamado (obrigatório)
}
