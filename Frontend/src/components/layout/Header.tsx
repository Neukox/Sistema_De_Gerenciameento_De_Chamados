import logo from "@assets/logo.png";
import UserDropdown from "@components/user/Dropdown";
import NavMenu from "./nav/Menu";

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
export default function Header() {
  return (
    <>
      <header className="navbar py-0 fixed top-0 z-10 justify-between gap-4 bg-primary text-white border-b-1 border-neutral">
        <div className="xs:flex-1">
          <NavMenu />
        </div>
        <div className="flex md:flex-1 justify-center">
          <img src={logo} alt="logo da neukox" className="w-20 h-20" />
        </div>
        <div className="flex flex-1 justify-end">
          <UserDropdown />
        </div>
      </header>
    </>
  );
}
