import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../database/prisma.service';
import { RedisHealthIndicator } from './redis-health.indicator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaIndicator: PrismaHealthIndicator,
    private prismaService: PrismaService,
    private redisIndicator: RedisHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({
    summary: 'Checks the health of the application and its dependencies (PostgreSQL and Redis)',
  })
  check() {
    return this.health.check([
      () => this.prismaIndicator.pingCheck('database', this.prismaService),
      () => this.redisIndicator.isHealthy('redis'),
    ]);
  }
}
