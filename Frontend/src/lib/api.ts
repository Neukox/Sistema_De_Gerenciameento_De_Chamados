import axios from "axios";

// Cria uma instância do axios com a URL base da API
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepta as requisições para adicionar o token de autenticação
api.interceptors.request.use((config) => {
  // Obtém o token do sessionStorage
  const token = sessionStorage.getItem("token");

  // Se o token existir, adiciona ao cabeçalho da requisição
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function apiTest() {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    return error;
  }
}
