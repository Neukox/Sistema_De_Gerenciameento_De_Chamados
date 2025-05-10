import React from "react";
import { createBrowserRouter } from "react-router";
import AuthLayout from "@pages/auth/AuthLayout";
import Cadastro from "@pages/auth/cadastro/Cadastro";
import Login from "@pages/auth/login/Login";
import RecuperarSenha from "@pages/auth/recuperar-senha/RecuperarSenha";
import RedefinirSenha from "@pages/auth/redefinir-senha/RedefinirSenha";
import MainLayout from "@pages/MainLayout";

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
    Component: MainLayout,
    // loader: roleBasedLoader,
    children: [
      {
        index: true,
        Component: React.lazy(() => import("@pages/cliente/dashboard/page")),
      },
      {
        path: "chamados-email",
        Component: React.lazy(
          () => import("@pages/cliente/chamados-email/page")
        ),
      },
      {
        path: "chamados-chat",
        Component: React.lazy(
          () => import("@pages/cliente/chamados-chat/page")
        ),
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      { path: "cadastro", Component: Cadastro },
      { path: "login", Component: Login },
      { path: "recuperar-senha", Component: RecuperarSenha },
      { path: "redefinir-senha", Component: RedefinirSenha },
    ],
  },
]);

export default router;
