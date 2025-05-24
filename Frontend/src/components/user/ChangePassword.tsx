import Form from "@components/ui/form";
import { useToast } from "@context/ToastContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeUserPasswordData,
  changeUserPasswordSchema,
} from "@schemas/user/ChangeUserPasswordSchema";
import { changeUserPassword, UserResponse } from "@services/userServices";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

/**
 * @description Componente de formulário para alterar a senha do usuário.
 *
 * Esse componente exibe um formulário que permite ao usuário alterar sua senha.
 * Ao enviar o formulário, a nova senha é enviada para o servidor.
 *
 * @component
 * @param {number} userId - ID do usuário cuja senha será alterada.
 * @return {JSX.Element} O componente de formulário de alteração de senha renderizado.
 * */
export default function ChangeUserPasswordForm({ userId }: { userId: number }) {
  // Hook para exibir mensagens de toast
  const toast = useToast();

  // Função para lidar com o envio do formulário
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeUserPasswordData>({
    resolver: zodResolver(changeUserPasswordSchema),
  });

  // Hook para fazer atualização de senha
  const mutation = useMutation<
    UserResponse,
    AxiosError<UserResponse>,
    ChangeUserPasswordData
  >({
    mutationFn: (data) => changeUserPassword(userId, data.password),
    onSuccess: (data) => {
      // Limpa o formulário após o sucesso
      reset();
      // Exibe uma mensagem de sucesso
      toast?.show({
        message: data.message,
        type: "success",
        duration: 2000,
      });
    },
    onError: (error) => {
      // Exibe uma mensagem de erro
      toast?.show({
        message: error.response?.data?.message || error.response?.data?.error,
        type: "error",
        duration: 3000,
      });
    },
  });

  const onChangePassword = (data: ChangeUserPasswordData) => {
    mutation.mutate(data);
  };

  return (
    <form
      className="flex flex-col gap-4 flex-1"
      onSubmit={handleSubmit(onChangePassword)}
    >
      <Form.Field className="flex flex-col flex-1">
        <Form.Label htmlFor="password" className="text-black">
          Nova Senha
        </Form.Label>
        <Form.Password
          id="password"
          placeholder="Digite a sua nova senha"
          className="bg-base-100 w-full"
          {...register("password")}
        />
        {errors.password && <Form.Error>{errors.password.message}</Form.Error>}
      </Form.Field>
      <Form.Field className="flex flex-col flex-1">
        <Form.Label htmlFor="confirmPassword" className="text-black">
          Confirmar Nova Senha
        </Form.Label>
        <Form.Password
          id="confirmPassword"
          placeholder="Confirme a nova senha"
          className="bg-base-100 w-full"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <Form.Error>{errors.confirmPassword.message}</Form.Error>
        )}
      </Form.Field>
      <Form.Submit className="xs:self-end" disabled={mutation.isPending}>
        Alterar Senha
      </Form.Submit>
    </form>
  );
}
