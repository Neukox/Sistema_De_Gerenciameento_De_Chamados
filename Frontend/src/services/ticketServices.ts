import { api } from "../lib/api";
import { Ticket, TicketStatusType } from "types/Ticket";

export interface TicketResponse {
  message?: string;
}

export interface FetchTicketsResponse extends TicketResponse {
  chamados?: Ticket[];
}

export interface CreateTicketRequest {
  usuario_id: number;
  tipo_atendimento: string;
  titulo: string;
  descricao: string;
}

export interface CreateTicketResponse extends TicketResponse {
  chamado_id?: number;
}

export interface ChangeStatusTicketRequest {
  id: number;
  admin_id: number;
  status: TicketStatusType;
  mensagem?: string;
}

export interface SendMessageTicketRequest {
  id: number;
  usuario_id: number;
  admin_id: number;
  mensagem: string;
}

/**
 * @description Função para buscar todos os chamados.
 *
 * Essa função faz uma requisição GET para a API e retorna os dados dos chamados.
 * Ela pode filtrar os chamados por tipo, pesquisa e status.
 *
 * @param {string} [type] - O tipo de chamado a ser filtrado.
 * @param {string} [search] - O termo de pesquisa para filtrar os chamados.
 * @param {string} [status] - O status dos chamados a serem filtrados.
 * @returns {Promise<FetchTicketsResponse>} - A resposta da API contendo os dados dos chamados.
 */
export async function fetchTickets(
  type?: string,
  search?: string,
  status?: string
): Promise<FetchTicketsResponse> {
  const response = await api.get<FetchTicketsResponse>("chamados", {
    params: {
      type: type,
      search: search,
      status: status,
    },
  });
  return response.data;
}

/**
 * @description Função para buscar os chamados de um usuário específico.
 *
 * Essa função faz uma requisição GET para a API e retorna os dados dos chamados do usuário.
 * Ela pode filtrar os chamados por tipo, pesquisa e status.
 *
 * @param {number} user - O ID do usuário cujos chamados serão buscados.
 * @param {string} [type] - O tipo de chamado a ser filtrado.
 * @param {string} [search] - O termo de pesquisa para filtrar os chamados.
 * @param {string} [status] - O status dos chamados a serem filtrados.
 * @returns {Promise<FetchTicketsResponse>} - A resposta da API contendo os dados dos chamados do usuário.
 */
export async function fetchUserTickets(
  user: number,
  type?: string,
  search?: string,
  status?: string
): Promise<FetchTicketsResponse> {
  const response = await api.get<FetchTicketsResponse>(
    `chamados/usuario/${user}`,
    {
      params: {
        search: search,
        type: type,
        status: status,
      },
    }
  );
  return response.data;
}

/**
 * @description Função para buscar um chamado específico pelo ID.
 *
 * Essa função faz uma requisição GET para a API e retorna os dados do chamado.
 *
 * @param {number} id - O ID do chamado a ser buscado.
 * @returns {Promise<Ticket>} - A resposta da API contendo os dados do chamado.
 */
export async function fetchTicketById(id: number): Promise<Ticket> {
  const response = await api.get<Ticket>(`chamados/${id}`);
  return response.data;
}

/**
 * @description Função para criar um chamado.
 *
 * Essa função faz uma requisição POST para a API e retorna uma mensagem de sucesso ou erro.
 *
 * @param {CreateTicketRequest} data - Os dados do chamado a ser criado.
 * @param {number} data.usuario_id - O ID do usuário que está criando o chamado.
 * @param {string} data.tipo_atendimento - O tipo de atendimento do chamado.
 * @param {string} data.titulo - O título do chamado.
 * @param {string} data.descricao - A descrição do chamado.
 * @returns {Promise<TicketResponse>} - A resposta da API contendo uma mensagem de sucesso ou erro, e o ID do chamado.
 */
export async function submitTicket(
  data: CreateTicketRequest
): Promise<CreateTicketResponse> {
  const response = await api.post<TicketResponse>("chamados", data);
  return response.data;
}

/**
 * @description Função para editar um chamado.
 *
 * Essa função faz uma requisição PUT para a API e retorna uma mensagem de sucesso ou erro.
 *
 * @param {number} id - O ID do chamado a ser editado.
 * @param {object} data - Os dados a serem atualizados no chamado.
 * @param {string} data.titulo - O novo título do chamado.
 * @param {string} data.descricao - A nova descrição do chamado.
 * @returns {Promise<TicketResponse>} - A resposta da API contendo uma mensagem de sucesso ou erro.
 */
export async function editTicket(
  id: number,
  data: {
    titulo: string;
    descricao: string;
  }
): Promise<TicketResponse> {
  const response = await api.put<TicketResponse>(`chamados/${id}`, data);
  return response.data;
}

/**
 * @description Função para cancelar um chamado.
 *
 * Essa função faz uma requisição PATCH para a API e retorna uma mensagem de sucesso ou erro.
 *
 * @param {number} id - O ID do chamado a ser cancelado.
 * @returns {Promise<TicketResponse>} - A resposta da API contendo uma mensagem de sucesso ou erro.
 */
export async function cancelTicket(id: number): Promise<TicketResponse> {
  const response = await api.patch<TicketResponse>(`chamados/cancelar/${id}`);
  return response.data;
}

/**
 * @description Função para alterar o status de um chamado.
 *
 * Essa função faz uma requisição PATCH para a API e retorna uma mensagem de sucesso ou erro.
 *
 * @param {ChangeStatusTicketRequest} data - Os dados para alterar o status do chamado.
 * @param {number} data.id - O ID do chamado cujo status será alterado.
 * @param {TicketStatusType} data.status - O novo status do chamado.
 * @param {string} [data.mensagem] - Uma mensagem opcional a ser associada à alteração de status.
 * @returns {Promise<TicketResponse>} - A resposta da API contendo uma mensagem de sucesso ou erro.
 */
export async function changeTicketStatus(
  data: ChangeStatusTicketRequest
): Promise<TicketResponse> {
  const response = await api.patch<TicketResponse>(
    `chamados/status/${data.id}`,
    {
      admin_id: data.admin_id,
      status: data.status,
      mensagem: data.mensagem,
    }
  );
  return response.data;
}

/**
 * @description Função para enviar uma mensagem sobre um chamado.
 *
 * Essa função faz uma requisição POST para a API e retorna uma mensagem de sucesso ou erro.
 *
 * @param {SendMessageTicketRequest} data - Os dados da mensagem a ser enviada.
 * @param {number} data.id - O ID do chamado ao qual a mensagem será enviada.
 * @param {number} data.usuario_id - O ID do usuário que está enviando a mensagem.
 * @param {string} data.mensagem - O conteúdo da mensagem a ser enviada.
 * @returns {Promise<TicketResponse>} - A resposta da API contendo uma mensagem de sucesso ou erro.
 */

export async function sendMessage(
  data: SendMessageTicketRequest
): Promise<TicketResponse> {
  const response = await api.post<TicketResponse>(
    `chamados/mensagem/${data.id}`,
    {
      admin_id: data.admin_id,
      usuario_id: data.usuario_id,
      mensagem: data.mensagem,
    }
  );
  return response.data;
}
