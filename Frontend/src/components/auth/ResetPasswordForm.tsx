import Form from "@components/ui/form/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ResetPasswordData,
  resetPasswordSchema,
} from "@schemas/auth/ResetPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import {
  AuthResponse,
  resetPassword,
  ResetPasswordRequest,
} from "@services/authServices";
import { Link, useSearchParams } from "react-router";
import { AxiosError } from "axios";
import { useToast } from "@context/ToastContext";

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
  const mutation = useMutation<
    AuthResponse,
    AxiosError<AuthResponse>,
    ResetPasswordRequest
  >({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      // Exibe uma mensagem de sucesso usando o hook de toast
      toast?.show({
        message: data.message || "Senha redefinida com sucesso.",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error) => {
      // Exibe uma mensagem de erro usando o hook de toast
      toast?.show({
        message:
          error.response?.data.message || "Houve um erro ao redefinir a senha.",
        type: "error",
        duration: 3000,
      });
    },
  });

  // Função chamada ao enviar o formulário
  const onResetPassword = (data: ResetPasswordData) => {
    const resetData: ResetPasswordRequest = {
      nova_senha: data.nova_senha,
      token: token || "",
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
              <Form.Password
                id="nova-senha"
                placeholder="Insira sua nova senha"
                className="w-full shadow-none"
                {...register("nova_senha")}
              />
              {errors.nova_senha && (
                <Form.Error>{errors.nova_senha?.message}</Form.Error>
              )}
            </Form.Field>
            <Form.Field className="flex-1">
              <Form.Label htmlFor="confirmar-senha">
                Confirmar nova senha
              </Form.Label>
              <Form.Password
                id="confirmar-nova-senha"
                placeholder="Confirme sua nova senha"
                className="w-full shadow-none"
                {...register("confirmar_nova_senha")}
              />
              {errors.confirmar_nova_senha && (
                <Form.Error>{errors.confirmar_nova_senha?.message}</Form.Error>
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
