import React, { useState, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import useString from "../../../hooks/useString";
import useUserTasks from "../../../hooks/useUserTasks";
import Task from "../../../models/Task";
import { moment } from "../../../services";

const { width, height } = Dimensions.get("window");
const ITEM_WIDTH_1x7 = width / 7;

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
  date: Moment;
  title: string;
  letter?: string;
  monthDay?: string;
  constructor(date: Moment) {
    this.date = date;
    this.id = this.toId();
    this.title = this.toTitle();
    this.letter = this.toFirstLetter();
    this.monthDay = this.toMonthDay();
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
  mapOfDays: [string, Day][];
  constructor() {
    this.startOfWeek = moment().weekday(0);
    this.startOfDay = moment().startOf("day");
    this.dayOfWeek = moment().weekday();
    this.nextYearAtEndOfMonth = moment().endOf("month").add(1, "year");
    this.mapOfDays = [];
    this.initialize();
  }
  private initialize() {
    const length = this.getCalendarLength();
    for (let index = 0; index < length; index++) {
      const dayItem = this.buildDayItem(index);
      this.mapOfDays.push([dayItem.id, dayItem]);
    }
  }
  private buildDayItem(index: number) {
    const date = moment(this.startOfWeek).add(index, "days");
    return new Day(date);
  }
  private getCalendarLength() {
    return this.startOfWeek.diff(this.nextYearAtEndOfMonth, "days");
  }
}

interface ICalendarDay {
  id: string;
  index: number;
  date: Moment;
  title: string;
  letter?: string;
  monthDay?: string;
  data: Task[];
}

type CalendarDayMapType = [string, ICalendarDay];

class OneYearCalendar {
  startOfWeek: Moment;
  startOfDay: Moment;
  dayOfWeek: number;
  nextYearAtEndOfMonth: Moment;
  objectOfDays: any;
  mapOfDays: CalendarDayMapType[];
  listOfDays: ICalendarDay[];
  daysFromWeekStartToYesterday: ICalendarDay[];
  daysFromTodayToEndOfMonthNextYear: ICalendarDay[];
  constructor() {
    this.startOfWeek = moment().weekday(0);
    this.startOfDay = moment().startOf("day");
    this.dayOfWeek = moment().weekday();
    this.nextYearAtEndOfMonth = moment().endOf("month").add(1, "year");
    this.objectOfDays = {};
    this.mapOfDays = [];
    this.listOfDays = [];
    this.daysFromWeekStartToYesterday = [];
    this.daysFromTodayToEndOfMonthNextYear = [];
    this.initialize();
  }
  private initialize() {
    const length = this.getCalendarLength();
    for (let index = 0; index < length; index++) {
      const dayItem = this.buildDayItem(index);
      this.mapOfDays.push(dayItem);
      this.listOfDays.push(dayItem[1]);
    }
    this.objectOfDays = Object.fromEntries(this.mapOfDays);
    this.initListFromWeekStartToYesterday();
    this.initListFromTodayToEndOfMonthNextYear();
  }
  private initListFromWeekStartToYesterday() {
    const list = this.listOfDays.slice(0, this.dayOfWeek);
    this.daysFromWeekStartToYesterday = list;
  }
  private initListFromTodayToEndOfMonthNextYear() {
    const list = this.listOfDays.slice(this.dayOfWeek);
    this.daysFromTodayToEndOfMonthNextYear = list;
  }
  private buildDayItem(index: number) {
    const date = moment(this.startOfWeek).add(index, "days");
    const id = date.toString();
    const title = new DateFormator(date).format();
    const letter = date.format("dd").slice(0, 1).toUpperCase();
    const monthDay = date.format("D");
    const item: CalendarDayMapType = [
      id,
      { id, index, date, title, letter, monthDay, data: [] },
    ];
    return item;
  }
  private getCalendarLength() {
    return this.startOfWeek.diff(this.nextYearAtEndOfMonth, "days");
  }
  getIndexFromToday(dateId: string) {
    const index = this.objectOfDays[dateId]?.index - this.dayOfWeek;
    return this.safeIndex(index);
  }
  getIndexFromStartOfWeek(dateId: string) {
    const index = this.objectOfDays[dateId]?.index;
    return this.safeIndex(index);
  }
  private safeIndex(index: number | undefined) {
    if (index !== undefined && index >= 0) return index;
    else return 0;
  }
  //   private buildLateTaskSection(listOfTasks: Task[]) {
  //     const lateTasks = listOfTasks.filter((task: Task) => {
  //       return moment(task.deadline).isBefore(moment(), "day");
  //     });
  //     const sectionDate = moment().subtract(1, "days");
  //     const lateSection: ICalendarDay = {
  //       id: sectionDate.toString(),
  //       date: sectionDate,
  //       title: "En retard",
  //       data: lateTasks,
  //     };
  //     return lateSection;
  //   }
  //   private buildNextTaskSections(listOfTasks: Task[]) {
  //     const nextTasks = listOfTasks.filter((task: Task) => {
  //       return moment(task.deadline).isSameOrAfter(moment(), "day");
  //     });
  //     let soonSections = [...this.daysFromTodayToEndOfMonthNextYear];
  //     const shouldAddTaskToSectionList = (task: Task) => {
  //       const deadline = moment(task.deadline);
  //       return deadline.isBetween(this.startOfDay, this.nextYearAtEndOfMonth)
  //         ? true
  //         : false;
  //     };
  //     const computeTaskIndexInSectionList = (task: Task) => {
  //       const deadline = moment(task.deadline);
  //       return this.startOfDay.diff(deadline, "days");
  //     };
  //     const addTaskToSectionList = (task: Task) => {
  //       const index = computeTaskIndexInSectionList(task);
  //       soonSections[index];
  //       soonSections[index]?.data.push(task);
  //     };
  //     for (const task of nextTasks) {
  //       if (shouldAddTaskToSectionList(task)) {
  //         addTaskToSectionList(task);
  //       }
  //     }
  //     return soonSections;
  //   }
  //   buildTaskSections(listOfTasks: Task[]) {
  //     return {
  //       late: this.buildLateTaskSection(listOfTasks),
  //       next: this.buildNextTaskSections(listOfTasks),
  //     };
  //   }
}

const useArray = (initialValue: any[]) => {
  const [value, setValue] = useState(initialValue);
  return { value, setValue };
};

interface ICalendarOfTaskHook {
  currentDayId: {
    value: string;
    setValue: (value: string) => void;
    virgin: boolean;
    isEmpty: () => boolean;
  };
  calendar: OneYearCalendar;
  tasksSections: {
    late: Task[];
    next: ICalendarDay[];
  };
  taskSectionListRef: any;
  dayListRef: any;
}

const useCalendarOfTasks = () => {
  //   const userTasks = useUserTasks();
  //   const [calendar, setCalendar] = useState(new OneYearCalendar());
  //   const currentDayId = useString(calendar.startOfDay.toString());
  //   const [tasksSections, setTasksSections] = useState(
  //     calendar.buildTaskSections([])
  //   );
  //   const taskSectionListRef = useRef(null);
  //   const dayListRef = useRef(null);
  //   useEffect(() => {
  //     setTasksSections(calendar.buildTaskSections(userTasks));
  //   }, [userTasks]);
  //   useEffect(() => {
  //     if (taskSectionListRef?.current) {
  //       let index = calendar.getIndexFromToday(currentDayId.value);
  //       if (tasksSections.late.length > 0) index++;
  //       //@ts-ignore
  //       taskSectionListRef.current.scrollToLocation({
  //         sectionIndex: index,
  //         itemIndex: 0,
  //       });
  //     }
  //     if (dayListRef?.current) {
  //       const index = calendar.getIndexFromStartOfWeek(currentDayId.value);
  //       //@ts-ignore
  //       dayListRef.current.scrollToOffset({
  //         offset: ITEM_WIDTH_1x7 * index,
  //       });
  //     }
  //   }, [currentDayId.value]);
  //   return {
  //     currentDayId,
  //     calendar,
  //     tasksSections,
  //     taskSectionListRef,
  //     dayListRef,
  //   };
};

export { useCalendarOfTasks, ICalendarOfTaskHook, ITEM_WIDTH_1x7 };
export default useCalendarOfTasks;
