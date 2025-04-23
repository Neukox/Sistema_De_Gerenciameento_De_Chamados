import { logout } from "./services/authService";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { UserSession } from "types/UserSession";

function App() {
  const [userDetails, setUserDetails] = useState<UserSession | null>();

  useEffect(() => {
    const item = sessionStorage.getItem("session");

    if (item) {
      const session = JSON.parse(item);
      setUserDetails(session);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
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
          disabled={userDetails === null}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;
