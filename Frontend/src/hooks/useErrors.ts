import { useState } from "react";

/**
 * @description Hook para gerenciar erros de requisições.
 *
 * Esse hook fornece uma maneira de adicionar e limpar erros de requisições.
 *
 * @returns {object} Um objeto contendo o erro atual, uma função para adicionar um erro e uma função para limpar os erros.
 */
export default function useError() {
  const [error, setError] = useState<string>();

  const addError = (error: string) => {
    setError(error);
  };

  const clearError = () => {
    setError(undefined);
  };

  return { error, addError, clearError };
}
