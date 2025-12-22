---
id: rice-framework
title: R.I.C.E. Framework
role: shared
experience_level: intermediate
workflow_stage: daily-usage
description: "Structured framework for creating effective prompts: Role, Input, Context, Example"
cross_references:
  - prompt-engineering-introduction
  - code-generation-template
tags:
  - prompt-engineering
  - rice-framework
  - best-practices
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

# R.I.C.E. Framework

The R.I.C.E. framework provides a structured approach to prompt engineering that dramatically improves AI output quality.

## Framework Components

### R - Role

**Define who the AI is** - Set the AI's perspective and expertise level.

**Purpose**: Helps AI understand the context and level of detail needed.

**Examples**:
- "Act as a Senior Security Engineer"
- "You are a Python expert specializing in data processing"
- "You are a TypeScript developer working on a React application"

**Why It Matters**: Different roles approach problems differently. A security engineer will focus on vulnerabilities, while a performance engineer will focus on optimization.

### I - Input/Instruction

**Specify the exact task** - Clearly state what you want the AI to do.

**Purpose**: Provides the core instruction that the AI will execute.

**Examples**:
- "Create a function to validate email addresses"
- "Refactor this code to use dependency injection"
- "Generate unit tests for the UserService class"

**Why It Matters**: Clear instructions lead to accurate results. Vague instructions lead to guesswork.

### C - Context

**Define constraints and requirements** - Provide all relevant information.

**Purpose**: Gives AI the information needed to generate appropriate code.

**What to Include**:
- Technology stack (languages, frameworks, libraries)
- Project architecture and patterns
- Business rules and requirements
- Performance requirements
- Security constraints
- Existing code patterns to follow

**Examples**:
- "Use TypeScript with Express.js framework"
- "Follow repository pattern for data access"
- "Must handle 1000+ concurrent requests"
- "Comply with GDPR data privacy requirements"

**Why It Matters**: Context ensures generated code fits your project and requirements.

### E - Example/Output

**Specify the desired output format** - Show what good output looks like.

**Purpose**: Provides a template for the AI to follow.

**What to Include**:
- Expected function signature
- Return value format
- Error handling structure
- Code style examples
- Test case examples

**Examples**:
- "Return `{success: bool, data?: T, error?: string}`"
- "Use async/await pattern like in existing services"
- "Follow the same test structure as UserService.test.ts"

**Why It Matters**: Examples show the AI exactly what format you want, reducing iteration cycles.

## Complete R.I.C.E. Example

### Scenario: User Authentication Function

**R - Role**:
```
Act as a Senior Backend Engineer specializing in secure authentication systems.
```

**I - Input/Instruction**:
```
Create a secure user authentication function that validates credentials and returns authentication status.
```

**C - Context**:
```
- Use TypeScript with Express.js
- Database: PostgreSQL with Prisma ORM
- Password hashing: Use bcrypt with 12 rounds
- JWT tokens for session management
- Follow repository pattern (UserRepository exists)
- Must comply with OWASP authentication guidelines
- Handle errors: invalid credentials, account locked, database errors
- Log authentication attempts for security monitoring
```

**E - Example/Output**:
```
Function signature:
async function authenticateUser(email: string, password: string): Promise<AuthResult>

Return type:
interface AuthResult {
  success: boolean;
  user?: {
    id: number;
    email: string;
    role: string;
  };
  token?: string;
  error?: {
    code: string;
    message: string;
  };
}

Error codes:
- 'INVALID_CREDENTIALS': Wrong email or password
- 'ACCOUNT_LOCKED': Too many failed attempts
- 'DATABASE_ERROR': Database connection issue
```

**Complete Prompt**:

```
Act as a Senior Backend Engineer specializing in secure authentication systems.

Create a secure user authentication function that validates credentials and returns authentication status.

Context:
- Use TypeScript with Express.js
- Database: PostgreSQL with Prisma ORM
- Password hashing: Use bcrypt with 12 rounds
- JWT tokens for session management
- Follow repository pattern (UserRepository exists)
- Must comply with OWASP authentication guidelines
- Handle errors: invalid credentials, account locked, database errors
- Log authentication attempts for security monitoring

Output format:
async function authenticateUser(email: string, password: string): Promise<AuthResult>

interface AuthResult {
  success: boolean;
  user?: { id: number; email: string; role: string; };
  token?: string;
  error?: { code: string; message: string; };
}

Error codes: 'INVALID_CREDENTIALS', 'ACCOUNT_LOCKED', 'DATABASE_ERROR'
```

## Framework Variations

### For Simple Tasks

You can simplify R.I.C.E. for straightforward tasks:

```
Create a function to calculate order total:
- Accept array of items with price and quantity
- Apply 10% discount if total > $100
- Add 8% tax
- Return final total as number
- Handle empty array (return 0)
```

### For Complex Tasks

Expand each component for complex scenarios:

**R - Role**: Detailed expertise description
**I - Input**: Multi-step instructions
**C - Context**: Extensive requirements and constraints
**E - Example**: Multiple examples showing different scenarios

## Best Practices

### Do's

✅ **Be specific in each component**
- Role: Specify expertise level and domain
- Input: Break complex tasks into steps
- Context: Include all relevant constraints
- Example: Show exact format expected

✅ **Reference existing code**
- "Follow the pattern in UserService.ts"
- "Use the same error handling as AuthController"
- "Match the test style in existing test files"

✅ **Include edge cases**
- "Handle null/undefined inputs"
- "Support empty arrays"
- "Handle network timeouts"

✅ **Specify security requirements**
- "Never log passwords"
- "Use parameterized queries"
- "Validate all inputs"

### Don'ts

❌ **Don't be vague**
- "Create a function" → "Create a function to validate email addresses"

❌ **Don't skip context**
- Missing tech stack → AI may choose wrong libraries
- Missing patterns → Code won't match project style

❌ **Don't forget examples**
- Without examples, AI guesses the format
- Examples show exactly what you want

❌ **Don't overload with information**
- Too much context can confuse AI
- Focus on relevant information only

## Common Patterns

### Pattern 1: Code Generation

```
R: Act as a [language] expert
I: Create a [function/class] to [task]
C: Use [framework], follow [pattern], handle [constraints]
E: Function signature and return type
```

### Pattern 2: Refactoring

```
R: Act as a code quality expert
I: Refactor [code] to [improvement]
C: Maintain functionality, improve [aspect]
E: Show before/after structure
```

### Pattern 3: Test Generation

```
R: Act as a testing expert
I: Generate tests for [function/class]
C: Use [framework], test [scenarios]
E: Test structure matching existing tests
```

## Related Content

- [Prompt Templates](./templates/code-generation.md) - Ready-to-use templates
- [Before/After Examples](./before-after-examples) - See R.I.C.E. in action
- [Code Generation from Comments](../../developer-guide/daily-usage/code-generation-comments.md) - Comment-driven approach

