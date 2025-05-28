import Form from "@components/ui/form";
import { useToast } from "@context/ToastContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditTicketData,
  editTicketSchema,
} from "@schemas/tickets/EditTicketSchema";
import { editTicket, TicketResponse } from "@services/ticketServices";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type EditTicketProps = {
  ticketID: number;
  previousTicketData: EditTicketData;
};

/**
 * @description Componente de formulário para editar um chamado existente.
 *
 * Esse componente permite que o usuário edite as informações de um chamado específico, incluindo título e descrição.
 *
 * @component
 * @param {number} ticketID - ID do chamado a ser editado.
 * @param {EditTicketData} previousTicketData - Dados anteriores do chamado, utilizados como valores padrão no formulário.
 * @returns {JSX.Element} O componente do formulário de edição de chamado.
 */
export default function EditTicketForm({
  ticketID,
  previousTicketData,
}: EditTicketProps) {
  // Hook para exibir mensagens de toast
  const toast = useToast();
  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // Hook para gerenciar o estado do formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTicketData>({
    resolver: zodResolver(editTicketSchema),
    defaultValues: {
      titulo: previousTicketData.titulo,
      descricao: previousTicketData.descricao,
    },
  });

  // Hook para fazer a mutação de edição do chamado
  const mutation = useMutation<
    TicketResponse,
    AxiosError<TicketResponse>,
    EditTicketData
  >({
    mutationFn: (data) => editTicket(ticketID, data),
    onSuccess: (data) => {
      // Exibe uma mensagem de sucesso
      toast?.show({
        message: data.message,
        type: "success",
        duration: 2000,
        onClose: () => {
          // Redireciona o usuário para a página do chamado editado
          navigate(`/chamado/${ticketID}`);
        },
      });
    },
    onError: (error) => {
      // Exibe uma mensagem de erro
      toast?.show({
        message: error.response?.data.message || "Erro ao editar chamado",
        type: "error",
        duration: 2000,
      });
    },
  });

  // Função chamada ao enviar o formulário, que chama a mutação de edição do chamado
  const onEdit = (data: EditTicketData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onEdit)}>
        <Form.Field className="flex flex-col">
          <Form.Label htmlFor="titulo">Título</Form.Label>
          <Form.Input
            id="titulo"
            type="text"
            placeholder="Digite o título do chamado"
            className="w-full"
            {...register("titulo")}
          />
          {errors.titulo && <Form.Error>{errors.titulo.message}</Form.Error>}
        </Form.Field>

        <Form.Field className="flex flex-col">
          <Form.Label htmlFor="descricao">Descrição</Form.Label>
          <Form.Textarea
            id="descricao"
            placeholder="Digite a descrição do chamado"
            className="w-full h-60"
            {...register("descricao")}
          />
          {errors.descricao && (
            <Form.Error>{errors.descricao.message}</Form.Error>
          )}
        </Form.Field>

        <Form.Submit className="xs:self-end" disabled={mutation.isPending}>
          Salvar
        </Form.Submit>
      </form>
    </>
  );
}
