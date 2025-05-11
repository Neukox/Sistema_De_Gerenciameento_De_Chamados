import React from "react";
import { NavLink } from "react-router";

type NavMenuLinkProps = {
  to: string;
  onClickLink?: () => void;
  children: React.ReactNode;
};

/**
 * Componente de link de menu de navegação.
 * Utiliza o NavLink do React Router para navegação entre páginas.
 *
 * @param {NavMenuLinkProps} props - Propriedades do componente.
 * @param {string} props.to - URL de destino do link.
 * @param {() => void} [props.onClickLink] - Função a ser chamada ao clicar no link.
 * @param {React.ReactNode} props.children - Conteúdo a ser exibido dentro do link.
 * @returns {JSX.Element} Componente de link de menu de navegação.
 */

export default function NavMenuLink({
  to,
  children,
  onClickLink,
}: NavMenuLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 hover:bg-neutral ${
          isActive ? "bg-neutral" : ""
        }`
      }
      end
      prefetch="intent"
      onClick={onClickLink}
    >
      {children}
    </NavLink>
  );
}
