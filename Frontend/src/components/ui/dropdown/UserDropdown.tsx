import ChevronDownIcon from "@assets/icons/ChevronDown";

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
  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost btn-neutral rounded-3xl flex items-center gap-2">
        User Name
        <ChevronDownIcon className="w-6" />
      </button>

      <ul
        className="dropdown-content menu p-2 z-1 w-60 bg-base-200 rounded-sm shadow-sm mt-3 gap-2 text-base-content"
        tabIndex={0}
      >
       <li className="menu-title flex flex-row text-black justify-between gap-2">
          User name
          <span className="badge badge-neutral badge-sm">Admin</span>
        </li>
        <li className="">
          <a>Perfil</a>
        </li>
        <li className="">
          <a>Sair</a>
        </li>
      </ul>
    </div>
  );
}
