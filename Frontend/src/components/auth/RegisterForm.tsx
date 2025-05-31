import Form from "@components/ui/form/";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { RegisterData, registerSchema } from "@schemas/auth/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterRequest,
  RegisterResponse,
  registerUser,
} from "@services/authServices";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@context/ToastContext";
import { useAuth } from "@context/AuthContext";

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

  // Hook para autenticação
  const { setSession } = useAuth();

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
  const mutation = useMutation<
    RegisterResponse,
    AxiosError<RegisterResponse>,
    RegisterRequest
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Armazena o token e o usuário na sessão
      setSession(data.token, data.user);
      // Redireciona o usuário para a página inicial após o login
      navigate("/");
    },
    onError: (error) => {
      // Exibe a mensagem de erro
      toast?.show({
        message:
          error.response?.data.message || "Houve um erro ao fazer o cadastro.",
        type: "error",
        duration: 3000,
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
                {...register("nome")}
              />
              {errors.nome && <Form.Error>{errors.nome?.message}</Form.Error>}
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
              <Form.Password
                id="senha"
                placeholder="Insira sua senha"
                className="w-full shadow-none"
                {...register("senha")}
              />
              {errors.senha && <Form.Error>{errors.senha?.message}</Form.Error>}
            </Form.Field>
            <Form.Field className="flex-1 basis-48">
              <Form.Label htmlFor="confirmar-senha">Confirmar Senha</Form.Label>
              <Form.Password
                id="confirmar-senha"
                placeholder="Confirme sua senha"
                className="w-full shadow-none"
                {...register("confirmar_senha")}
              />
              {errors.confirmar_senha && (
                <Form.Error>{errors.confirmar_senha?.message}</Form.Error>
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
