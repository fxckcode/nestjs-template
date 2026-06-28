import { PrismaClient } from '../src/generated/prisma/client';

// @ts-expect-error - Prisma 7 generated client expects adapter in constructor
const prisma = new PrismaClient();

async function main() {
  // ──────────────────────────────────────────────────
  //  Add seed data here, for example:
  //  await prisma.user.create({ data: { email: 'admin@example.com', name: 'Admin' } })
  // ──────────────────────────────────────────────────
  console.log('🌱 Seeding database...');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
