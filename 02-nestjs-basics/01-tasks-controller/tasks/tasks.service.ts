import { Injectable } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private count = 0;
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(task: Task): Task {
    const id = (++this.count).toString(); // TODO Generate id
    const item = { id, ...task };
    this.tasks.push(item);
    return item;
  }

  updateTask(id: string, update: Task): Task {
    const index = this.tasks.findIndex((task) => task.id === id); // TODO Check if no item
    if (index === -1) {
      return;
    }
    this.tasks.splice(index, 1, { id, ...update });
    return this.tasks[index];
  }

  deleteTask(id: string): Task {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return;
    }
    const task = this.tasks[index];
    this.tasks.splice(index, 1);
    return task;
  }
}
