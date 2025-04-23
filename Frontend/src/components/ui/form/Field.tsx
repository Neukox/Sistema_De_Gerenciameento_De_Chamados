import React from "react";

type FieldProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Componente funcional React que renderiza uma mensagem de erro.
 *
 * Este componente exibe uma mensagem de erro estilizada com a classe "validator-hint".
 *
 * @component
 * @param {FieldProps} props - Propriedades do componente.
 * @return {JSX.Element} O elemento de mensagem de erro renderizado.
 */

export default function Field({ children, className }: FieldProps) {
  return <div className={className}>{children}</div>;
}
