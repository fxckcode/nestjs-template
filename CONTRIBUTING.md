# Contributing

Thank you for considering contributing to this template!

## Development Setup

```bash
pnpm install
docker compose up -d
pnpm prisma migrate dev
pnpm start:dev
```

## Code Style

- Follow `RULES.md` conventions
- Conventional commits required
- Write tests for new features
- Keep PRs focused on one change

## Pull Request Process

1. Create a feature branch
2. Ensure tests pass: `pnpm test`
3. Ensure lint passes: `pnpm lint:check`
4. Open a PR with a clear description
