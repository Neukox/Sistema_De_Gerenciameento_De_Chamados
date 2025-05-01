import { Outlet } from "react-router";
import logo from "@assets/logo.png";

/**
 * @description Componente de layout para autenticação.
 *
 * Esse componente é usado como layout para as páginas de autenticação, como login e recuperação de senha.
 * Ele exibe um cabeçalho com o logotipo e um espaço para o conteúdo principal.
 *
 * @component
 * @returns {JSX.Element} O componente de layout de autenticação renderizado.
 */
export default function AuthLayout() {
  return (
    <div className=" h-full min-h-dvh bg-gradient-to-bl to-(--gradient-1) from-(--gradient-2)">
      <header className="flex justify-center">
        <img src={logo} alt="logo da Neukox" className="w-28" />
      </header>
      <main className="min-h-[calc(100dvh_-_7rem)] flex items-center justify-center p-6">
        <Outlet />
      </main>
    </div>
  );
}
