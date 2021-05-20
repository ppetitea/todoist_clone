import { StyleSheet } from "react-native";

export const buildStyle = (props, styles) => {
  let style = styles.default;

  for (const [propKey, propValue] of Object.entries(props)) {
    if (styles[propKey]) {
      style = StyleSheet.compose(style, styles[propKey]);
    }
  }
  if (props.debug) {
    const randomColor = `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
    style = StyleSheet.compose(style, { backgroundColor: randomColor });
  }
  return style;
};

export default buildStyle;
