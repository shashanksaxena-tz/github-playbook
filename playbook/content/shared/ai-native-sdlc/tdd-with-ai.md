---
id: tdd-with-ai
title: TDD with AI
role: shared
experience_level: intermediate
workflow_stage: daily-usage
description: Test-Driven Development workflow using AI tools
cross_references:
  - test-generation
  - testing-template
tags:
  - tdd
  - testing
  - best-practices
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

# TDD with AI

Test-Driven Development (TDD) with AI follows the same red-green-refactor cycle, but uses AI to generate tests and implementation. **Critical**: Always verify AI-generated test assertions are correct.

## TDD Cycle with AI

### Red Phase: Write Tests First

**Step 1: Generate Test Structure**

Use AI to generate test structure:

```
Generate unit tests for UserService.authenticate() method:
- Test cases:
  1. Valid credentials → success
  2. Invalid email → error
  3. Invalid password → error
- Use Jest framework
- Follow existing test patterns
```

**Step 2: Verify Test Assertions**

⚠️ **CRITICAL**: AI may guess wrong expected values. Always verify:

```typescript
// AI-generated test (needs review)
it('should authenticate valid user', async () => {
  const result = await userService.authenticate('test@example.com', 'password');
  expect(result.success).toBe(true);  // ⚠️ Verify: Is this correct?
  expect(result.user.id).toBe(1);      // ⚠️ Verify: What should the ID be?
});
```

**Step 3: Run Tests (Should Fail)**

Tests should fail because implementation doesn't exist yet:

```bash
npm test
# Expected: Tests fail (red phase)
```

### Green Phase: Implement to Pass Tests

**Step 1: Generate Implementation**

Use AI to implement the function:

```
Create UserService.authenticate() method to pass these tests:
- Test file: tests/user-service.test.ts
- Requirements from tests:
  - Accept email and password
  - Return {success: bool, user?: User, error?: string}
  - Validate credentials
  - Return user on success
```

**Step 2: Review Implementation**

Review AI-generated code:
- Does it match test expectations?
- Is security handled correctly?
- Are edge cases covered?

**Step 3: Run Tests (Should Pass)**

```bash
npm test
# Expected: Tests pass (green phase)
```

### Refactor Phase: Improve Code

**Step 1: Refactor Implementation**

Use AI to improve code while keeping tests green:

```
Refactor UserService.authenticate() to:
- Extract validation logic to separate functions
- Improve error handling
- Add logging
- Maintain same API (tests should still pass)
```

**Step 2: Verify Tests Still Pass**

```bash
npm test
# Expected: Tests still pass after refactoring
```

## Complete Workflow Example

### Scenario: User Registration

**1. Red: Write Tests**

```typescript
// Generate tests first
describe('UserService.register', () => {
  it('should register valid user', async () => {
    const result = await userService.register({
      email: 'test@example.com',
      password: 'SecurePass123'
    });
    expect(result.success).toBe(true);
    expect(result.userId).toBeDefined();
  });

  it('should reject invalid email', async () => {
    const result = await userService.register({
      email: 'invalid-email',
      password: 'SecurePass123'
    });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid email format');
  });
});
```

**2. Green: Implement**

```typescript
// Implement to pass tests
async register(data: RegisterData): Promise<RegisterResult> {
  // Validate email
  if (!this.isValidEmail(data.email)) {
    return { success: false, error: 'Invalid email format' };
  }
  
  // Hash password and save
  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await this.userRepository.create({
    email: data.email,
    passwordHash
  });
  
  return { success: true, userId: user.id };
}
```

**3. Refactor: Improve**

```typescript
// Refactor while keeping tests green
async register(data: RegisterData): Promise<RegisterResult> {
  const emailValidation = this.validateEmail(data.email);
  if (!emailValidation.isValid) {
    return { success: false, error: emailValidation.error };
  }
  
  const passwordValidation = this.validatePassword(data.password);
  if (!passwordValidation.isValid) {
    return { success: false, error: passwordValidation.error };
  }
  
  const passwordHash = await this.hashPassword(data.password);
  const user = await this.userRepository.create({
    email: data.email,
    passwordHash
  });
  
  return { success: true, userId: user.id };
}
```

## Best Practices

### Do's

✅ **Generate tests first**
- Use AI to scaffold tests
- Define test cases clearly
- Verify assertions are correct

✅ **Verify test assertions**
- AI may guess wrong values
- Always verify expected results
- Check edge cases

✅ **Run tests after generation**
- Ensure tests fail initially (red)
- Verify tests pass after implementation (green)
- Keep tests passing after refactoring

✅ **Use existing test patterns**
- Open test file in IDE
- Match existing test style
- Follow team conventions

### Don'ts

❌ **Don't trust AI assertions blindly**
- Always verify expected values
- Check that assertions test the right thing
- Don't assume AI is correct

❌ **Don't skip the red phase**
- Tests must fail before implementation
- Verify you're testing the right thing
- Don't write implementation first

❌ **Don't skip refactoring**
- Improve code quality
- Maintain test coverage
- Keep tests passing

## AI-Assisted Test Generation

### Test Structure Generation

```
Generate test structure for [function]:
- Framework: [Jest, pytest, etc.]
- Test cases: [list scenarios]
- Patterns: [follow existing tests]
```

### Test Data Generation

```
Generate test fixtures for [scenario]:
- Data type: [User, Order, etc.]
- Variations: [valid, invalid, edge cases]
- Format: [JSON, objects, etc.]
```

### Mock Setup

```
Generate mocks for [dependencies]:
- Framework: [Jest, unittest.mock, etc.]
- Dependencies: [list to mock]
- Return values: [what mocks should return]
```

## Common Patterns

### Pattern 1: Unit Tests

```
Generate unit tests for [function]:
- Test all code paths
- Include error cases
- Use [framework]
```

### Pattern 2: Integration Tests

```
Generate integration tests for [feature]:
- Test end-to-end flow
- Include database interactions
- Use [framework]
```

### Pattern 3: Test Refactoring

```
Refactor these tests to:
- Extract common setup
- Use test fixtures
- Improve readability
- Maintain same coverage
```

## Related Content

- [Test Generation](../../developer-guide/daily-usage/test-generation) - Detailed test generation guide
- [Testing Template](../prompt-engineering/templates/testing-template) - Test generation templates
- [Spec-First Development](./spec-first) - Specification-driven approach

