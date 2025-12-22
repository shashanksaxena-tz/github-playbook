---
id: test-generation-prompts
title: Test Generation Prompts
description: Prompts for generating comprehensive test suites
---

# Test Generation Prompts

## Purpose
Generate high-quality unit, integration, and E2E tests using AI.

## Prompts

### Unit Tests
```
Generate unit tests for this function using [Framework (e.g., Jest)].
Cover:
1. Happy path (valid inputs)
2. Edge cases (null, empty, limits)
3. Error conditions (exceptions)
4. Mock external dependencies

Code:
[Paste code here]
```

### Integration Tests
```
Create an integration test for this API endpoint using [Framework (e.g., Supertest)].
Scenario:
1. User authenticates
2. User posts data
3. Verify database state
4. Verify response status and body
```

### Test Data Generation
```
Generate a JSON dataset of 10 users for testing.
Fields: id (UUID), name, email (valid format), role (admin/user), created_at (ISO date).
Ensure diversity in names and edge cases (long names, special chars).
```
