import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import palette from "../../../constants/palette";
import { Portal } from "react-native-paper";
import { useTheme } from "../../../navigation/hooks/ThemeContext";

const VerticalDrawer = ({ drawer, children }: any) => {
  if (!drawer.visible) return null;
  const theme = useTheme();
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
          { translateY: drawer.translateY, backgroundColor: theme.surface3 },
        ]}
        {...drawer.panResponder.panHandlers}
      >
        <View style={[styles.drawerHandle, { backgroundColor: theme.text3 }]} />
        {children}
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  drawerHandle: {
    width: 30,
    height: 4,
    borderRadius: 100,
    alignSelf: "center",
    backgroundColor: "hsla(0, 0%, 100%, 0.35)",
  },
});

export default VerticalDrawer;
