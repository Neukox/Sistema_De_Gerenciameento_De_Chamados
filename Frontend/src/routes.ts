import { createBrowserRouter } from "react-router";
import App from "./App";
import AuthLayout from "@pages/auth/AuthLayout";
import Cadastro from "@pages/auth/cadastro/Cadastro";
import Login from "@pages/auth/login/Login";
import RecuperarSenha from "@pages/auth/recuperar-senha/RecuperarSenha";
import RedefinirSenha from "@pages/auth/redefinir-senha/RedefinirSenha";

/**
 * @description Configuração das rotas da aplicação utilizando o React Router.
 *
 * Este arquivo define as rotas principais da aplicação, incluindo a rota raiz
 * e as rotas de autenticação. As rotas são organizadas em um array de objetos,
 * onde cada objeto representa uma rota com seu respectivo componente.
 *
 * @module routes
 */

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    Component: AuthLayout,
    children: [
      { path: "/cadastro", Component: Cadastro },
      { path: "/login", Component: Login },
      { path: "/recuperar-senha", Component: RecuperarSenha },
      { path: "/redefinir-senha", Component: RedefinirSenha },
    ],
  },
]);

export default router;
