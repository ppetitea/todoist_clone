import React, { useState } from "react";

const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const enable = () => setValue(true);
  const disable = () => setValue(false);
  const toggle = () => setValue(!value);
  return { value, setValue, enable, disable, toggle };
};

const useVisible = (initialValue = false) => {
  const state = useBoolean(initialValue);

  const visibleSyntax = {
    visible: state.value,
    setVisible: state.setValue,
    show: state.enable,
    hide: state.disable,
    toggleVisibility: state.toggle,
  };
  return visibleSyntax;
};

export type BooleanHookFunction = () => void;
export { useBoolean, useVisible };
export default useBoolean;
