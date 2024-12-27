import { Injectable } from "@nestjs/common";
import * as path from "node:path";
import * as fs from "node:fs";

@Injectable()
export class LoggerService {

  private readonly filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, '/', 'notifications.log');
  }

  log(message: string) {
    fs.appendFileSync(this.filePath, `${new Date().toLocaleString('ru-RU')} - ${message}\n`);
  }
}
