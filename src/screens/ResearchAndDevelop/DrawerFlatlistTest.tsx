import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import palette from "../../constants/palette";
import { useVisible } from "../../hooks/useBoolean";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../services/firebase";
import Drawer from "../../components/Drawer/Drawer";
import useDrawer from "../../components/Drawer/hooks/useDrawer";
import Container from "../../components/Container";
import mockData, { nextTasks } from "./mockData";
import moment from "moment";
import Task from "../../models/Task";
import Typo from "../../components/Typo";
import TodoCategory from "../TodayScreen/components/TodoCategory";
import { buildCalendarOfSoonTask, DayTasksType } from "../../services/buildDayList";

const { width, height } = Dimensions.get("window");

const DrawerFlatlistTest = () => {
  const [list, setList] = useState(buildCalendarOfSoonTask(nextTasks));

  const renderItem = ({ item }: { item: DayTasksType }) => {
    const formatDate = (calendarDate: Date | moment.Moment) => {
      const date = moment(calendarDate);
      const today = moment().startOf("day");
      const inTwoDays = moment().startOf("day").add(2, "day");

      let formatedDate = "";

      const extractCalendarDateWithoutHours = () => {
        return date.calendar().split(" ")[0];
      };
      const shouldAddCalendarDate = () => {
        return date.isSameOrAfter(today, "days") && date.isBefore(inTwoDays);
      };
      const shouldShowEntireDate = () => {
        return !date.isSame(today, "year");
      };
      const addCalendarDate = () => {
        const calendarDate = extractCalendarDateWithoutHours();
        formatedDate += calendarDate + " · ";
      };
      if (shouldAddCalendarDate()) {
        addCalendarDate();
      }
      if (shouldShowEntireDate()) {
        formatedDate += date.format("D MMM YYYY");
      } else {
        formatedDate += date.format("ddd D MMMM");
      }
      return formatedDate;
    };

    return (
      <TodoCategory
        title={formatDate(item.date)}
        items={item.listOfTasks}
        extractKey={(item: Task) => item.id}
      />
    );
  };
  return (
    <Container page>
      <FlatList
        data={list}
        keyExtractor={(item) => item.date.toString()}
        renderItem={renderItem}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.dark.surface1,
  },
  drawerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: palette.dark.surface2,
  },
  drawerHandle: {
    width: 30,
    height: 4,
    borderRadius: 100,
    alignSelf: "center",
    backgroundColor: palette.light.shadow2,
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16,
  },
});

export default DrawerFlatlistTest;
