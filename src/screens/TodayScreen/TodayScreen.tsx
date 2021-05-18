import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, TextInput } from "react-native";
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
import { ITodoItem } from "./components/TodoItem";
import { FAB } from "react-native-elements";
import TagButton from "./components/TagButton";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";
import { moment } from "../../services";
import { auth, db } from "../../services/firebase";
import Task from "../../models/Task";

const { width, height } = Dimensions.get("window");

const TodayScreen = () => {
  const menu = useVisible();
  const addTodoModal = useVisible();
  const theme = useTheme();
  useTodayScreenHeader(menu);

  const initialUserTasks: any = [];
  const [userTasks, setUserTasks] = useState(initialUserTasks);

  useEffect(() => {
    const userTasksRef = db.collection("usersTasks").doc(auth.currentUser?.uid);
    const subscriber = userTasksRef
      .collection("tasks")
      .onSnapshot((snapshot) => {
        const nextUserTasks = snapshot.docs.map((item) => {
          const task = item.data();
          const nextTask = {
            userId: task.userId,
            id: task.id,
            title: task.title,
            comment: task.comment,
            createdAt: task.createdAt?.seconds,
            deadline: task.deadline?.seconds,
            priority: task.priority,
            tags: task.tags,
            projectId: task.projectId,
            projectLabel: "Lab 🧪",
          };
          return nextTask;
        });
        setUserTasks(nextUserTasks);
      });
    return () => subscriber();
  }, []);

  const mockData = [
    {
      id: "key001",
      title:
        "Avoir une machine linux avec une interface graphic pour les peer correction",
      deadline: moment().add(-moment.duration(1, "day")),
      projectLabel: "Lab 🧪",
    },
    {
      id: "key002",
      title: "Acheter des lis oranges pour Lucie <3",
      deadline: moment("15 05 2021", "DD MM YYYY"),
      projectLabel: "Lab 🧪",
    },
  ];

  return (
    <Container page flex>
      <TodoCategory
        title="En retard"
        rightButtonTitle="Reporter"
        items={mockData}
        extractKey={(item: ITodoItem) => item.id}
      />
      <TodoCategory
        title={"Aujourd'hui - " + moment().format("ddd DD MMMM")}
        items={userTasks}
        extractKey={(item: ITodoItem) => item.id}
      />
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
