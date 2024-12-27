import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationService {
  constructor() {}

  async sendEmail(to: string, subject: string, message: string) {
    console.log(`Email sent to ${to} ${subject} ${message}`);

    return "email send";
  }

  async sendSMS(to: string, message: string) {
    console.log(`SMS sent to ${to} ${message}`);

    return "sms send";
  }
}
