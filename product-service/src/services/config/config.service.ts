import { Transport } from '@nestjs/microservices';
export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.PRODUCT_SERVICE_PORT,
    };
    this.envConfig.logService = {
      options: {
        port: process.env.LOG_SERVICE_PORT,
        host: process.env.LOG_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
