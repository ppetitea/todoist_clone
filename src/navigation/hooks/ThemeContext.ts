import React, { useContext, useState } from "react";
import themes, { ITheme, ThemeType } from "../../constants/theme";

const useNewThemeContext = (initialMode: ThemeType) => {
  const [mode, setMode] = useState(initialMode);
  const [theme, setTheme] = useState(themes[initialMode]);

  return {
    mode,
    theme,
    changeTheme: setTheme,
    enableLightMode: () => {
      setMode("light");
      setTheme(themes.light);
    },
    enableDarkMode: () => {
      setMode("dark");
      setTheme(themes.dark);
    },
    toggleMode: () => {
      setMode(mode === "light" ? "dark" : "light");
      setTheme(mode === "light" ? themes.dark : themes.light);
    },
  };
};

interface IThemeContext {
  mode: ThemeType;
  theme: ITheme;
  changeTheme: (theme: ITheme) => void;
  enableLightMode: () => void;
  enableDarkMode: () => void;
  toggleMode: () => void;
}

const initialContext: IThemeContext = {
  mode: "light",
  theme: themes.light,
  changeTheme: () => {},
  enableLightMode: () => {},
  enableDarkMode: () => {},
  toggleMode: () => {},
};

const ThemeContext = React.createContext(initialContext);

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
};
const useTheme = () => {
  const context = useContext(ThemeContext);
  return context.theme;
};

export { useNewThemeContext, useThemeContext, useTheme, ITheme, IThemeContext };
export default ThemeContext;
