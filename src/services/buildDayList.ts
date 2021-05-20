import { moment } from "./index";
import Task from "../models/Task";

export type DayTasksType = { date: Date | moment.Moment; listOfTasks: Task[] };

const buildDayListForOneYearFromStartDate = (startDate: "day" | "week") => {
  const today = moment().startOf(startDate);
  const inOneYear = moment().add(13, "months").startOf("month");
  const taskCalendar: DayTasksType[] = [];
  for (let date = today; date.isBefore(inOneYear); date = date.add(1, "day")) {
    taskCalendar.push({ date: moment(date), listOfTasks: [] });
  }
  return taskCalendar;
};
export const buildDayListForOneYearFromToday = () => {
  return buildDayListForOneYearFromStartDate("day");
};
export const buildDayListForOneYearFromStartOfWeek = () => {
  return buildDayListForOneYearFromStartDate("week");
};

export const buildCalendarOfSoonTask = (listOfTasks: Task[]) => {
  const nextTasks = listOfTasks.filter((task: Task) => {
    return moment(task.deadline).isSameOrAfter(moment(), "day");
  });
  const today = moment().startOf("day");
  const inOneYear = moment().add(13, "months").startOf("month");

  let calendar = buildDayListForOneYearFromToday();

  const shouldAddTaskToCalendar = (task: Task) => {
    const deadline = moment(task.deadline);
    return deadline.isBetween(today, inOneYear) ? true : false;
  };
  const computeTaskIndexInCalendar = (task: Task) => {
    const deadline = moment(task.deadline);
    return today.diff(deadline, "days");
  };
  const addTaskToCalendar = (task: Task) => {
    const index = computeTaskIndexInCalendar(task);
    calendar[index]?.listOfTasks.push(task);
  };
  for (const task of nextTasks) {
    if (shouldAddTaskToCalendar(task)) {
      addTaskToCalendar(task);
    }
  }
  return calendar;
};

export const buildLateTaskList = (listOfTasks: Task[]) => {
  const lateTasks = listOfTasks.filter((task: Task) => {
    return moment(task.deadline).isBefore(moment(), "day");
  });
  return {
    date: moment().subtract(1, "days"),
    isLate: true,
    listOfTasks: lateTasks,
  };
};

export const buildCalendarOfTasks = (listOfTasks: Task[]) => {
  const lateTasks = buildLateTaskList(listOfTasks);
  const soonCalendar = buildCalendarOfSoonTask(listOfTasks);
  if (lateTasks.listOfTasks.length > 0) {
    return [lateTasks, ...soonCalendar];
  } else return soonCalendar;
};
