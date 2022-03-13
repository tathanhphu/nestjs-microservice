import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './services/log.service';

@Module({
  imports: [],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
