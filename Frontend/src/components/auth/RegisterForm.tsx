import Form from "@components/ui/form/";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { RegisterData, registerSchema } from "@schemas/auth/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterResponse, registerUser } from "@services/authServices";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@context/ToastContext";
import useError from "@hooks/useErrors";

/**
 * Componente funcional React que renderiza um formulário de registro.
 *
 * Este componente exibe um campo para entrada de nome, e-mail, senha, confirmar senha e um botão para cadastrar o usuário, além de um link para login.
 *
 * @component
 * @return {JSX.Element} O formulário de recuperação de senha renderizado.
 */
export default function RegisterForm() {
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
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  // Hook para gerenciar a mutação de login
  const mutation = useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: registerUser,
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
        addError(
          error.response?.data.mensagem ||
            error.response?.data.erro ||
            "Erro ao fazer o cadastro. Tente novamente."
        );
      } else {
        // Caso contrário, exibe uma mensagem genérica
        addError("Erro ao fazer o cadastro. Tente novamente.");
      }

      // Exibe a mensagem de erro
      toast?.show({
        message: fecthError,
        type: "error",
        duration: 3000,
        onClose: clearError,
      });
    },
  });

  // Função chamada ao enviar o formulário
  const onRegister = (data: RegisterData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="w-full max-w-[40rem] flex flex-col gap-10 p-8 bg-base-100 rounded-xl shadow-xl shadow-gray-700">
        <div className="text-center">
          <h1 className="mb-4">Cadastro</h1>
          <p className="font-medium">
            Preencha os campos abaixo para criar sua conta.
          </p>
        </div>
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(onRegister)}
        >
          <div className="flex flex-wrap gap-6">
            <Form.Field className="flex-1 basis-48">
              <Form.Label htmlFor="nome">Nome</Form.Label>
              <Form.Input
                id="nome"
                type="text"
                placeholder="Registre seu nome"
                {...register("name")}
              />
              {errors.name && <Form.Error>{errors.name?.message}</Form.Error>}
            </Form.Field>
            <Form.Field className="flex-1 basis-48">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Input
                id="email"
                type="email"
                placeholder="Insira seu e-mail"
                {...register("email")}
              />
              {errors.email && <Form.Error>{errors.email?.message}</Form.Error>}
            </Form.Field>
            <Form.Field className="flex-1 basis-48">
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
            <Form.Field className="flex-1 basis-48">
              <Form.Label htmlFor="confirmar-senha">Confirmar Senha</Form.Label>
              <Form.Input
                id="confirmar-senha"
                type="password"
                placeholder="Confirme sua senha"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <Form.Error>{errors.confirmPassword?.message}</Form.Error>
              )}
            </Form.Field>
          </div>
          <div className="flex flex-col gap-4 xs:flex-row">
            <Form.Submit className="flex-1 p-2" disabled={mutation.isPending}>
              Cadastrar
            </Form.Submit>
            <Link
              to="/login"
              className="btn btn-secondary flex-1 p-2 text-white"
            >
              Faça seu login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
