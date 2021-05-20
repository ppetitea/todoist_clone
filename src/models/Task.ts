import { moment, uuidv4 } from "../services";
import * as yup from "yup";

export interface ITaskParams {
  userId: string;
  id?: string;
  title?: string;
  comment?: string;
  createdAt?: Date | moment.Moment;
  deadline?: Date | moment.Moment;
  priority?: 0 | 1 | 2 | 3;
  tags?: Array<string>;
  projectId?: string;
  projectLabel?: string;
}
export interface ITask {
  userId: string;
  id: string;
  title: string;
  createdAt: Date | moment.Moment;
  comment?: string;
  deadline?: Date | moment.Moment;
  priority?: 0 | 1 | 2 | 3;
  tags?: Array<string>;
  projectId?: string;
  projectLabel?: string;
}

export class Task {
  userId: string;
  id: string;
  title: string;
  createdAt: Date | moment.Moment;
  comment?: string;
  deadline?: Date | moment.Moment;
  priority?: 0 | 1 | 2 | 3;
  tags?: Array<string>;
  projectId?: string;
  projectLabel?: string;
  constructor(initialState?: ITaskParams) {
    this.userId = initialState?.userId ?? "";
    this.id = initialState?.id ?? uuidv4();
    this.title = initialState?.title ?? "";
    this.comment = initialState?.comment;
    this.createdAt = initialState?.createdAt ?? moment().toDate();
    this.deadline = initialState?.deadline;
    this.priority = initialState?.priority;
    this.tags = initialState?.tags ?? [];
    this.projectId = initialState?.projectId;
  }
  toValues() {
    return;
  }
  toFormikInitialValues() {
    return {
      title: this.title ?? "",
      comment: this.comment ?? "",
      deadline: this.deadline ?? moment().toDate(),
      priority: this.priority ?? 0,
      tags: this.tags ?? [],
      projectId: this.projectId ?? "",
    };
  }
  toFormikValidationSchema() {
    const schema = yup.object().shape({
      title: yup.string().min(1).required(),
      comment: yup.string(),
      createdAt: yup.date(),
      deadline: yup.date(),
      priority: yup.number().integer(),
      tags: yup.array().of(yup.string()),
      projectId: yup.string(),
    });
    return schema;
  }
}

export default Task;
