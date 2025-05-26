import { createBrowserRouter } from "react-router";
import {
  adminProtectionRouteLoader,
  roleBasedLoader,
} from "./lib/roleBasedLoader";
import AuthLayout from "@pages/auth/AuthLayout";
import Cadastro from "@pages/auth/cadastro/Cadastro";
import Login from "@pages/auth/login/Login";
import RecuperarSenha from "@pages/auth/recuperar-senha/RecuperarSenha";
import RedefinirSenha from "@pages/auth/redefinir-senha/RedefinirSenha";
import MainLayout from "@pages/MainLayout";
import UserDashboardPage from "@pages/usuario/dashboard/page";
import UserEmailTicketsPage from "@pages/usuario/chamados/email/page";
import UserChatTicketsPage from "@pages/usuario/chamados/chat/page";
import UserProfilePage from "@pages/perfil/page";
import UserCreateTicketPage from "@pages/usuario/chamado/criar/page";
import TicketInfoPage from "@pages/usuario/chamado/exibir/page";
import EditTicketPage from "@pages/usuario/chamado/editar/page";
import TicketChatPage from "@pages/usuario/chamado/chat/page";
import AdminTicketChatPage from "@pages/admin/chamado/chat/page";
import ProtectedPage from "@pages/Protected";
import AdminDashboardPage from "@pages/admin/dashboard/page";
import AdminChatTicketsPage from "@pages/admin/chamados/chat/page";
import AdminEmailTicketsPage from "@pages/admin/chamados/email/page";
import AdminTicketInfoPage from "@pages/admin/chamado/exibir/page";

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
    loader: roleBasedLoader,
    children: [
      {
        path: "dashboard",
        Component: UserDashboardPage,
      },
      {
        path: "chamados",
        children: [
          {
            path: "email",
            Component: UserEmailTicketsPage,
          },
          {
            path: "chat",
            Component: UserChatTicketsPage,
          },
        ],
      },
      {
        path: "chamado",
        children: [
          {
            path: "criar",
            Component: UserCreateTicketPage,
          },
          {
            path: ":id",
            Component: TicketInfoPage,
          },
          {
            path: ":id/editar",
            Component: EditTicketPage,
          },
          {
            path: ":id/chat",
            Component: TicketChatPage,
          },
        ],
      },
      {
        path: "perfil/:id",
        Component: UserProfilePage,
      },
      {
        path: "admin",
        loader: adminProtectionRouteLoader,
        errorElement: <ProtectedPage />,
        children: [
          {
            path: "dashboard",
            Component: AdminDashboardPage,
          },
          {
            path: "chamados",
            children: [
              {
                path: "email",
                Component: AdminEmailTicketsPage,
              },
              {
                path: "chat",
                Component: AdminChatTicketsPage,
              },
            ],
          },
          {
            path: "chamado",
            children: [
              {
                path: ":id",
                Component: AdminTicketInfoPage,
              },
              {
                path: ":id/chat",
                Component: AdminTicketChatPage,
              },
            ],
          },
        ],
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