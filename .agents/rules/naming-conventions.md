---
paths: src/**/*.ts
---

# Naming Conventions

## Files and Directories

### Directories: kebab-case (lowercase with hyphens)
- **Valid**: `user-profile/`, `auth/`, `data-fetching/`
- **Incorrect**: `UserProfile/`, `auth_module/`

### Files: kebab-case.ts
- **Valid**: `auth.controller.ts`, `user.repository.ts`, `create-user.dto.ts`
- **Incorrect**: `AuthController.ts`, `userRepo.ts`, `CreateUserDto.ts`

### Suffix conventions:

| File type | Suffix | Example |
|-----------|--------|---------|
| Controller | `.controller.ts` | `auth.controller.ts` |
| Service | `.service.ts` | `users.service.ts` |
| Repository | `.repository.ts` | `user.repository.ts` |
| Module | `.module.ts` | `auth.module.ts` |
| DTO | `.dto.ts` | `create-user.dto.ts` |
| Entity | `.entity.ts` | `user.entity.ts` |
| Guard | `.guard.ts` | `jwt-auth.guard.ts` |
| Decorator | `.decorator.ts` | `current-user.decorator.ts` |
| Filter | `.filter.ts` | `http-exception.filter.ts` |
| Interceptor | `.interceptor.ts` | `logging.interceptor.ts` |
| Pipe | `.pipe.ts` | `validation.pipe.ts` |
| Schema (Zod) | `.schema.ts` | `login.schema.ts` |
| Types | `.types.ts` | `auth-user.types.ts` |
| Messages | `messages.ts` | `messages.ts` |
| Utility | `.util.ts` | `date.util.ts` |
| Test | `.spec.ts` | `auth.service.spec.ts` |

## Variables and Constants

### Boolean variables: semantic prefixes
- **is**: `isLoading`, `isAuthenticated`, `isVisible`
- **has**: `hasError`, `hasPermission`, `hasChildren`
- **should**: `shouldRedirect`, `shouldRefresh`
- **can**: `canEdit`, `canDelete`, `canAccess`

### Global constants: SCREAMING_SNAKE_CASE
- **Valid**: `API_BASE_URL`, `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`

## Functions and Methods

### Event Handlers
- Implementation: `handle` prefix — `handleLogin`, `handleSubmit`
- Props/interfaces: `on` prefix — `onClick`, `onSubmit`

### Service Methods
- CRUD: `create`, `findAll`, `findById`, `update`, `remove`
- Custom: descriptive verbs — `findByEmail`, `activateUser`, `deactivateUser`

## Classes and Interfaces

### Classes: PascalCase
- **Valid**: `UserService`, `AuthController`, `CreateUserDto`
- **Without I prefix**: `User` not `IUser`, `AuthConfig` not `IAuthConfig`

### Interfaces: PascalCase (no I prefix)
- **Valid**: `User`, `AuthPayload`, `JwtPayload`
- **Incorrect**: `IUser`, `UserInterface`, `UserType`
