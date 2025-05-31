import { verifyToken } from "@services/authServices";
import { redirect } from "react-router";

/**
 * @description Função para verificar a sessão do usuário.
 * Essa função verifica se o token de autenticação está presente no localStorage,
 * e se estiver, valida o token chamando a API.
 * Se o token for válido, retorna um objeto com a propriedade `valid` como true
 * e as informações do usuário. Caso contrário, retorna um objeto com `valid` como false.
 * @returns {Promise<{ valid: boolean; user?: UserSession }>} Um objeto indicando se a sessão é válida e, opcionalmente, as informações do usuário.
 * @throws {Error} Se ocorrer um erro ao verificar o token.
 */
const verifySession = async () => {
  // Obtém o token do localStorage
  const token = localStorage.getItem("token");

  // Se não houver token, a sessão não é válida
  if (!token) {
    return { valid: false };
  }

  try {
    // Tenta verificar o token chamando a função verifyToken
    const data = await verifyToken(token);

    /* 
      Se o token for válido, retorna um objeto com valid como true e as informações do usuário
      Caso contrário, retorna um objeto com valid como false.
    */
    if (data.valid) {
      return { valid: true, user: data?.user };
    } else {
      localStorage.removeItem("token");
      return { valid: false };
    }
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
    return { valid: false };
  }
};

/**
 * @description Função de carregamento baseada em função de rota para verificar a sessão do usuário.
 * Essa função é usada para proteger rotas específicas, redirecionando o usuário
 * para a página de login se a sessão não for válida.
 * @param {Object} params - Parâmetros da função de carregamento.
 * @param {Request} params.request - A requisição HTTP.
 * @returns {Promise<Response | null>} Retorna uma resposta de redirecionamento se a sessão não for válida, ou null se a sessão for válida.
 */

export async function roleBasedLoader({ request }: { request: Request }) {
  // Verifica a sessão do usuário
  const validation = await verifySession();

  // Se a sessão não for válida, redireciona para a página de login
  if (!validation.valid) {
    return redirect("/login");
  }

  // Verifica o papel do usuário e redireciona para a rota apropriada
  const url = new URL(request.url);

  /*
    Se o usuário for um cliente e estiver na rota raiz ("/"), redireciona para o dashboard do cliente.
    Se o usuário for um administrador e estiver na rota raiz ("/"), redireciona para o dashboard do administrador.
  */
  if (validation.user?.role === "cliente" && url.pathname === "/") {
    return redirect("/dashboard");
  } else if (validation.user?.role === "admin" && url.pathname === "/") {
    return redirect("/admin/dashboard");
  }

  return null;
}

/**
 * @description Função de carregamento para proteger rotas de administração.
 * Essa função verifica se o usuário está autenticado e se tem a função de administrador.
 * Se não estiver autenticado ou não for um administrador, redireciona para a página de login ou retorna um erro 403.
 * @returns {Promise<void>} Retorna uma resposta de redirecionamento ou lança um erro 403.
 */
export async function adminProtectionRouteLoader() {
  const validation = await verifySession();

  if (!validation.valid) {
    throw redirect("/login");
  }

  if (validation.user?.role !== "admin") {
    throw new Response("Forbidden", { status: 403 });
  }
}
