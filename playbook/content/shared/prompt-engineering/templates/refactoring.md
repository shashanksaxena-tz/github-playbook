---
id: refactoring-template
title: Refactoring Prompt Template
role: shared
experience_level: advanced
workflow_stage: daily-usage
description: Reusable template for refactoring code with GitHub Copilot
cross_references:
  - rice-framework
  - code-generation-template
tags:
  - prompt-engineering
  - templates
  - refactoring
last_updated: 2025-12-06
---

> **Experience Level**: Advanced  
> **Workflow Stage**: Daily Usage

> **Experience Level**: Advanced  
> **Workflow Stage**: Daily Usage

# Refactoring Prompt Template

This template helps you refactor code effectively while maintaining functionality.

## Template Structure

```
[Role] Refactor [code/function/class] to [improvement goal].

[Input/Instruction]
- Target: [what to refactor]
- Goal: [what to improve]
- Constraints: [what must stay the same]

[Context]
- Current code: [brief description or reference]
- Architecture: [patterns to follow]
- Dependencies: [what depends on this code]

[Example/Output]
- Structure: [desired structure]
- Patterns: [patterns to apply]
- Maintain: [functionality that must be preserved]
```

## Template Examples

### Example 1: Extract Function

```
Act as a Code Quality Expert.

Refactor this function to extract validation logic into separate functions.

Input/Instruction:
- Target: validateUserInput() function (50+ lines)
- Goal: Extract email validation and password validation into separate functions
- Constraints: Maintain exact same validation logic, same return format

Context:
- Current code: Single function with nested if statements
- Architecture: Follow single responsibility principle
- Dependencies: Used by UserController.register() endpoint

Example/Output:
- Structure:
  - validateEmail(email: string): ValidationResult
  - validatePassword(password: string): ValidationResult
  - validateUserInput(data: UserInput): ValidationResult (calls above)
- Patterns: Single responsibility, composition
- Maintain: Same validation rules, same error messages, same return format
```

### Example 2: Improve Performance

```
Act as a Performance Engineer.

Refactor this data processing function to improve performance.

Input/Instruction:
- Target: processLargeDataset() function
- Goal: Reduce execution time from 30s to &lt;5s for 100k records
- Constraints: Same output format, no data loss

Context:
- Current code: Sequential processing with nested loops
- Architecture: Can use parallel processing, caching
- Dependencies: Output format used by reporting system

Example/Output:
- Structure: Use parallel processing (Promise.all or workers)
- Patterns: Batch processing, memoization
- Maintain: Exact same output structure, all records processed
```

### Example 3: Apply Design Pattern

```
Act as a Software Architect.

Refactor this code to apply Strategy pattern for payment processing.

Input/Instruction:
- Target: PaymentProcessor class with if/else for different payment methods
- Goal: Apply Strategy pattern for extensibility
- Constraints: Same API, backward compatible

Context:
- Current code: Single class with payment method conditionals
- Architecture: Use Strategy pattern, dependency injection
- Dependencies: Used by OrderService.processPayment()

Example/Output:
- Structure:
  - PaymentStrategy interface
  - CreditCardStrategy, PayPalStrategy, BankTransferStrategy implementations
  - PaymentProcessor uses strategy
- Patterns: Strategy pattern, dependency injection
- Maintain: Same public API, same payment flow
```

## Refactoring Types

### Extract Function/Method

**Template**:
```
Refactor [function] to extract [logic] into separate [function/method]:
- Extract: [what to extract]
- New function: [name and signature]
- Maintain: [what stays the same]
```

### Simplify Conditionals

**Template**:
```
Refactor [code] to simplify conditionals:
- Current: [describe current structure]
- Goal: Use [early returns/guard clauses/ternary]
- Maintain: [same logic, same behavior]
```

### Improve Readability

**Template**:
```
Refactor [code] to improve readability:
- Issues: [what's hard to read]
- Goal: [clearer variable names, better structure]
- Maintain: [functionality unchanged]
```

### Optimize Performance

**Template**:
```
Refactor [code] to improve performance:
- Current: [performance issue]
- Goal: [target performance]
- Constraints: [what must be preserved]
```

## Best Practices

### Do's

✅ **Be specific about what to refactor**
- "Refactor this function" → "Refactor validateUserInput() to extract email validation"

✅ **Specify what to improve**
- "Make it better" → "Improve readability by extracting functions"

✅ **State what must be preserved**
- "Maintain same API"
- "Keep same validation logic"
- "Preserve backward compatibility"

✅ **Reference patterns to apply**
- "Apply Strategy pattern"
- "Use dependency injection"
- "Follow SOLID principles"

### Don'ts

❌ **Don't change behavior**
- Refactoring should improve structure, not change functionality

❌ **Don't skip testing**
- Always verify refactored code works the same

❌ **Don't refactor everything at once**
- Focus on one aspect at a time

## Related Content

- [R.I.C.E. Framework](../rice-framework) - Framework explanation
- [Code Generation Template](./code-generation.md) - For new code
- [Refactoring Techniques](../../../developer-guide/daily-usage/refactoring.md) - Developer guide

