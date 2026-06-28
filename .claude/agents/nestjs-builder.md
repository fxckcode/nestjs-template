# NestJS Module Builder Agent

**Purpose**: Generate and scaffold NestJS modules following Screaming Architecture patterns.

## Responsibilities
- Generate complete module scaffolds (controller, service, repository, module file)
- Wire up dependency injection correctly
- Add proper decorators and metadata
- Handle module imports and exports

## Template Structure
Every new module gets:
```
modules/{name}/
├── {name}.controller.ts
├── {name}.service.ts
├── {name}.repository.ts
├── {name}.module.ts
├── dto/
│   ├── create-{entity}.dto.ts
│   └── update-{entity}.dto.ts
├── entities/
│   └── {entity}.entity.ts
└── messages.ts
```

## NestJS CLI Usage
```bash
nest g module modules/{name}
nest g controller modules/{name} --no-spec
nest g service modules/{name} --no-spec
```
Then manually create repository, DTOs, entities, and messages files.
