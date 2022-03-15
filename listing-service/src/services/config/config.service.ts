import { Transport } from '@nestjs/microservices'
export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.LISTING_SERVICE_PORT
    };
    this.envConfig.logService = {
      options: {
        port: process.env.LOG_SERVICE_PORT,
        host: process.env.LOG_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.userExperienceService = {
      options: {
        port: process.env.USER_EXPERIENCE_SERVICE_PORT,
        host: process.env.USER_EXPERIENCE_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    }
    //this.envConfig.baseUri = process.env.BASE_URI;
    //this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
