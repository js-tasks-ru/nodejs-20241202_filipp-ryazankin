import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;
}
