import { useState } from "react";

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
