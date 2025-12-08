---
id: testing-template
title: Testing Prompt Template
role: shared
experience_level: intermediate
workflow_stage: daily-usage
description: Reusable template for generating tests with GitHub Copilot
cross_references:
  - rice-framework
  - tdd-with-ai
tags:
  - prompt-engineering
  - templates
  - testing
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

# Testing Prompt Template

This template helps you generate comprehensive test suites using the R.I.C.E. framework.

## Template Structure

```
[Role] Generate [test type] tests for [function/class/module].

[Input/Instruction]
- Target: [what to test]
- Test cases: [list scenarios]
- Coverage: [what to cover]

[Context]
- Framework: [testing framework]
- Patterns: [test patterns to follow]
- Mocks: [what to mock]
- Fixtures: [test data to use]

[Example/Output]
- Test structure: [describe/it blocks]
- Assertions: [what to assert]
- Mock setup: [how to mock]
```

## Template Examples

### Example 1: Unit Tests

```
Act as a Testing Expert.

Generate unit tests for the UserService.authenticate() method.

Input/Instruction:
- Target: authenticate(email: string, password: string) method
- Test cases:
  1. Valid credentials → success
  2. Invalid email → error
  3. Invalid password → error
  4. User not found → error
  5. Database error → error
- Coverage: All code paths, error cases

Context:
- Framework: Jest for JavaScript/TypeScript
- Patterns: Arrange-Act-Assert, use describe/it blocks
- Mocks: UserRepository, bcrypt, JWT service
- Fixtures: Sample user data, test credentials

Example/Output:
- Structure:
  describe('UserService.authenticate', () => {
    it('should authenticate valid user', () => {...})
    it('should reject invalid email', () => {...})
    ...
  })
- Assertions: Verify return values, error codes, mock calls
- Mock setup: Mock UserRepository.getUserByEmail(), bcrypt.compare()
```

### Example 2: Integration Tests

```
Act as a QA Engineer.

Generate integration tests for the user registration API endpoint.

Input/Instruction:
- Target: POST /api/users/register endpoint
- Test cases:
  1. Valid registration → 201 Created
  2. Duplicate email → 409 Conflict
  3. Invalid data → 400 Bad Request
  4. Database failure → 500 Server Error
- Coverage: End-to-end flow, database interactions

Context:
- Framework: Jest + Supertest for API testing
- Patterns: Test database setup/teardown, use transactions
- Mocks: External services (email service)
- Fixtures: Test database with sample data

Example/Output:
- Structure:
  describe('POST /api/users/register', () => {
    beforeEach(() => setupTestDatabase())
    afterEach(() => cleanupTestDatabase())
    it('should register new user', async () => {...})
    ...
  })
- Assertions: HTTP status codes, response body, database state
- Setup: Test database, clean state between tests
```

### Example 3: Component Tests

```
Act as a Frontend Testing Expert.

Generate component tests for the UserProfile component.

Input/Instruction:
- Target: UserProfile React component
- Test cases:
  1. Renders user data correctly
  2. Shows loading state
  3. Handles error state
  4. Updates on prop changes
- Coverage: Rendering, user interactions, edge cases

Context:
- Framework: React Testing Library + Jest
- Patterns: Test user behavior, not implementation
- Mocks: API calls, user context
- Fixtures: Mock user data

Example/Output:
- Structure:
  describe('UserProfile', () => {
    it('should render user information', () => {...})
    it('should show loading spinner', () => {...})
    ...
  })
- Assertions: Text content, element presence, user interactions
- Mock setup: Mock useUser hook, API responses
```

## Test Case Categories

### Happy Path Tests

**Template**:
```
Test [function] with valid inputs:
- Input: [valid test data]
- Expected: [expected output]
- Assert: [what to verify]
```

### Error Handling Tests

**Template**:
```
Test [function] error handling:
- Scenario: [error condition]
- Input: [data causing error]
- Expected: [error response]
- Assert: [error code, message]
```

### Edge Case Tests

**Template**:
```
Test [function] edge cases:
- Case: [edge case description]
- Input: [edge case data]
- Expected: [expected behavior]
- Assert: [verification]
```

### Boundary Tests

**Template**:
```
Test [function] boundary conditions:
- Boundary: [min/max values]
- Input: [boundary data]
- Expected: [expected behavior]
- Assert: [verification]
```

## Best Practices

### Do's

✅ **Verify test assertions**
- AI may guess wrong expected values
- Always verify assertions are correct

✅ **Test edge cases**
- Empty inputs
- Null/undefined values
- Boundary conditions
- Error scenarios

✅ **Use descriptive test names**
- "should authenticate valid user" not "test1"
- Clear what is being tested

✅ **Follow existing test patterns**
- Match your team's test style
- Use same framework patterns
- Follow naming conventions

### Don'ts

❌ **Don't trust AI-generated assertions blindly**
- Always verify expected values
- Check that assertions test the right thing

❌ **Don't skip error cases**
- Test both success and failure paths
- Verify error handling works

❌ **Don't test implementation details**
- Test behavior, not internals
- Focus on public API

## TDD Workflow

### 1. Write Test First

Use template to generate test:
```
Generate tests for [function] that doesn't exist yet:
- Test cases: [scenarios]
- Expected behavior: [what function should do]
```

### 2. Verify Test Fails

Run tests to ensure they fail (red phase).

### 3. Implement Function

Use code generation template to implement:
```
Create [function] to pass these tests:
- Test file: [reference test file]
- Requirements: [from test cases]
```

### 4. Verify Test Passes

Run tests to ensure they pass (green phase).

### 5. Refactor

Improve code while keeping tests green.

## Related Content

- [R.I.C.E. Framework](../rice-framework) - Framework explanation
- [TDD with AI](../../ai-native-sdlc/tdd-with-ai) - Complete TDD workflow
- [Test Generation](../../developer-guide/daily-usage/test-generation) - Developer guide

