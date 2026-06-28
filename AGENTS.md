# AGENTS.md — Project Context for AI Agents

This file provides guidance to AI agents when working with code in this repository.

## Project Overview

This is a **NestJS 11** backend application using **TypeScript**, **Prisma ORM** (PostgreSQL), **Redis**, and **Swagger**. It follows a **Screaming Architecture** approach with domain-driven organization, where each business domain is encapsulated in its own NestJS module.

**Tech Stack**: NestJS 11, TypeScript, Prisma ORM, PostgreSQL, Redis (ioredis), Joi/Zod validation, Swagger/OpenAPI, Jest

## General Rules

- **Architecture**: Screaming Architecture — each domain (module) is self-contained with its own controllers, services, repositories, DTOs, entities
- **Naming**: kebab-case for files/directories. PascalCase for classes/types. camelCase for variables/functions. Semantic boolean prefixes (`is`, `has`, `should`, `can`)
- **Code quality**: Never use `any`. No unused variables. Strict TypeScript
- **Validation**: DTO validation at controller layer. Config validation at bootstrap
- **Error handling**: Typed exceptions + exception filters
- **Data access**: Repository pattern — repositories are the single point of data access
- **No hardcoded strings** — externalize to `messages.ts`

> Full constraints → `.claude/knowledge/critical-constraints.md`
> Full rules → `.claude/rules/*.md`

## 🔴 CRITICAL - READ FIRST

Read `.claude/knowledge/critical-constraints.md` — non-negotiable rules.

## Available Agents

- **Project Knowledge & Context** → `.claude/agents/project-consultant.md`
- **Domain Architect** → `.claude/agents/domain-architect.md`
- **NestJS Module Builder** → `.claude/agents/nestjs-builder.md`
- **Database & Prisma** → `.claude/agents/database-architect.md`
- **API Design & Swagger** → `.claude/agents/api-designer.md`
- **Code Quality Review** → `.claude/agents/code-reviewer.md`
- **Security & Auth** → `.claude/agents/security-auditor.md`

## Workflow Protocol

1. **Analyze task** and determine which specialized agents are needed
2. **Invoke specialized agents** to create plans in `.claude/plans/`
3. **Execute plans** step-by-step
4. **Run lint + tests** after each implementation

## Documentation Map

### Always Read First
- `.claude/knowledge/critical-constraints.md`

### Load As Needed
- `.claude/knowledge/architecture-patterns.md`
- `.claude/knowledge/file-structure.md`
- `.claude/knowledge/tech-stack.md`

## Coding Rules

Auto-applied in `.claude/rules/`:

| Rule | Applies to | Description |
|------|-----------|-------------|
| `code-quality.md` | `src/**/*.ts` | ESLint, TypeScript strictness |
| `naming-conventions.md` | `src/**/*.ts` | kebab-case, PascalCase, suffixes |
| `folder-structure.md` | `src/**/*.ts` | Module layout |
| `ddd-module-structure.md` | `src/modules/**/*.ts` | DDD module anatomy |
| `api-design.md` | `src/**/*.ts` | REST API conventions, Swagger |

## Available Skills

Canonical source: `.agents/`. Skills reference in `.claude/skills/` and `.opencode/skills/`.

| Skill | Description |
|-------|-------------|
| `nestjs-best-practices` | NestJS 11 patterns, modules, DI |
| `nodejs-best-practices` | Node.js backend conventions |
| `prisma-client-api` | Prisma ORM queries, relations, transactions |
| `prisma-database-setup` | Prisma schema, migrations, seeding |
| `prisma-postgres` | PostgreSQL with Prisma |
| `typescript-advanced-types` | TypeScript generics, conditional types |
