---
id: context-management
title: "Context Management: The Open-Tab Strategy"
role: architect
experience_level: intermediate
workflow_stage: governance
description: Establish context management practices for effective AI tool usage
cross_references:
  - copilot-instructions
  - spec-first
tags:
  - context-management
  - architecture
  - best-practices
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Governance

# Context Management: The Open-Tab Strategy

Effective context management ensures AI tools understand your codebase, patterns, and requirements. The "Open-Tab Strategy" is a proven approach for maximizing AI tool effectiveness.

## The Open-Tab Strategy

### Core Principle

**AI tools prioritize "neighboring tabs" for context**. Keep relevant files open when working with AI tools to provide maximum context.

### What to Keep Open

1. **Interface/Type Definitions**
   - API contracts
   - TypeScript interfaces
   - Protocol definitions
   - Data models

2. **Related Implementation Files**
   - Files that call the code you're writing
   - Files that are called by your code
   - Similar implementations for pattern matching

3. **Test Files**
   - Existing test suites (to match style)
   - Test utilities and helpers
   - Mock definitions

4. **Configuration Files**
   - Project configuration
   - Environment settings
   - Build configurations

5. **Specifications**
   - Feature specifications
   - API documentation
   - Architecture diagrams (as comments)

## Implementation Guidelines

### For Individual Developers

**Daily Workflow**:
1. Open specification file for the feature you're working on
2. Open related interface/type files
3. Open existing similar implementations
4. Open test file (if writing tests)
5. Start coding with AI assistance

**Example**:
```
Open Tabs:
- specs/feature-001.md (specification)
- src/types/user.ts (type definitions)
- src/services/user-service.ts (similar service)
- tests/user-service.test.ts (test style reference)
- src/services/auth-service.ts (current work)
```

### For Teams

**Establish Standards**:
1. **Specification Location**: Standardize where specs are stored
2. **Type Definition Location**: Consistent location for interfaces
3. **Documentation**: Keep architecture docs up to date
4. **Training**: Teach team the open-tab strategy

## .github/copilot-instructions.md

### Purpose

Project-specific coding guidelines that Copilot reads automatically.

### Location

Create `.github/copilot-instructions.md` in your repository root.

### Content Structure

```markdown
# Project Coding Guidelines

## Architecture
- Use dependency injection
- Follow SOLID principles
- Use repository pattern for data access

## Code Style
- Use TypeScript strict mode
- Prefer async/await over promises
- Use functional programming where appropriate

## Testing
- Write tests before implementation (TDD)
- Use Jest for unit tests
- Mock external dependencies

## Security
- Never hardcode secrets
- Use environment variables
- Validate all inputs
- Use parameterized queries

## Error Handling
- Use structured error responses
- Log errors with context
- Return appropriate HTTP status codes
```

### Benefits

- Consistent code style across team
- Automatic context for all developers
- Reduced need for repetitive explanations
- Better AI-generated code quality

## Specification-First Approach

### Why Specifications Matter

Specifications serve as the source of truth for AI tools:

1. **Clear Requirements**: AI understands what to build
2. **Context Preservation**: Specs maintain context across sessions
3. **Architectural Compliance**: Ensures generated code follows architecture
4. **Reduced Hallucination**: Less guessing, more accuracy

### Implementation

1. **Create Specs First**: Before implementation, write specification
2. **Keep Specs Open**: Open spec file when implementing
3. **Reference in Prompts**: "Implement according to specs/feature-001.md"
4. **Update Specs**: Keep specs current as requirements change

### Example Prompt

```
Implement the user authentication feature following 
the specification in specs/auth-feature.md.

Use the patterns defined in the spec:
- Repository pattern for data access
- Dependency injection for services
- JWT tokens for authentication
```

## Best Practices

### Do's

✅ Keep relevant files open when using AI tools
✅ Maintain `.github/copilot-instructions.md`
✅ Write specifications before implementation
✅ Update context files regularly
✅ Use consistent naming conventions

### Don'ts

❌ Don't work with AI tools with no context files open
❌ Don't skip writing specifications
❌ Don't let copilot-instructions.md get outdated
❌ Don't assume AI knows your project structure
❌ Don't ignore architectural patterns

## Team Rollout

### Phase 1: Setup

1. Create `.github/copilot-instructions.md`
2. Document project architecture
3. Establish spec location standards

### Phase 2: Training

1. Train team on open-tab strategy
2. Demonstrate context management
3. Share best practices

### Phase 3: Monitoring

1. Review AI-generated code quality
2. Adjust instructions based on results
3. Update guidelines as needed

## Related Content

- [Copilot Instructions](./copilot-instructions) - Detailed guide to copilot-instructions.md
- [Spec-First Development](../../shared/ai-native-sdlc/spec-first) - Specification-driven approach
- [Developer Guide: Code Completion](../../developer-guide/daily-usage/code-completion) - Developer perspective


