import { Injectable } from '@nestjs/common';
import LOGGER from '../logger';
@Injectable()
export class LogService {
  
  logMessage(msg, logLevel: 'info' | 'error' | 'warn') {
    LOGGER[logLevel](msg);
  }
}
