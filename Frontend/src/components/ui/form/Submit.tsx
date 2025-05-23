import React from "react";

type SubmitProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

/**
 * Componente funcional React que renderiza um botão de envio para um formulário.
 *
 * Este componente exibe um botão estilizado com a classe "btn btn-primary".
 *
 * @component
 * @param {SubmitProps} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - O conteúdo a ser exibido dentro do botão.
 * @param {string} [props.className] - Classes CSS adicionais para estilização.
 * @param {boolean} [props.disabled] - Indica se o botão deve estar desativado.
 * @returns {JSX.Element} O botão de envio renderizado.
 */

export default function Submit({ disabled, children, className }: SubmitProps) {
  return (
    <button
      type="submit"
      className={`btn btn-primary ${className} flex items-center justify-center`}
      disabled={disabled}
    >
      {disabled ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : null}
      {children}
    </button>
  );
}
