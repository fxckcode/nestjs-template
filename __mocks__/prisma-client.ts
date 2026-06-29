// Mock for Prisma 7 generated client (avoids ESM import.meta.url issue in Jest)
export class PrismaClient {
  $connect(): Promise<void> { return Promise.resolve(); }
  $disconnect(): Promise<void> { return Promise.resolve(); }
  $on(): void { /* noop */ }
  $use(): void { /* noop */ }
  $extends(): unknown { return this; }
  $transaction(): unknown { return Promise.resolve([]); }
}
