import React, { useState } from "react";

const useString = (initialValue = "") => {
  const [virgin, setVirgin] = useState(true);
  const [value, setValue] = useState(initialValue);

  const touchValue = (value: string) => {
    setValue(value);
    if (virgin) setVirgin(false);
  };
  const isEmpty = () => !value || value === "";
  return { value, setValue: touchValue, virgin, isEmpty };
};

export { useString };
export default useString;
