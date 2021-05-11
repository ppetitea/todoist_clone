import React from "react";
import { StyleSheet, Text } from "react-native";
import palette from "../constants/palette";
import { useTheme } from "../navigation/hooks/ThemeContext";
import { buildStyle } from "../utils/buildStyle";

const Typo = (props: any) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    default: { color: theme.text1 },
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
    c1: { color: theme.text1 },
    c2: { color: theme.text2 },
    c3: { color: theme.text3 },
    marginV10: { marginVertical: 10 },
    m10: { margin: 10 },
  });
  let style = buildStyle(props, styles);

  return (
    <Text {...props} style={[style, props.style]}>
      {props.children}
    </Text>
  );
};

export default Typo;
