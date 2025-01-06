import { BadRequestException, HttpStatus, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    const result = parseInt(value, 10);

    if (!isNaN(result)) {
      return result;
    }

    throw new BadRequestException({
      error: "Bad Request",
      message: `"${value}" не является числом`,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
