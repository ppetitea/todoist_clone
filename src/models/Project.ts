export type TaskDate = null | { startAt: Date; endAt: Date };

interface ITask {
  id: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;
  date: TaskDate;
  hour: TaskDate;
}

interface IProject {
  id: string;
  label: string;
  taskList: Array<{ id: string }>;
  createdAt: Date;
  updatedAt: Date;
}

const getId = (task: ITask) => {
  return task.date?.startAt;
};

const getProjectTasks = (project: IProject, tasks: Array<ITask>) => {
  let projectTasks: Array<ITask> = [];
  for (const taskRef of project.taskList) {
    const found = tasks.find((task: ITask) => task.id === taskRef.id);
    if (found) projectTasks.push(found);
  }
  return projectTasks;
};
