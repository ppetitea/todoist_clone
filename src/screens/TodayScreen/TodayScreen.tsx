import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  FlatList,
  SectionList,
} from "react-native";
import palette from "../../constants/palette";
import { IVisibleHook, useVisible } from "../../hooks/useBoolean";
import useVerticalDrawerAnimation from "../../hooks/useVerticalDrawerAnimation";
import colorSystemToPalette from "../../utils/colorSystemToPalette";
import { Menu, Modal, Portal } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Container from "../../components/Container";
import { useNavigation } from "@react-navigation/core";
import { Icon, Overlay } from "react-native-elements";
import { useLeftDrawer } from "../../navigation/hooks/DrawerContext";
import { useTheme, useThemeContext } from "../../navigation/hooks/ThemeContext";
import Typo from "../../components/Typo";
import Button from "../../components/Button";
import Divider from "../../components/Divider";
import TodoCategory from "./components/TodoCategory";
import TodoItem, { ITodoItem } from "./components/TodoItem";
import { FAB } from "react-native-elements";
import TagButton from "./components/TagButton";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";
import { moment } from "../../services";
import { auth, db } from "../../services/firebase";
import Task, { ITask } from "../../models/Task";
import useCalendarOfTasks, {
  IDayTaskSection,
} from "../../hooks/useCalendarOfTasks";
import SectionHeader, { ISection } from "./components/SectionHeader";
import SectionItem from "./components/SectionItem";

const { width, height } = Dimensions.get("window");

const CalendarTask = (props: any) => {
  const { sections }: { sections: any } = props;
  const theme = useTheme();

  const renderSectionHeader = useCallback(
    ({ section }: { section: ISection }) => <SectionHeader section={section} />,
    [theme]
  );
  const renderItem = useCallback(
    ({ item }: { item: Task }) => <SectionItem item={item} />,
    []
  );
  const extractKey = useCallback((item) => item.id, []);
  return (
    <SectionList
      sections={sections.list}
      keyExtractor={extractKey}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={true}
      removeClippedSubviews={true}
    />
  );
};

const TodayScreen = () => {
  const addTodoModal = useVisible();
  const theme = useTheme();
  useTodayScreenHeader();
  const sections = useCalendarOfTasks();

  return (
    <Container page flex>
      <CalendarTask sections={sections} />
      <FAB
        icon={<Icon name="add" size={24} color={theme.white} />}
        placement="right"
        onPress={addTodoModal.show}
      />
      <AddTaskModal
        visible={addTodoModal.visible}
        onDismiss={addTodoModal.hide}
      />
    </Container>
  );
};

const useTodayScreenHeader = () => {
  const menu = useVisible();
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
  return menu;
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
