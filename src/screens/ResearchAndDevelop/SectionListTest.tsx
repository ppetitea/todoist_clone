import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  SectionList,
  ViewToken,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import palette from "../../constants/palette";
import useBoolean, { useVisible } from "../../hooks/useBoolean";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../services/firebase";
import Drawer from "../../components/Drawer/Drawer";
import useDrawer from "../../components/Drawer/hooks/useDrawer";
import Container from "../../components/Container";
import mockData, { nextTasks } from "./mockData";
import { moment } from "../../services";
import Task from "../../models/Task";
import Typo from "../../components/Typo";
import { ITEM_WIDTH_1x7 } from "../TodayScreen/hooks/useCalendarOfTasks";
import useNumber from "../../hooks/useNumber";
import { useTheme } from "../../navigation/hooks/ThemeContext";
import Constants from "expo-constants";
import { useHeaderHeight } from "@react-navigation/stack";
import useDelay from "../../hooks/useDelay";

const { width, height } = Dimensions.get("window");

type Moment = moment.Moment;

class DateFormator {
  today: Moment;
  tomorrow: Moment;
  date: Moment;
  constructor(date: Moment) {
    this.today = moment().startOf("day");
    this.tomorrow = moment().startOf("day").add(1, "day");
    this.date = date;
  }
  format() {
    if (this.date.isBefore(this.today)) return "En Retard";
    let formatedDate = "";
    if (this.shouldShowCalendarDate()) {
      formatedDate += this.calendarDateWitthoutHours() + " · ";
    }
    if (this.shouldShowDateWithYear()) {
      formatedDate += this.date.format("D MMM YYYY");
    } else {
      formatedDate += this.date.format("ddd D MMMM");
    }
    return formatedDate;
  }
  private shouldShowDateWithYear() {
    return !this.date.isSame(this.today, "year");
  }
  private shouldShowCalendarDate() {
    return (
      this.date.isSame(this.today, "day") ||
      this.date.isSame(this.tomorrow, "day")
    );
  }
  private calendarDateWitthoutHours() {
    return this.date.calendar().split(" ")[0];
  }
}

class Day {
  id: string;
  index: number;
  date: Moment;
  title: string;
  letter?: string;
  monthDay?: string;
  data: Task[];
  constructor(date: Moment, index: number) {
    this.date = date;
    this.index = index;
    this.id = this.toId();
    this.title = this.toTitle();
    this.letter = this.toFirstLetter();
    this.monthDay = this.toMonthDay();
    this.data = [
      new Task({ userId: "userId", title: `task for ${this.title}` }),
    ];
  }
  private toId() {
    return this.date.toString();
  }
  private toTitle() {
    return new DateFormator(this.date).format();
  }
  private toFirstLetter() {
    return this.date.format("dd").slice(0, 1).toUpperCase();
  }
  private toMonthDay() {
    return this.date.format("D");
  }
}

class Calendar {
  startOfWeek: Moment;
  startOfDay: Moment;
  dayOfWeek: number;
  nextYearAtEndOfMonth: Moment;
  listOfDays: Day[];
  mapOfDays: [string, Day][];
  constructor() {
    this.startOfWeek = moment().weekday(0);
    this.startOfDay = moment().startOf("day");
    this.dayOfWeek = moment().weekday();
    this.nextYearAtEndOfMonth = moment().add(13, "months").startOf("month");
    this.listOfDays = [];
    this.mapOfDays = [];
    this.initialize();
  }
  private initialize() {
    const length = this.getCalendarLength();
    for (let index = 0; index < length; index++) {
      const dayItem = this.buildDayItem(index);
      this.listOfDays.push(dayItem);
      this.mapOfDays.push([dayItem.id, dayItem]);
    }
  }
  private buildDayItem(index: number) {
    const date = moment(this.startOfWeek).add(index, "days");
    return new Day(date, index);
  }
  private getCalendarLength() {
    return this.nextYearAtEndOfMonth.diff(this.startOfWeek, "days");
  }
  get() {
    return {
      startOfWeek: this.startOfWeek,
      startOfDay: this.startOfDay,
      dayOfWeek: this.dayOfWeek,
      nextYearAtEndOfMonth: this.nextYearAtEndOfMonth,
      listOfDays: this.listOfDays,
      mapOfDays: this.mapOfDays,
    };
  }
}

