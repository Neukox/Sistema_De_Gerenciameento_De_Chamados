import HamburguerMenuIcon from "@assets/icons/HamburgerMenu";
import logo from "@assets/logo.png";
import UserDropdown from "../dropdown/UserDropdown";

/**
 * @description Componente de Cabeçalho (Header) para navegação.
 *
 * Esse componente exibe um cabeçalho com um menu hamburguer, logo e um dropdown de usuário.
 * Ele é utilizado principalmente em dispositivos móveis, mas também é exibido em telas maiores.
 *
 * @component
 * @param {function} onClickHamburguerMenu - Função a ser chamada quando o menu hamburguer for clicado.
 * @returns {JSX.Element} O componente de Cabeçalho renderizado.
 */
export default function Header({
  onClickHamburguerMenu,
}: {
  onClickHamburguerMenu: () => void;
}) {
  return (
    <header className="navbar justify-between gap-4 bg-primary text-white border-b-1 border-neutral">
      <div className="xs:flex-1">
        <button
          className="btn btn-square btn-neutral btn-ghost w-fit p-2"
          onClick={onClickHamburguerMenu}
        >
          <HamburguerMenuIcon className="w-7" />
        </button>
      </div>
      <div className="flex xs:flex-1 justify-center">
        <img src={logo} alt="logo da neukox" className="w-16" />
      </div>
      <div className="flex flex-1 justify-end">
        <UserDropdown />
      </div>
    </header>
  );
}
