import Header from "@components/layout/Header";
import { Outlet } from "react-router";

/**
 * Layout para as páginas principais do sistema.
 *
 * Este layout é utilizado para as páginas que requerem autenticação e
 * são acessíveis apenas para usuários autenticados. Ele inclui o cabeçalho
 * e o conteúdo principal da página.
 * @returns {JSX.Element} O layout principal da aplicação.
 */
export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="mt-[5.0625rem]">
        <Outlet />
      </main>
    </>
  );
}
