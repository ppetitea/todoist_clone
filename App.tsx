import React from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { LogBox, Platform } from "react-native";

export default function App() {
  if (Platform.OS !== "web") {
    LogBox.ignoreLogs(["Setting a timer"]);
  }
  return <AppNavigation />;
}
