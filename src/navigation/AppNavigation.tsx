import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import OfflineNavigation from "./OfflineNavigation";
import SecureNavigation from "./SecureNavigation";
import { auth } from "../services/firebase";
import useBoolean from "../hooks/useBoolean";
import { ThemeProvider } from "react-native-elements";
import { Provider as PaperProvider } from "react-native-paper";
import ThemeContext, {
  useNewThemeContext,
  useThemeContext,
} from "./hooks/ThemeContext";
import { toElementsLibraryTheme, toPaperTheme } from "../constants/theme";

const AppNavigation = () => {
  const authorizeAccessToSecureNavigation = useBoolean();
  const themeContext = useNewThemeContext("light");

  useEffect(() => {
    auth.onAuthStateChanged((authUser: any) => {
      if (authUser) authorizeAccessToSecureNavigation.enable();
      else authorizeAccessToSecureNavigation.disable();
    });
  });

  return (
    <ThemeContext.Provider value={themeContext}>
      <PaperProvider
        theme={toPaperTheme(themeContext.mode, themeContext.theme)}
      >
        <ThemeProvider theme={toElementsLibraryTheme(themeContext.theme)}>
          <NavigationContainer>
            {authorizeAccessToSecureNavigation.value ? (
              <SecureNavigation />
            ) : (
              <OfflineNavigation />
            )}
          </NavigationContainer>
        </ThemeProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default AppNavigation;
