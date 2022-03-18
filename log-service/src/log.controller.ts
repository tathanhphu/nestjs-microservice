import { Controller, HttpStatus, Inject, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { IUserExperienceResponse } from './interfaces/user-experience-create-response';
import { IUserExperienceSearchResponse } from './interfaces/user-experience-search-response';
import { IUserExperience } from './interfaces/user-experience.interface';
import { LogService } from './services/log.service';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  
  @EventPattern('log_info_message')
  public async logMessageInfo(msgObject) {
    this.logService.logMessage('info', msgObject)
  }

  @EventPattern('log_error_message')
  public async logMessageError(msgObject) {
    this.logService.logMessage('error', msgObject)
  }

  @EventPattern('log_warning_message')
  @EventPattern('log_warn_message')
  public async logMessageWarning(msgObject) {
    this.logService.logMessage('warn', msgObject)
  }

  @EventPattern('add_user_experience')
  public async addUserExperience(userExperience: IUserExperience): Promise<IUserExperienceResponse> {
    try {
      let response = await this.logService.createUserLog(userExperience);  
      return {
        status: HttpStatus.CREATED,
        message: 'create_user_experience_success',
        userExperience: response
      }
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'create_user_experience_bad_request',
        errors: err.errors
      };
    }
  }

  @EventPattern('get_user_experience')
  public async getUserExperiences(): Promise<IUserExperienceSearchResponse> {
    try {
      let response = await this.logService.getUserLogs();  
      return {
        status: HttpStatus.CREATED,
        message: 'create_user_experience_success',
        userExperiences: response
      }
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'create_user_experience_bad_request',
        errors: err.errors
      };
    }
  }
}
