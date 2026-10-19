// Mock for Prisma 7 generated client in tests.
export class PrismaClient {
  $connect(): Promise<void> { return Promise.resolve(); }
  $disconnect(): Promise<void> { return Promise.resolve(); }
  $on(): void { /* noop */ }
  $use(): void { /* noop */ }
  $extends(): unknown { return this; }
  $transaction(): unknown { return Promise.resolve([]); }
}
