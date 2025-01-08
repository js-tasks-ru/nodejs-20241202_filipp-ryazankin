import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(
    @Query("status") status?: string,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("sortBy") sortBy?: string,
  ): Promise<Task[]> {

    if (page < 0 || limit < 0) {
      throw new BadRequestException();
    }

    if (sortBy && !['id',"title"].includes(sortBy)) {
      throw new BadRequestException();
    }

    return this.tasksService.findAll(status, page, limit, sortBy);
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() task: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() task: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
