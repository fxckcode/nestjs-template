import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));
const prismaClientMock = path.resolve(root, '__mocks__/prisma-client.ts');

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^(?:\.\.\/generated\/prisma\/client|\.\.\/\.\.\/generated\/prisma\/client)$/,
        replacement: prismaClientMock,
      },
    ],
  },
  test: {
    environment: 'node',
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'src/generated/**'],
    },
  },
});
