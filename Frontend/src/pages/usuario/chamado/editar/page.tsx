import EditTicketForm from "@components/tickets/Edit";
import FetchError from "@components/ui/FetchError";
import Loading from "@components/ui/Loading";
import { fetchTicketById, TicketResponse } from "@services/ticketServices";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router";
import { Ticket } from "types/Ticket";

/**
 * @description Página para editar um chamado existente.
 *
 * Essa página permite que o usuário edite as informações de um chamado específico.
 * Ela utiliza o hook useQuery para buscar os dados do chamado a partir do ID na URL.
 *
 * @component
 * @returns {JSX.Element} O componente da página de edição de chamado.
 */
export default function EditTicketPage() {
  // Obtém os parâmetros da URL, incluindo o ID do chamado
  const params = useParams();
  // Converte o ID do chamado para um número
  const id = Number(params.id);

  // Hook para buscar os dados do chamado a partir do ID
  const { data, isError, isLoading, error, refetch } = useQuery<
    Ticket,
    AxiosError<TicketResponse>
  >({
    queryKey: ["ticket", id],
    queryFn: () => fetchTicketById(id),
    enabled: !!id,
  });

  // Mostra um carregador enquanto os dados estão sendo buscados
  if (isLoading) return <Loading className="h-dvh" />;

  // Mostra um erro se a busca falhar
  if (isError)
    return (
      <FetchError
        title="Não foi possivel carregar as informações do chamado"
        message={error.response?.data?.message || error.message}
        action={refetch}
      />
    );

  return (
    <div className="place-items-center p-4">
      <div className="w-full max-w-screen-lg">
        <h1 className="mb-4">Editar Chamado #{data?.id}</h1>
        <div className="w-full bg-base-200 p-4 rounded-xl">
          {/* Formulário de edição do chamado */}
          <EditTicketForm
            ticketID={id}
            previousTicketData={{
              titulo: data?.titulo as string,
              descricao: data?.descricao as string,
            }}
          />
        </div>
      </div>
    </div>
  );
}
