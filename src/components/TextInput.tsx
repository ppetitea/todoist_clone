import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import palette from "../constants/palette";
import { buildStyle } from "../utils/buildStyle";
import { TextInput as PaperTextInput } from "react-native-paper";
import useBoolean from "../hooks/useBoolean";
import { useTheme } from "../navigation/hooks/ThemeContext";

const TextInput = React.forwardRef((props: any, ref) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    default: { color: theme.text1 },
    title: { fontSize: 26, fontWeight: "600" },
    button: { letterSpacing: 1.5 },
    bold: { fontWeight: "bold" },
    center: { textAlign: "center" },
    c1: { color: theme.text1 },
    c2: { color: theme.text2 },
    c3: { color: theme.text3 },
  });

  let style = buildStyle(props, styles);
  const inputRef = ref ? ref : useRef(null);

  const shouldTriggerAutofocus = () => props?.autofocus;
  const triggerAutofocus = () => {
    return setTimeout(() => {
      //@ts-ignore
      inputRef.current.focus();
    }, 150);
  };

  useEffect(() => {
    if (shouldTriggerAutofocus()) {
      const timeout = triggerAutofocus();
      return () => clearTimeout(timeout);
    }
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

export default TextInput;
