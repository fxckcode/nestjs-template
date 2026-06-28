---
paths: src/modules/**/*.ts
---

# Domain-Driven Design — NestJS Module Structure

Each folder under `src/modules/` represents a **business domain** as a NestJS module. Every module is fully self-contained.

---

## Anatomy of a Domain Module

```
src/modules/
└── users/                               # Business domain (kebab-case)
    ├── users.controller.ts              # HTTP routes
    ├── users.service.ts                 # Business logic
    ├── user.repository.ts               # Data access (Prisma)
    ├── users.module.ts                  # NestJS module definition
    ├── dto/                             # Request/response validation
    │   ├── create-user.dto.ts
    │   ├── update-user.dto.ts
    │   └── user-response.dto.ts
    ├── entities/                        # Domain entities
    │   └── user.entity.ts
    ├── guards/                          # Module-specific guards
    │   └── user-owner.guard.ts
    └── messages.ts                      # Domain text strings
```

---

## Controller Rules

Controllers handle HTTP concerns ONLY:
- ✅ Route definitions (`@Get`, `@Post`, `@Put`, `@Delete`, `@Patch`)
- ✅ Request validation via DTOs
- ✅ Swagger documentation (`@ApiTags`, `@ApiOperation`, `@ApiResponse`)
- ✅ URL params and query string parsing
- ❌ NO business logic — delegate to services
- ❌ NO direct database access — use services

```typescript
// users.controller.ts
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
```

---

## Service Rules

Services contain ALL business logic:
- ✅ CRUD operations and business rules
- ✅ Validation and authorization logic
- ✅ Orchestration of multiple repositories
- ✅ Throw typed HTTP exceptions
- ❌ NO direct database access — use repositories
- ❌ NO HTTP concerns (headers, status codes)

```typescript
// users.service.ts
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(userMessages.notFound);
    }
    return user;
  }
}
```

---

## Repository Rules

Repositories are the single point of data access:
- ✅ Prisma queries only
- ✅ Transactional operations
- ❌ NO business logic
- ❌ NO throwing HTTP exceptions

```typescript
// user.repository.ts
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
```

---

## DTO Rules

- ✅ class-validator decorators for validation
- ✅ Swagger decorators for API docs
- ✅ One DTO per operation
- ❌ NO business logic

---

## Entity Rules

- ✅ Represent domain models
- ✅ Match Prisma model shapes
- ❌ NO database logic
