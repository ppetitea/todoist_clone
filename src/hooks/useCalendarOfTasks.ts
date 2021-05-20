import React, { useEffect, useState } from "react";
import Task, { ITask } from "../models/Task";
import { auth, db } from "../services/firebase";
import { moment } from "../services";
import useUserTasks from "./useUserTasks";
import useNumber from "./useNumber";

export interface IDay {
  id: string;
  date: Date | moment.Moment;
  title: string;
}

export interface IDayTaskSection extends IDay {
  isLate?: boolean;
  data: Task[];
}

const useCalendarOfTasks = () => {
  const numToRender = useNumber(20);
  const userTasks = useUserTasks();
  const [dayList, setDayList] = useState(buildDayListForOneYearFromToday());
  const [calendarOfTasks, setCalendarOfTasks] = useState(
    buildCalendarOfTasks(userTasks, dayList)
  );

  useEffect(() => {
    setCalendarOfTasks(buildCalendarOfTasks(userTasks, dayList));
  }, [userTasks, dayList]);

  //   const list = calendarOfTasks.slice(0, numToRender.value);
  return { list: calendarOfTasks, numToRender };
};

const buildCalendarOfTasks = (listOfTasks: Task[], dayList: IDay[]) => {
  const lateSection = buildLateSection(listOfTasks);
  const soonSections = buildSoonSections(listOfTasks, dayList);
  if (lateSection.data.length > 0) {
    return [lateSection, ...soonSections];
  } else return soonSections;
};

const buildSoonSections = (listOfTasks: Task[], dayList: IDay[]) => {
  const nextTasks = listOfTasks.filter((task: Task) => {
    return moment(task.deadline).isSameOrAfter(moment(), "day");
  });
  const today = moment().startOf("day");
  const inOneYear = moment().add(13, "months").startOf("month");

  let soonSections: IDayTaskSection[];
  soonSections = dayList.map((day) => ({ ...day, data: [] }));

  const shouldAddTaskToSectionList = (task: Task) => {
    const deadline = moment(task.deadline);
    return deadline.isBetween(today, inOneYear) ? true : false;
  };
  const computeTaskIndexInSectionList = (task: Task) => {
    const deadline = moment(task.deadline);
    return today.diff(deadline, "days");
  };
  const addTaskToSectionList = (task: Task) => {
    const index = computeTaskIndexInSectionList(task);
    soonSections[index];
    soonSections[index]?.data.push(task);
  };
  for (const task of nextTasks) {
    if (shouldAddTaskToSectionList(task)) {
      addTaskToSectionList(task);
    }
  }
  return soonSections;
};

const buildLateSection = (listOfTasks: Task[]) => {
  const lateTasks = listOfTasks.filter((task: Task) => {
    return moment(task.deadline).isBefore(moment(), "day");
  });
  const sectionDate = moment().subtract(1, "days");
  const lateSection: IDayTaskSection = {
    id: sectionDate.toString(),
    date: sectionDate,
    title: "En retard",
    data: lateTasks,
  };
  return lateSection;
};

const buildDayListForOneYearFromToday = () => {
  return buildDayListForOneYearFromStartDate("day");
};
const buildDayListForOneYearFromStartOfWeek = () => {
  return buildDayListForOneYearFromStartDate("week");
};

const buildDayListForOneYearFromStartDate = (startDate: "day" | "week") => {
  const today = moment().startOf(startDate);
  const inOneYear = moment().add(13, "months").startOf("month");
  const dayList: IDay[] = [];
  for (let date = today; date.isBefore(inOneYear); date = date.add(1, "day")) {
    const taskDate = moment(date);
    dayList.push({
      id: taskDate.toString(),
      date: taskDate,
      title: formatDate(taskDate),
    });
  }
  return dayList;
};

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

export { useCalendarOfTasks };
export default useCalendarOfTasks;
