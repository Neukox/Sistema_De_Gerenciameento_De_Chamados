import ChatIcon from "@assets/icons/Chat";
import EmailIcon from "@assets/icons/Email";
import { TicketServiceType } from "types/Ticket";

type TicketServiceProperties = {
  label: string;
  icon: React.ReactElement;
};

type TicketServiceContext = Record<TicketServiceType, TicketServiceProperties>;

/**
 * @component ServiceTypeTag
 * Exibe o tipo de serviço de um chamado com um ícone correspondente.
 *
 * @param {TicketServiceType} type - O tipo de serviço do chamado (email ou chat).
 * @returns {JSX.Element} Componente ServiceTypeTag renderizado.
 */
export default function ServiceTypeTag({ type }: { type: TicketServiceType }) {
  
  // Define as opções de serviço de ticket com rótulos e ícones correspondentes
  // O tipo de serviço pode ser "email" ou "chat"
  // O ícone correspondente é exibido ao lado do rótulo
  const ticketServiceOptions: TicketServiceContext = {
    email: {
      label: "E-mail",
      icon: <EmailIcon className="w-6" />,
    },
    chat: {
      label: "Chat",
      icon: <ChatIcon className="w-6" />,
    },
  };

  return (
    <div className="flex gap-2 items-center">
      {ticketServiceOptions[type].icon}
      {ticketServiceOptions[type].label}
    </div>
  );
}
