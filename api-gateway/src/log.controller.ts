import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller('user-activities')
export class UserActivityController {
  constructor(
    @Inject ('LOG_SERVICE') private readonly logServiceClient: ClientProxy
  ) {}

  @Get('/')
  public async getUserActivities() {
    const response = await firstValueFrom(this.logServiceClient.send('get_user_experience', {}));
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: response.message,
          errors: response.errors,
        },
        response.status,
      );
    }
    return {
      userExperiences: response.userExperiences,
      message: response.message
    };
  }
}