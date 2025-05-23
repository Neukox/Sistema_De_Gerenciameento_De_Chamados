import React from "react";

type FieldProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Componente funcional React que renderiza um campo de formulário.
 *
 * Este componente exibe um area para contúedo de formulários, como um campo de entrada ou um botão.
 *
 * @component
 * @param {FieldProps} props - Propriedades do componente.
 * @return {JSX.Element} O elemento de mensagem de erro renderizado.
 */

export default function Field({ children, className }: FieldProps) {
  return <div className={className}>{children}</div>;
}
