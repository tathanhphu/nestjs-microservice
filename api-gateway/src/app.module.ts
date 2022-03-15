import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ListingController } from './listing.controller';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [],
  controllers: [ListingController],
  providers: [
    ConfigService,
    {
      provide: 'LOG_SERVICE',
      useFactory: (configService: ConfigService) => {
        const logServiceOptions = configService.get('logService');
        console.log(`logServiceOptions: ${JSON.stringify(logServiceOptions)}`);
        return ClientProxyFactory.create(logServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'LISTING_SERVICE',
      useFactory: (configService: ConfigService) => {
        const listingServiceOptions = configService.get('listingService');
        return ClientProxyFactory.create(listingServiceOptions);
      },
      inject: [ConfigService],
    }
  ],
})
export class AppModule {}
