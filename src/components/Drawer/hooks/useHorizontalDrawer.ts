import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  PanResponder,
  Easing,
  PanResponderGestureState,
  useWindowDimensions,
  GestureResponderEvent,
  PanResponderInstance,
} from "react-native";
import { useVisible } from "../../../hooks/useBoolean";
import Constants from "expo-constants";

const useOpacityAnimation = () => {
  const ANIMATION_DURATION = 160;
  const OPACITY_MAX = 0.5;
  const OPACITY_MIN = 0;
  const opacityRef = useRef(new Animated.Value(OPACITY_MIN)).current;

  const animateToMax = (onFinish = () => {}) => {
    Animated.timing(opacityRef, {
      toValue: OPACITY_MAX,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      onFinish();
    });
  };
  const animateToMin = (onFinish = () => {}) => {
    Animated.timing(opacityRef, {
      toValue: OPACITY_MIN,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      onFinish();
    });
  };
  return { ref: opacityRef, animateToMax, animateToMin };
};

const useHorizontalDrawer = (direction: "left" | "right") => {
  const right = direction === "right";
  const left = direction === "left";
  const { width, height } = useWindowDimensions();
  const visibility = useVisible();

  const STATUSBAR_HEIGHT = Constants?.statusBarHeight ?? 0;
  const DRAWER_HEIGHT = height + STATUSBAR_HEIGHT;
  const DRAWER_WIDTH = width * 0.8;
  const HANDLE_WIDTH = 10;
  const DRAWER_OPEN = right ? -DRAWER_WIDTH : DRAWER_WIDTH;
  const DRAWER_CLOSED = 0;
  const LEFT_HIDE_TRESHOLD = width * 0.25;
  const RIGHT_HIDE_TRESHOLD = width * 0.75;
  const ANIMATION_DURATION = 160;

  const opacity = useOpacityAnimation();
  const translateX = useRef(new Animated.Value(DRAWER_CLOSED)).current;
  translateX.extractOffset();
  const translateXWithClamp = translateX.interpolate({
    inputRange: right
      ? [DRAWER_OPEN, DRAWER_CLOSED]
      : [DRAWER_CLOSED, DRAWER_OPEN],
    outputRange: right
      ? [DRAWER_OPEN, DRAWER_CLOSED]
      : [DRAWER_CLOSED, DRAWER_OPEN],
    extrapolate: "clamp",
  });

  const animateToFullVisibility = (onFinish = () => {}) => {
    translateX.flattenOffset();
    Animated.timing(translateX, {
      toValue: DRAWER_OPEN,
      duration: ANIMATION_DURATION,
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
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      translateX.setValue(DRAWER_CLOSED);
      translateX.extractOffset();
      onFinish();
    });
  };
  const onPanResponderRelease = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (shouldHideDrawer(gestureState)) {
      opacity.animateToMin();
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

  const openDrawer = () => {
    if (!visibility.visible) {
      visibility.show();
      opacity.animateToMax();
      animateToFullVisibility();
    }
  };
  const closeDrawer = () => {
    if (visibility.visible) {
      opacity.animateToMin();
      animateToHideVisibility(() => visibility.hide());
    }
  };
  const shouldHideDrawer = (gestureState: PanResponderGestureState) => {
    if (
      isGestureDirectionMatchToCloseDirection(gestureState) &&
      isGestureExceedHideTreshold(gestureState)
    ) {
      return true;
    }
    return false;
  };
  const isGestureDirectionMatchToCloseDirection = (
    gestureState: PanResponderGestureState
  ) => {
    if (left && isGestureFromRightToLeft(gestureState)) return true;
    else if (right && isGestureFromLeftToRight(gestureState)) return true;
    else return false;
  };
  const isGestureFromLeftToRight = (gestureState: PanResponderGestureState) => {
    return gestureState.vx > 0;
  };
  const isGestureFromRightToLeft = (gestureState: PanResponderGestureState) => {
    return gestureState.vx < 0;
  };
  const isGestureExceedHideTreshold = (
    gestureState: PanResponderGestureState
  ) => {
    const posX = gestureState.moveX;
    if (left && posX < LEFT_HIDE_TRESHOLD) return true;
    else if (right && posX > RIGHT_HIDE_TRESHOLD) return true;
    else return false;
  };

  const styles = StyleSheet.create({
    animatedViewStyle: {
      position: "absolute",
      width: !visibility.visible ? DRAWER_WIDTH + HANDLE_WIDTH : undefined,
      height: DRAWER_HEIGHT,
      left: left ? -DRAWER_WIDTH : undefined,
      right: right ? -DRAWER_WIDTH : undefined,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      flexDirection: "row",
      justifyContent: right ? "flex-end" : "flex-start",
      paddingTop: STATUSBAR_HEIGHT,
    },
    animatedOpacity: {
      width: width,
      height: DRAWER_HEIGHT,
      backgroundColor: "#000",
    },
  });
  return {
    direction,
    panResponder,
    translateX: translateXWithClamp,
    opacity: opacity.ref,
    height: DRAWER_HEIGHT,
    width: DRAWER_WIDTH,
    handleWidth: HANDLE_WIDTH,
    animatedViewStyle: styles.animatedViewStyle,
    animatedOpacityStyle: styles.animatedOpacity,
    open: openDrawer,
    close: closeDrawer,
    animateToFullVisibility,
    ...visibility,
  };
};

export default useHorizontalDrawer;
