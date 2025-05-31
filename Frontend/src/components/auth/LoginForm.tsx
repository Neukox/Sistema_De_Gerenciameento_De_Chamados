import Form from "@components/ui/form/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { LoginData, loginSchema } from "@schemas/auth/LoginSchema";
import { useMutation } from "@tanstack/react-query";
import { login, LoginResponse } from "@services/authServices";
import { AxiosError } from "axios";
import { useToast } from "@context/ToastContext";
import { useAuth } from "@context/AuthContext";

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

  // Hook para autenticação
  const { setSession } = useAuth();

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
  const mutation = useMutation<
    LoginResponse,
    AxiosError<LoginResponse>,
    LoginData
  >({
    mutationFn: login,
    onSuccess: (data) => {
      // Armazena o token e o usuário na sessão
      setSession(data.token, data.user);
      // navega para a página raiz após o login
      navigate("/");
    },
    onError: (error) => {
      // Exibe um toast com a mensagem de erro
      toast?.show({
        message:
          error.response?.data.message || "Houve um erro ao fazer login.",
        type: "error",
        duration: 3000,
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
              <Form.Password
                id="senha"
                placeholder="Insira sua senha"
                className="w-full shadow-none"
                {...register("senha")}
              />
              {errors.senha && <Form.Error>{errors.senha?.message}</Form.Error>}
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
