import ChatIcon from "@assets/icons/Chat";
import DashboardIcon from "@assets/icons/Dashboard";
import EmailIcon from "@assets/icons/Email";
import ProfileIcon from "@assets/icons/Profile";
import TicketIcon from "@assets/icons/Ticket";

export default function SidebarMenu() {
  return (
    <aside className={`w-fit h-full bg-primary text-white font-medium p-2 md:p-4`}>
      <ul className="menu w-full p-0 md:gap-2">
        <li>
          <div className="tooltip tooltip-right md:hidden p-0" data-tip="Dashboard">
            <a className="hover:bg-neutral p-2 rounded-sm">
              <DashboardIcon className="w-6" />
            </a>
          </div>
          <a className="hidden md:flex hover:bg-neutral items-center gap-2">
            <DashboardIcon className="w-6" />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <div
            className="tooltip tooltip-right md:hidden p-0"
            data-tip="Fazer novo chamado"
          >
            <a className="hover:bg-neutral p-2 rounded-sm">
              <TicketIcon className="w-6" />
            </a>
          </div>
          <a className="hidden md:flex hover:bg-neutral items-center gap-2">
            <TicketIcon className="w-6" />
            <span>Novo chamado</span>
          </a>
        </li>
        <li>
          <div className="tooltip tooltip-right md:hidden p-0" data-tip="Email">
            <a className="hover:bg-neutral p-2 rounded-sm">
              <EmailIcon className="w-6" />
            </a>
          </div>
          <a className="hidden md:flex hover:bg-neutral items-center gap-2">
            <EmailIcon className="w-6" />
            <span>Email</span>
          </a>
        </li>
        <li>
          <div className="tooltip tooltip-right md:hidden p-0" data-tip="Chat">
            <a className="hover:bg-neutral p-2 rounded-sm">
              <ChatIcon className="w-6" />
            </a>
          </div>
          <a className="hidden md:flex hover:bg-neutral items-center gap-2">
            <ChatIcon className="w-6" />
            <span>Chat</span>
          </a>
        </li>
        <li>
          <div
            className="tooltip tooltip-right md:hidden p-0"
            data-tip="Meu perfil"
          >
            <a className="hover:bg-neutral p-2 rounded-sm">
              <ProfileIcon className="w-6" />
            </a>
          </div>
          <a className="hidden md:flex hover:bg-neutral items-center gap-2">
            <ProfileIcon className="w-6" />
            <span>Perfil</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
