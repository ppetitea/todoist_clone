import React, { useState } from "react";

const useBoolean = (initialValue = false) => {
  const [virgin, setVirgin] = useState(true);
  const [value, setValue] = useState(initialValue);

  const touchValue = (value: boolean) => {
    setValue(value);
    if (virgin) setVirgin(false);
  };
  const enable = () => touchValue(true);
  const disable = () => touchValue(false);
  const toggle = () => touchValue(!value);
  return { value, setValue: touchValue, enable, disable, toggle, virgin };
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
