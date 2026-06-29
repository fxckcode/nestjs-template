# NestJS Template

[![CI](https://github.com/fxckcode/nestjs-template/actions/workflows/ci.yml/badge.svg)](https://github.com/fxckcode/nestjs-template/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/fxckcode/nestjs-template)](LICENSE)
[![NestJS](https://img.shields.io/badge/NestJS-11-red?logo=nestjs)](https://nestjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-7-blue?logo=prisma)](https://prisma.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Node](https://img.shields.io/badge/Node-22-339933?logo=nodedotjs)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm)](https://pnpm.io)

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?logo=github)](https://github.com/new?template_name=nestjs-template&template_owner=fxckcode)

Base template for **NestJS 11** backend applications with **Prisma ORM**, **PostgreSQL**, **Redis**, and **Docker** setup.

## Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | NestJS 11 |
| **Language** | TypeScript (strict) |
| **ORM** | Prisma 7 + PostgreSQL 17 |
| **Cache** | Redis 7 (ioredis) |
| **Validation** | Joi (config) + your choice (Zod / class-validator) |
| **Docs** | Swagger / OpenAPI |
| **Testing** | Jest + supertest |
| **Package** | pnpm |
| **Infra** | Docker Compose |

## Quick start

```bash
# 1. Install dependencies
pnpm install

# 2. Start infrastructure (PostgreSQL + Redis)
docker compose up -d

# 3. Run database migrations
pnpm prisma migrate dev

# 4. Start development server
pnpm start:dev
```

Open **http://localhost:3000/api/docs** for Swagger documentation.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm start:dev` | Dev server with watch mode |
| `pnpm build` | Compile to `dist/` |
| `pnpm lint:check` | ESLint check (no auto-fix) |
| `pnpm format:check` | Prettier check |
| `pnpm test` | Unit tests |
| `pnpm test:e2e` | E2E tests |
| `pnpm prisma studio` | Prisma database UI |
| `pnpm prisma migrate dev` | Create migration |
| `pnpm dev:infra` | Start Postgres + Redis only |

## Project structure

```
src/
├── main.ts                  # Application entry point
├── app.module.ts            # Root module
├── app.controller.ts        # Health/demo endpoint
├── app.service.ts           # Demo service
├── config/                  # Config modules (Joi validated)
├── database/                # Prisma client service
├── health/                  # Health checks (DB + Redis)
└── redis/                   # Redis client service
```

Add your business modules under `src/` following whatever architecture fits your use case — screaming architecture, DDD, modular monolith, etc. The template imposes **no opinionated layers**.

## Rules & AI Agents

This template includes configuration for AI coding assistants:

- **`CLAUDE.md`** / **`AGENTS.md`** — Project context for AI agents
- **`RULES.md`** — Quick-reference conventions card
- **`.claude/`** — Rules, knowledge, and agents for Claude Code
- **`.opencode/`** — Mirror config for OpenCode

## GitHub Actions

Two workflows included:

- **CI** (`ci.yml`) — On push/PR: `lint → typecheck → unit tests → e2e tests` with Postgres and Redis service containers
- **Release** (`release.yml`) — On tag `v*`: build + create GitHub Release with auto-generated notes

## Environment

Copy `.env.example` to `.env` and adjust as needed:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/nestjs_db?schema=public
REDIS_URL=redis://localhost:6379
```

## License

MIT
