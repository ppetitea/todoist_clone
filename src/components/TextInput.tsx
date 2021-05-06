import React, { useEffect, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import palette from "../constants/palette";
import { buildStyle } from "../utils/buildStyle";
import { TextInput as PaperTextInput } from "react-native-paper";
import useBoolean from "../hooks/useBoolean";

const TextInput = React.forwardRef((props: any, ref) => {
  let style = buildStyle(props, styles);
  const inputRef = ref ? ref : useRef(null);

  const shouldTriggerAutofocus = () => props?.autofocus;
  const triggerAutofocus = () => {
    setTimeout(() => {
      //@ts-ignore
      inputRef.current.focus();
    }, 150);
  };

  useEffect(() => {
    if (shouldTriggerAutofocus()) triggerAutofocus();
  }, []);

  return (
    <PaperTextInput
      {...props}
      ref={inputRef}
      mode="outlined"
      style={[style, props.style]}
    />
  );
});

const styles = StyleSheet.create({
  default: {},
  title: { fontSize: 26, fontWeight: "600" },
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
});

export default TextInput;
