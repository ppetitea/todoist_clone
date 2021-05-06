import React from "react";
import { Dimensions, StyleSheet, Modal as RNModal } from "react-native";
import palette from "../constants/palette";
import { buildStyle } from "../utils/buildStyle";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const Modal = (props: any) => {
  let style = buildStyle(props, styles);

  return (
    <RNModal {...props} style={[style, props.style]} statusBarTranslucent>
      {props.children}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  default: {
    position: "absolute",
    width,
    height: height,
    borderWidth: 0,
  },
});

export default Modal;
