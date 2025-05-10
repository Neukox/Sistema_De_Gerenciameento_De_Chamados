import { TicketStatusType } from "types/Ticket";

type TicketStatusProperties = {
  label: string;
  classname: string;
};

type TicketStatusContext = Record<TicketStatusType, TicketStatusProperties>;

export default function StatusTag({ type }: { type: TicketStatusType }) {
  const status: TicketStatusContext = {
    aberto: {
      label: "Aberto",
      classname: "bg-aberto text-white",
    },
    "em andamento": {
      label: "Em andamento",
      classname: "bg-andamento",
    },
    pendente: {
      label: "Pendente",
      classname: "bg-pendente",
    },
    resolvido: {
      label: "Resolvido",
      classname: "bg-resolvido text-white",
    },
    fechado: {
      label: "Fechado",
      classname: "bg-fechado",
    },
    cancelado: {
      label: "Cancelado",
      classname: "bg-cancelado text-white",
    },
  };

  return (
    <div className={`badge ${status[type].classname} p-4 rounded-4xl`}>
      {status[type].label}
    </div>
  );
}
