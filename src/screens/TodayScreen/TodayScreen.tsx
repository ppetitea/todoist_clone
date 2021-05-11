import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import palette from "../../constants/palette";
import { IVisibleHook, useVisible } from "../../hooks/useBoolean";
import useVerticalDrawerAnimation from "../../hooks/useVerticalDrawerAnimation";
import colorSystemToPalette from "../../utils/colorSystemToPalette";
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  Menu,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Container from "../../components/Container";
import { useNavigation } from "@react-navigation/core";
import { Icon } from "react-native-elements";
import { useLeftDrawer } from "../../navigation/hooks/DrawerContext";
import { useTheme, useThemeContext } from "../../navigation/hooks/ThemeContext";

const { width, height } = Dimensions.get("window");

const TodayScreen = () => {
  const menu = useVisible();

  useTodayScreenHeader(menu);

  return <Container page flex></Container>;
};

const useTodayScreenHeader = (menu: IVisibleHook) => {
  const navigation = useNavigation();
  const leftDrawer = useLeftDrawer();
  const theme = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          name="menu"
          color={theme.text1}
          iconStyle={{
            padding: 10,
            borderRadius: 50,
          }}
          containerStyle={{ margin: 5 }}
          onPress={() => leftDrawer.open()}
        />
      ),
      headerRight: () => (
        <Container row>
          <Icon
            name="search"
            color={theme.text1}
            iconStyle={{
              padding: 10,
              borderRadius: 50,
            }}
            containerStyle={{ margin: 5 }}
            // onPress={() => leftDrawer.open()}
          />
          <TodayScreenMenu menu={menu} />
        </Container>
      ),
    });
  }, [menu.visible, theme]);
};

const TodayScreenMenu = ({ menu }: { menu: IVisibleHook }) => {
  const theme = useTheme();
  const themeContext = useThemeContext();
  return (
    <Menu
      visible={menu.visible}
      onDismiss={menu.hide}
      anchor={
        <Icon
          name="dots-vertical"
          type="material-community"
          color={theme.text1}
          iconStyle={{
            padding: 10,
            borderRadius: 50,
          }}
          containerStyle={{ margin: 5 }}
          onPress={menu.show}
        />
      }
    >
      <Menu.Item
        onPress={() => {
          themeContext.toggleMode();
        }}
        title="toggle theme"
      />
      <Menu.Item onPress={() => {}} title="Item 2" />
      <Menu.Item onPress={() => {}} title="Item 3" />
    </Menu>
  );
};

export default TodayScreen;
