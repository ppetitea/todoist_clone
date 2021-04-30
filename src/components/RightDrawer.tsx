import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import palette from "../constants/palette";
import { Portal } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const RightDrawer = ({ drawer, children }: any) => {
  return (
    <Animated.View
      style={[drawer.animatedViewStyle, { translateX: drawer.translateX }]}
      {...drawer.panResponder.panHandlers}
    >
      {drawer.visible ? (
        <TouchableWithoutFeedback onPress={() => drawer.close()}>
          <Animated.View
            style={[drawer.animatedOpacityStyle, { opacity: drawer.opacity }]}
          ></Animated.View>
        </TouchableWithoutFeedback>
      ) : null}
      <View
        style={[styles.drawerContainer, { width: drawer.width }]}
        collapsable={false}
      >
        <View style={styles.drawerHandle} />
        <View
          style={[styles.drawerContent, { width: drawer.width - 20 }]}
          collapsable={false}
        >
          {children}
        </View>
      </View>
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

export default RightDrawer;
