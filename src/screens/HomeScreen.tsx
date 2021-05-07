import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import palette from "../constants/palette";
import { useVisible } from "../hooks/useBoolean";
import useVerticalDrawerAnimation from "../hooks/useVerticalDrawerAnimation";
import colorSystemToPalette from "../utils/colorSystemToPalette";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import VerticalDrawer from "../components/VerticalDrawer";
import { auth } from "../services/firebase";

const { width, height } = Dimensions.get("window");

const TestModal = ({ visible, hideModal }: any) => {
  const verticalDrawer = useVerticalDrawerAnimation();

  const textColor = palette.light.text1;
  const bgColor = palette.dark.surface1;
  //   colorSystemToPalette();
  return (
    <View style={styles.container}>
      <VerticalDrawer drawer={verticalDrawer}>
        <Text style={{ ...styles.fadingText, color: textColor }}>
          Vertical drawer
        </Text>
        <View style={styles.buttonRow}>
          <Button onPress={() => verticalDrawer.open()}>show</Button>
          <Button onPress={() => verticalDrawer.close()}>hide</Button>
        </View>
      </VerticalDrawer>
      <View style={styles.buttonRow}>
        <Button onPress={() => verticalDrawer.open()}>show</Button>
        <Button onPress={() => verticalDrawer.close()}>hide</Button>
      </View>
      <Button
        onPress={() => {
          auth.signOut();
        }}
      >
        logout
      </Button>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.dark.surface1,
  },
  drawerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: palette.dark.surface2,
  },
  drawerHandle: {
    width: 30,
    height: 4,
    borderRadius: 100,
    alignSelf: "center",
    backgroundColor: palette.light.shadow2,
  },
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

const HomeScreen = () => {
  const modal = useVisible();
  return <TestModal visible={modal.visible} hideModal={modal.hide} />;
};

export default HomeScreen;
