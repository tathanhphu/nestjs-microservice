import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserExperience } from 'src/interfaces/user-experience.interface';
import LOGGER from '../logger';
@Injectable()
export class LogService {
  constructor(
    @InjectModel('UserExperience') private readonly userExperienceModel: Model<IUserExperience>
  ) {}
  
  logMessage(logLevel: 'info' | 'error' | 'warn', msg) {
    LOGGER[logLevel](msg);
   
  }

  public async createUserLog(userLog: IUserExperience): Promise<IUserExperience> {
    const userExperienceModel = new this.userExperienceModel(userLog);
    return await userExperienceModel.save();
  }

  public async getUserLogs(): Promise<IUserExperience[]> {
    return this.userExperienceModel.find().exec(); 
  }
}
