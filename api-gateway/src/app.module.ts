import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { UserActivityController } from './log.controller';
import { ProductController } from './product.controller';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [],
  controllers: [ProductController, UserActivityController],
  providers: [
    ConfigService,
    {
      provide: 'LOG_SERVICE',
      useFactory: (configService: ConfigService) => {
        const logServiceOptions = configService.get('logService');
        return ClientProxyFactory.create(logServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const listingServiceOptions = configService.get('productService');
        return ClientProxyFactory.create(listingServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
