import React from "react";
import { useTheme } from "../navigation/hooks/ThemeContext";
import { Divider as ElementDivider } from "react-native-elements";

const Divider = (props: any) => {
  const theme = useTheme();
  return (
    <ElementDivider
      {...props}
      style={[{ backgroundColor: theme.divider, height: 1 }, props.style]}
    />
  );
};

export { Divider };
export default Divider;
