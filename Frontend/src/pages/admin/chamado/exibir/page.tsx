import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchTicketById } from "@services/ticketServices";
import StatusTag from "@components/tickets/Status";
import { Ticket, TicketServiceType, TicketStatusType } from "types/Ticket";
import ServiceTypeTag from "@components/tickets/ServiceType";
import Loading from "@components/ui/Loading";
import FetchError from "@components/ui/FetchError";
import { AxiosError } from "axios";
import { useRef } from "react";
import ChangeStatusTicket from "@components/tickets/ChangeStatus";
import SendMessage from "@components/email/Send";

/**
 * @description Página de informações do chamado (admin).
 *
 * Essa página exibe os detalhes de um chamado específico, incluindo título, descrição,
 * status e tipo de atendimento. O administrador pode editar o chamado, alterar o status do chamado ou entrar em um chat.
 *
 * @component
 * @returns {JSX.Element} O componente da página renderizado.
 * */

export default function AdminTicketInfoPage() {
  // ref para o modal de alteração de status e envio de email
  const changeStatusDialog = useRef<HTMLDialogElement>(null);
  const sendMessageDialog = useRef<HTMLDialogElement>(null);
  // Obtém os parâmetros da URL, incluindo o ID do chamado
  const params = useParams();
  // Hook para navegar entre páginas
  const navigate = useNavigate();
  // Converte o ID do chamado para um número
  const id = Number(params.id);
  // Hook para buscar os dados do chamado a partir do ID
  const {
    data: ticket,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Ticket, AxiosError>({
    queryKey: ["ticket", id],
    queryFn: () => fetchTicketById(id),
    enabled: !!id,
  });

  // Verifica se o chamado está fechado/cancelado
  const isClosed =
    ticket?.status === "fechado" || ticket?.status === "cancelado";

  // Mostra um carregador enquanto os dados estão sendo buscados
  if (isLoading) return <Loading className="h-dvh" />;

  // Mostra um erro se a busca falhar
  if (isError)
    return (
      <FetchError
        title="Não foi possivel carregar as informações do chamado"
        message={
          error?.response?.status === 404
            ? "Chamado não encontrado"
            : error.message
        }
        action={refetch}
      />
    );

  return (
    <>
      <div className="place-items-center">
        <div className="w-full max-w-screen-lg p-4">
          <h1 className="mb-4">Chamado #{ticket?.id}</h1>
          <div className="w-full bg-base-200 p-4 rounded-xl flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-2">
                <div className="">
                  <span className="font-bold text-lg mb-4">
                    Chamado por {ticket?.tipo_atendimento}
                  </span>
                  <span className="block font-meduim">
                    Por: {ticket?.usuario_nome}
                  </span>
                </div>
                <ServiceTypeTag
                  type={ticket?.tipo_atendimento as TicketServiceType}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Título</h2>
                <p className="text-base">{ticket?.titulo}</p>
              </div>
              <div className="flex flex-col gap-2 min-h-40">
                <h2 className="text-xl font-bold">Descrição</h2>
                <p className="text-base">{ticket?.descricao}</p>
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <StatusTag type={ticket?.status as TicketStatusType} />
                {ticket?.data_encerramento ? (
                  <span>Encerrado em: {ticket?.data_encerramento}</span>
                ) : (
                  <span>Criado em: {ticket?.data_criacao}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-x-8 gap-y-4">
              {ticket?.tipo_atendimento === "chat" && (
                <button
                  className="btn btn-accent text-white disabled:bg-accent/65! disabled:text-white/50"
                  onClick={() => navigate(`/chamado/${ticket?.id}/chat`)}
                  disabled={isClosed}
                >
                  Entrar em chat
                </button>
              )}
              {ticket?.tipo_atendimento === "email" && (
                <button
                  className="btn btn-accent text-white disabled:bg-accent/65! disabled:text-white/50"
                  onClick={() => sendMessageDialog.current?.showModal()}
                  disabled={isClosed}
                >
                  Enviar E-mail
                </button>
              )}
              <button
                className="btn btn-primary disabled:bg-primary/65! disabled:text-primary-content/50"
                disabled={isClosed}
                onClick={() => changeStatusDialog.current?.showModal()}
              >
                Alterar Status
              </button>
              <button
                className="btn btn-primary disabled:bg-primary/65! disabled:text-primary-content/50"
                disabled={isClosed}
                onClick={() => navigate(`/chamado/${ticket?.id}/editar`)}
              >
                Editar chamado
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal para alterar o status do chamado */}
      <ChangeStatusTicket
        ref={changeStatusDialog as React.RefObject<HTMLDialogElement>}
        ticketID={ticket?.id as number}
        ticketStatus={ticket?.status}
      />
      {/* Modal para enviar email */}
      {ticket?.tipo_atendimento === "email" && (
        <SendMessage
          ref={sendMessageDialog as React.RefObject<HTMLDialogElement>}
          ticketID={ticket?.id}
          userID={ticket?.usuario_id}
        />
      )}
    </>
  );
}
