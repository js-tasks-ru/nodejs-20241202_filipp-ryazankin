import { TaskStatus } from "tasks/task.model";

export class CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}
