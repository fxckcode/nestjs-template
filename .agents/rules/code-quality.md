---
paths: src/**/*.ts
---

# Code Quality and ESLint Conventions

## TypeScript Rules

### No Unused Variables
- **Rule**: `@typescript-eslint/no-unused-vars: error`
- **Requirement**: All TypeScript variables, functions, imports must be used.
- **Exception**: Variables prefixed with `_`.

### No Explicit `any` Type
- **Rule**: `@typescript-eslint/no-explicit-any: error`
- **Requirement**: Never use `any`. Use proper types or `unknown`.

### Examples
```typescript
// ❌ Incorrect
function processData(data: any) { ... }

// ✅ Correct
function processData(data: unknown) { ... }
function processData(data: UserData) { ... }
```

## Naming Conventions

### camelCase Enforcement
- **Rule**: `camelcase: error`
- Variables, functions, and methods must use camelCase.
- Classes, interfaces, types: PascalCase.

```typescript
// ✅ Correct
const userName = 'John';
const isAuthenticated = true;
class UserService {}

// ❌ Incorrect
const user_name = 'John';
class user_service {}
```

## Console Usage
- **Rule**: `no-console: warn`
- Avoid console.log in production code. Use the logger service instead.

## Best Practices Summary
1. Always use proper TypeScript types — never `any`
2. Remove unused code
3. Follow camelCase/PascalCase naming
4. Use logger service instead of console
5. Type safety first
