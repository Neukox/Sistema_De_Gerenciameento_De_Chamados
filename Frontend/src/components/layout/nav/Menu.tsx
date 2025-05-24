import { useEffect, useRef } from "react";
import ChatIcon from "@assets/icons/Chat";
import DashboardIcon from "@assets/icons/Dashboard";
import EmailIcon from "@assets/icons/Email";
import TicketIcon from "@assets/icons/Ticket";
import NavMenuLink from "./Link";
import useToggle from "@hooks/useToggle";
import HamburguerMenuIcon from "@assets/icons/HamburgerMenu";
import useUserInfo from "@hooks/useUserInfo";

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
  // Hook para pegar informações do usuário
  const user = useUserInfo();
  // Estado para controlar a abertura e fechamento do menu
  const { toggleState: isOpen, toggle } = useToggle(false);

  // Referências para o elemento de navegação e o botão
  // Essas referências são usadas para detectar cliques fora do menu e fechar o menu
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Função chamada quando um link do menu é clicado
  function onClickNavLink() {
    toggle();
  }

  // Função para lidar com cliques fora do menu
  // Se o menu estiver aberto e o clique não for dentro do menu ou do botão, fecha o menu
  // Essa função é adicionada como um ouvinte de eventos para cliques de mouse e toque
  // Isso garante que o menu seja fechado quando o usuário clica fora dele
  // ou toca em qualquer lugar da tela
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

  // Adiciona ouvintes de eventos para cliques fora do menu
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
        className="btn btn-ghost btn-neutral p-2"
        onClick={() => toggle()}
        aria-label="Menu"
      >
        <HamburguerMenuIcon className="w-8" />
      </button>

      <nav
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-20 left-0 h-[calc(100vh_-_5rem)] bg-primary transition-transform duration-300 ease-in-out text-white p-4`}
        ref={navRef}
      >
        {/* Menu de navegação (admins) */}
        {user?.role === "admin" && (
          <ul className="menu p-0 w-fit gap-2 font-medium">
            <li>
              <NavMenuLink to="admin/dashboard" onClickLink={onClickNavLink}>
                <DashboardIcon className="w-6" />
                <span>Dashboard</span>
              </NavMenuLink>
            </li>
            <li>
              <NavMenuLink
                to="admin/chamados/email"
                onClickLink={onClickNavLink}
              >
                <EmailIcon className="w-6" />
                <span>Chamados por E-mail</span>
              </NavMenuLink>
            </li>
            <li>
              <NavMenuLink
                to="admin/chamados/chat"
                onClickLink={onClickNavLink}
              >
                <ChatIcon className="w-6" />
                <span>Chamados por Chat</span>
              </NavMenuLink>
            </li>
          </ul>
        )}
        {/* Menu de navegação (clientes) */}
        {user?.role === "cliente" && (
          <ul className="menu p-0 w-fit gap-2 font-medium">
            <li>
              <NavMenuLink to="/dashboard" onClickLink={onClickNavLink}>
                <DashboardIcon className="w-6" />
                <span>Dashboard</span>
              </NavMenuLink>
            </li>
            <li>
              <NavMenuLink to="/chamado/criar" onClickLink={onClickNavLink}>
                <TicketIcon className="w-6" />
                <span>Novo Chamado</span>
              </NavMenuLink>
            </li>
            <li>
              <NavMenuLink to="/chamados/email" onClickLink={onClickNavLink}>
                <EmailIcon className="w-6" />
                <span>Chamados por E-mail</span>
              </NavMenuLink>
            </li>
            <li>
              <NavMenuLink to="/chamados/chat" onClickLink={onClickNavLink}>
                <ChatIcon className="w-6" />
                <span>Chamados por Chat</span>
              </NavMenuLink>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}
