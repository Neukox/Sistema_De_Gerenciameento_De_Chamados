import ServiceTypeTag from "@components/tickets/ServiceType";
import Form from "@components/ui/form";
import { useToast } from "@context/ToastContext";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserInfo from "@hooks/useUserInfo";
import {
  CreateTicketData,
  createTicketSchema,
} from "@schemas/tickets/CreateTicketSchema";
import {
  CreateTicketRequest,
  CreateTicketResponse,
  submitTicket,
} from "@services/ticketServices";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

/**
 * @description Página de criação de chamado.
 *
 * Essa página permite ao usuário criar um novo chamado, selecionando o tipo de atendimento,
 * preenchendo o título e a descrição do chamado.
 *
 * @component
 * @returns {JSX.Element} O componente da página renderizado.
 */

export default function CreateTicketPage() {
  // Hook para exibir mensagens de toast
  const toast = useToast();
  // Hook para buscar informações do usuário
  const user = useUserInfo();
  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // Hook para gerenciar o formulário de criação de chamado
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTicketData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      tipo_atendimento: "email",
    },
  });

  // Hook para gerenciar a mutação de criação de chamado
  const mutation = useMutation<
    CreateTicketResponse,
    AxiosError<CreateTicketResponse>,
    CreateTicketRequest
  >({
    mutationFn: submitTicket,
    onSuccess: (data) => {
      //Exibe uma mensagem de sucesso
      toast?.show({
        message: data.message,
        type: "success",
        duration: 2000,
        onClose: () => {
          // Redireciona o usuário para a página de chamados após a criação
          navigate(`/chamado/${data.chamado_id}`);
        },
      });
    },
    onError: (error) => {
      // Exibe uma mensagem de erro
      toast?.show({
        message: error.response?.data.message || "Erro ao criar chamado",
        type: "error",
        duration: 3000,
      });
    },
  });

  // Função chamada ao enviar o formulário
  const onCreate = (data: CreateTicketData) => {
    const ticket = {
      ...data,
      usuario_id: Number(user?.id),
    };

    mutation.mutate(ticket);
  };

  return (
    <div className="place-items-center p-4">
      <div className="w-full max-w-screen-lg">
        <h1 className="mb-4">Criar Novo Chamado</h1>
        <div className="w-full bg-base-200 p-4 rounded-xl">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onCreate)}
          >
            <Form.Field className="flex flex-wrap gap-x-4 justify-between">
              <p className="font-bold text-xl mb-2">Tipo de Atendimento</p>
              <div className="flex gap-4 mb-2">
                <label
                  htmlFor="tipo_atendimento_email"
                  className="px-1 hover:border-b-2 hover:border-b-base-content flex items-center has-[input:checked]:border-b-2 has-[input:checked]:border-b-base-content cursor-pointer"
                >
                  <input
                    type="radio"
                    id="tipo_atendimento_email"
                    value="email"
                    className="sr-only"
                    {...register("tipo_atendimento")}
                  />
                  <ServiceTypeTag type="email" />
                </label>
                <label
                  htmlFor="tipo_atendimento_chat"
                  className="px-1 hover:border-b-2 hover:border-b-base-content flex items-center has-[input:checked]:border-b-2 has-[input:checked]:border-b-base-content cursor-pointer"
                >
                  <input
                    type="radio"
                    id="tipo_atendimento_chat"
                    value="chat"
                    className="sr-only"
                    {...register("tipo_atendimento")}
                  />
                  <ServiceTypeTag type="chat" />
                </label>
              </div>
            </Form.Field>
            <Form.Field className="flex flex-col">
              <Form.Label htmlFor="titulo">Título</Form.Label>
              <Form.Input
                id="titulo"
                type="text"
                placeholder="Digite o título do chamado"
                className="w-full"
                {...register("titulo")}
              />
              {errors.titulo && (
                <Form.Error>{errors.titulo.message}</Form.Error>
              )}
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
              Criar Chamado
            </Form.Submit>
          </form>
        </div>
      </div>
    </div>
  );
}
