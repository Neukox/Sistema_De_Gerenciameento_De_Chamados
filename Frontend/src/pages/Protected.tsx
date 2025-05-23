import { useNavigate } from "react-router";

/**
 * @description Página de acesso negado.
 *
 * Essa página é exibida quando o usuário tenta acessar uma página sem permissão.
 * Ela informa ao usuário que ele não tem autorização para acessar a página e fornece
 * um botão para voltar à página inicial.
 *
 * @component
 * @returns {JSX.Element} O componente da página renderizado.
 */
export default function ProtectedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-5.0625rem)]">
      <p className="text-xl font-semibold">
        Voçê não têm autorização para acessar esta página
      </p>
      <p className="text-lg">
        Entre em contato com o administrador do sistema para mais informações.
      </p>
      <p className="text-lg">
        Ou clique no botão abaixo para voltar para a página inicial.
      </p>
      <button
        className="btn btn-primary mt-4"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Voltar para á página inicial
      </button>
    </div>
  );
}
