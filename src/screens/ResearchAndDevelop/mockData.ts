import Task from "../../models/Task";
import { moment, uuidv4 } from "../../services";

const seedData = [
  {
    title:
      "Avoir une machine linux avec une interface graphic pour les peer correction",
    deadline: moment().add(-moment.duration(1, "day")),
    projectLabel: "Lab 🧪",
  },
  {
    title: "Acheter des lis oranges pour Lucie <3",
    deadline: moment("15 05 2021", "DD MM YYYY"),
    projectLabel: "Famille",
  },
  {
    title: "Faire des bidibous a Lucie <3",
    projectLabel: "Famille",
  },
  {
    title: "Faire les courses",
    projectLabel: "Boite de reception",
  },
  {
    title: "Faire du shopping avec Lucie <3",
    projectLabel: "Famille",
  },
  {
    title: "Travailler sur le clone de todoist",
    projectLabel: "Lab 🧪",
  },
];

const mockData = seedData.map((item, index) => {
  return new Task({
    userId: "userId",
    id: uuidv4(),
    title: item.title ?? "New task " + index,
    deadline: item.deadline ?? moment(),
    projectLabel: item.projectLabel ?? "Boite de reception",
  });
});

const lateTasks = mockData.filter((item) => {
  return moment(item.deadline).isBefore(moment(), "day");
});

const nextTasks = mockData.filter((item) => {
  return moment(item.deadline).isSameOrAfter(moment(), "day");
});

export { lateTasks, nextTasks };
export default mockData;
