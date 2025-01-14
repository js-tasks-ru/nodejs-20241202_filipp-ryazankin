import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";

export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const start = Date.now()
    return next.handle().pipe(
      map((data) => ({
        ...data,
        apiVersion: "1.0",
        executionTime: `${(Date.now() - start)}ms`,
      })),
    );
  }
}
