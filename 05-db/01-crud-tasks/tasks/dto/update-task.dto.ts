import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { Task } from "../entities/task.entity";
import { PickType } from "@nestjs/swagger";

export class UpdateTaskDto extends PartialType(
  PickType(CreateTaskDto, ['title', 'description','isCompleted'] as const)
){}
