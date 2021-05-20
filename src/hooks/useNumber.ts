import React, { useCallback, useState } from "react";

const useNumber = (initialvalue: number = 0) => {
  const [initial, setInitial] = useState(initialvalue);
  const [value, setValue] = useState(initialvalue);
  const increment = useCallback(
    (amount: number = 10) => setValue(value + amount),
    [value]
  );
  const decrement = useCallback(
    (amount: number = 10) => setValue(value - amount),
    [value]
  );
  return { value, initial, setValue, increment, decrement };
};

export { useNumber };
export default useNumber;
