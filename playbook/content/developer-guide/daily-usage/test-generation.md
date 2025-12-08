---
id: test-generation
title: Unit Test Generation
role: developer
experience_level: intermediate
workflow_stage: daily-usage
description: Learn how to use GitHub Copilot to generate unit tests effectively
cross_references:
  - tdd-with-ai
  - code-completion
tags:
  - testing
  - test-generation
  - daily-usage
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

# Unit Test Generation

GitHub Copilot can help you generate unit tests, but you must always verify the test assertions are correct. AI often mocks data incorrectly or makes assumptions about test behavior.

## When to Use

Test generation works best for:

- **Happy path tests**: Standard success scenarios
- **Test scaffolding**: Basic test structure and setup
- **Edge case identification**: Common boundary conditions
- **Test data generation**: Mock objects and fixtures

## The Technique

### Step 1: Open Source and Test Files in Split Panes

Copilot reads your open tabs to match existing test style:

1. Open the source file you want to test
2. Open your existing test suite in a split pane
3. Copilot will match the style of your existing tests

### Step 2: Use Copilot Chat or Highlight Actions

**Method 1: Highlight and Generate**

1. Highlight the function you want to test
2. Right-click → Copilot → "Generate Tests"
3. Review the generated tests

**Method 2: Comment-Driven**

```python
# Generate unit tests for calculate_total_price function
# Test cases:
# 1. Happy path with valid items
# 2. Empty items list
# 3. Negative quantity (should raise error)
# 4. Discount application
# 5. Tax calculation
def test_calculate_total_price():
```

### Step 3: Verify Test Assertions

**⚠️ CRITICAL**: Always manually verify assertions!

Common issues in AI-generated tests:

- **Incorrect expected values**: AI may guess wrong results
- **Wrong mock setup**: Mocks may not match actual behavior
- **Missing edge cases**: AI may not catch all boundary conditions
- **Incorrect assertions**: Logic errors in test expectations

## Best Practices

### Provide Context in Comments

```python
# Generate tests for User.validate_email()
# Use pytest framework
# Mock external email validation service
# Test cases: valid email, invalid format, domain not found, blacklisted email
```

### Reference Existing Test Patterns

Keep your test file open so Copilot can match:

- Test framework style (pytest, Jest, JUnit)
- Assertion patterns
- Mock setup conventions
- Test data structure

### Verify Each Assertion

```python
# AI-generated test (needs review)
def test_calculate_total():
    result = calculate_total([1, 2, 3])
    assert result == 6  # ✅ Correct
    
    result = calculate_total([])
    assert result == 0  # ✅ Correct
    
    result = calculate_total([-1, 2])
    assert result == 1  # ⚠️ Verify: Does function handle negatives?
```

## Example: Test Generation Workflow

**Source Function**:

```python
def validate_password(password):
    if len(password) < 8:
        return False, "Password must be at least 8 characters"
    if not any(c.isupper() for c in password):
        return False, "Password must contain uppercase letter"
    if not any(c.isdigit() for c in password):
        return False, "Password must contain a number"
    return True, "Password is valid"
```

**Generated Test (with review)**:

```python
import pytest

def test_validate_password_valid():
    valid, message = validate_password("SecurePass123")
    assert valid is True
    assert message == "Password is valid"

def test_validate_password_too_short():
    valid, message = validate_password("Short1")
    assert valid is False
    assert message == "Password must be at least 8 characters"

def test_validate_password_no_uppercase():
    valid, message = validate_password("lowercase123")
    assert valid is False
    assert message == "Password must contain uppercase letter"

def test_validate_password_no_number():
    valid, message = validate_password("NoNumber")
    assert valid is False
    assert message == "Password must contain a number"
```

**Review Checklist**:
- ✅ All assertions verified against function logic
- ✅ Edge cases covered (empty string, special characters)
- ✅ Error messages match function output
- ✅ Test framework matches project style

## Common Patterns

### Testing API Endpoints

```python
# Generate tests for POST /api/users endpoint
# Use FastAPI TestClient
# Test cases: valid user, duplicate email, invalid data, missing fields
# Mock database calls
```

### Testing Data Transformations

```python
# Generate tests for transform_user_data function
# Test cases: normal data, null values, missing fields, type mismatches
# Verify all fields are correctly mapped
```

### Testing Error Handling

```python
# Generate tests for file_processor function
# Test cases: valid file, file not found, permission denied, corrupted file
# Verify appropriate exceptions are raised
```

## Anti-Patterns to Avoid

### ❌ Blind Acceptance

```python
# Don't do this:
# 1. Generate tests
# 2. Run tests
# 3. If they pass, commit
# 
# Always verify assertions first!
```

### ❌ Assuming Mocks Are Correct

```python
# AI-generated mock (verify this!)
@mock.patch('external_service.get_data')
def test_function(mock_get_data):
    mock_get_data.return_value = {"key": "value"}  # ⚠️ Verify this matches actual API response
```

### ❌ Missing Edge Cases

```python
# AI might generate:
def test_calculate_average():
    assert calculate_average([1, 2, 3]) == 2  # ✅ Good
    
# But miss:
# - Empty list (division by zero?)
# - Single element
# - Negative numbers
# - Very large numbers
```

## TDD Workflow with AI

1. **Write test first** (using Copilot to scaffold)
2. **Verify test fails** (red phase)
3. **Implement function** (using Copilot)
4. **Verify test passes** (green phase)
5. **Refactor** (using Copilot for improvements)

## Related Content

- [TDD with AI](../../shared/ai-native-sdlc/tdd-with-ai) - Complete TDD workflow
- [Code Examples](../examples/python-example) - See test generation in action
- [Anti-Patterns](./anti-patterns) - Common testing mistakes to avoid

