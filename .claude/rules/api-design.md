---
paths: src/**/*.ts
---

# API Design Conventions

## RESTful Endpoints

### Resource naming
- **Plural nouns**: `/api/v1/users`, `/api/v1/users/:id`
- **Nested resources**: `/api/v1/users/:userId/posts`
- **Actions on resources**: `/api/v1/users/:id/activate`

### API Versioning
- Prefix all routes with `/api/v1/`
- Version in URL path allows parallel version support

## HTTP Methods

| Method | Purpose | Response |
|--------|---------|----------|
| `GET` | List/retrieve resources | `200 OK` |
| `POST` | Create resource | `201 Created` |
| `PUT` | Full replace | `200 OK` |
| `PATCH` | Partial update | `200 OK` |
| `DELETE` | Remove resource | `204 No Content` or `200 OK` |

## Response Format

### Success responses
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  },
  "message": "Users retrieved successfully"
}
```

### Error responses
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Swagger Documentation

Always decorate with:
- `@ApiTags('{module}')` on controller
- `@ApiOperation({ summary, description })` on endpoints
- `@ApiResponse({ status, description })` on endpoints
- `@ApiBody({ type: CreateDto })` on create/update
- `@ApiParam({ name, type })` on parameterized routes
- `@ApiQuery({ name, type })` on filtered/list endpoints

## Status Code Conventions

| Code | When |
|------|------|
| `200` | Successful GET, PUT, PATCH |
| `201` | Successful POST (resource created) |
| `204` | Successful DELETE (no content) |
| `400` | Validation error / bad request |
| `401` | Unauthenticated |
| `403` | Forbidden (authenticated but not authorized) |
| `404` | Resource not found |
| `409` | Conflict (e.g., duplicate email) |
| `422` | Unprocessable entity |
| `429` | Rate limit exceeded |
| `500` | Internal server error |
