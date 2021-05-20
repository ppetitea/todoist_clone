import React, { useEffect, useState } from "react";
import Task, { ITask } from "../models/Task";
import { auth, db } from "../services/firebase";
import { moment } from "../services";

const useUserTasks = () => {
  const initialUserTasks: Task[] = [];
  const [userTasks, setUserTasks] = useState(initialUserTasks);

  useEffect(() => {
    const userTasksRef = db.collection("usersTasks").doc(auth.currentUser?.uid);
    const subscriber = userTasksRef
      .collection("tasks")
      .onSnapshot((snapshot) => {
        let nextUserTasks = snapshot.docs.map((item) => {
          const task = item.data();
          const nextTask = new Task({
            userId: task.userId,
            id: task.id,
            title: task.title,
            comment: task.comment,
            createdAt: moment(task.createdAt?.seconds, "X"),
            deadline: moment(task.deadline?.seconds, "X"),
            priority: task.priority,
            tags: task.tags,
            projectId: task.projectId,
            projectLabel: "Lab 🧪",
          });
          return nextTask;
        });
        nextUserTasks = nextUserTasks.sort(shouldSwapTask);
        setUserTasks(nextUserTasks);
      });
    return () => subscriber();
  }, []);

  const shouldSwapTask = (taskA: ITask, taskB: ITask) => {
    const TRUE = 1;
    const FALSE = -1;
    if (moment(taskA.deadline).isSameOrAfter(taskB.deadline)) {
      return TRUE;
    } else if (moment(taskA.createdAt).isSameOrAfter(taskB.createdAt)) {
      return TRUE;
    } else return FALSE;
  };
  return userTasks;
};

export { useUserTasks };
export default useUserTasks;
