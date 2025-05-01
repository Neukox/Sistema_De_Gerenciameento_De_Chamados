import ChatIcon from "@assets/icons/Chat";
import CloseIcon from "@assets/icons/Close";
import DashboardIcon from "@assets/icons/Dashboard";
import EmailIcon from "@assets/icons/Email";
import ProfileIcon from "@assets/icons/Profile";
import TicketIcon from "@assets/icons/Ticket";
import logo from "@assets/logo.png";

/**
 * @description Componente de Menu Lateral (Sidebar) para navegação.
 *
 * Esse componente exibe um menu lateral que pode ser aberto ou fechado.
 * Ele é utilizado principalmente em dispositivos móveis, mas também é exibido em telas maiores.
 *
 * @component
 * @param {boolean} isOpen - Indica se o menu lateral está aberto ou fechado.
 * @param {function} [onCloseSidebar] - Função a ser chamada quando o menu lateral for fechado.
 * @returns {JSX.Element} O componente de Menu Lateral renderizado.
 * */
export default function SidebarMenu({
  isOpen,
  onCloseSidebar,
}: {
  isOpen: boolean;
  onCloseSidebar?: () => void;
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 md:hidden bg-black/50 backdrop-blur-sm"
          onClick={onCloseSidebar}
        ></div>
      )}

      <aside
        className={`${
          isOpen ? "block md:hidden" : "hidden md:block"
        } fixed top-0 left-0 md:relative z-20 h-full md:w-fit`}
      >
        <nav className="w-60 md:w-fit h-full bg-primary text-white font-medium p-2 md:p-4">
          <div className="flex md:hidden justify-between items-center px-2 gap-2">
            <img src={logo} alt="Logo" className="w-20" />
            <button
              className="btn btn-neutral btn-ghost p-2"
              onClick={onCloseSidebar}
            >
              <CloseIcon className="w-6 cursor-pointer" />
            </button>
          </div>
          <ul className="menu w-full p-0 gap-2">
            <li>
              <a className="flex hover:bg-neutral items-center gap-2">
                <DashboardIcon className="w-6" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a className="flex hover:bg-neutral items-center gap-2">
                <TicketIcon className="w-6" />
                <span>Novo chamado</span>
              </a>
            </li>
            <li>
              <a className="flex hover:bg-neutral items-center gap-2">
                <EmailIcon className="w-6" />
                <span>Email</span>
              </a>
            </li>
            <li>
              <a className="flex hover:bg-neutral items-center gap-2">
                <ChatIcon className="w-6" />
                <span>Chat</span>
              </a>
            </li>
            <li>
              <a className="flex hover:bg-neutral items-center gap-2">
                <ProfileIcon className="w-6" />
                <span>Perfil</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
