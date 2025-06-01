import logo from "@assets/logo.png";
import UserDropdown from "@components/user/Dropdown";
import NavMenu from "./nav/Menu";
import useUserInfo from "@hooks/useUserInfo";
import { Link } from "react-router";

/**
 * @description Componente de Cabeçalho (Header) para navegação.
 *
 * Esse componente exibe um cabeçalho com um menu hamburguer, logo e um dropdown de usuário.
 * Ele é utilizado principalmente em dispositivos móveis, mas também é exibido em telas maiores.
 *
 * @component
 * @returns {JSX.Element} O componente de Cabeçalho renderizado.
 */
export default function Header() {
  const user = useUserInfo();

  return (
    <>
      <header className="navbar h-20 py-0 fixed top-0 z-10 justify-between gap-4 bg-primary text-white border-b-1 border-neutral">
        <div className="xs:flex-1">
          <NavMenu />
        </div>
        <div className="flex md:flex-1 justify-center relative">
          <Link
            to={user?.role === "admin" ? "/admin/dashboard" : "/dashboard"}
            className="size-fit"
          >
            <img src={logo} alt="logo da neukox" width="100px" />
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <UserDropdown />
        </div>
      </header>
    </>
  );
}
