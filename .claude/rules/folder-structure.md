---
paths: src/**/*.ts
---

# Folder Structure

The project implements **Screaming Architecture** where each business domain is a self-contained NestJS module.

```
/src
├── main.ts                      # Application entry point
│
├── modules/                     # Business domains
│   ├── auth/                    # Auth module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.repository.ts
│   │   ├── auth.module.ts
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── guards/
│   │   ├── strategies/
│   │   └── messages.ts
│   │
│   ├── users/                   # Users module
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── user.repository.ts
│   │   ├── users.module.ts
│   │   ├── dto/
│   │   ├── entities/
│   │   └── messages.ts
│   │
│   └── {domain}/                # Additional domains
│       └── ...
│
├── common/                      # Shared infrastructure
│   ├── guards/
│   ├── decorators/
│   ├── filters/
│   ├── interceptors/
│   ├── pipes/
│   └── middleware/
│
├── config/                      # Configuration
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── redis.config.ts
│   ├── config.validation.ts
│   └── app-config.module.ts
│
├── database/                    # Database layer
│   ├── prisma.service.ts
│   ├── prisma.module.ts
│   └── repositories/
│
├── utils/                       # Pure utilities
│   ├── date.util.ts
│   └── pagination.util.ts
│
└── health/                      # Health checks
    ├── health.controller.ts
    ├── health.module.ts
    └── redis-health.indicator.ts
```

## Location Rules

| File type | Location | Example |
|-----------|----------|---------|
| **Controller** | `modules/{domain}/` | `modules/auth/auth.controller.ts` |
| **Service** | `modules/{domain}/` | `modules/users/users.service.ts` |
| **Repository** | `modules/{domain}/` | `modules/users/user.repository.ts` |
| **DTO** | `modules/{domain}/dto/` | `modules/users/dto/create-user.dto.ts` |
| **Entity** | `modules/{domain}/entities/` | `modules/users/entities/user.entity.ts` |
| **Guard** | `modules/{domain}/guards/` or `common/guards/` | `modules/auth/guards/jwt-auth.guard.ts` |
| **Filter** | `common/filters/` | `common/filters/http-exception.filter.ts` |
| **Interceptor** | `common/interceptors/` | `common/interceptors/logging.interceptor.ts` |
| **Decorator** | `common/decorators/` | `common/decorators/current-user.decorator.ts` |
| **Pure utility** | `utils/` | `utils/date.util.ts` |
| **Configuration** | `config/` | `config/app.config.ts` |
