import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

export class MongoConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    console.log(`[Listing] ${process.env.MONGO_LISTING_DSN}`)
    return {
      uri: process.env.MONGO_LISTING_DSN
    }
  }
}