import { Injectable,  NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationService } from "../providers/NotificationService";
import { UsersService } from "../users/users.service";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    private notificationService: NotificationService,
    private usersService: UsersService,
    private logger: LoggerService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);

    const user = this.usersService.getUserById(assignedTo);

    await this.notificationService.sendEmail(
      user.email,
      "Новая задача",
      `Вы назначены ответственным за задачу: "${title}"`,
    );

    this.logger.log(
      user.email +
        "Новая задача" +
        `Вы назначены ответственным за задачу: "${title}"`,
    );

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    Object.assign(task, updateTaskDto);

    const user = this.usersService.getUserById(task.assignedTo);

    await this.notificationService.sendSMS(
      user.phone,
      `Статус задачи "${task.title}" обновлён на "${task.status}"`,
    );

    this.logger.log(
      user.phone +
        "-" +
        `Статус задачи "${task.title}" обновлён на "${task.status}"`,
    );

    return task;
  }
}
