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
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { auth } from "../services/firebase";
import Drawer from "../components/Drawer/Drawer";
import useDrawer from "../components/Drawer/hooks/useDrawer";

const { width, height } = Dimensions.get("window");

const TestModal = ({ visible, hideModal }: any) => {
  const drawer = useDrawer("bottom");

  const textColor = palette.light.text1;
  const bgColor = palette.dark.surface1;
  return (
    <View style={styles.container}>
      <Drawer drawer={drawer}>
        <Text style={{ ...styles.fadingText, color: textColor }}>
          Vertical drawer
        </Text>
        <View style={styles.buttonRow}>
          <Button onPress={() => drawer.open()}>show</Button>
          <Button onPress={() => drawer.close()}>hide</Button>
        </View>
      </Drawer>
      <View style={styles.buttonRow}>
        <Button onPress={() => drawer.open()}>show</Button>
        <Button onPress={() => drawer.close()}>hide</Button>
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
