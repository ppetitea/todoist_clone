import { StyleSheet } from "react-native";

export const buildStyle = (props, styles) => {
  let style = styles.default;

  for (const [styleKey, styleValues] of Object.entries(styles)) {
    if (props[styleKey]) {
      style = StyleSheet.compose(style, styleValues);
    }
  }
  if (props.debug) {
    const randomColor = `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
    style = StyleSheet.compose(style, { backgroundColor: randomColor });
  }
  return style;
};

export default buildStyle;
