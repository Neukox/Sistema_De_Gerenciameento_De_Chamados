import ChevronDownIcon from "@assets/icons/ChevronDown";
import LogoutIcon from "@assets/icons/Logout";
import ProfileIcon from "@assets/icons/Profile";
import useUserInfo from "@hooks/useUserInfo";
import { logout } from "@services/authServices";
import { Link } from "react-router";

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
  const user = useUserInfo();

  return (
    <div className="dropdown dropdown-end">
      <button className="group btn btn-ghost btn-neutral rounded-3xl flex items-center gap-2 text-ellipsis">
        {user?.name}
        <ChevronDownIcon className="w-6 group-focus:rotate-180 transition-transform duration-200 ease-in" />
      </button>

      <ul
        className="dropdown-content menu p-2 z-1 w-60 bg-base-200 rounded-sm shadow-sm mt-3 gap-2 text-base-content"
        tabIndex={0}
      >
        <li className="menu-title flex text-base-content justify-between gap-2">
          {user?.name}
          {user?.role === "admin" && (
            <span className="badge badge-primary">{user?.role}</span>
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
          <button onClick={logout}>
            <LogoutIcon className="w-6" />
            Sair
          </button>
        </li>
      </ul>
    </div>
  );
}
