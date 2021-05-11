import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import palette from "../../../constants/palette";
import { useTheme } from "../../../navigation/hooks/ThemeContext";

const { width, height } = Dimensions.get("window");

const HorizontalDrawer = ({ drawer, children }: any) => {
  const right = drawer.direction === "right";
  const left = !right;
  const theme = useTheme();

  return (
    <Animated.View
      style={[drawer.animatedViewStyle, { translateX: drawer.translateX }]}
      {...drawer.panResponder.panHandlers}
    >
      {right && drawer.visible ? (
        <TouchableWithoutFeedback onPress={() => drawer.close()}>
          <Animated.View
            style={[drawer.animatedOpacityStyle, { opacity: drawer.opacity }]}
          ></Animated.View>
        </TouchableWithoutFeedback>
      ) : null}
      <View
        style={[
          styles.drawerContainer,
          { width: drawer.width, backgroundColor: theme.surface3 },
        ]}
        collapsable={false}
      >
        {right ? (
          <View
            style={[styles.drawerHandle, { backgroundColor: theme.text3 }]}
          />
        ) : null}
        <View
          style={[styles.drawerContent, { width: drawer.width - 15 }]}
          collapsable={false}
        >
          {children}
        </View>
        {left ? (
          <View
            style={[styles.drawerHandle, { backgroundColor: theme.text3 }]}
          />
        ) : null}
      </View>
      {left && drawer.visible ? (
        <TouchableWithoutFeedback onPress={() => drawer.close()}>
          <Animated.View
            style={[drawer.animatedOpacityStyle, { opacity: drawer.opacity }]}
          ></Animated.View>
        </TouchableWithoutFeedback>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flexDirection: "row",
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
  },
});

export default HorizontalDrawer;
