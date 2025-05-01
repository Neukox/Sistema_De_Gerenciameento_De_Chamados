import ChevronDownIcon from "@assets/icons/ChevronDown";

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
