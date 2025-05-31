import ChevronDownIcon from "@assets/icons/ChevronDown";
import LogoutIcon from "@assets/icons/Logout";
import ProfileIcon from "@assets/icons/Profile";
import { useAuth } from "@context/AuthContext";
import { Link } from "react-router";
import { useNavigate } from "react-router";

/**
 * @description Componente de Dropdown de Usuário.
 *
 * Esse componente exibe um botão com o nome do usuário e um ícone de seta para baixo.
 * Ao clicar no botão, um menu suspenso é exibido com opções como "Perfil" e "Sair".
 * Ele é utilizado principalmente para permitir que o usuário acesse rapidamente suas configurações ou saia da conta.
 *
 * @component
 * @returns {JSX.Element} O componente de Dropdown de Usuário renderizado.
 */
export default function UserDropdown() {
  // Hook para autenticação
  const { user, logout } = useAuth();

  // Hook para navegação
  const navigate = useNavigate();

  // Função para lidar com o logout
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redireciona para a página de login após o logout
  };

  return (
    <div className="dropdown dropdown-end">
      <button className="group btn btn-ghost btn-neutral rounded-3xl flex items-center gap-2 text-ellipsis">
        {user?.name}
        <ChevronDownIcon className="w-6 group-focus:rotate-180 transition-transform duration-200 ease-in" />
      </button>

      <ul
        className="dropdown-content menu p-2 z-1 min-w-60 bg-base-200 rounded-sm shadow-sm mt-3 gap-2 text-base-content"
        tabIndex={0}
      >
        <li className="menu-title flex flex-row text-base-content justify-between gap-2">
          {user?.name}
          {user?.role === "admin" && (
            <span className="badge badge-primary">Admin</span>
          )}
        </li>
        <li>
          <Link
            to={`perfil/${user?.id}`}
            className="flex flex-row gap-2 items-center"
          >
            <ProfileIcon className="w-6" />
            <span>Perfil</span>
          </Link>
        </li>
        <li>
          <button onClick={handleLogout}>
            <LogoutIcon className="w-6" />
            Sair
          </button>
        </li>
      </ul>
    </div>
  );
}
