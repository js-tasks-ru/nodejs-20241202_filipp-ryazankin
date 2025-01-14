import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(
    status: string,
    page: number,
    limit: number,
    sortBy: string,
  ): Promise<Task[]> {
    const options: FindManyOptions = {};
    if (status) {
      options.where = {
        isCompleted: status === 'in_progress',
      };
    }
    if (page && limit) {
      options.skip = (page - 1) * limit;
      options.take = limit;
    }
    if (sortBy) {
      options.order = {
        [sortBy]: 'DESC', // simplified
      };
    }

    return this.taskRepository.find(options);
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneOrFail({ where: { id } })
      .catch( e=> {
        throw new NotFoundException()
      });
  }

  async create(task: Partial<Task>): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async update(id: number, task: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, task);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.findOneOrFail({ where: { id } })
      .catch( e=> {
        throw new NotFoundException()
      });
    await this.taskRepository.delete(id);
  }
}
