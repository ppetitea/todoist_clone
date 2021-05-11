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
import Constants from "expo-constants";
import { useHeaderHeight } from "@react-navigation/stack";
import useBoolean, { useVisible } from "../../../hooks/useBoolean";

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

const useVerticalDrawer = () => {
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

  const opacity = useOpacityAnimation();
  const translateY = useRef(new Animated.Value(TRANSLATE_BOTTOM_POSITION))
    .current;
  translateY.extractOffset();
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
      opacity.animateToMax();
      animateToMediumVisibility();
    }
  };
  const closeDrawer = () => {
    if (visibility.visible) {
      opacity.animateToMin();
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
        opacity.animateToMin();
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
    direction: "bottom",
    panResponder,
    translateY: translateYWithClamp,
    opacity: opacity.ref,
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

export default useVerticalDrawer;
