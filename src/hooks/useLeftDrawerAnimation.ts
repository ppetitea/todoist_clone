import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  PanResponder,
  Easing,
  PanResponderGestureState,
  useWindowDimensions,
  GestureResponderEvent,
} from "react-native";
import useBoolean, { useVisible } from "./useBoolean";
import Constants from "expo-constants";

const useLeftDrawerAnimation = () => {
  const { width, height } = useWindowDimensions();
  const visibility = useVisible();

  const STATUSBAR_HEIGHT = Constants?.statusBarHeight ?? 0;
  const DRAWER_HEIGHT = height + STATUSBAR_HEIGHT;
  const DRAWER_OPEN = width * 0.8;
  const DRAWER_CLOSED = 0;
  const HIDE_TRESHOLD = width * 0.25;
  const OPACITY_MAX = 0.5;
  const OPACITY_MIN = 0;

  const translateX = useRef(new Animated.Value(DRAWER_CLOSED)).current;
  translateX.extractOffset();
  const opacity = useRef(new Animated.Value(OPACITY_MIN)).current;

  const animateToMaxOpacity = (onFinish = () => {}) => {
    Animated.timing(opacity, {
      toValue: OPACITY_MAX,
      duration: 160,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      onFinish();
    });
  };
  const animateToMinOpacity = (onFinish = () => {}) => {
    Animated.timing(opacity, {
      toValue: OPACITY_MIN,
      duration: 160,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      onFinish();
    });
  };
  const animateToFullVisibility = (onFinish = () => {}) => {
    translateX.flattenOffset();
    Animated.timing(translateX, {
      toValue: DRAWER_OPEN,
      duration: 160,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      translateX.setValue(DRAWER_OPEN);
      translateX.extractOffset();
      onFinish();
    });
  };
  const animateToHideVisibility = (onFinish = () => {}) => {
    translateX.flattenOffset();
    Animated.timing(translateX, {
      toValue: DRAWER_CLOSED,
      duration: 160,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      translateX.setValue(DRAWER_CLOSED);
      translateX.extractOffset();
      onFinish();
    });
  };
  const openDrawer = () => {
    if (!visibility.visible) {
      visibility.show();
      animateToMaxOpacity();
      animateToFullVisibility();
    }
  };
  const closeDrawer = () => {
    if (visibility.visible) {
      animateToMinOpacity();
      animateToHideVisibility(() => visibility.hide());
    }
  };
  const shouldHideDrawer = (gestureState: PanResponderGestureState) => {
    const posX = gestureState.moveX;
    return gestureState.vx < 0 && posX < HIDE_TRESHOLD ? true : false;
  };
  const onPanResponderRelease = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (shouldHideDrawer(gestureState)) {
      animateToMinOpacity();
      animateToHideVisibility(() => visibility.hide());
    } else {
      animateToFullVisibility(() => openDrawer());
    }
  };
  const onPanResponderMove = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    return Animated.event([null, { dx: translateX }], {
      useNativeDriver: false,
    })(event, gestureState);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: onPanResponderMove,
      onPanResponderRelease: onPanResponderRelease,
    })
  ).current;

  const translateXWithClamp = translateX.interpolate({
    inputRange: [DRAWER_CLOSED, DRAWER_OPEN],
    outputRange: [DRAWER_CLOSED, DRAWER_OPEN],
    extrapolate: "clamp",
  });
  const styles = StyleSheet.create({
    animatedViewStyle: {
      position: "absolute",
      width: !visibility.visible ? DRAWER_OPEN + 10 : undefined,
      height: DRAWER_HEIGHT,
      left: -DRAWER_OPEN,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      flexDirection: "row",
      paddingTop: STATUSBAR_HEIGHT,
    },
    animatedOpacity: {
      width: width,
      height: DRAWER_HEIGHT,
      backgroundColor: "#000",
    },
  });
  return {
    panResponder,
    translateX: translateXWithClamp,
    opacity: opacity,
    height: DRAWER_HEIGHT,
    width: DRAWER_OPEN,
    animatedViewStyle: styles.animatedViewStyle,
    animatedOpacityStyle: styles.animatedOpacity,
    open: openDrawer,
    close: closeDrawer,
    animateToFullVisibility,
    ...visibility,
  };
};

export default useLeftDrawerAnimation;
