import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose: () => void;
}

/**
 * @description Componente de Toast para exibir mensagens temporárias.
 *
 * Esse componente exibe uma mensagem de toast que desaparece após um certo tempo.
 * Ele pode ser usado para mostrar mensagens de sucesso, erro, informação ou aviso.
 *
 * @component
 * @param {string} message - A mensagem a ser exibida no toast.
 * @param {string} [type] - O tipo de toast (success, error, info, warning).
 * @param {number} [duration] - A duração em milissegundos antes do toast desaparecer.
 * @param {function} onClose - Função a ser chamada quando o toast for fechado.
 * @returns {JSX.Element} O componente de Toast renderizado.
 * */
const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={`w-fit max-w-[30rem] toast toast-${type} toast-top toast-center ${
        visible ? "visible" : "hidden"
      } p-2`}
    >
      <div className={`alert alert-${type} flex items-center gap-4`}>
        <span className="whitespace-nowrap">{message}</span>
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost bg-transparent border-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
