import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TaskStatus } from "./task.model";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getTasks(
    @Query("status") status?: TaskStatus,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("sortBy") sortBy?: string,
  ) {
    if (page < 0 || limit < 0) {
      throw new BadRequestException();
    }

    if (sortBy && !["title", "status"].includes(sortBy)) {
      throw new BadRequestException();
    }

    return this.tasksService.getFilteredTasks(status, page, limit, sortBy);
  }
}
