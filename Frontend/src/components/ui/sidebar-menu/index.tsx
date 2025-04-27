import ChatIcon from "@assets/icons/Chat";
import DashboardIcon from "@assets/icons/Dashboard";
import EmailIcon from "@assets/icons/Email";
import ProfileIcon from "@assets/icons/Profile";
import TicketIcon from "@assets/icons/Ticket";

export default function SideBarMenu() {
  return (
    <aside className="w-60 h-full bg-primary text-white font-medium">
      <ul className="menu w-full p-4 gap-2">
        <li>
          <a className="hover:bg-neutral">
            <DashboardIcon className="w-6" />
            Dashboard
          </a>
        </li>
        <li>
          <a href="#about" className="hover:bg-neutral">
            <TicketIcon className="w-6" />
            Novo chamado
          </a>
        </li>
        <li>
          <a href="#services" className="hover:bg-neutral">
            <EmailIcon className="w-6" />
            Email
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:bg-neutral">
            <ChatIcon className="w-6" />
            Chat
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:bg-neutral">
            <ProfileIcon className="w-6" />
            Perfil
          </a>
        </li>
      </ul>
    </aside>
  );
}
