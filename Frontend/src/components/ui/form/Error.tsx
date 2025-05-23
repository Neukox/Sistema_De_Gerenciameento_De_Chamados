import React from "react";

/**
 * Componente funcional React que renderiza uma mensagem de erro para um campo de formulário.
 *
 * Este componente exibe uma mensagem de erro estilizada com a classe "validator-hint".
 *
 * @component
 * @param children - O conteúdo a ser exibido dentro do componente.
 * @returns {JSX.Element} O componente de mensagem de erro renderizado.
 */

export default function Error({ children }: { children: React.ReactNode }) {
  return <p className="validator-hint text-red-500">{children}</p>;
}
