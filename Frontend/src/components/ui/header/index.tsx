import HamburguerMenuIcon from "@assets/icons/HamburgerMenu";
import logo from "@assets/logo.png";
import UserDropdown from "../dropdown/UserDropdown";

export default function Header() {
  return (
    <header className="navbar justify-between gap-4 bg-primary text-white">
      <div className="xs:flex-1">
        <button className="btn btn-square btn-neutral btn-ghost w-fit p-2">
          <HamburguerMenuIcon className="w-7"/>
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
