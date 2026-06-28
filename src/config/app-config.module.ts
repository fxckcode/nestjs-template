import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import redisConfig from './redis.config';
import { validationSchema } from './config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig],
      validationSchema,
      validationOptions: {
        abortEarly: true,
        allowUnknown: true,
      },
    }),
  ],
})
export class AppConfigModule {}
