import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import palette from "../constants/palette";
import { Portal } from "react-native-paper";

const VerticalDrawer = ({ drawer, children }: any) => {
  if (!drawer.visible) return null;
  return (
    <Portal>
      <TouchableWithoutFeedback onPress={() => drawer.close()}>
        <Animated.View
          style={[drawer.animatedOpacityStyle, { opacity: drawer.opacity }]}
        ></Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          drawer.animatedViewStyle,
          styles.drawerContainer,
          { translateY: drawer.translateY },
        ]}
        {...drawer.panResponder.panHandlers}
      >
        <View style={styles.drawerHandle} />
        {children}
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
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
});

export default VerticalDrawer;
