import { DefaultTheme } from "react-native-paper";
import palette from "./palette";

export const PaperTheme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.primary.main,
  },
};

export default PaperTheme;
