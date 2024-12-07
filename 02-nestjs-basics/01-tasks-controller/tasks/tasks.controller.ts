import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { JoiValidationPipe } from "./JoiValidationPipe";
import { CreateTaskDto } from "./dto/create-task.dto";

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
    return task;
  }

  @Post()
  @UsePipes(new JoiValidationPipe())
  createTask(@Body() task: CreateTaskDto) {
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
