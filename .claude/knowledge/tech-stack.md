# Tech Stack

**Complete technology stack with versions, commands, and development tools.**

---

## 1. Core Technologies

| Technology | NestJS 11 | TypeScript, Node.js backend framework |
|------------|-----------|--------------------------------------|
| **NestJS** | `^11.0.0` | Progressive Node.js framework |
| **TypeScript** | `^5.7` | Typed superset of JavaScript |
| **Node.js** | `>=20.11` | JavaScript runtime |
| **Prisma** | `^7.8.0` | ORM for PostgreSQL |
| **PostgreSQL** | `17` | Relational database |
| **Redis** | `7` | Cache and session store |
| **Swagger** | `^11.4` | API documentation (OpenAPI) |

---

## 2. Key Dependencies

### Framework
- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`
- `@nestjs/config` — Environment configuration with Joi validation
- `@nestjs/swagger` — OpenAPI/Swagger documentation
- `@nestjs/terminus` — Health checks

### Database
- `@prisma/client`, `prisma` — ORM
- `@prisma/adapter-pg` — PostgreSQL adapter
- `pg` — PostgreSQL driver

### Cache
- `ioredis` — Redis client

### Validation
- `joi` — Config validation (used with @nestjs/config)
- `class-validator`, `class-transformer` — DTO validation (optional, can use Zod)

---

## 3. Development Tools

### Package Manager
```bash
# Recommended: pnpm
pnpm install
pnpm add <package>
pnpm add -D <package>
```

### NestJS CLI
```bash
# Generate a module
nest g module modules/users

# Generate a controller
nest g controller modules/users --no-spec

# Generate a service
nest g service modules/users --no-spec
```

### Prisma
```bash
# Generate Prisma client
pnpm prisma generate

# Create migration
pnpm prisma migrate dev --name init

# Apply migrations
pnpm prisma migrate deploy

# Open Prisma Studio
pnpm prisma studio

# Seed database
pnpm prisma db seed
```

### Development Server
```bash
# Start dev with watch mode
pnpm run start:dev

# Start in debug mode
pnpm run start:debug
```

---

## 4. Commands Reference

```bash
# Install dependencies
pnpm install

# Development
pnpm run start:dev        # Watch mode
pnpm run start:debug      # Debug mode

# Build
pnpm run build

# Production
pnpm run start:prod

# Lint
pnpm run lint

# Format
pnpm run format

# Test
pnpm run test             # Unit tests
pnpm run test:e2e         # E2E tests
pnpm run test:cov         # Coverage

# Docker
docker compose up -d      # Start PostgreSQL + Redis
docker compose down       # Stop services
```

---

## 5. Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/nestjs_db?schema=public

# Redis
REDIS_URL=redis://localhost:6379

# JWT (for auth)
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## 6. Testing

```bash
# Run unit tests
pnpm run test

# Run E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov

# Watch mode
pnpm run test:watch
```

**Testing stack**: Jest, supertest (E2E)
**Pattern**: `*.spec.ts` next to the tested file
