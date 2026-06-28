# CLAUDE.md: Project Context for AI Agents

This file provides guidance to AI agents when working with code in this repository.

## Project Overview

This is a **NestJS 11** backend application using **TypeScript**, **Prisma ORM** (PostgreSQL), **Redis**, and **Swagger**. It follows a **Screaming Architecture** approach with domain-driven organization, where each business domain is encapsulated in its own NestJS module with self-contained controllers, services, repositories, DTOs, and entities.

**Tech Stack**: NestJS 11, TypeScript, Prisma ORM, PostgreSQL, Redis (ioredis), Joi/Zod validation, Swagger/OpenAPI, Jest

## General Rules

- **Architecture**: Screaming Architecture — each domain (module) is self-contained with its own controllers, services, repositories, DTOs, entities, and guards. No cross-domain service imports.
- **Naming**: kebab-case for all files and directories. PascalCase for classes, interfaces, types, and NestJS decorators. camelCase for variables, functions, and methods.
- **Code quality**: Never use `any` — use `unknown` or explicit types. No unused variables/imports/parameters.
- **Validation**: Always validate input at the controller layer using DTOs with Zod or class-validator. Validate configuration at bootstrap with Joi.
- **Error handling**: Use NestJS exception filters for consistent error responses. Business logic throws typed exceptions, not generic `Error`.
- **Data access**: Repository pattern — never import Prisma directly in controllers or services. Repositories are the single point of data access.
- **Messages**: No hardcoded strings in business logic — externalize to `messages.ts` files per module.

> Full non-negotiable constraints → `.claude/knowledge/critical-constraints.md`
> Full rules of project → `.claude/rules/*.md`

## 🔴 CRITICAL - READ FIRST

**BEFORE doing anything else**, you MUST read:

`.claude/knowledge/critical-constraints.md`

This document contains non-negotiable architectural rules. Violating these rules is unacceptable.

## Available Specialized Agents

**When working on features, you can delegate to these specialized agents:**

- **Project Knowledge & Context** → `.claude/agents/project-consultant.md`
- **Domain Architect** → `.claude/agents/domain-architect.md`
- **NestJS Module Builder** → `.claude/agents/nestjs-builder.md`
- **Database & Prisma** → `.claude/agents/database-architect.md`
- **API Design & Swagger** → `.claude/agents/api-designer.md`
- **Code Quality Review** → `.claude/agents/code-reviewer.md`
- **Security & Auth** → `.claude/agents/security-auditor.md`

**How to use agents:**
- Read the agent file to understand its role and capabilities
- Agent creates plan in `.claude/plans/`, then you execute it

## Workflow Protocol

### For New Features

1. **Analyze task** and determine which specialized agents are needed
2. **Invoke specialized agents** to create implementation plans
3. **Execute plans** step-by-step
4. **Run lint + tests** after each implementation

### For Trivial Changes

Implement directly (typos, simple edits) - no session needed.

## Documentation Map

### Always Read First
- `.claude/knowledge/critical-constraints.md` — Non-negotiable rules

### Load As Needed
- `.claude/knowledge/architecture-patterns.md` — Architecture rules
- `.claude/knowledge/file-structure.md` — Naming conventions and folder structure
- `.claude/knowledge/tech-stack.md` — Technologies, commands, and patterns

## Coding Rules

**Auto-applied rules** (based on file paths) in `.claude/rules/`:

| Rule | Applies to | Description |
|------|-----------|-------------|
| `code-quality.md` | `src/**/*.ts` | ESLint conventions, TypeScript strictness, no `any` |
| `naming-conventions.md` | `src/**/*.ts` | kebab-case files, PascalCase classes, proper suffixes |
| `folder-structure.md` | `src/**/*.ts` | Screaming Architecture module layout |
| `ddd-module-structure.md` | `src/modules/**/*.ts` | DDD module anatomy: controllers, services, repositories, dto, entities |
| `api-design.md` | `src/**/*.ts` | REST API conventions, Swagger decorators, versioning |

## General Instructions

- Avoid reading files from `.opencode/*`
- Always use `@/` path alias for imports within `src/`
- Named exports only — no `export default`
- One class per file (exceptions: small related types)

## Available Skills

Canonical source: `.agents/` (root). `.claude/skills` and `.opencode/skills` reference it.

| Skill | Description |
|-------|-------------|
| `nestjs-best-practices` | NestJS 11 patterns, modules, DI, providers |
| `nodejs-best-practices` | Node.js backend conventions and patterns |
| `prisma-client-api` | Prisma ORM queries, relations, transactions |
| `prisma-database-setup` | Prisma schema, migrations, seeding |
| `prisma-postgres` | PostgreSQL connection, pooling, with Prisma |
| `typescript-advanced-types` | TypeScript generics, conditional types, mapped types |
