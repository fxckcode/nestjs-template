import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { DatabaseModule } from '../database/database.module';
import { RedisModule } from '../redis/redis.module';
import { RedisHealthIndicator } from './redis-health.indicator';

@Module({
  imports: [TerminusModule, DatabaseModule, RedisModule],
  controllers: [HealthController],
  providers: [RedisHealthIndicator],
})
export class HealthModule {}
