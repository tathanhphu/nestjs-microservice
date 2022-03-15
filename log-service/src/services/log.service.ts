import { Injectable } from '@nestjs/common';
import LOGGER from '../logger';
@Injectable()
export class LogService {
  
  logMessage(msg) {
    LOGGER.info(msg);
  }
}
