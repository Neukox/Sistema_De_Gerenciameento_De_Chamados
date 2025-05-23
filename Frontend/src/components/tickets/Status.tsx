import { TicketStatusType } from "types/Ticket";

type TicketStatusProperties = {
  label: string;
  classname: string;
};

type TicketStatusContext = Record<TicketStatusType, TicketStatusProperties>;

/**
 * @component Exibe o status de um chamado com uma cor correspondente.
 *
 * @param {TicketStatusType} type - O status do chamado (aberto, em andamento, pendente, resolvido, fechado ou cancelado).
 * @returns {JSX.Element} Componente StatusTag renderizado.
 */
export default function StatusTag({ type }: { type: TicketStatusType }) {
  
  // Define as opções de status de ticket com rótulos e classes correspondentes
  // O status pode ser "aberto", "em andamento", "pendente", "resolvido", "fechado" ou "cancelado"
  // A classe correspondente é usada para estilizar o badge
  // O rótulo correspondente é exibido dentro do badge
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
