import React, { useCallback, useEffect, useRef, useState } from "react";
import { moment } from "../services";

export interface IMomentHook {
  value: moment.Moment;
  setValue: React.Dispatch<React.SetStateAction<moment.Moment>>;
}

const useMoment = (initialMoment?: moment.Moment) => {
  const [value, setValue] = useState(initialMoment ?? moment().startOf("day"));

  return { value, setValue };
};

export { useMoment };
export default useMoment;
