---
id: spec-first
title: Spec-First Development
role: shared
experience_level: intermediate
workflow_stage: governance
description: Specification-driven development approach for AI-assisted coding
cross_references:
  - context-management
  - rice-framework
tags:
  - spec-first
  - development
  - best-practices
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Governance

> **Experience Level**: Intermediate  
> **Workflow Stage**: Governance

# Spec-First Development

Spec-First Development means creating specifications before implementation. Specifications serve as the source of truth for AI tools and ensure architectural compliance.

## Core Principle

**Never ask AI to "write code for a ticket" - ask it to "implement the logic defined in specs/feature-001.md."**

## Why Spec-First?

### Benefits

1. **Reduced Hallucination**: AI has clear requirements
2. **Architectural Compliance**: Code follows defined architecture
3. **Context Preservation**: Specs maintain context across sessions
4. **Better Code Quality**: Clear requirements lead to better code
5. **Easier Review**: Reviewers can compare code to spec

### Problems Without Specs

- AI guesses requirements
- Inconsistent implementations
- Missing edge cases
- Architecture violations
- Difficult to review

## The Workflow

### Step 1: Create Specification

**Before writing code**, create a specification:

```markdown
# Feature: User Authentication

## Requirements
- User can register with email and password
- User can login with credentials
- Password must be hashed
- JWT tokens for sessions

## Architecture
- Use repository pattern
- Service layer for business logic
- Controller for HTTP handling

## API Design
- POST /api/auth/register
- POST /api/auth/login

## Security
- Bcrypt password hashing
- JWT token generation
- Input validation
```

### Step 2: Open Spec in IDE

**Keep spec file open** when implementing:

```
Open Tabs:
- specs/auth-feature.md (specification)
- src/services/auth-service.ts (implementation)
- src/controllers/auth-controller.ts (implementation)
```

### Step 3: Implement from Spec

**Prompt AI using spec**:

```
Implement the user authentication feature following 
the specification in specs/auth-feature.md.

Use the patterns defined in the spec:
- Repository pattern for data access
- Service layer for business logic
- JWT tokens for authentication
- Bcrypt for password hashing
```

### Step 4: Review Against Spec

**Verify implementation matches spec**:

- [ ] All requirements implemented
- [ ] Architecture patterns followed
- [ ] API design matches spec
- [ ] Security requirements met

## Specification Structure

### Basic Template

```markdown
# Feature: [Feature Name]

## Overview
[Brief description]

## Requirements
[Functional requirements]

## Architecture
[Design patterns, structure]

## API Design
[Endpoints, contracts]

## Security
[Security requirements]

## Testing
[Test requirements]

## Edge Cases
[Edge cases to handle]
```

### Detailed Template

```markdown
# Feature: [Feature Name]

## Overview
[What the feature does, why it's needed]

## User Stories
[User stories or use cases]

## Functional Requirements
- [Requirement 1]
- [Requirement 2]

## Non-Functional Requirements
- Performance: [targets]
- Security: [requirements]
- Scalability: [requirements]

## Architecture
### Design Patterns
- [Pattern 1]
- [Pattern 2]

### Components
- [Component 1]: [responsibility]
- [Component 2]: [responsibility]

## API Design
### Endpoints
- [Method] [Path]: [Description]

### Data Models
- [Model 1]: [structure]

## Security
- [Security requirement 1]
- [Security requirement 2]

## Testing
- [Test requirement 1]
- [Test requirement 2]

## Edge Cases
- [Edge case 1]
- [Edge case 2]
```

## Best Practices

### Do's

✅ **Write specs before code**
- Create spec first
- Review spec with team
- Then implement

✅ **Keep specs open**
- Open spec file in IDE
- Reference in prompts
- Maintain context

✅ **Update specs**
- Keep specs current
- Update when requirements change
- Version control specs

✅ **Reference specs in prompts**
- "Implement according to specs/feature-001.md"
- "Follow the architecture in specs/feature-001.md"
- "Use patterns from specs/feature-001.md"

### Don'ts

❌ **Don't skip specs**
- Always create spec first
- Don't start coding without spec

❌ **Don't let specs get outdated**
- Update specs when requirements change
- Keep specs in sync with code

❌ **Don't ignore specs**
- Follow spec requirements
- Don't deviate without updating spec

## Integration with AI Tools

### GitHub Spec Kit

**Use Spec Kit for**:
- Specification templates
- Validation tools
- Documentation generation

### Copilot with Specs

**Workflow**:
1. Create spec with Spec Kit
2. Open spec in IDE
3. Use Copilot to implement
4. Reference spec in prompts

### Example Prompt

```
Implement the user registration endpoint following 
specs/auth-feature.md.

Requirements from spec:
- POST /api/auth/register
- Validate email and password
- Hash password with bcrypt
- Save to database using UserRepository
- Return JWT token

Follow the architecture patterns defined in the spec.
```

## Related Content

- [Context Management](../../architect-guide/standards/context-management) - Open-tab strategy
- [R.I.C.E. Framework](../prompt-engineering/rice-framework) - Structured prompting
- [AI-Native SDLC Workflows](./ai-native-sdlc-workflows) - Complete SDLC coverage