interface SectionHeaderProps {
  section: Day;
  isFocus: boolean;
  focusSection: () => void;
}
const SectionHeader = React.memo(
  ({ section, isFocus, focusSection }: SectionHeaderProps) => {
    const headerHeight = useHeaderHeight();
    const SCREEN_HEIGHT = height - headerHeight + Constants.statusBarHeight;
    const ITEM_HEIGHT = SCREEN_HEIGHT / 10;
    const renderCount = useRef(0);
    renderCount.current = renderCount.current + 1;
    const theme = useTheme();

    return (
      <TouchableOpacity onPress={focusSection}>
        <Container
          height={ITEM_HEIGHT}
          backgroundColor={isFocus ? theme.bar : theme.surface0}
        >
          <Typo>{`${section.title} rendus ${renderCount.current}`}</Typo>
        </Container>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.section.id !== nextProps.section.id) {
      return false;
    } else if (prevProps.isFocus !== nextProps.isFocus) {
      return false;
    } else return true;
  }
);
const SectionItem = React.memo(
  ({ item }: { item: Task }) => {
    const theme = useTheme();
    const headerHeight = useHeaderHeight();
    const SCREEN_HEIGHT = height - headerHeight + Constants.statusBarHeight;
    const ITEM_HEIGHT = SCREEN_HEIGHT / 10;
    return (
      <Container height={ITEM_HEIGHT} backgroundColor={theme.surface2}>
        <Typo>{item.title}</Typo>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.item.id === nextProps.item.id) {
      return true;
    } else return false;
  }
);

const useTopSectionList = (initialSection: any) => {
  const delay = useDelay(300);
  const [topSection, setTopSection] = useState(initialSection);
  const onViewableItemsChanged = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const { viewableItems, changed } = info;
      const firstItemViewable = viewableItems[0]?.section;
      const shouldUpdateTopSection = () => {
        if (firstItemViewable === undefined) return false;
        if (firstItemViewable.id === topSection?.id) return false;
        return true;
      };
      if (shouldUpdateTopSection()) {
        delay.runAsync((firstItemViewable) => {
          setTopSection(firstItemViewable);
        }, firstItemViewable);
      }
    }
  );
  return {
    value: topSection,
    setValue: setTopSection,
    onViewableItemsChanged: onViewableItemsChanged.current,
  };
};
const useSectionList = () => {
  const keyExtractor = useCallback((item: Task) => item.id, []);
  return { keyExtractor };
};
const useCalendarSectionList = () => {
  const { keyExtractor } = useSectionList();
  const [calendar, setCalendar] = useState(new Calendar().get());

  return { ...calendar, keyExtractor };
};

const useScreenHeight = () => {
  const headerHeight = useHeaderHeight();
  const { height } = useWindowDimensions();
  const screenHeight = height - headerHeight + Constants.statusBarHeight;
  return screenHeight;
};

const SectionListTest = () => {
  try {
    const screenHeight = useScreenHeight();
    const calendar = useCalendarSectionList();
    const topSection = useTopSectionList(null);
    const listRef = useRef(null);

    console.log(topSection?.value?.title);

    const renderItem = useCallback(
      ({ item }: { item: Task }) => <SectionItem item={item} />,
      []
    );
    const renderSectionHeader = ({ section }: { section: Day }) => {
      const isFocus = topSection.value?.id === section.id;
      const focusSection = () => topSection.setValue(section);
      return (
        <SectionHeader
          section={section}
          isFocus={isFocus}
          focusSection={focusSection}
        />
      );
    };

    useEffect(() => {
      if (listRef.current && topSection?.value?.index !== undefined) {
        //@ts-ignore
        listRef.current.scrollToLocation({
          sectionIndex: topSection?.value?.index,
          itemIndex: 0,
        });
      }
    }, [topSection.value]);

    return (
      <Container height={screenHeight} width={width}>
        <SectionList
          ref={listRef}
          sections={calendar.listOfDays}
          keyExtractor={calendar.keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled
          maxToRenderPerBatch={10}
          windowSize={11}
          initialNumToRender={20}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 20,
          }}
          onViewableItemsChanged={topSection.onViewableItemsChanged}
        />
      </Container>
    );
  } catch (error) {
    console.log(error);
    return (
      <Container page>
        <Typo>{JSON.stringify(error)}</Typo>
      </Container>
    );
  }
};

const styles = StyleSheet.create({});

export default SectionListTest;
