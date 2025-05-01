import { useState } from "react";

/**
 * @description Hook para gerenciar o estado de um toggle (ligado/desligado).
 *
 * Esse hook fornece uma maneira simples de alternar entre dois estados booleanos.
 * Ele é útil para componentes que precisam de um estado de alternância, como botões de ligar/desligar ou menus suspensos.
 *
 * @param initialState - Estado inicial do toggle (padrão é false).
 * @returns Um objeto contendo o estado atual do toggle e uma função para alternar o estado.
 */
export default function useToggle(initialState: boolean = false) {
  const [toggleState, setToggleState] = useState<boolean>(initialState);

  function toggle() {
    setToggleState(!toggleState);
  }

  return {
    toggleState,
    toggle,
  };
}
