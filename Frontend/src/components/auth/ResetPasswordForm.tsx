import Form from "@components/ui/form/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ResetPasswordData,
  resetPasswordSchema,
} from "@schemas/auth/ResetPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@services/authServices";
import { Link, useSearchParams } from "react-router";
import axios from "axios";
import { useToast } from "@context/ToastContext";
import useError from "@hooks/useErrors";

/**
 * Componente funcional React que renderiza um formulário de redefinição de senha.
 *
 * Este componente exibe campos para entrada de e-mail, nova senha e confirmação da nova senha, além de um botão para redefinir a senha.
 *
 * @component
 * @return {JSX.Element} O formulário de redefinição de senha renderizado.
 */
export default function RegisterForm() {
  // Hook para exibir mensagens de toast
  const toast = useToast();
  // Hook para gerenciar o estado do erro
  const { error: fecthError, addError, clearError } = useError();

  // Hook para capturar parâmetros de busca na URL
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Hook para gerenciar a mutação de redefinição de senha
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      // Exibe uma mensagem de sucesso usando o hook de toast
      toast?.show({
        message: data.mensagem,
        type: "success",
        duration: 3000,
        onClose: clearError,
      });
    },
    onError: (error) => {
      // Verifica se o erro é do tipo AxiosError
      if (axios.isAxiosError(error)) {
        // Se o erro for do tipo AxiosError, exibe a mensagem de erro
        addError(
          error.response?.data.mensagem ||
            error.response?.data.erro ||
            "Erro ao redefinir senha. Tente novamente."
        );
      } else {
        // Caso contrário, exibe uma mensagem genérica
        addError("Erro ao redefinir senha. Tente novamente.");
      }

      // Exibe uma mensagem de erro usando o hook de toast
      toast?.show({
        message: fecthError,
        type: "error",
        duration: 3000,
        onClose: clearError,
      });
    },
  });

  // Função chamada ao enviar o formulário
  const onResetPassword = (data: ResetPasswordData) => {
    // Tratando os dados do formulário
    if (!token) {
      toast?.show({
        message: "Token inválido ou não fornecido.",
        type: "error",
        duration: 3000,
      });
      return;
    }
    const resetData = {
      newPassword: data.newPassword,
      token,
    };

    // Executando a mutação para redefinir a senha
    mutation.mutate(resetData);
  };

  return (
    <>
      <div className="w-full max-w-[25rem] flex flex-col gap-10 p-8 bg-base-100 rounded-xl shadow-xl shadow-gray-700">
        <div className="text-center">
          <h1>Redefina sua senha</h1>
        </div>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onResetPassword)}
        >
          <div className="flex flex-col gap-6">
            <Form.Field className="flex-1">
              <Form.Label htmlFor="senha">Nova senha</Form.Label>
              <Form.Input
                id="nova-senha"
                type="password"
                placeholder="Insira uma nova senha"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <Form.Error>{errors.newPassword?.message}</Form.Error>
              )}
            </Form.Field>
            <Form.Field className="flex-1">
              <Form.Label htmlFor="confirmar-senha">
                Confirmar nova senha
              </Form.Label>
              <Form.Input
                id="confirmar-nova-senha"
                type="password"
                placeholder="Confirme a sua nova senha"
                {...register("confirmNewPassword")}
              />
              {errors.confirmNewPassword && (
                <Form.Error>{errors.confirmNewPassword?.message}</Form.Error>
              )}
            </Form.Field>
          </div>
          <Link to="/login" className="link link-primary text-center">
            Ir para login
          </Link>
          <Form.Submit className="flex-1 p-2" disabled={mutation.isPending}>
            Redefinir
          </Form.Submit>
        </form>
      </div>
    </>
  );
}
