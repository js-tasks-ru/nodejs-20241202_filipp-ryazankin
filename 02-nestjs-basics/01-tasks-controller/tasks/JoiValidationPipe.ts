import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { TaskStatus } from "./task.model";
const Joi = require("joi");

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(
    private schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.string()
        .valid(...Object.values(TaskStatus))
        .required(),
    }),
  ) { }

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException();
    }

    return value;
  }
}
