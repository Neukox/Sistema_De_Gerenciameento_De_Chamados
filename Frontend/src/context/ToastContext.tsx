import { createContext, useCallback, useContext, useState } from "react";

type ToastType = "info" | "success" | "error" | "warning";

export interface ToastItem {
  id: number;
  message?: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export type ToastContextType = {
  toasts: ToastItem[];
  show: (props: Omit<ToastItem, "id">) => void;
  remove: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

/**
 * @description Contexto para gerenciar toasts (notificações) na aplicação.
 *
 * Esse contexto fornece funções para adicionar e remover toasts, além de armazenar o estado atual dos toasts.
 *
 * @component
 * @returns {JSX.Element} O componente de contexto de Toast renderizado.
 */
export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado para armazenar os toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Função para remover um toast, chamando a função onClose se estiver definida
  const remove = useCallback(
    (id: number) => {
      setToasts((prev) => {
        const toast = toasts.find((toast) => toast.id === id);
        if (toast?.onClose) toast.onClose();
        return prev.filter((toast) => toast.id !== id);
      });
    },
    [toasts]
  );

  // Função para adicionar um novo toast
  const show = useCallback(
    (props: Omit<ToastItem, "id">) => {
      const id = Date.now();
      const newToast: ToastItem = {
        id,
        message: props.message,
        type: props.type || "info",
        duration: props.duration,
        onClose: props.onClose,
      };
      setToasts((prev) => [...prev, newToast]);

      if (props.duration) {
        setTimeout(() => {
          remove(id);
        }, props.duration);
      }
    },
    [remove]
  );

  return (
    <ToastContext.Provider value={{ show, remove, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * @description Hook para acessar o contexto de Toast.
 *
 * Esse hook fornece acesso ao contexto de Toast, permitindo que os componentes
 * acessem as funções e o estado dos toasts.
 *
 * @returns {ToastContextType} O contexto de Toast.
 * @throws {Error} Se o hook for usado fora do provedor de Toast.
 */
export function useToast() {
  const context = ToastContext;
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return useContext(context);
}
