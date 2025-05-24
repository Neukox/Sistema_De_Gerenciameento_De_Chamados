import CloseIcon from "@assets/icons/Close";
import Submit from "@components/ui/form/Submit";
import { useToast } from "@context/ToastContext";
import {
  changeTicketStatus,
  FetchTicketsResponse,
  ChangeStatusTicketRequest,
} from "@services/ticketServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Form from "@components/ui/form";
import { AxiosError } from "axios";
import { TicketStatusType } from "types/Ticket";

type CancelTicketProps = {
  ticketID: number;
  ticketStatus?: string;
  ref: React.RefObject<HTMLDialogElement>;
};

/**
 * @description Componente para alterar o status de um chamado.
 *
 * Esse componente exibe um botão que, ao ser clicado, abre um diálogo para alterar o status do chamado.
 * Ele exibe um selecionador de status e, ao confirmar, altera o status do chamado.
 *
 * @component
 * @param {number} ticketID - ID do chamado a ser alterado.
 * @param {string} ticketStatus - Status atual do chamado.
 * @param {React.RefObject<HTMLDialogElement>} ref - Referência para o diálogo.
 * @returns {JSX.Element} O componente de alteração de status do chamado renderizado.
 */
export default function ChangeStatusTicket({
  ticketID,
  ticketStatus,
  ref,
}: CancelTicketProps) {
  // Hook para gerenciar toasts
  const toast = useToast();
  // Hook para gerenciar o cache de tickets
  const queryClient = useQueryClient();
  // Hook para gerenciar a mutação de cancelamento de ticket
  const mutation = useMutation<
    FetchTicketsResponse,
    AxiosError<FetchTicketsResponse>,
    ChangeStatusTicketRequest
  >({
    mutationFn: changeTicketStatus,
    onSuccess: (data) => {
      // Fecha o diálogo de cancelamento
      close();
      // Invalida a query de tickets para atualizar a pagina
      queryClient.invalidateQueries({ queryKey: ["ticket"] });
      // Adiciona um toast de sucesso
      toast?.show({
        message: data.message,
        type: "success",
        duration: 2000,
      });
    },
    onError: (error) => {
      // Adiciona um toast de erro
      toast?.show({
        message: error.message,
        type: "error",
        duration: 2000,
      });

      // Fecha o diálogo de cancelamento
      close();
    },
  });

  // Função para fechar o modali
  const close = () => {
    ref?.current?.close();
  };

  // Função para realizar o submit do formulário
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Previne o comportamento padrão do formulário
    event.preventDefault();
    //Pega os dados do formulário
    const formData = new FormData(event.currentTarget);
    // Pega o status do chamado
    const status = formData.get("status") as TicketStatusType;
    // Prepara os dados para a mutação
    const data: ChangeStatusTicketRequest = {
      id: ticketID,
      status: status,
    };
    // Executa a mutação
    mutation.mutate(data);
  };

  return (
    <dialog className="modal" ref={ref}>
      <div className="modal-box relative">
        <button
          type="button"
          className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
          onClick={close}
        >
          <CloseIcon className="w-5" />
        </button>
        <form method="dialog" onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg mb-4">Alterar status do chamado</h3>
          <Form.Field>
            <Form.Label htmlFor="status" className="text-base-content">
              Status
            </Form.Label>
            <Form.Select
              id="status"
              name="status"
              className="w-full shadow-md"
              defaultValue={ticketStatus}
            >
              <option value="aberto">Aberto</option>
              <option value="em andamento">Em Andamento</option>
              <option value="pendente">Pendente</option>
              <option value="resolvido">Resolvido</option>
              <option value="fechado">Fechado</option>
              <option value="cancelado">Cancelado</option>
            </Form.Select>
          </Form.Field>
          <div className="modal-action">
            <Submit className="btn btn-primary" disabled={mutation.isPending}>
              Confirmar
            </Submit>
            <button type="button" className="btn btn-error" onClick={close}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
