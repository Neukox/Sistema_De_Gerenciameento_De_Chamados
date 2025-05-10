import { useEffect, useRef } from "react";
import ChatIcon from "@assets/icons/Chat";
import DashboardIcon from "@assets/icons/Dashboard";
import EmailIcon from "@assets/icons/Email";
import TicketIcon from "@assets/icons/Ticket";
import NavMenuLink from "./Link";
import useToggle from "@hooks/useToggle";
import HamburguerMenuIcon from "@assets/icons/HamburgerMenu";

/**
 * @description Componente de Menu (Nav) para navegação.
 *
 * Esse componente exibe um menu lateral que pode ser aberto ou fechado.
 * Ele é utilizado principalmente em dispositivos móveis, mas também é exibido em telas maiores.
 *
 * @component
 * @returns {JSX.Element} O componente de Menu Lateral renderizado.
 * */
export default function NavMenu() {
  const { toggleState: isOpen, toggle } = useToggle(false);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function onClickNavLink() {
    toggle();
  }

  function handleClickOutside(event: MouseEvent | TouchEvent) {
    const target = event.target as Node;

    if (
      navRef.current &&
      !navRef.current.contains(target) &&
      buttonRef.current &&
      !buttonRef.current.contains(target)
    ) {
      toggle();
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <button
        ref={buttonRef}
        className="btn btn-ghost btn-neutral"
        onClick={() => toggle()}
        aria-label="Menu"
      >
        <HamburguerMenuIcon className="w-6" />
      </button>

      <nav
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-[5.0625rem] left-0 h-[calc(100vh_-_5.0625rem)] bg-primary transition-transform duration-300 ease-in-out text-white p-4`}
        ref={navRef}
      >
        <ul className="menu p-0 w-fit gap-2 font-medium">
          <li>
            <NavMenuLink to="/" onClickLink={onClickNavLink}>
              <DashboardIcon className="w-6" />
              <span>Dashboard</span>
            </NavMenuLink>
          </li>
          <li>
            <a className="flex hover:bg-neutral items-center gap-2">
              <TicketIcon className="w-6" />
              <span>Novo chamado</span>
            </a>
          </li>
          <li>
            <NavMenuLink to="/chamados-email" onClickLink={onClickNavLink}>
              <EmailIcon className="w-6" />
              <span>Chamados por E-mail</span>
            </NavMenuLink>
          </li>
          <li>
            <NavMenuLink to="/chamados-chat" onClickLink={onClickNavLink}>
              <ChatIcon className="w-6" />
              <span>Chamados por Chat</span>
            </NavMenuLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
