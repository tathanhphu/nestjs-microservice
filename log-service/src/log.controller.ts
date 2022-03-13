import { Controller, HttpStatus, Inject, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { LogService } from './services/log.service';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @MessagePattern('log_message')
  @EventPattern('log_message')
  public async logMessage(msgObject) {
    this.logService.logMessage(msgObject)
  }
  // @Get()
  // getHello(): string {
  //   return this.logService.hello();
  // }
}
