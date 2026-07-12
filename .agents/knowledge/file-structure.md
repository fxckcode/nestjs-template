# File Structure Conventions

**Strict rules for file names, directory organization, and import patterns.**

---

## 1. File Naming Conventions

### Controllers
- **Rule**: `{module-name}.controller.ts` — kebab-case
```
✅ CORRECT:
modules/auth/
├── auth.controller.ts
├── users.controller.ts

❌ INCORRECT:
- AuthController.ts       # PascalCase not allowed
- authController.ts       # camelCase not allowed
```

### Services
- **Rule**: `{module-name}.service.ts` — kebab-case
```
✅ CORRECT:
modules/users/
├── users.service.ts
├── profile.service.ts

❌ INCORRECT:
- UserService.ts          # PascalCase not allowed
```

### Repositories
- **Rule**: `{entity}.repository.ts` — kebab-case
```
✅ CORRECT:
modules/users/
├── user.repository.ts

❌ INCORRECT:
- UserRepository.ts
- userRepo.ts
```

### DTOs
- **Rule**: `{action-entity}.dto.ts` — kebab-case
```
✅ CORRECT:
modules/users/dto/
├── create-user.dto.ts
├── update-user.dto.ts
├── user-response.dto.ts
├── user-filter.dto.ts

❌ INCORRECT:
- CreateUserDto.ts
- user-dto.ts (too generic)
```

### Entities
- **Rule**: `{entity}.entity.ts` — kebab-case
```
✅ CORRECT:
modules/users/entities/
├── user.entity.ts

❌ INCORRECT:
- UserEntity.ts
- user.ts (missing suffix)
```

### Module files
- **Rule**: `{module-name}.module.ts` — kebab-case
```
✅ CORRECT:
modules/auth/
├── auth.module.ts

❌ INCORRECT:
- AuthModule.ts
- module.ts (too generic)
```

### Guards
- **Rule**: `{feature}.guard.ts` — kebab-case
```
✅ CORRECT:
common/guards/
├── jwt-auth.guard.ts
├── roles.guard.ts
├── throttle.guard.ts

❌ INCORRECT:
- JwtAuthGuard.ts
- guard.ts
```

### Decorators
- **Rule**: `{feature}.decorator.ts` — kebab-case
```
✅ CORRECT:
common/decorators/
├── current-user.decorator.ts
├── roles.decorator.ts
├── public.decorator.ts
```

### Filters
- **Rule**: `{feature}.filter.ts` — kebab-case
```
✅ CORRECT:
common/filters/
├── http-exception.filter.ts
├── prisma-exception.filter.ts
```

### Interceptors
- **Rule**: `{feature}.interceptor.ts` — kebab-case
```
✅ CORRECT:
common/interceptors/
├── logging.interceptor.ts
├── transform.interceptor.ts
├── cache.interceptor.ts
```

### Pipes
- **Rule**: `{feature}.pipe.ts` — kebab-case
```
✅ CORRECT:
common/pipes/
├── validation.pipe.ts
├── parse-uuid.pipe.ts
```

### Schema files (Zod)
- **Rule**: `{entity}.schema.ts` — kebab-case
```
✅ CORRECT:
modules/auth/
├── login.schema.ts
├── register.schema.ts
```

### Type files
- **Rule**: `{entity}.types.ts` — kebab-case
```
✅ CORRECT:
modules/auth/
├── auth-user.types.ts
├── login-credentials.types.ts
```

### Messages
- **Rule**: `messages.ts` per module
```
modules/auth/
├── messages.ts    # export const authMessages = { ... }
```

### Tests
- **Rule**: `{name}.spec.ts` — same name as tested file
```
✅ CORRECT:
modules/auth/
├── auth.service.ts
├── auth.service.spec.ts

❌ INCORRECT:
- authServiceTest.ts
- test-auth.service.ts
```

---

## 2. Directory Structure

### Complete project structure:

```
/
├── prisma/
│   ├── schema.prisma              # Prisma schema
│   ├── migrations/                # Auto-generated migrations
│   └── seed.ts                    # Database seed script
│
├── src/
│   ├── main.ts                    # Application entry point
│   │
│   ├── modules/                   # 📋 Business domains (Screaming Architecture)
│   │   ├── auth/                  # Auth domain
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.repository.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── auth-user.entity.ts
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── local-auth.guard.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   └── messages.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── user.repository.ts
│   │   │   ├── users.module.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   ├── update-user.dto.ts
│   │   │   │   └── user-response.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   └── messages.ts
│   │   │
│   │   └── {domain}/             # Additional domains
│   │       └── ...
│   │
│   ├── common/                    # 🔧 Shared infrastructure
│   │   ├── guards/
│   │   │   ├── roles.guard.ts
│   │   │   └── throttle.guard.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   └── transform.interceptor.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   └── middleware/
│   │       └── logging.middleware.ts
│   │
│   ├── config/                    # ⚙️ Configuration
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   ├── config.validation.ts
│   │   └── app-config.module.ts
│   │
│   ├── database/                  # 🗄️ Database layer
│   │   ├── prisma.service.ts
│   │   ├── prisma.module.ts
│   │   └── repositories/
│   │       └── base.repository.ts
│   │
│   ├── utils/                     # 🛠️ Pure utility functions
│   │   ├── date.util.ts
│   │   ├── pagination.util.ts
│   │   └── crypto.util.ts
│   │
│   └── health/                    # 💓 Health checks
│       ├── health.controller.ts
│       ├── health.module.ts
│       └── redis-health.indicator.ts
│
├── test/                          # E2E tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── docker-compose.yml
├── Dockerfile
├── CLAUDE.md
├── AGENTS.md
├── RULES.md
├── .claude/                       # AI agent configuration
├── .opencode/                     # OpenCode configuration
├── commitlint.config.mjs
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

---

## 3. Import Patterns

### Absolute vs Relative Imports

**Rule**: ALWAYS use absolute imports with `@/` alias

```typescript
// tsconfig.json:
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

✅ **CORRECT**:
```typescript
// modules/users/users.service.ts
import { PrismaService } from '@/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { userMessages } from './messages';
import { paginate } from '@/utils/pagination.util';
```

❌ **INCORRECT**:
```typescript
import { PrismaService } from '../../database/prisma.service';
```

### Import ordering:
1. External packages (NestJS, Prisma, etc.)
2. Internal modules (`@/modules/`, `@/common/`)
3. Internal infrastructure (`@/database/`, `@/config/`)
4. Internal utilities (`@/utils/`)
5. Relative imports (current module only)
