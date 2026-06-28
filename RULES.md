# RULES.md — Code Culture

Quick-reference card for this project's non-negotiable conventions.
Full detail in `.claude/rules/` and `.claude/knowledge/critical-constraints.md`.

---

## TypeScript

- Never use `any` — use `unknown` or explicit types
- No unused variables, imports, or parameters; prefix intentionally unused with `_`
- Variables and functions: `camelCase`
- Interfaces and types: `PascalCase` — no `I` prefix, no `Interface` suffix
- Boolean variables: semantic prefix — `is`, `has`, `should`, `can`
- Global constants: `SCREAMING_SNAKE_CASE`
- No barrel `types.ts` re-exporting everything

---

## Naming

- All identifiers in English — no Spanish variable, function, type, or file names
- Exception: non-generic business domain nouns with no clean English equivalent
- All files and directories: `kebab-case`
- Class files: `kebab-case.ts` — never PascalCase filenames
- Module files: `{module-name}.module.ts`
- Controller files: `{module-name}.controller.ts`
- Service files: `{module-name}.service.ts`
- Repository files: `{module-name}.repository.ts`
- DTO files: `{entity}.dto.ts`
- Entity/model files: `{entity}.entity.ts`
- Guard files: `{feature}.guard.ts`
- Decorator files: `{feature}.decorator.ts`
- Filter files: `{feature}.filter.ts`
- Pipe files: `{feature}.pipe.ts`
- Interceptor files: `{feature}.interceptor.ts`
- Schema files: `{entity}.schema.ts`
- Type files: `{entity}.types.ts`
- Utility files: `{entity}.util.ts`
- Messages: `messages.ts` per module
- No default exports — always named exports

---

## Architecture

- **Screaming Architecture** — project structure screams business purpose, not tools
- Business domains are NestJS modules under `src/modules/`
- Each module is fully self-contained: controller, service, repository, DTO, entities, guards
- No cross-module service imports — communicate via shared interfaces or events
- Global shared infrastructure → `src/common/`
- Database layer → `src/database/` (Prisma service, base repositories)
- Configuration → `src/config/`
- Pure utilities → `src/utils/`

---

## Modules

- Each domain module has: `*.module.ts`, `*.controller.ts`, `*.service.ts`, `*.repository.ts`
- Controllers handle HTTP concerns only: validation, serialization, routing
- Services contain business logic
- Repositories handle data access (Prisma queries)
- DTOs define request/response shapes with validation decorators
- Entities define database models
- Providers are registered in the module

---

## API Design

- RESTful conventions: GET (list/read), POST (create), PUT (replace), PATCH (partial update), DELETE
- Plural resource names: `/api/v1/users`, `/api/v1/users/:id`
- Version prefix: `/api/v1/` for all endpoints
- Consistent response envelope: `{ data, meta, message }`
- Swagger decorators on all endpoints (`@ApiTags`, `@ApiOperation`, `@ApiResponse`)

---

## Error Handling

- Typed exceptions in `common/exceptions/` — extend `HttpException`
- Global exception filter catches all unhandled errors
- Business logic throws domain-specific exceptions
- Never catch and swallow — either handle or re-throw

---

## Validation

- DTO validation at controller level (class-validator or Zod)
- Config validation at bootstrap with Joi
- Prisma schema validation at database level
- Never trust client input — always validate

---

## Data Access

- Repository pattern: services depend on repositories, not Prisma directly
- PrismaService is the single Prisma client (injected as a provider)
- Repositories encapsulate all database queries
- Transactions in repositories for multi-step operations

---

## Testing

- Unit tests for services and repositories: `*.spec.ts` next to the file
- E2E tests in `test/` directory
- Mock Prisma in unit tests using `@prisma/client` mocking
- Test controllers with `@nestjs/testing` and `supertest`

---

## Git

- Conventional commits only — no AI attribution, no co-author tags
- Full rules → `.claude/skills/commit-conventions/SKILL.md`
