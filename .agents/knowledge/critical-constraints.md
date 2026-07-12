# Critical Constraints

**Non-negotiable rules that MUST be followed in all code.**

---

## 1. Screaming Architecture: Domain-based organization

❌ **NEVER**: Mix business logic across modules or put everything in flat controllers
✅ **ALWAYS**: Organize by business domain as NestJS modules under `src/modules/`

```
src/modules/           # ✅ Business logic by domain
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.repository.ts
│   ├── auth.module.ts
│   ├── dto/
│   ├── entities/
│   ├── guards/
│   └── messages.ts
├── users/
│   └── ...
```

---

## 2. Repository Pattern for Data Access

❌ **NEVER**: Import Prisma directly in controllers or services
✅ **ALWAYS**: Use repository classes that encapsulate Prisma queries

```typescript
// ❌ INCORRECT
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return this.prisma.user.findMany(); // ❌ Direct Prisma access
  }
}

// ✅ CORRECT
@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async findAll() {
    return this.userRepository.findAll();
  }
}
```

---

## 3. Named exports only (NO default exports)

❌ **NEVER**: Use `export default`
✅ **ALWAYS**: Use named exports

```typescript
// ❌ INCORRECT
export default class UserService {}

// ✅ CORRECT
export class UserService {}
```

---

## 4. Strict naming conventions

❌ **NEVER**: Generic names or without semantic prefixes
✅ **ALWAYS**: Follow specific conventions

```typescript
// ✅ Boolean states: is/has/should
const isLoading = true;
const hasError = false;
const shouldRedirect = true;

// ✅ Event handlers: handle
const handleSubmit = () => {};

// ✅ Directories: kebab-case
// auth/, user-profile/, data-fetching/

// ❌ NEVER
const loading = true; // Missing "is" prefix
```

---

## 5. Validation at all layers

❌ **NEVER**: Trust client input without validation
✅ **ALWAYS**: 3-layer validation: DTO (controller) → Service (business rules) → Database (schema)

```typescript
// ✅ Layer 1: DTO validation
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

// ✅ Layer 2: Service business validation
async create(dto: CreateUserDto) {
  const existing = await this.userRepository.findByEmail(dto.email);
  if (existing) {
    throw new ConflictException('Email already exists');
  }
}

// ✅ Layer 3: Prisma schema enforces at DB level
```

---

## 6. Typed exceptions and global error handling

❌ **NEVER**: Return generic `Error` or handle errors ad-hoc in each controller
✅ **ALWAYS**: Use typed HTTP exceptions with a global exception filter

```typescript
// common/filters/app-exception.filter.ts
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: exception instanceof HttpException
        ? exception.message
        : 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
}
```

---

## 7. No hardcoded strings

❌ **NEVER**: Hardcode strings inside controllers, services, or repositories
✅ **ALWAYS**: Externalize text to `messages.ts` per module

```typescript
// modules/users/messages.ts
export const userMessages = {
  notFound: 'User not found',
  created: 'User created successfully',
  emailExists: 'A user with this email already exists',
} as const;

// modules/users/users.service.ts
import { userMessages } from './messages';

if (!user) {
  throw new NotFoundException(userMessages.notFound);
}
```

---

## 8. Consistent API response format

❌ **NEVER**: Return raw data with inconsistent shapes
✅ **ALWAYS**: Use a consistent response envelope

```typescript
// ✅ Consistent envelope
interface ApiResponse<T> {
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  message?: string;
}
```

---

## 9. HTTP Method conventions

| Method | Purpose | Path |
|--------|---------|------|
| GET | List resources | `/api/v1/users` |
| GET | Get single resource | `/api/v1/users/:id` |
| POST | Create resource | `/api/v1/users` |
| PUT | Replace resource | `/api/v1/users/:id` |
| PATCH | Partial update | `/api/v1/users/:id` |
| DELETE | Delete resource | `/api/v1/users/:id` |

---

## 10. Dependency Injection direction

❌ **NEVER**: A module service importing from another module's service directly
✅ **ALWAYS**: Use module imports to share providers, or use a shared common module

```typescript
// ❌ INCORRECT
// modules/users/users.service.ts
import { AuthService } from '@/modules/auth/auth.service'; // ❌

// ✅ CORRECT — AuthModule exports AuthService, UsersModule imports AuthModule
@Module({
  imports: [AuthModule],
  providers: [UsersService],
})
export class UsersModule {}
```
