import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const pong = await this.redisService.ping();
      const isHealthy = pong === 'PONG';

      const result = this.getStatus(key, isHealthy, { message: pong });

      if (isHealthy) {
        return result;
      }

      throw new HealthCheckError('Redis check failed', result);
    } catch (error) {
      const result = this.getStatus(key, false, {
        message: (error as Error).message,
      });
      throw new HealthCheckError('Redis check failed', result);
    }
  }
}
