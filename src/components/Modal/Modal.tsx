import React, { useState } from "react";
import {
  Dimensions,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { useTheme } from "../../navigation/hooks/ThemeContext";

const { width, height } = Dimensions.get("window");

export interface IModalComponent {
  modal: any;
  children?: any;
}
export interface IModal {
  placement: "bottom" | "center" | "custom";
  position?: { x: number; y: number };
  size?: { width: number; heigth: number };
}

const useModal = () => {
  const [state, setState] = useState();
};

const Modal = (props: IModalComponent) => {
  const { modal, children } = props;
  if (!modal?.visible) return null;
  const theme = useTheme();

  const containerStyle = StyleSheet.create({
    default: {
      position: "absolute",
      display: "flex",
      width,
      height,
      backgroundColor: theme.opacity,
      justifyContent: "center",
    },
    bottom: {
      justifyContent: "center",
    },
  });

  const touchableStyle = StyleSheet.create({
    default: {},
    bottom: {
      justifyContent: "center",
    },
  });
  const contentContainerStyle = StyleSheet.create({
    default: {},
    bottom: {
      justifyContent: "center",
    },
  });

  return (
    <View style={[containerStyle.default]}>
      <TouchableWithoutFeedback
        style={[touchableStyle.default]}
        onPress={modal.hide}
      >
        <View style={[contentContainerStyle.default]}>{children}</View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Modal;
