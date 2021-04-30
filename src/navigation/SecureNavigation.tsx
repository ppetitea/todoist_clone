import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Portal } from "react-native-paper";
import LeftDrawer from "../components/LeftDrawer";
import RightDrawer from "../components/RightDrawer";
import {
  SCREEN_HOME,
  SCREEN_LOGIN,
  SCREEN_SIGNIN,
} from "../constants/navigation";
import palette from "../constants/palette";
import useLeftDrawerAnimation from "../hooks/useLeftDrawerAnimation";
import useRightDrawerAnimation from "../hooks/useRightDrawerAnimation";
import { IStackScreen } from "../models/navigation";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SigninScreen from "../screens/SigninScreen";
import StackNavigation from "./components/StackNavigation";

const SCREEN_LIST: Array<IStackScreen> = [
  { ...SCREEN_HOME, component: HomeScreen, options: undefined },
  { ...SCREEN_LOGIN, component: LoginScreen, options: undefined },
  { ...SCREEN_SIGNIN, component: SigninScreen, options: undefined },
];

const SecureNavigation = () => {
  const leftDrawer = useLeftDrawerAnimation();
  const rightDrawer = useRightDrawerAnimation();
  return (
    <Portal.Host>
      <StackNavigation listOfScreens={SCREEN_LIST} />
      <RightDrawer drawer={rightDrawer}>
        <Text style={{ ...styles.fadingText, color: palette.light.text1 }}>
          Horizontal drawer
        </Text>
        <View style={styles.buttonRow}>
          <Button onPress={() => rightDrawer.open()}>show</Button>
          <Button onPress={() => rightDrawer.close()}>hide</Button>
        </View>
      </RightDrawer>
      <LeftDrawer drawer={leftDrawer}>
        <Text style={{ ...styles.fadingText, color: palette.light.text1 }}>
          Horizontal drawer
        </Text>
        <View style={styles.buttonRow}>
          <Button onPress={() => leftDrawer.open()}>show</Button>
          <Button onPress={() => leftDrawer.close()}>hide</Button>
        </View>
      </LeftDrawer>
    </Portal.Host>
  );
};

const styles = StyleSheet.create({
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16,
  },
});
export default SecureNavigation;
