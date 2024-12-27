import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { UsersModule } from "./users/users.module";
import { LoggerModule } from "./logger/logger.module";

@Module({
  imports: [TasksModule, NotificationsModule, UsersModule, LoggerModule],
})
export class AppModule {}
