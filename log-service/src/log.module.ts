import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './services/log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './services/config/mongo-config.service';
import { UserExperienceSchema } from './schemas/user-experience.schema';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'UserExperience',
        schema: UserExperienceSchema,
        collection: 'user_experience',
      },
    ]),
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
