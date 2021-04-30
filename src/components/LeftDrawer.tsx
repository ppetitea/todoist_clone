import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import palette from "../constants/palette";
import { Portal } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const LeftDrawer = ({ drawer, children }: any) => {
  return (
    <Animated.View
      style={[drawer.animatedViewStyle, { translateX: drawer.translateX }]}
      {...drawer.panResponder.panHandlers}
    >
      <View
        style={[styles.drawerContainer, { width: drawer.width }]}
        collapsable={false}
      >
        <View
          style={[styles.drawerContent, { width: drawer.width - 20 }]}
          collapsable={false}
        >
          {children}
        </View>
        <View style={styles.drawerHandle} />
      </View>
      {drawer.visible ? (
        <TouchableOpacity
          onPress={() => {
            console.log("close");
            drawer.close();
          }}
          style={{ width, height }}
        >
          <Animated.View
            style={[drawer.animatedOpacityStyle, { opacity: drawer.opacity }]}
          ></Animated.View>
        </TouchableOpacity>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flexDirection: "row",
    backgroundColor: palette.dark.surface2,
  },
  drawerContent: {
    elevation: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  drawerTransparentHandle: {},
  drawerHandle: {
    height: 30,
    maxWidth: 4,
    width: 4,
    margin: 4,
    borderRadius: 100,
    alignSelf: "center",
    backgroundColor: palette.light.shadow2,
  },
});

export default LeftDrawer;
