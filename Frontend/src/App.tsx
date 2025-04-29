import Header from "@components/ui/header";
import { logout } from "./services/authService";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { UserSession } from "types/UserSession";
import SidebarMenu from "@components/ui/sidebar-menu";
import useToggle from "@hooks/useToggle";

function App() {
  const [userDetails, setUserDetails] = useState<UserSession | null>();
  const { toggleState: toggle, toggle: toggleSidebar } = useToggle(false);

  useEffect(() => {
    const item = sessionStorage.getItem("session");

    if (item) {
      const session = JSON.parse(item);
      setUserDetails(session);
    }
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <Header onClickHamburguerMenu={toggleSidebar} />
      <div className="flex h-[calc(100vh_-_5.0625rem)]">
        <SidebarMenu isOpen={toggle} onCloseSidebar={toggleSidebar} />
        <main className="flex flex-1 flex-col items-center justify-center gap-8">
          <h1>Teste de telas</h1>
          <div className="flex gap-4">
            <ul className="text-center">
              <li className="link">
                <Link to="/cadastro">Cadastro</Link>
              </li>
              <li className="link">
                <Link to="/login">Login</Link>
              </li>
              <li className="link">
                <Link to="/recuperar-senha">Recuperar Senha</Link>
              </li>
              <li className="link">
                <Link to="/redefinir-senha">Redefinir Senha</Link>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h2 className="font-bold text-2xl mb-4">Teste de sessão</h2>
            {userDetails ? (
              <>
                <p>Usuário: {userDetails.name}</p>
                <p>E-mail: {userDetails.email}</p>
                <p>Role: {userDetails.role}</p>
              </>
            ) : (
              <p>Não há sessão ativa</p>
            )}
            <button
              className="btn btn-secondary mt-4"
              onClick={() => logout()}
              disabled={userDetails === null || userDetails === undefined}
            >
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
