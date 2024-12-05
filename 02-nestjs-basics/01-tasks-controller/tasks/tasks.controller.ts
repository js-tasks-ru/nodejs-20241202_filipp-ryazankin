import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    const task = this.tasksService.getTaskById(id);
    if (task === undefined) {
      throw new NotFoundException();
    }
    return task;
  }

  @Post()
  createTask(@Body() task: Task) {
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() task: Task) {
    return this.tasksService.updateTask(id, task);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(id);
  }
}
