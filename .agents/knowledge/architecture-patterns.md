# Architecture Patterns

**Complete definition of architecture, layers, dependencies, and project patterns.**

---

## 1. Architecture Choice

### Architectural Pattern: Screaming Architecture (Clean Architecture)

**Screaming Architecture** (proposed by Robert C. Martin) organizes the project structure so it "screams" its business purpose, not the tools or frameworks it uses.

### Why was it chosen?

1. **Domain clarity**: Opening the project immediately shows what the business is about (auth, users), not the technologies (controllers, models, views)
2. **Feature scalability**: Each domain module is independent and can grow without affecting others
3. **Clear separation**: Business logic (modules) vs shared infrastructure (common) vs configuration (config)
4. **Maintainability**: Everything related to a feature is in one place
5. **NestJS modularity**: Architecture perfectly adapts to NestJS module system

### High-Level Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                     APP (src/main.ts)                         │
│                Bootstrap & Global Config                      │
└──────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┴─────────────────┐
            │                                   │
            ▼                                   ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│   MODULES (Business)      │   │   COMMON (Infrastructure) │
│                           │   │                           │
│  ┌─────────────────────┐ │   │  ┌─────────────────────┐  │
│  │ auth/               │ │   │  │ guards/             │  │
│  │ ├── controller      │ │   │  │ decorators/         │  │
│  │ ├── service         │ │   │  │ filters/            │  │
│  │ ├── repository      │ │   │  │ interceptors/       │  │
│  │ ├── dto/            │ │   │  │ pipes/              │  │
│  │ ├── entities/       │ │   │  │ middleware/         │  │
│  │ └── auth.module.ts  │ │   │  └─────────────────────┘  │
│  └─────────────────────┘ │   │                           │
│                           │   └───────────────────────────┘
│  ┌─────────────────────┐ │                 │
│  │ users/              │ │                 │
│  │ └── ...             │ │                 │
│  └─────────────────────┘ │                 │
└───────────────────────────┘                 │
            │                                 │
            └──────────┬──────────────────────┘
                       │
                       ▼
       ┌──────────────────────────────┐
       │   DATABASE (Data Access)     │
       │   ├── prisma.service.ts      │
       │   ├── prisma.module.ts       │
       │   └── repositories/          │
       └──────────────────────────────┘
                       │
                       ▼
       ┌──────────────────────────────┐
       │   CONFIG (Configuration)     │
       │   ├── app.config.ts          │
       │   ├── database.config.ts     │
       │   └── config.validation.ts   │
       └──────────────────────────────┘
                       │
                       ▼
       ┌──────────────────────────────┐
       │   UTILS (Pure Functions)     │
       │   ├── date.util.ts           │
       │   └── pagination.util.ts     │
       └──────────────────────────────┘
```

---

## 2. Layer Definitions

### Layer 1: Modules (Business Logic)

**Responsibility**: Encapsulate all business logic per feature

**Contains**:
- `*.controller.ts`: HTTP routes and request handling
- `*.service.ts`: Business logic implementation
- `*.repository.ts`: Data access (Prisma queries)
- `dto/`: Request/response validation schemas
- `entities/`: Domain entity representations
- `guards/`: Module-specific guards
- `*.module.ts`: NestJS module definition
- `messages.ts`: Domain-specific text strings

**Rules**:
- ✅ Can import from: `common/`, `database/`, `utils/`
- ✅ Can import from: Other `modules/` (via module imports)
- ❌ MUST NOT import from: `main.ts`, or config directly (use DI)
- 📋 Responsibility: Contain ALL logic related to the feature

### Layer 2: Common (Shared Infrastructure)

**Responsibility**: Global reusable infrastructure

**Contains**:
- `guards/`: JWT, Roles, Throttler guards
- `decorators/`: Custom decorators (`@CurrentUser`, `@Roles`)
- `filters/`: Exception filters
- `interceptors/`: Logging, transformation, caching
- `pipes/`: Validation pipes
- `middleware/`: Global middleware

**Rules**:
- ✅ Can import from: `utils/`
- ❌ MUST NOT import from: `modules/`
- 📋 Responsibility: Cross-cutting concerns

### Layer 3: Database (Data Access Layer)

**Responsibility**: Database connection and base data access

**Contains**:
- `prisma.service.ts`: Prisma client as NestJS provider
- `prisma.module.ts`: Global Prisma module
- `repositories/`: Base/abstract repository classes

**Rules**:
- ✅ Can import from: `utils/`
- ❌ MUST NOT import from: `modules/`
- 📋 Responsibility: Database connectivity and base patterns

### Layer 4: Config (Configuration)

**Responsibility**: Application configuration

**Contains**:
- Configuration files for app, database, Redis
- Config validation (Joi)
- Config module

**Rules**:
- ❌ CANNOT import from: Any other layer
- 📋 Responsibility: Static configuration and env validation

### Layer 5: Utils (Pure Functions)

**Responsibility**: Pure shared utility functions

**Contains**:
- Date formatting, pagination helpers, type utilities

**Rules**:
- ❌ CANNOT import from: Any other layer
- ✅ Can be imported by: All layers
- 📋 Responsibility: Pure, testable functions

---

## 3. Dependency Rules (CRITICAL)

### Dependency Matrix

| From ↓ / To → | modules | common | database | config | utils |
|--------------|---------|--------|----------|--------|-------|
| **modules**  | ⚠️     | ✅     | ✅       | ✅     | ✅    |
| **common**   | ❌      | ✅     | ❌       | ✅     | ✅    |
| **database** | ❌      | ❌     | ✅       | ✅     | ✅    |
| **config**   | ❌      | ❌     | ❌       | ✅     | ❌    |
| **utils**    | ❌      | ❌     | ❌       | ❌     | ✅    |

**Legend**: ✅ Allowed | ❌ Forbidden | ⚠️ Via module imports only

### Forbidden patterns:
```typescript
// ❌ Common importing from modules
import { AuthService } from '@/modules/auth/auth.service';

// ❌ Database importing from modules
import { User } from '@/modules/users/entities/user.entity';

// ❌ Utils importing from any other layer
import { PrismaService } from '@/database/prisma.service';

// ❌ Config importing from modules
import { AuthService } from '@/modules/auth/auth.service';
```
