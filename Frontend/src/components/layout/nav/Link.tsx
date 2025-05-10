import React from "react";
import { NavLink } from "react-router";

type NavMenuLinkProps = {
  to: string;
  onClickLink?: () => void;
  children: React.ReactNode;
};

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
