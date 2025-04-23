import { createBrowserRouter } from "react-router";
import App from "./App";
import AuthLayout from "@pages/auth/AuthLayout";
import Cadastro from "@pages/auth/cadastro/Cadastro";
import Login from "@pages/auth/login/Login";
import RecuperarSenha from "@pages/auth/recuperar-senha/RecuperarSenha";
import RedefinirSenha from "@pages/auth/redefinir-senha/RedefinirSenha";

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
