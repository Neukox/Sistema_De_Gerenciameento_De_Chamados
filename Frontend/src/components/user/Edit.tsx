import Form from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditUserInfoData,
  editUserInfoSchema,
} from "@schemas/user/EditUserInfoSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { editUserInfo, UserResponse } from "@services/userServices";
import { AxiosError } from "axios";
import { useToast } from "@context/ToastContext";

type EditUserFormProps = {
  userID: number;
  userInfoToEdit: EditUserInfoData;
};

/**
 * @description Componente de formulário para editar informações do usuário.
 *
 * Esse componente exibe um formulário que permite ao usuário editar seu nome e email.
 * Ao enviar o formulário, as novas informações são enviadas para o servidor.
 *
 * @component
 * @param {number} userID - ID do usuário a ser editado.
 * @param {EditUserInfoData} userInfoToEdit - Informações atuais do usuário a serem editadas.
 * @returns {JSX.Element} O componente de formulário de edição de usuário renderizado.
 */

export default function EditUserForm({
  userID,
  userInfoToEdit,
}: EditUserFormProps) {
  // Hook para exibir mensagens de toast
  const toast = useToast();
  //Hook para gerenciar o estado do formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserInfoData>({
    resolver: zodResolver(editUserInfoSchema),
    defaultValues: {
      nome: userInfoToEdit.nome,
      email: userInfoToEdit.email,
    },
  });

  // Hook para gerenciar o cache de consultas
  const queryClient = useQueryClient();

  //Hook para enviar novas informações do usuário
  const mutation = useMutation<
    UserResponse,
    AxiosError<UserResponse>,
    EditUserInfoData
  >({
    mutationFn: (data) => editUserInfo(userID, data),
    onSuccess: (data) => {
      toast?.show({
        message: data.message,
        type: "success",
        duration: 2000,
      });

      queryClient.invalidateQueries({ queryKey: ["user", userID] });
    },
    onError: (error) => {
      toast?.show({
        message: error.response?.data.message || error.response?.data.error,
        type: "error",
        duration: 2000,
      });
    },
  });

  //Função para lidar com o envio do formulário
  const onEditUserInfo = (data: EditUserInfoData) => {
    mutation.mutate(data);
  };

  return (
    <form
      className="flex flex-col gap-4 flex-1"
      onSubmit={handleSubmit(onEditUserInfo)}
    >
      <Form.Field className="flex flex-col flex-1">
        <Form.Label htmlFor="nome" className="text-black">
          Nome
        </Form.Label>
        <Form.Input
          id="nome"
          type="text"
          placeholder="Nome"
          className="bg-base-100 w-full"
          {...register("nome")}
        />
        {errors.nome && <Form.Error>{errors.nome.message}</Form.Error>}
      </Form.Field>
      <Form.Field className="flex flex-col flex-1">
        <Form.Label htmlFor="email" className="text-black">
          Email
        </Form.Label>
        <Form.Input
          id="email"
          type="email"
          placeholder="Email"
          className="bg-base-100 w-full"
          {...register("email")}
        />
        {errors.email && <Form.Error>{errors.email.message}</Form.Error>}
      </Form.Field>
      <Form.Submit className="xs:self-end" disabled={mutation.isPending}>
        Salvar
      </Form.Submit>
    </form>
  );
}
