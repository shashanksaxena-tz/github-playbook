---
id: copilot-instructions
title: .github/copilot-instructions.md Guide
role: architect
experience_level: intermediate
workflow_stage: governance
description: How to create and maintain project-specific Copilot instructions
cross_references:
  - context-management
tags:
  - copilot-instructions
  - configuration
  - best-practices
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Governance

# .github/copilot-instructions.md Guide

The `.github/copilot-instructions.md` file provides project-specific context to GitHub Copilot. This file is automatically read by Copilot and helps it understand your project's architecture, coding standards, and patterns.

## File Location

Create the file at the repository root:

```
your-repo/
├── .github/
│   └── copilot-instructions.md
├── src/
└── ...
```

## File Structure

### 1. Project Overview

```markdown
# Project: [Project Name]

## Overview
Brief description of the project, its purpose, and key technologies.

## Tech Stack
- Language: TypeScript/JavaScript
- Framework: React, Node.js
- Database: PostgreSQL
- Testing: Jest
```

### 2. Architecture Guidelines

```markdown
## Architecture

### Design Patterns
- Use dependency injection for services
- Follow repository pattern for data access
- Implement service layer for business logic

### Project Structure
```
src/
├── controllers/    # API endpoints
├── services/       # Business logic
├── repositories/   # Data access
├── models/         # Data models
└── utils/          # Utilities
```

### Layer Responsibilities
- Controllers: Handle HTTP requests/responses
- Services: Business logic and orchestration
- Repositories: Data access only
```

### 3. Code Style

```markdown
## Code Style

### TypeScript
- Use strict mode
- Prefer interfaces over types for public APIs
- Use async/await over promises
- Use const assertions where appropriate

### Naming Conventions
- Classes: PascalCase (UserService)
- Functions: camelCase (getUserById)
- Constants: UPPER_SNAKE_CASE (MAX_RETRIES)
- Files: kebab-case (user-service.ts)

### Formatting
- Use 2 spaces for indentation
- Use single quotes for strings
- Trailing commas in multi-line objects
```

### 4. Testing Standards

```markdown
## Testing

### Framework
- Use Jest for unit tests
- Use React Testing Library for component tests

### Test Structure
- Write tests before implementation (TDD)
- Use describe/it blocks
- Mock external dependencies
- Test edge cases and error conditions

### Coverage
- Aim for 80%+ code coverage
- Focus on business logic coverage
- Don't test implementation details
```

### 5. Security Requirements

```markdown
## Security

### Authentication
- Use JWT tokens for API authentication
- Implement refresh token rotation
- Never expose tokens in logs

### Data Validation
- Validate all inputs
- Use parameterized queries (prevent SQL injection)
- Sanitize user input (prevent XSS)
- Implement rate limiting

### Secrets Management
- Never hardcode secrets
- Use environment variables
- Use secret management service in production
```

### 6. Error Handling

```markdown
## Error Handling

### Structure
- Use structured error responses
- Include error codes and messages
- Log errors with context

### HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

### Example
```typescript
{
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Email is required',
    field: 'email'
  }
}
```
```

### 7. Common Patterns

```markdown
## Common Patterns

### API Endpoints
- Use RESTful conventions
- Version APIs (/api/v1/...)
- Return consistent response format

### Database Queries
- Use transactions for multi-step operations
- Implement connection pooling
- Use indexes for frequently queried fields

### Logging
- Use structured logging
- Include request IDs for tracing
- Log at appropriate levels (info, warn, error)
```

## Complete Example

```markdown
# Project: E-Commerce API

## Overview
RESTful API for e-commerce platform built with Node.js, TypeScript, and PostgreSQL.

## Tech Stack
- Language: TypeScript
- Runtime: Node.js 18+
- Framework: Express.js
- Database: PostgreSQL
- Testing: Jest, Supertest

## Architecture

### Design Patterns
- Dependency injection using InversifyJS
- Repository pattern for data access
- Service layer for business logic

### Project Structure
```
src/
├── controllers/    # HTTP request handlers
├── services/       # Business logic
├── repositories/  # Data access layer
├── models/        # Data models and DTOs
├── middleware/    # Express middleware
└── utils/         # Utility functions
```

## Code Style

### TypeScript
- Strict mode enabled
- Use interfaces for public APIs
- Prefer async/await
- Use type guards for runtime checks

### Naming
- Classes: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case

## Testing

- Write tests before implementation (TDD)
- Use Jest for unit and integration tests
- Mock external services
- Aim for 80%+ coverage

## Security

- Validate all inputs
- Use parameterized queries
- Never hardcode secrets
- Use environment variables
- Implement rate limiting

## Error Handling

- Return structured error responses
- Use appropriate HTTP status codes
- Log errors with context
- Never expose internal errors to clients
```

## Maintenance

### Regular Updates

- **After Architecture Changes**: Update architecture section
- **After Style Guide Changes**: Update code style section
- **After Security Incidents**: Update security requirements
- **Quarterly Review**: Review and refresh entire file

### Version Control

- Commit changes with clear messages
- Review changes in PRs
- Keep file in sync with actual practices

## Team Adoption

### Rollout

1. **Create Initial File**: Architect creates first version
2. **Team Review**: Team reviews and suggests improvements
3. **Training**: Train team on how to use it
4. **Monitor**: Review AI-generated code quality
5. **Iterate**: Update based on results

### Benefits

- Consistent code style
- Better AI-generated code
- Reduced code review time
- Faster onboarding

## Related Content

- [Context Management](./context-management) - How context works
- [Developer Guide](../../developer-guide/getting-started/developer-guide-introduction) - Developer perspective


