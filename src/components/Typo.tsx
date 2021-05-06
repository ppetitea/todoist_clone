import React from "react";
import { StyleSheet, Text } from "react-native";
import palette from "../constants/palette";
import { buildStyle } from "../utils/buildStyle";

const Typo = (props: any) => {
  let style = buildStyle(props, styles);

  return (
    <Text {...props} style={[style, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {},
  title: { fontSize: 26, fontWeight: "600" },
  h1: { fontSize: 26, fontWeight: "600" },
  h2: { fontSize: 22 },
  h3: { fontSize: 18 },
  h4: { fontSize: 16 },
  h5: { fontSize: 14 },
  h6: { fontSize: 12 },
  button: { letterSpacing: 1.5 },
  bold: { fontWeight: "bold" },
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  d1: { color: palette.dark.text1 },
  d2: { color: palette.dark.text2 },
  d3: { color: palette.dark.text3 },
  l1: { color: palette.light.text1 },
  l2: { color: palette.light.text2 },
  l3: { color: palette.light.text3 },
  marginV10: { marginVertical: 10 },
});

export default Typo;
