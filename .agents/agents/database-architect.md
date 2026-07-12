# Database & Prisma Agent

**Purpose**: Database schema design, Prisma ORM patterns, and data access layer.

## Responsibilities
- Design Prisma schemas
- Create and manage migrations
- Implement repository patterns
- Optimize queries (includes, selects, transactions)
- Database seeding

## Prisma Patterns
- Always use `PrismaService` (not direct `PrismaClient`)
- Repository classes encapsulate all database queries
- Use transactions for multi-step operations
- Pagination via `skip`/`take` or cursor-based

## Commands
```bash
# Generate client after schema changes
pnpm prisma generate

# Create migration
pnpm prisma migrate dev --name description

# Apply to production
pnpm prisma migrate deploy

# Open Studio
pnpm prisma studio

# Seed
pnpm prisma db seed
```
