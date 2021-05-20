import React, { useCallback, useState } from "react";
export interface IBooleanHook {
  value: boolean;
  setValue: (value: boolean) => void;
  enable: () => void;
  disable: () => void;
  toggle: () => void;
  virgin: boolean;
}

const useBoolean = (initialValue = false) => {
  const [virgin, setVirgin] = useState(true);
  const [value, setValue] = useState(initialValue);

  const touchValue = useCallback((value: boolean) => {
    setValue(value);
    if (virgin) setVirgin(false);
  }, []);
  const enable = useCallback(() => touchValue(true), []);
  const disable = useCallback(() => touchValue(false), []);
  const toggle = useCallback(() => touchValue(!value), []);
  return { value, setValue: touchValue, enable, disable, toggle, virgin };
};

export interface IVisibleHook {
  visible: boolean;
  setVisible: (value: boolean) => void;
  show: () => void;
  hide: () => void;
  toggleVisibility: () => void;
}

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
