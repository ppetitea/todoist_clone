import { DefaultTheme } from "react-native-paper";

const colors = {
  light: {
    primary: "hsl(5, 68%, 55%)",
    secondary: "hsl(5, 68%, 55%)",
    white: "hsl(0, 0%, 100%)",
    black: "hsl(0, 0%, 0%)",
    surface0: "hsl(0, 0%, 88%)",
    surface1: "hsl(0, 0%, 92%)",
    surface2: "hsl(0, 0%, 94%)",
    surface3: "hsl(0, 0%, 96%)",
    surface4: "hsl(0, 0%, 98%)",
    surface5: "hsl(0, 0%, 100%)",
    text1: "hsla(0, 0%, 0%, 1)",
    text2: "hsla(0, 0%, 0%, 0.87)",
    text3: "hsla(0, 0%, 0%, 0.54)",
    opacity: "hsla(0, 0%, 0%, 0.5)",
    disabled: "hsla(0, 0%, 0%, 0.26)",
    border: "hsla(0, 0%, 0%, 0.23)",
    divider: "hsla(0, 0%, 0%, 0.12)",
    success: "hsl(122, 39%, 49%)",
    error: "hsl(4, 90%, 58%)",
    warning: "hsl(36, 100%, 50%)",
    roundness: 4,
  },
  dark: {
    primary: "hsl(5, 68%, 55%)",
    secondary: "hsl(5, 68%, 55%)",
    white: "hsl(0, 0%, 100%)",
    black: "hsl(0, 0%, 0%)",
    surface0: "hsl(0, 0%, 12%)",
    surface1: "hsl(0, 0%, 14%)",
    surface2: "hsl(0, 0%, 16%)",
    surface3: "hsl(0, 0%, 18%)",
    surface4: "hsl(0, 0%, 20%)",
    surface5: "hsl(0, 0%, 22%)",
    text1: "hsla(0, 0%, 100%, 1)",
    text2: "hsla(0, 0%, 100%, 0.87)",
    text3: "hsla(0, 0%, 100%, 0.54)",
    opacity: "hsla(0, 0%, 100%, 0.5)",
    disabled: "hsla(0, 0%, 100%, 0.26)",
    border: "hsla(0, 0%, 100%, 0.23)",
    divider: "hsla(0, 0%, 100%, 0.12)",
    success: "hsl(122, 39%, 49%)",
    error: "hsl(4, 90%, 58%)",
    warning: "hsl(36, 100%, 50%)",
  },
};

export type ThemeType = "light" | "dark";

export interface ITheme {
  roundness: number;
  primary: string;
  secondary: string;
  white: string;
  black: string;
  surface0: string;
  surface1: string;
  surface2: string;
  surface3: string;
  surface4: string;
  surface5: string;
  text1: string;
  text2: string;
  text3: string;
  opacity: string;
  disabled: string;
  border: string;
  divider: string;
  success: string;
  error: string;
  warning: string;
}

const lightTheme: ITheme = { ...colors.light, roundness: 4 };
const darkTheme: ITheme = { ...colors.dark, roundness: 4 };

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

const toElementsLibraryTheme = (theme: ITheme) => ({
  colors: {
    primary: theme.primary,
    secondary: theme.secondary,
    white: theme.white,
    black: theme.black,
    grey0: theme.surface0,
    grey1: theme.surface1,
    grey2: theme.surface2,
    grey3: theme.surface3,
    grey4: theme.surface4,
    grey5: theme.surface5,
    greyOutline: theme.border,
    searchBg: theme.surface0,
    success: theme.success,
    error: theme.error,
    warning: theme.warning,
    divider: theme.divider,
    platform: {
      ios: {
        primary: theme.primary,
        secondary: theme.secondary,
        grey: theme.surface0,
        searchBg: theme.surface0,
        success: theme.success,
      },
      android: {
        primary: theme.primary,
        secondary: theme.secondary,
        grey: theme.surface0,
        searchBg: theme.surface0,
        error: theme.error,
      },
      web: {
        primary: theme.primary,
        secondary: theme.secondary,
        grey: theme.surface0,
        searchBg: theme.surface0,
        warning: theme.warning,
      },
    },
  },
});

const toPaperTheme = (mode: ThemeType, theme: ITheme) => ({
  ...DefaultTheme,
  dark: mode === "dark",
  roundness: theme.roundness,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.primary,
    accent: theme.secondary,
    background: theme.surface0,
    surface: theme.surface3,
    text: theme.text1,
    disabled: theme.disabled,
    placeholder: theme.text3,
    backdrop: theme.opacity,
    onSurface: theme.surface5,
    notification: theme.surface5,
  },
});

export { toElementsLibraryTheme, toPaperTheme };
export default themes;
