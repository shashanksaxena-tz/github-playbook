---
id: refactoring
title: Refactoring Techniques
role: developer
experience_level: advanced
workflow_stage: daily-usage
description: Learn how to use GitHub Copilot for code refactoring and optimization
cross_references:
  - code-generation-comments
  - rice-framework
tags:
  - refactoring
  - optimization
  - daily-usage
last_updated: 2025-12-06
---

> **Experience Level**: Advanced  
> **Workflow Stage**: Daily Usage

# Refactoring Techniques

GitHub Copilot excels at refactoring specific code blocks. Use targeted refactors on specific sections, not entire files.

## When to Use

Refactoring with Copilot works best for:

- **Reducing complexity**: Breaking down large functions
- **Modernizing syntax**: Updating to newer language features
- **Improving readability**: Better variable names, clearer structure
- **Performance optimization**: Algorithm improvements, efficiency gains
- **Pattern application**: Applying design patterns (Strategy, Factory, etc.)

## The Technique

### Step 1: Highlight Specific Code

Don't select entire files. Target specific functions or blocks:

```python
# Highlight this function:
def process_data(data):
    result = []
    for item in data:
        if item.status == 'active':
            processed = item.value * 2
            result.append(processed)
    return result
```

### Step 2: Use Inline Chat or Comments

**Method 1: Inline Chat (Cmd+I / Ctrl+I)**

```
Simplify this loop using list comprehension
```

**Method 2: Comment-Driven**

```python
# Refactor this function:
# - Use list comprehension instead of loop
# - Extract magic number (2) to constant
# - Add type hints
def process_data(data):
    # ... existing code ...
```

### Step 3: Review Refactored Code

Always verify:

- **Behavior preserved**: Output matches original
- **Performance**: Not slower than original
- **Readability**: Actually improved, not just different
- **Tests still pass**: Run existing tests

## Best Practices

### Be Specific in Refactoring Requests

```python
# Good: Specific improvements
# Refactor to:
# 1. Extract validation logic to separate function
# 2. Use early returns instead of nested ifs
# 3. Add error handling for edge cases

# Less effective: Vague request
# Make this better
```

### Target One Aspect at a Time

```python
# First refactor: Extract function
# Then refactor: Add type hints
# Then refactor: Improve error handling
# Don't try to do everything at once
```

### Preserve Test Compatibility

```python
# When refactoring, ensure:
# - Function signature remains compatible
# - Return values match expected types
# - Error handling behavior unchanged
# - All existing tests still pass
```

## Example: Complexity Reduction

**Before**:

```python
def process_orders(orders):
    results = []
    for order in orders:
        if order.status == 'pending':
            total = 0
            for item in order.items:
                if item.in_stock:
                    price = item.price
                    if order.customer.is_vip:
                        price = price * 0.9
                    total += price
            if total > 100:
                total = total * 0.95
            results.append({
                'order_id': order.id,
                'total': total,
                'status': 'processed'
            })
    return results
```

**Refactored** (using Copilot with targeted prompts):

```python
def calculate_item_price(item, is_vip):
    """Calculate item price with VIP discount if applicable."""
    price = item.price
    if is_vip:
        price *= 0.9
    return price

def apply_bulk_discount(total):
    """Apply bulk discount if total exceeds threshold."""
    if total > 100:
        return total * 0.95
    return total

def process_orders(orders):
    """Process pending orders and calculate totals."""
    results = []
    for order in orders:
        if order.status != 'pending':
            continue
        
        total = sum(
            calculate_item_price(item, order.customer.is_vip)
            for item in order.items
            if item.in_stock
        )
        total = apply_bulk_discount(total)
        
        results.append({
            'order_id': order.id,
            'total': total,
            'status': 'processed'
        })
    return results
```

## Common Refactoring Patterns

### Extract Function

```python
# Refactor: Extract validation logic to validate_user_input function
# Function should return (is_valid, error_message) tuple
```

### Simplify Conditionals

```python
# Refactor: Use early returns instead of nested if statements
# Improve readability while preserving logic
```

### Apply Design Patterns

```python
# Refactor: Apply Strategy pattern to payment processing
# Create PaymentStrategy interface
# Implement CreditCardStrategy and PayPalStrategy
```

### Modernize Syntax

```python
# Refactor: Update to Python 3.10+ features
# Use match/case instead of if/elif chains
# Use type hints with Union types
```

## Performance Optimization

### Algorithm Improvement

```python
# Refactor: Optimize this O(n²) algorithm to O(n)
# Current: Nested loops
# Target: Single pass with hash map
```

### Data Structure Changes

```python
# Refactor: Replace list with set for O(1) lookups
# Update all references to maintain compatibility
```

## Anti-Patterns to Avoid

### ❌ Refactoring Entire Files

```python
# Don't do this:
# Select entire file → "Refactor this"
# 
# Do this instead:
# Select specific function → "Simplify this function"
```

### ❌ Changing Behavior

```python
# Don't change what the code does, only how it does it
# Verify: Same inputs → Same outputs
```

### ❌ Ignoring Tests

```python
# Always run tests after refactoring
# If tests fail, the refactor broke something
```

## Related Content

- [Code Generation from Comments](./code-generation-comments) - For implementing refactored logic
- [R.I.C.E. Framework](../../shared/prompt-engineering/rice-framework) - Structured refactoring prompts
- [Code Examples](../examples/python-example) - See refactoring in action

