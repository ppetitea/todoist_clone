import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import palette from "../constants/palette";
import { buildStyle } from "../utils/buildStyle";
import Constants from "expo-constants";
import { useTheme } from "../navigation/hooks/ThemeContext";

const { width, height } = Dimensions.get("window");

const Container = (props: any) => {
  let style = buildStyle(props, styles);
  const theme = useTheme();
  if (props.page) {
    style = StyleSheet.compose(style, { backgroundColor: theme.surface0 });
  }

  return (
    <View {...props} style={[style, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  default: {},
  fullWidth: {
    padding: 0,
    marginHorizontal: 15,
    width: width - 30,
    alignSelf: "center",
  },
  row: { flexDirection: "row" },
  page: { width, height, backgroundColor: "white" },
  card: {
    padding: 10,
    borderRadius: 4,
    elevation: 1,
    backgroundColor: "white",
  },
  spaceBetween: { justifyContent: "space-between" },
  spaceAround: { justifyContent: "space-around" },
  center: { justifyContent: "center" },
  alignCenter: { alignItems: "center" },
  flex: { flex: 1 },
  marginV5: { marginVertical: 5 },
  marginV10: { marginVertical: 10 },
  marginV20: { marginVertical: 20 },
  marginV30: { marginVertical: 30 },
  marginH5: { marginHorizontal: 5 },
  marginH10: { marginHorizontal: 10 },
  marginH20: { marginHorizontal: 20 },
  marginH30: { marginHorizontal: 30 },
  statusBar: { marginTop: Constants?.statusBarHeight },
});

export default Container;
