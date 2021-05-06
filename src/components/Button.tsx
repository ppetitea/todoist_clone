import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button as ButtonElement } from "react-native-elements";
const { width } = Dimensions.get("window");

const Button = (props: any) => {
  let container: any = style.container;
  let button: any = style.button;
  let title = style.title;
  const compose = StyleSheet.compose;
  if (props.large) container = compose(container, large.container);
  if (props.halfWidth) container = compose(container, halfWidth.container);
  return (
    <ButtonElement
      {...props}
      containerStyle={[container, props.containerStyle]}
      buttonStyle={[button, props.buttonStyle]}
      titleStyle={[title, props.titleStyle]}
    />
  );
};

const style = StyleSheet.create({
  container: {
    borderRadius: 4,
    alignSelf: "center",
    marginVertical: 5,
  },
  button: {
    height: 50,
    borderRadius: 4,
  },
  title: {
    letterSpacing: 1,
    fontWeight: "500",
    fontSize: 14,
  },
});

const large = StyleSheet.create({
  container: {
    width: width - 30,
  },
});

const halfWidth = StyleSheet.create({
  container: {
    width: (width - 30 - 10) / 2,
  },
});

export default Button;
