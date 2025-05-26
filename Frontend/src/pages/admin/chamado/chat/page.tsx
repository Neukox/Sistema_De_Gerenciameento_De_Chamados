import ChatContainer from "@components/chat/Container";
import { fetchTicketById } from "@services/ticketServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Ticket } from "types/Ticket";

/**
 * @description Página de Chat do Chamado do Administrador.
 *
 * Esta página exibe os detalhes de um chamado específico e permite a interação via chat.
 *
 * @component
 * @returns {JSX.Element} O componente da página renderizado.
 */
export default function AdminTicketChatPage() {
  // Obtém os parâmetros da URL, incluindo o ID do chamado
  const params = useParams();
  // Converte o ID do chamado para um número
  const id = Number(params.id);

  // Hook para buscar os dados do chamado a partir do ID
  const { data: ticket } = useQuery<Ticket>({
    queryKey: ["ticket", id],
    queryFn: () => fetchTicketById(id),
    enabled: !!id,
  });

  return (
    <div className="min-h-[calc(100vh-5.0625rem)] place-items-center p-4">
      <div className="w-full max-w-screen-lg">
        <h1 className="mb-4">Chamado #{id}</h1>
        <div className="bg-base-200 p-4 rounded-xl">
          <div className="mb-6">
            <div className="flex flex-col gap-2 mb-4">
              <h2 className="text-xl font-bold">Título</h2>
              <p className="text-base">{ticket?.titulo}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Descrição</h2>
              <p className="text-base">{ticket?.descricao}</p>
            </div>
          </div>
          <ChatContainer />
        </div>
      </div>
    </div>
  );
}
