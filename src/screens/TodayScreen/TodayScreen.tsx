import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  FlatList,
  SectionList,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ViewToken,
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
import SectionHeader, {
  ISection,
  SectionHeaderProps,
} from "./components/SectionHeader";
import SectionItem from "./components/SectionItem";
import { date, string } from "yup/lib/locale";
import useMoment, { IMomentHook } from "../../hooks/useMoment";
import useNumber from "../../hooks/useNumber";
import useString from "../../hooks/useString";

const { width, height } = Dimensions.get("window");

interface ICalendarDay {
  id: string;
  date: Date | moment.Moment;
}
interface CalendarDayProps {
  item: ICalendarDay;
  index: number;
  datePicker: IMomentHook;
}

const ITEM_WIDTH_1x7 = width / 7;

const CalendarDay = React.memo((props: CalendarDayProps) => {
  const { item, index, datePicker } = props;
  const theme = useTheme();
  const dayMoment = moment(item.date);
  const past = dayMoment.isBefore(moment().startOf("day"));
  const selected = dayMoment.isSame(datePicker.value);
  //   console.log("dayMoment", dayMoment);

  return (
    <TouchableWithoutFeedback onPress={() => datePicker.setValue(dayMoment)}>
      <Container
        width={ITEM_WIDTH_1x7}
        height={66}
        borderRadius={ITEM_WIDTH_1x7}
        alignCenter
        spaceAround
      >
        <Container width={ITEM_WIDTH_1x7} height={42} alignCenter spaceBetween>
          <Typo h6 style={{ color: past ? theme.text2 : theme.text1 }}>
            {dayMoment.format("dd").slice(0, 1).toUpperCase()}
          </Typo>
          <Typo
            h4
            style={{
              color: selected
                ? theme.primary
                : past
                ? theme.text3
                : theme.text2,
              fontWeight: past ? undefined : "bold",
            }}
          >
            {dayMoment.format("D")}
          </Typo>
        </Container>
        <View
          style={{
            backgroundColor: selected ? theme.primary : undefined,
            width: ITEM_WIDTH_1x7,
            height: 3,
          }}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}, areEqual);

function areEqual(prevProps: any, nextProps: any) {
  if (prevProps.item.id !== nextProps.item.id) return false;
  const prevId = prevProps.item.id;
  const prevDatePickerId = prevProps.datePicker.value.toString();
  const nextId = nextProps.item.id;
  const nextDatePickerId = nextProps.datePicker.value.toString();
  const wasSame = prevId === prevDatePickerId;
  const areSame = nextId === nextDatePickerId;
  if (wasSame !== areSame) return false;
  return true;
}

interface CalendarWeekProps {
  sections: { dayListFromStartWeek: ICalendarDay[] };
  datePicker: IMomentHook;
}
const CalendarWeek = (props: CalendarWeekProps) => {
  const { sections, datePicker } = props;
  const theme = useTheme();
  const listRef = useRef(null);
  const list = sections.dayListFromStartWeek;

  const findItemIndexWithDatePicker = () => {
    const searchedId = datePicker.value.toString();
    const findItemIndex = (section: ICalendarDay) => {
      return section.id === searchedId;
    };
    return list.findIndex(findItemIndex);
  };

  const selectedIndex = useNumber(findItemIndexWithDatePicker());

  const findFirstItemIndexInPageWithDatePicker = (
    indexMinimum = selectedIndex.initial
  ) => {
    let index = findItemIndexWithDatePicker();
    index -= index % 7;
    //     if (listRef.current) {
    //       const index = findItemIndexWithDatePicker();
    //       selectedIndex.setValue(index);
    //     }
    //   }, [datePicker.value]);
    if (index < indexMinimum) index = indexMinimum;
    return index;
  };

  //   useEffect(() => {

  useEffect(() => {
    if (listRef.current) {
      //@ts-ignore
      listRef.current.scrollToOffset({
        offset: ITEM_WIDTH_1x7 * selectedIndex.value,
      });
    }
  }, [selectedIndex.value]);

  type renderItemProps = Omit<CalendarDayProps, "datePicker">;
  const renderItem = useCallback(
    ({ item, index }: renderItemProps) => (
      <CalendarDay item={item} index={index} datePicker={datePicker} />
    ),
    [theme, datePicker]
  );

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    const findFirstItemOfPageVisible = ({ isViewable, index }: ViewToken) => {
      const isFirstElementOfPage = index !== null && index % 7 === 0;
      return isViewable && isFirstElementOfPage;
    };
    let { index } = viewableItems.find(findFirstItemOfPageVisible);
    if (index < 0) return;
    selectedIndex.setValue(index);
    if (index < selectedIndex.initial) {
      index = selectedIndex.initial;
    }
    // console.log("list[index].date", moment(list[index].date));
    datePicker.setValue(moment(list[index].date));
  }, []);

  return (
    <FlatList
      ref={listRef}
      data={sections.dayListFromStartWeek}
      keyExtractor={(item: ICalendarDay) => item.id}
      renderItem={renderItem}
      removeClippedSubviews={true}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      getItemLayout={(data, index: number) => ({
        length: ITEM_WIDTH_1x7,
        offset: index * ITEM_WIDTH_1x7,
        index,
      })}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      maxToRenderPerBatch={7}
      initialNumToRender={7}
    />
  );
};

interface CalendarTaskProps {
  sections: { list: ISection[] };
  datePicker: IMomentHook;
}

const CalendarTask = (props: CalendarTaskProps) => {
  const { sections, datePicker } = props;
  const theme = useTheme();
  const sectionListRef = useRef(null);

  console.log("sections", sections.list.slice(0, 5));
  useEffect(() => {
    if (sectionListRef.current) {
      const searchedId = datePicker.value.toString();
      const findSectionIndex = (section: ISection) => section.id === searchedId;
      const index = sections.list.findIndex(findSectionIndex);
      if (index >= 0) {
        //@ts-ignore
        sectionListRef.current.scrollToLocation({
          sectionIndex: index,
          itemIndex: 0,
        });
      } else {
        //@ts-ignore
        sectionListRef.current.scrollToLocation({
          sectionIndex: 0,
          itemIndex: 0,
        });
      }
    }
  }, [datePicker.value]);

  type renderHeaderProps = Omit<SectionHeaderProps, "datePicker">;
  const renderSectionHeader = useCallback(
    ({ section }: renderHeaderProps) => (
      <SectionHeader section={section} datePicker={datePicker} />
    ),
    [theme]
  );
  const renderItem = useCallback(
    ({ item }: { item: Task }) => <SectionItem item={item} />,
    []
  );
  const extractKey = useCallback((item) => item.id, []);

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    const selectedDate = moment(viewableItems[0]?.item?.date);
    console.log(viewableItems[0]?.item?.date, selectedDate);
    // viewableItems.map((view: any) => {
    //   console.log({ ...view, data: [], section: [] });
    // });
    // console.log({ ...viewableItems, data: [] });
    // if (selectedDate) {
    //   datePicker.setValue(selectedDate);
    // }
  }, []);

  return (
    <SectionList
      ref={sectionListRef}
      sections={sections.list}
      keyExtractor={extractKey}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={true}
      removeClippedSubviews={true}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};

const TodayScreen = () => {
  const addTodoModal = useVisible();
  const theme = useTheme();
  useTodayScreenHeader();
  const sections = useCalendarOfTasks();
  const datePicker = useMoment();

  //   console.log("initial", datePicker.value);

  return (
    <Container page flex>
      <CalendarWeek sections={sections} datePicker={datePicker} />
      <CalendarTask sections={sections} datePicker={datePicker} />
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
