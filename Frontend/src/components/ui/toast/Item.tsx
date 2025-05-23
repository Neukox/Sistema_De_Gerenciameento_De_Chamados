import CloseIcon from "@assets/icons/Close";
import { useToast } from "../../../context/ToastContext";

interface ToastProps {
  id: number;
  message?: string;
  type?: "success" | "error" | "info" | "warning";
}

/**
 * @description Componente de Toast para exibir mensagens temporárias.
 *
 * Esse componente exibe uma mensagem de toast que desaparece após um certo tempo.
 * Ele pode ser usado para mostrar mensagens de sucesso, erro, informação ou aviso.
 * O componente utiliza o contexto de ToastContext para acessar as mensagens a serem exibidas.
 *
 * @component
 * @param {number} id - O ID do toast.
 * @param {string} message - A mensagem a ser exibida no toast.
 * @param {string} [type] - O tipo de toast (success, error, info, warning).
 * @returns {JSX.Element} O componente de Toast renderizado.
 * */
export default function Toast({ id, message, type = "info" }: ToastProps) {
  const toast = useToast();

  const alertTypes = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  };

  return (
    <div className={`alert ${alertTypes[type]} flex items-center gap-4`}>
      <span className="whitespace-nowrap">{message}</span>
      <button
        onClick={() => toast?.remove(id)}
        className="btn btn-sm btn-circle btn-ghost bg-transparent border-none"
      >
        <CloseIcon className="w-5" />
      </button>
    </div>
  );
}
