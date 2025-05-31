import { RegisterData } from "@schemas/auth/RegisterSchema";
import { api } from "../lib/api";
import { UserSession } from "types/User";
import { LoginData } from "@schemas/auth/LoginSchema";

export interface AuthResponse {
  message?: string;
}

export type RegisterRequest = Omit<RegisterData, "confirmar_senha">;

export interface RegisterResponse extends AuthResponse {
  user: UserSession;
  token: string;
}

export interface LoginResponse extends AuthResponse {
  user: UserSession;
  token: string;
}

export interface ResetPasswordRequest extends AuthResponse {
  nova_senha: string;
  token: string;
}

export interface VerifyTokenResponse extends AuthResponse {
  valid: boolean;
  user?: UserSession;
}

/**
 * @description Função para registrar um novo usuário
 *
 * Essa função faz uma requisição POST para a rota "/register" da API
 * com os dados do usuário.
 *
 * @param {RegisterRequest} data - Dados do usuário a serem registrados
 * @param data.nome - Nome do usuário
 * @param data.email - E-mail do usuário
 * @param data.senha - Senha do usuário
 * @returns Uma Promise que resolve com a resposta da API
 * @throws Erro se a requisição falhar
 */
export async function registerUser(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/register", data);
  return response.data;
}

/**
 * @description Função para fazer login de um usuário
 *
 * Essa função faz uma requisição POST para a rota "/login" da API
 * com os dados de login do usuário.
 *
 * @param data - Dados de login do usuário
 * @param data.email - E-mail do usuário
 * @param data.password - Senha do usuário
 * @returns Uma Promise que resolve com a resposta da API
 * @throws Erro se a requisição falhar
 */
export async function login(data: LoginData): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login", data);
  return response.data;
}

/**
 * @description Função para recuperar a senha de um usuário
 *
 * Essa função faz uma requisição POST para a rota "/recover-password" da API
 * com o e-mail do usuário.
 *
 * @param data - Dados para recuperação de senha
 * @param data.email - E-mail do usuário
 * @returns Uma Promise que resolve com a resposta da API
 * @throws Erro se a requisição falhar
 */
export async function recoverPassword(data: {
  email: string;
}): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/forgot-password", data);
  return response.data;
}

/**
 * @description Função para redefinir a senha de um usuário
 *
 * Essa função faz uma requisição POST para a rota "/reset-password" da API
 * com os dados de redefinição de senha do usuário.
 *
 * @param data - Dados para redefinição de senha
 * @param data.password - Nova senha do usuário
 * @param data.token - Token de redefinição de senha
 * @returns Uma Promise que resolve com a resposta da API
 * @throws Erro se a requisição falhar
 */
export async function resetPassword(
  data: ResetPasswordRequest
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/reset-password", data);
  return response.data;
}

/**
 * @description Função para verificar o token de um usuário
 *
 * Essa função faz uma requisição POST para a rota "/verify-token" da API
 * com o token do usuário.
 *
 * @param {string} token - Token JWT do usuário
 * @returns Uma Promise que resolve com a resposta da API
 * @throws Erro se a requisição falhar
 */
export async function verifyToken(token: string): Promise<VerifyTokenResponse> {
  const response = await api.post<VerifyTokenResponse>("/verify-token", {
    token,
  });
  return response.data;
}
