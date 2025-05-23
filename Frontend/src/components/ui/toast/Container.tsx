import { ToastContextType, useToast } from "../../../context/ToastContext";
import Toast from "./Item";

/**
 * @description Componente de contêiner para exibir mensagens de toast.
 *
 * Esse componente é responsável por renderizar as mensagens de toast na tela.
 * Ele utiliza o contexto de ToastContext para acessar as mensagens a serem exibidas.
 *
 * @component
 * @returns {JSX.Element} O componente de contêiner de toast renderizado.
 */
export default function Container() {
  const { toasts } = useToast() as ToastContextType;

  return (
    <div className="w-fit h-20 max-w-[30rem] toast toast-top toast-center z-50 flex flex-col overflow-hidden gap-2 p-4">
      {toasts?.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </div>
  );
}
