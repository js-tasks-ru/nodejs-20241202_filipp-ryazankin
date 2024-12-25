import { Module } from "@nestjs/common";
import { NotificationService } from "../providers/NotificationService";

@Module({
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationsModule {}
