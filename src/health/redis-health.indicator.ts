import { Injectable } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class RedisHealthIndicator {
  constructor(
    private readonly redisService: RedisService,
    private readonly healthIndicatorService: HealthIndicatorService,
  ) {}

  async isHealthy(key: string) {
    const indicator = this.healthIndicatorService.check(key);

    try {
      const pong = await this.redisService.ping();
      if (pong !== 'PONG') {
        return indicator.down({ message: pong });
      }
      return indicator.up({ message: pong });
    } catch (error) {
      return indicator.down({
        message: (error as Error).message,
      });
    }
  }
}
