import { Ticket } from "types/Ticket";
import StatusTag from "./Status";
import ServiceTypeTag from "./ServiceType";
import { Link } from "react-router";

/**
 * @description Componente de cartão para exibir informações de um chamado.
 *
 * Esse componente exibe o título, descrição, status e tipo de atendimento do chamado.
 * Ele é utilizado principalmente para listar os chamados.
 *
 * @component
 * @param {Ticket} data - Dados do chamado a serem exibidos.
 * @returns {JSX.Element} O componente de cartão renderizado.
 */
export default function TicketCard({ data }: { data: Ticket }) {
  return (
    <div className="card card-border min-h-72 xs:min-h-60 shadow-sm bg-base-100 w-full p-4 gap-4">
      <div className="flex flex-col xs:flex-row justify-between gap-x-4 gap-y-1">
        <span className="font-semibold">Chamado #{data.id}</span>
        {data.data_encerramento ? (
          <span>
            Encerrado em: {data.data_encerramento}
          </span>
        ) : (
          <span>Criado em: {data.data_criacao}</span>
        )}
      </div>
      <div className="card-body p-0">
        <h2 className="card-title text-2xl">{data.titulo}</h2>
        <p className="line-clamp-2 xs:line-clamp-3 text-base">
          {data.descricao}
        </p>
      </div>
      <div className="card-actions flex-col xs:flex-row h-fit items-center justify-between">
        <div className="flex justify-between items-center self-stretch xs:self-auto gap-4">
          <ServiceTypeTag type={data.tipo_atendimento} />
          <StatusTag type={data.status} />
        </div>
        <Link
          to={`/chamado/${data.id}`}
          className="btn btn-primary self-stretch xs:self-auto"
        >
          Ver mais
        </Link>
      </div>
    </div>
  );
}
