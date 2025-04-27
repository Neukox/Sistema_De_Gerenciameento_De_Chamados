import ChevronDownIcon from "@assets/icons/ChevronDown";

export default function UserDropdown() {
  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost btn-neutral rounded-3xl flex items-center gap-2">
        User Name
        <ChevronDownIcon className="w-6" />
      </button>

      <ul
        className="dropdown-content menu p-2 z-1 w-52 bg-base-200 rounded-sm shadow-sm mt-3 gap-2 text-base-content"
        tabIndex={0}
      >
       {/*  <li className="flex-1">
          <span className="badge badge-neutral badge-sm ml-2">Admin</span>
        </li> */}
        <li className="flex-1">
          <a>Perfil</a>
        </li>
        <li className="flex-1">
          <a>Sair</a>
        </li>
      </ul>
    </div>
  );
}
