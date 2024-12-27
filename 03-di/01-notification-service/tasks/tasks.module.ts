import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { UsersModule } from "../users/users.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [UsersModule, NotificationsModule, LoggerModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
