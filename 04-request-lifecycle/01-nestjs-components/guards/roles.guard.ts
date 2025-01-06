import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
} from "@nestjs/common";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userRole = request.headers["x-role"];

    if (userRole === "admin") {
      return true;
    }

    throw new ForbiddenException({
      error: "Forbidden",
      message: "Доступ запрещён: требуется роль admin",
      statusCode: HttpStatus.FORBIDDEN,
    });
  }
}
