import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Portal } from "react-native-paper";
import Drawer from "../components/Drawer/Drawer";
import useDrawer from "../components/Drawer/hooks/useDrawer";
import Typo from "../components/Typo";
import {
  SCREEN_DEVELOP,
  SCREEN_HOME,
  SCREEN_TODAY,
} from "../constants/navigation";
import palette from "../constants/palette";
import { IStackScreen } from "../models/navigation";
import ResearchAndDevelopScreen from "../screens/ResearchAndDevelop/ResearchAndDevelopScreen";
import TodayScreen from "../screens/TodayScreen/TodayScreen";
import { auth } from "../services/firebase";
import StackNavigation from "./components/StackNavigation";
import DrawerContext from "./hooks/DrawerContext";

const SCREEN_LIST: Array<IStackScreen> = [
  {
    ...SCREEN_DEVELOP,
    component: ResearchAndDevelopScreen,
    options: undefined,
  },
  { ...SCREEN_TODAY, component: TodayScreen, options: undefined },
];

const SecureNavigation = () => {
  const leftDrawer = useDrawer("left");
  const rightDrawer = useDrawer("right");
  return (
    <DrawerContext.Provider value={{ leftDrawer, rightDrawer }}>
      <Portal.Host>
        <StackNavigation listOfScreens={SCREEN_LIST} />
        <Drawer drawer={rightDrawer}>
          <Typo title center m10>
            Right drawer
          </Typo>
          <View style={styles.buttonRow}>
            <Button onPress={() => rightDrawer.open()}>show</Button>
            <Button onPress={() => rightDrawer.close()}>hide</Button>
          </View>
        </Drawer>
        <Drawer drawer={leftDrawer}>
          <Typo title center m10>
            Left drawer
          </Typo>
          <View style={styles.buttonRow}>
            <Button onPress={() => leftDrawer.open()}>show</Button>
            <Button onPress={() => leftDrawer.close()}>hide</Button>
          </View>
          <Button onPress={() => auth.signOut()}>Signout</Button>
        </Drawer>
      </Portal.Host>
    </DrawerContext.Provider>
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
