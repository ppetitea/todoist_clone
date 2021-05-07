import React, { useState } from "react";

const useString = (initialValue = "") => {
  const [virgin, setVirgin] = useState(true);
  const [value, setValue] = useState(initialValue);

  const touchValue = (value: string) => {
    setValue(value);
    if (virgin) setVirgin(false);
  };
  return { value, setValue: touchValue, virgin };
};

export { useString };
export default useString;
