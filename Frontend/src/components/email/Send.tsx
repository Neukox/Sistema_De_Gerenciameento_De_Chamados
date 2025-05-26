import React from "react";
import CloseIcon from "@assets/icons/Close";
import Form from "@components/ui/form";
import { useToast } from "@context/ToastContext";
import useUserInfo from "@hooks/useUserInfo";
import {
  TicketResponse,
  sendMessage,
  SendMessageTicketRequest,
} from "@services/ticketServices";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

type SendMessageProps = {
  ticketID: number;
  userID: number;
  ref: React.RefObject<HTMLDialogElement>;
};

type SendMessageForm = {
  mensagem: string;
};

export default function SendMessage({
  ticketID,
  userID,
  ref,
}: SendMessageProps) {
  // Hook para gerenciar o estado do toast
  const toast = useToast();
  // Hook para pegar infomação de usuário (administrador)
  const user = useUserInfo();
  // hook para gerenciar o formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SendMessageForm>();
  // Hook para gerenciar a mutação de cancelamento de ticket
  const mutation = useMutation<
    TicketResponse,
    AxiosError<TicketResponse>,
    SendMessageTicketRequest
  >({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      // Adiciona um toast de sucesso
      toast?.show({
        message: data.message,
        type: "success",
        duration: 2000,
        onClose: reset,
      });
      // Fecha o diálogo de cancelamento
      close();
    },
    onError: (error) => {
      // Adiciona um toast de erro
      toast?.show({
        message: error.response?.data.message || "Erro ao enviar mensagem",
        type: "error",
        duration: 2000,
        onClose: reset,
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
  const onSubmit = (data: SendMessageForm) => {
    // Verifica se o usuário está logado
    if (!user || user?.role !== "admin") {
      // Adiciona um toast de erro se o usuário não estiver autenticado
      toast?.show({
        message:
          "Você precisa estar logado como administrador para enviar mensagens.",
        type: "error",
        duration: 2000,
      });
      return;
    }
    // Chama a mutação para enviar a mensagem
    mutation.mutate({
      id: ticketID,
      admin_id: user.id,
      usuario_id: userID,
      mensagem: data.mensagem,
    });

    console.log("dados enviados:", {
      id: ticketID,
      admin_id: user.id,
      usuario_id: userID,
      mensagem: data.mensagem,
    });
  };

  return (
    <dialog className="modal" ref={ref}>
      <div className="modal-box max-w-160 relative">
        <button
          type="button"
          className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
          onClick={close}
        >
          <CloseIcon className="w-5" />
        </button>
        <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg mb-4">Enviar mensagem de e-mail</h3>
          <Form.Field>
            <Form.Label htmlFor="mensagem" className="text-base-content">
              Mensagem
            </Form.Label>
            <Form.Textarea
              id="mensagem"
              placeholder="Digite sua mensagem aqui..."
              className="w-full h-40 bg-base-200"
              {...register("mensagem", {
                required: "Campo obrigatório",
              })}
            />
            {errors.mensagem && (
              <Form.Error>{errors?.mensagem.message}</Form.Error>
            )}
          </Form.Field>
          <div className="modal-action">
            <Form.Submit
              className="btn btn-primary"
              disabled={mutation.isPending}
            >
              Enviar
            </Form.Submit>
            <button type="button" className="btn btn-error" onClick={close}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
