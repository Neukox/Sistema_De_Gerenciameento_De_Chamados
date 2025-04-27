import HamburguerMenuIcon from "@assets/icons/HamburgerMenu";
import logo from "@assets/logo.png";

export default function Header() {
  return (
    <header className="navbar justify-between gap-4 bg-primary text-white">
      <div className="xs:flex-1">
        <button className="btn btn-square btn-ghost">
          <HamburguerMenuIcon />
        </button>
      </div>
      <div className="flex xs:flex-1 justify-center">
        <img src={logo} alt="logo da neukox" className="w-16" />
      </div>
      <div className="flex flex-1 justify-end">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
