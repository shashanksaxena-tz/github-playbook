---
id: debugging-template
title: Debugging Prompt Template
role: shared
experience_level: intermediate
workflow_stage: daily-usage
description: Reusable template for debugging code with GitHub Copilot
cross_references:
  - rice-framework
tags:
  - prompt-engineering
  - templates
  - debugging
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

# Debugging Prompt Template

This template helps you get effective debugging assistance from AI tools.

## Template Structure

```
[Role] Help debug [issue description].

[Input/Instruction]
- Problem: [what's wrong]
- Symptoms: [what you observe]
- Expected: [what should happen]

[Context]
- Code: [relevant code or file reference]
- Environment: [runtime environment]
- Error: [error message or logs]

[Example/Output]
- Analysis: [what to analyze]
- Solution: [what kind of fix needed]
```

## Template Examples

### Example 1: Runtime Error

```
Act as a Senior Debugging Expert.

Help debug a null pointer exception in the user authentication flow.

Input/Instruction:
- Problem: NullPointerException when authenticating user
- Symptoms: Error occurs when password is null
- Expected: Should return validation error, not crash

Context:
- Code: UserService.authenticate() method
- Environment: Node.js with TypeScript
- Error: "Cannot read property 'hash' of null" at line 45

Example/Output:
- Analysis: Check null handling in authenticate() method
- Solution: Add null check before accessing password property
```

### Example 2: Logic Error

```
Act as a Code Review Expert.

Help debug incorrect calculation in order total.

Input/Instruction:
- Problem: Order total is wrong when discounts apply
- Symptoms: Total shows $90 instead of expected $95
- Expected: 10% discount on $100 = $90, then 5% tax = $94.50

Context:
- Code: OrderService.calculateTotal() method
- Environment: Python 3.10
- Error: No error, just wrong calculation

Example/Output:
- Analysis: Review discount and tax calculation order
- Solution: Verify calculation logic, check order of operations
```

### Example 3: Performance Issue

```
Act as a Performance Engineer.

Help debug slow database query in user search.

Input/Instruction:
- Problem: User search takes 5+ seconds for 10k users
- Symptoms: Query is slow, database CPU high
- Expected: Should complete in <1 second

Context:
- Code: UserRepository.searchUsers() method
- Environment: PostgreSQL, Prisma ORM
- Error: No error, just slow performance

Example/Output:
- Analysis: Check query execution plan, indexes
- Solution: Add database indexes, optimize query
```

## Debugging Scenarios

### Scenario 1: Error Messages

**Template**:
```
Debug [error message]:
- Error: [full error message]
- Code: [relevant code section]
- Context: [when it occurs]
- Expected: [what should happen]
```

### Scenario 2: Unexpected Behavior

**Template**:
```
Debug unexpected behavior:
- Behavior: [what's happening]
- Expected: [what should happen]
- Code: [relevant code]
- Input: [test data]
```

### Scenario 3: Performance Issues

**Template**:
```
Debug performance issue:
- Problem: [slow operation]
- Metrics: [response time, resource usage]
- Code: [relevant code]
- Scale: [data size, load]
```

## Debugging Workflow

### 1. Reproduce the Issue

```
Help me understand this bug:
- Steps to reproduce: [step-by-step]
- Expected: [expected behavior]
- Actual: [actual behavior]
```

### 2. Analyze the Code

```
Analyze this code for potential issues:
- Code: [code section]
- Context: [what it's supposed to do]
- Symptoms: [observed behavior]
```

### 3. Identify Root Cause

```
What could cause this issue?
- Error: [error message]
- Code: [relevant code]
- Environment: [runtime context]
```

### 4. Propose Solution

```
How to fix this issue?
- Problem: [root cause]
- Code: [current code]
- Constraints: [what must be preserved]
```

## Best Practices

### Do's

✅ **Provide complete context**
- Full error messages
- Relevant code sections
- Environment details
- Steps to reproduce

✅ **Describe expected behavior**
- What should happen
- What actually happens
- Difference between them

✅ **Include error details**
- Stack traces
- Log messages
- Console output

### Don'ts

❌ **Don't be vague**
- "It doesn't work" → "Returns null instead of user object"

❌ **Don't skip error messages**
- Always include full error text
- Include stack traces

❌ **Don't forget context**
- Include relevant code
- Mention environment
- Describe when it occurs

## Related Content

- [R.I.C.E. Framework](../rice-framework) - Framework explanation
- [Code Generation Template](./code-generation-template) - For fixes
- [Refactoring Template](./refactoring-template) - For improvements

