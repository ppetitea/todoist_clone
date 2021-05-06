import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import OfflineNavigation from "./OfflineNavigation";
import SecureNavigation from "./SecureNavigation";
import { auth } from "../services/firebase";
import useBoolean from "../hooks/useBoolean";
import RNElementsTheme, { PaperTheme } from "../constants/RNElementsTheme";
import { ThemeProvider } from "react-native-elements";
import { Provider as PaperProvider } from "react-native-paper";

const AppNavigation = () => {
  const authorizeAccessToSecureNavigation = useBoolean();

  useEffect(() => {
    auth.onAuthStateChanged((authUser: any) => {
      if (authUser) authorizeAccessToSecureNavigation.enable();
      else authorizeAccessToSecureNavigation.disable();
    });
  });

  return (
    <PaperProvider theme={PaperTheme}>
      <ThemeProvider theme={RNElementsTheme}>
        <NavigationContainer>
          {authorizeAccessToSecureNavigation.value ? (
            <SecureNavigation />
          ) : (
            <OfflineNavigation />
          )}
        </NavigationContainer>
      </ThemeProvider>
    </PaperProvider>
  );
};

export default AppNavigation;
