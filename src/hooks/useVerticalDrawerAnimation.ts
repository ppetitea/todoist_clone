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
import Constants from "expo-constants";
import { useHeaderHeight } from "@react-navigation/stack";
import useBoolean, { useVisible } from "./useBoolean";

const useVerticalDrawerAnimation = () => {
  const headerHeight = useHeaderHeight();
  const { width, height } = useWindowDimensions();
  const visibility = useVisible();

  const STATUSBAR_HEIGHT = Constants?.statusBarHeight ?? 0;
  const HEADER_HEIGHT = headerHeight - STATUSBAR_HEIGHT;
  const DRAWER_HEIGHT = height;
  const SCREEN_HEIGHT = height + HEADER_HEIGHT;
  const HALF_TRESHOLD = DRAWER_HEIGHT * 0.5;
  const BOTTOM_THRESHOLD = DRAWER_HEIGHT * 0.75;
  const DRAWER_BOTTOM_POSITION = -DRAWER_HEIGHT;
  const TRANSLATE_TOP_POSITION = -DRAWER_HEIGHT;
  const TRANSLATE_MID_POSITION = -DRAWER_HEIGHT * 0.5;
  const TRANSLATE_BOTTOM_POSITION = 0;
  const OPACITY_MAX = 0.5;
  const OPACITY_MIN = 0.1;

  const translateY = useRef(new Animated.Value(TRANSLATE_BOTTOM_POSITION))
    .current;
  translateY.extractOffset();
  const opacity = useRef(new Animated.Value(0)).current;

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
    translateY.flattenOffset();
    Animated.timing(translateY, {
      toValue: TRANSLATE_TOP_POSITION,
      duration: 160,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      translateY.setValue(TRANSLATE_TOP_POSITION);
      translateY.extractOffset();
      onFinish();
    });
  };
  const animateToMediumVisibility = (onFinish = () => {}) => {
    translateY.flattenOffset();
    Animated.timing(translateY, {
      toValue: TRANSLATE_MID_POSITION,
      duration: 160,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      translateY.extractOffset();
      onFinish();
    });
  };
  const animateToHideVisibility = (onFinish = () => {}) => {
    translateY.flattenOffset();
    Animated.timing(translateY, {
      toValue: TRANSLATE_BOTTOM_POSITION,
      duration: 160,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      translateY.setValue(TRANSLATE_BOTTOM_POSITION);
      translateY.extractOffset();
      onFinish();
    });
  };
  const openDrawer = () => {
    if (!visibility.visible) {
      visibility.show();
      animateToMaxOpacity();
      animateToMediumVisibility();
    }
  };
  const closeDrawer = () => {
    if (visibility.visible) {
      animateToMinOpacity();
      animateToHideVisibility(() => visibility.hide());
    }
  };
  const isGestureSwipefromBottomToTop = (
    gestureState: PanResponderGestureState
  ) => {
    return gestureState.vy < 0 ? true : false;
  };
  const isGestureCoordinateIsUnderQuarterOfScreen = (
    gestureState: PanResponderGestureState
  ) => {
    const posY = gestureState.moveY - STATUSBAR_HEIGHT;
    return posY > BOTTOM_THRESHOLD ? true : false;
  };
  const onPanResponderRelease = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (isGestureSwipefromBottomToTop(gestureState)) {
      animateToFullVisibility();
    } else {
      if (isGestureCoordinateIsUnderQuarterOfScreen(gestureState)) {
        animateToMinOpacity();
        animateToHideVisibility(() => visibility.hide());
      } else {
        animateToMediumVisibility();
      }
    }
  };
  const onPanResponderMove = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    return Animated.event([null, { dy: translateY }], {
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

  const translateYWithClamp = translateY.interpolate({
    inputRange: [TRANSLATE_TOP_POSITION, 0],
    outputRange: [TRANSLATE_TOP_POSITION, 0],
    extrapolate: "clamp",
  });
  const styles = StyleSheet.create({
    animatedViewStyle: {
      position: "absolute",
      width: width,
      height: DRAWER_HEIGHT,
      bottom: DRAWER_BOTTOM_POSITION,
      elevation: 100,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    animatedOpacity: {
      width: width,
      height: SCREEN_HEIGHT,
      backgroundColor: "#000",
    },
  });
  return {
    panResponder,
    translateY: translateYWithClamp,
    opacity: opacity,
    height: DRAWER_HEIGHT,
    animatedViewStyle: styles.animatedViewStyle,
    animatedOpacityStyle: styles.animatedOpacity,
    open: openDrawer,
    close: closeDrawer,
    animateToFullVisibility,
    animateToMediumVisibility,
    ...visibility,
  };
};

export default useVerticalDrawerAnimation;
