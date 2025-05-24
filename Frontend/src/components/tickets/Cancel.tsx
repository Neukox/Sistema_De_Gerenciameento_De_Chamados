import React from "react";
import CloseIcon from "@assets/icons/Close";
import Submit from "@components/ui/form/Submit";
import { useToast } from "@context/ToastContext";
import { cancelTicket, TicketResponse } from "@services/ticketServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

type CancelTicketProps = {
  ticketID: number;
  ref: React.RefObject<HTMLDialogElement>;
};

/**
 * @description Componente para cancelar um chamado.
 *
 * Esse componente exibe um botão que, ao ser clicado, abre um diálogo de confirmação
 * para cancelar o chamado. Se o usuário confirmar, o chamado é cancelado e uma mensagem
 * de sucesso é exibida.
 *
 * @component
 * @param {number} ticketID - ID do chamado a ser cancelado.
 * @param {React.RefObject<HTMLDialogElement>} ref - Referência para o diálogo.
 * @returns {JSX.Element} O componente de cancelamento de chamado renderizado.
 */
export default function CancelTicket({ ticketID, ref }: CancelTicketProps) {
  // Hook para gerenciar toasts
  const toast = useToast();
  // Hook para gerenciar o cache de tickets
  const queryClient = useQueryClient();
  // Hook para gerenciar a mutação de cancelamento de ticket
  const mutation = useMutation<
    TicketResponse,
    AxiosError<TicketResponse>,
    number
  >({
    mutationFn: cancelTicket,
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

  // fecha o diálogo
  const close = () => {
    ref.current?.close();
  };

  return (
    <dialog className="modal" ref={ref}>
      <form
        method="dialog"
        className="modal-box"
        onSubmit={() => mutation.mutate(ticketID)}
      >
        <button
          type="button"
          className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
          onClick={close}
        >
          <CloseIcon className="w-5" />
        </button>
        <h3 className="font-bold text-lg">Cancelar chamado</h3>
        <p className="py-4">Você tem certeza que deseja cancelar o chamado?</p>
        <div className="modal-action">
          <Submit className="btn btn-primary" disabled={mutation.isPending}>
            Confirmar
          </Submit>
          <button type="button" className="btn btn-error" onClick={close}>
            Cancelar
          </button>
        </div>
      </form>
    </dialog>
  );
}
