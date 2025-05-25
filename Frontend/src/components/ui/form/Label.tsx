import React from "react";

type InputProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Componente funcional React que renderiza um rótulo para um campo de entrada.
 *
 * Este componente exibe um rótulo estilizado com a classe "label".
 *
 * @component
 * @param {InputProps} props - Propriedades do componente.
 * @param {string} props.htmlFor - O ID do campo de entrada associado ao rótulo.
 * @param {React.ReactNode} props.children - O conteúdo a ser exibido dentro do rótulo.
 * @returns {JSX.Element} O rótulo renderizado.
 */

export default function Label({ htmlFor, children, className }: InputProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`label mb-2 font-bold text-base-content ${className}`}
    >
      {children}
    </label>
  );
}
