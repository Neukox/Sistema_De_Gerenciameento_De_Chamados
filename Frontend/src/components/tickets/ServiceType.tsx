import ChatIcon from "@assets/icons/Chat";
import EmailIcon from "@assets/icons/Email";
import { TicketServiceType } from "types/Ticket";

type TicketServiceProperties = {
  label: string;
  icon: React.ReactElement;
};

type TicketServiceContext = Record<TicketServiceType, TicketServiceProperties>;

export default function ServiceTypeTag({ type }: { type: TicketServiceType }) {
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
