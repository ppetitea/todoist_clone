import { db, firebase } from "../../../services/firebase";

export interface ITaskFields {
  title: string;
  comment?: string;
  deadline?: Date | moment.Moment;
  priority?: 0 | 1 | 2 | 3;
  tags?: Array<string>;
  projectId?: string;
}

export interface IUserTask extends ITaskFields {
  userId: string;
  id: string;
  createdAt: Date | moment.Moment;
}

const addTaskToFirestore = (userTask: IUserTask) => {
  const userTasksRef = db.collection("usersTasks").doc(userTask.userId);
  userTasksRef
    .collection("tasks")
    .doc(userTask.id)
    .set(userTask)
    .catch((error) => {
      console.log("Something went wrong with added user to firestore: ", error);
    });
};

export { addTaskToFirestore };
export default addTaskToFirestore;
