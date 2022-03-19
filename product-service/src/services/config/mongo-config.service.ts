import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

export class MongoConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    console.log(`[Product] ${process.env.MONGO_PRODUCT_DSN}`);
    return {
      uri: process.env.MONGO_PRODUCT_DSN,
    };
  }
}
