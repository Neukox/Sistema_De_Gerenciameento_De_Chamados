import Form from "@components/ui/form/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { LoginData, loginSchema } from "@schemas/auth/LoginSchema";
import { useMutation } from "@tanstack/react-query";
import { login, LoginResponse } from "@services/authServices";
import axios from "axios";
import { useToast } from "@context/ToastContext";
import useError from "@hooks/useErrors";

/**
 * Componente funcional React que renderiza um formulário de login.
 *
 * Este componente exibe campos para entrada de e-mail e senha, além de links
 * para recuperação de senha e cadastro de novos usuários.
 *
 * @component
 * @return {JSX.Element} O formulário de login renderizado.
 */
export default function LoginForm() {
  // Hook para exibir mensagens de toast
  const toast = useToast();
  // Hook para exibir mensagens de erro
  const { error: fecthError, addError, clearError } = useError();

  // Hook para navegação
  const navigate = useNavigate();

  // Hook para gerenciar o estado do formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  // Função chamada ao enviar o formulário
  const onLogin = (data: LoginData) => {
    mutation.mutate(data);
  };

  // Hook para gerenciar a mutação de login
  const mutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: login,
    onSuccess: (data) => {
      // Armazena o token e a sessão no sessionStorage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("session", JSON.stringify(data.session));

      // Redireciona o usuário para a página inicial após o login
      navigate("/");
    },
    onError: (error) => {
      // Verifica se o erro é do tipo AxiosError
      if (axios.isAxiosError(error)) {
        // Se o erro for do tipo AxiosError, exibe a mensagem de erro
        addError(error.response?.data.mensagem || "Erro ao fazer login.");
      } else {
        // Caso contrário, exibe uma mensagem genérica
        addError("Erro ao fazer login.");
      }

      // Exibe um toast com a mensagem de erro
      toast?.show({
        message: fecthError,
        type: "error",
        duration: 3000,
        onClose: clearError,
      });
    },
  });

  return (
    <>
      <div className="w-full max-w-[25rem] flex flex-col gap-10 p-8 bg-base-100 rounded-xl shadow-xl shadow-gray-700">
        <div className="text-center">
          <h1 className="mb-4">Login</h1>
          <p className="font-medium">
            Preencha os campos abaixo com os seus dados de acesso
          </p>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onLogin)}>
          <div className="flex flex-col gap-6">
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
            <Form.Field className="flex-1">
              <Form.Label htmlFor="senha">Senha</Form.Label>
              <Form.Input
                id="senha"
                type="password"
                placeholder="Insira uma senha"
                {...register("password")}
              />
              {errors.password && (
                <Form.Error>{errors.password?.message}</Form.Error>
              )}
            </Form.Field>
          </div>
          <Link to="/recuperar-senha" className="link link-primary text-center">
            Esqueceu sua senha?
          </Link>
          <div className="flex flex-col gap-4">
            <Form.Submit className="flex-1 p-2" disabled={mutation.isPending}>
              Acessar
            </Form.Submit>
            <Link
              to="/cadastro"
              className="btn btn-secondary flex-1 p-2 text-white"
            >
              Faça seu cadastro
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
