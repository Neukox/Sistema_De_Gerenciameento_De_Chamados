import CloseIcon from "@assets/icons/Close";
import Submit from "@components/ui/form/Submit";
import { useToast } from "@context/ToastContext";
import useError from "@hooks/useErrors";
import { cancelTicket } from "@services/ticketServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRef } from "react";

type CancelTicketProps = {
  ticketID: number;
  disabled?: boolean;
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
 * @param {boolean} disabled - Indica se o botão deve estar desabilitado.
 * @returns {JSX.Element} O componente de cancelamento de chamado renderizado.
 */
export default function CancelTicket({
  ticketID,
  disabled,
}: CancelTicketProps) {
  // Hook para gerenciar erros
  const { error, addError, clearError } = useError();
  // Hook para gerenciar toasts
  const toast = useToast();
  // Referência para o diálogo de cancelamento (modal)
  const cancelDialog = useRef<HTMLDialogElement>(null);
  // Hook para gerenciar o cache de tickets
  const queryClient = useQueryClient();
  // Hook para gerenciar a mutação de cancelamento de ticket
  const mutation = useMutation({
    mutationFn: cancelTicket,
    onSuccess: (data) => {
      cancelDialog.current?.close();
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
      if (isAxiosError(error)) {
        addError(error.response?.data.message || error.response?.data.error);
      } else {
        addError("Erro ao cancelar chamado");
      }

      // Adiciona um toast de erro
      toast?.show({
        message: error.message,
        type: "error",
        duration: 2000,
        onClose: clearError,
      });

      // Fecha o diálogo de cancelamento
      cancelDialog.current?.close();
    },
  });
  return (
    <>
      <button
        className="btn btn-error disabled:bg-error/65!"
        disabled={disabled}
        onClick={() => {
          cancelDialog.current?.showModal();
        }}
      >
        Cancelar chamado
      </button>
      <dialog
        className="modal"
        ref={cancelDialog}
        onSubmit={() => mutation.mutate(ticketID)}
      >
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2">
            <CloseIcon className="w-5" />
          </button>
          <h3 className="font-bold text-lg">Cancelar chamado</h3>
          <p className="py-4">
            Você tem certeza que deseja cancelar o chamado?
          </p>
          {error && <p className="text-red-500">{error}</p>}
          <div className="modal-action">
            <Submit className="btn btn-primary">Confirmar</Submit>
            <button className="btn btn-error">Cancelar</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
