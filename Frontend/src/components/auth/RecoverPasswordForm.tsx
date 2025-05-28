import Form from "@components/ui/form/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import {
  RecoverPasswordData,
  recoverPasswordSchema,
} from "@schemas/auth/RecoverPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import { recoverPassword, AuthResponse } from "@services/authServices";
import { AxiosError } from "axios";
import { useToast } from "@context/ToastContext";

/**
 * Componente funcional React que renderiza um formulário de recuperação de senha.
 *
 * Este componente exibe um campo para entrada de e-mail e um botão para enviar
 * a solicitação de recuperação de senha. Também inclui um link para retornar à
 * página de login.
 *
 * @component
 * @return {JSX.Element} O formulário de recuperação de senha renderizado.
 */
export default function RecoverPasswordForm() {
  // Hook para exibir mensagens de toast
  const toast = useToast();
  // Hook para gerenciar o estado do formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordData>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  // Hook para gerenciar a mutação de login
  const mutation = useMutation<
    AuthResponse,
    AxiosError<AuthResponse>,
    RecoverPasswordData
  >({
    mutationFn: recoverPassword,
    onSuccess: (data) => {
      // Exibe uma mensagem de sucesso usando o hook de toast
      toast?.show({
        message: data.message || "E-mail enviado com sucesso.",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error) => {
      // Exibe a mensagem de erro usando o hook de toast
      toast?.show({
        message:
          error.response?.data.message || "Houve um erro ao recuperar a senha.",
        type: "error",
        duration: 3000,
      });
    },
  });

  // Função chamada ao enviar o formulário
  const onRecoverPassword = (data: RecoverPasswordData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="w-full max-w-[25rem] flex flex-col gap-10 p-8 bg-base-100 rounded-xl shadow-xl shadow-gray-700">
        <div className="text-center">
          <h1 className="mb-4">Recuperar Senha</h1>
          <p className="font-medium">
            Insira o seu e-mail para recuperar sua senha
          </p>
        </div>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onRecoverPassword)}
        >
          <Form.Field className="flex-1">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input
              id="email"
              type="email"
              placeholder="Insira seu e-mail"
              {...register("email")}
            />
            {errors.email && <Form.Error>{errors.email?.message}</Form.Error>}
          </Form.Field>
          <Link to="/login" className="link link-primary text-center">
            Voltar para login
          </Link>
          <Form.Submit className="flex-1 p-2" disabled={mutation.isPending}>
            Enviar
          </Form.Submit>
        </form>
      </div>
    </>
  );
}
