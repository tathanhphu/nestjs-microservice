import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingController } from './product.controller';
import { ProductSchema } from './schemas/product.schema';
import { ConfigService } from './services/config/config.service';
import { MongoConfigService } from './services/config/mongo-config.service';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService
    }),
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
        collection: 'products'
      }
    ])
  ],
  controllers: [ListingController],
  providers: [
    ProductService,
    ConfigService, 
    {
      provide: 'LOG_SERVICE',
      useFactory: (configService: ConfigService) => {
        const logServiceOptions = configService.get('logService');
        return ClientProxyFactory.create(logServiceOptions)
      },
      inject: [ConfigService]
    }, 
    {
      provide: 'USER_EXPERIENCE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userExperienceServiceOptions = configService.get('userExperienceService');
        return ClientProxyFactory.create(userExperienceServiceOptions)
      },
      inject: [ConfigService]
    }
    
  
  ],
})
export class ProductModule {}
