import { Injectable } from '@nestjs/common';
import LOGGER from 'src/logger';
@Injectable()
export class LogService {
  
  logMessage(msg) {
    LOGGER.info(msg);
  }
}
