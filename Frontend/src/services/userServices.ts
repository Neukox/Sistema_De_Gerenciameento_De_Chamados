import { EditUserInfoData } from "@schemas/user/EditUserInfoSchema";
import { api } from "../lib/api";
import { User } from "types/User";

export interface UserResponse {
  message?: string;
}

/**
 * @description Função para buscar informações de um usuário específico.
 *
 * Essa função faz uma requisição GET para a API para obter os detalhes de um usuário
 * com base no ID fornecido.
 *
 * @param {number} id - O ID do usuário a ser buscado.
 * @returns {Promise<User>} Uma Promise que resolve com as informações do usuário.
 */
export default async function getUserInfo(id: number): Promise<User> {
  const response = await api.get<User>(`/user/${id}`);
  return response.data;
}

/**
 * @description Função para editar as informações de um usuário específico.
 *
 * Essa função faz uma requisição PUT para a API para atualizar os detalhes de um usuário
 * com base no ID e nos dados fornecidos.
 *
 * @param {number} id - O ID do usuário a ser editado.
 * @param {EditUserInfoData} data - Os dados atualizados do usuário.
 * @param {string} data.nome - O novo nome do usuário.
 * @param {string} data.email - O novo email do usuário.
 * @returns {Promise<UserResponse>} Uma Promise que resolve com a resposta da API.
 */
export async function editUserInfo(
  id: number,
  data: EditUserInfoData
): Promise<UserResponse> {
  const response = await api.put<UserResponse>(`/user/${id}`, data);
  return response.data;
}

/**
 * @description Função para alterar a senha de um usuário específico.
 *
 * Essa função faz uma requisição PATCH para a API para atualizar a senha de um usuário
 * com base no ID e na nova senha fornecida.
 *
 * @param {number} id - O ID do usuário cuja senha será alterada.
 * @param {string} newPassword - A nova senha do usuário.
 * @returns {Promise<UserResponse>} Uma Promise que resolve com a resposta da API.
 * */
export async function changeUserPassword(
  id: number,
  newPassword: string
): Promise<UserResponse> {
  const response = await api.patch<UserResponse>(
    `/user/change-password/${id}`,
    {
      novaSenha: newPassword,
    }
  );
  return response.data;
}
