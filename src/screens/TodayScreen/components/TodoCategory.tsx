import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import palette from "../../../constants/palette";
import { IVisibleHook, useVisible } from "../../../hooks/useBoolean";
import useVerticalDrawerAnimation from "../../../hooks/useVerticalDrawerAnimation";
import colorSystemToPalette from "../../../utils/colorSystemToPalette";
import { Menu } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Container from "../../../components/Container";
import { useNavigation } from "@react-navigation/core";
import { Icon } from "react-native-elements";
import { useLeftDrawer } from "../../../navigation/hooks/DrawerContext";
import {
  useTheme,
  useThemeContext,
} from "../../../navigation/hooks/ThemeContext";
import Typo from "../../../components/Typo";
import Button from "../../../components/Button";
import Divider from "../../../components/Divider";
import { DrawerItemList } from "@react-navigation/drawer";
import TodoItem from "./TodoItem";

const { width, height } = Dimensions.get("window");

export interface ITodoCategory {
  title: string;
  rightButtonTitle?: string;
  rightButtonAction?: () => void;
  items: Array<any>;
  extractKey: (item: any) => string;
}

const TodoCategory = ({
  title = "",
  rightButtonTitle = undefined,
  rightButtonAction = undefined,
  extractKey,
  items = [],
}: ITodoCategory) => {
  const empty = items.length === 0;
  const theme = useTheme();

  return (
    <Container>
      <Container row alignCenter spaceBetween fullWidth style={{ height: 60 }}>
        <Typo h4 bold style={{ color: empty ? theme.text3 : theme.text1 }}>
          {title}
        </Typo>
        {rightButtonTitle ? (
          <Button
            type="clear"
            title={rightButtonTitle}
            onPress={rightButtonAction}
            titleStyle={{ letterSpacing: 0.2 }}
          />
        ) : null}
      </Container>
      <Divider />
      {items.map((item) => (
        <Container key={extractKey(item)}>
          <TodoItem
            id={extractKey(item)}
            title={item.title}
            deadline={item.deadline}
            projectLabel={item.projectLabel}
          />
          <Divider style={{ marginLeft: 50 }} />
        </Container>
      ))}
    </Container>
  );
};

export default TodoCategory;
