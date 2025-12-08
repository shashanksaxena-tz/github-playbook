---
id: code-completion
title: Code Completion (Ghost Text)
role: developer
experience_level: beginner
workflow_stage: daily-usage
description: Learn how to effectively use GitHub Copilot's inline code completion feature
cross_references:
  - code-generation-comments
  - test-generation
tags:
  - code-completion
  - ghost-text
  - daily-usage
last_updated: 2025-12-06
---

> **Experience Level**: Beginner  
> **Workflow Stage**: Daily Usage

# Code Completion (Ghost Text)

Code completion, also known as "ghost text," is GitHub Copilot's inline suggestion feature. Gray text appears as you type, suggesting the next lines of code.

## When to Use

Code completion works best for:

- **Boilerplate code**: Class definitions, function signatures, import statements
- **Repetitive patterns**: Mapping arrays, switch statements, closing tags
- **Standard library implementations**: Common algorithms, data structures
- **API calls**: When parameters are strictly typed

## How It Works

1. Start typing a descriptive function name or comment
2. Copilot analyzes your file content and open tabs
3. Gray text suggestions appear inline
4. Press `Tab` to accept, `Esc` to dismiss, or keep typing to see alternatives

## Best Practices

### Start with Clear Intent

```python
# Good: Clear function purpose
def calculate_total_price(items, tax_rate):
    # Copilot will suggest implementation
```

```python
# Less effective: Vague naming
def calc(x, y):
    # Copilot has less context
```

### Keep Relevant Files Open

Copilot reads your open tabs to understand context. Keep these files open:

- Interface/type definitions
- Related implementation files
- Test files (to match existing test style)
- Configuration files

### Accept and Refine

Don't expect perfect code on first suggestion:

1. Accept the suggestion with `Tab`
2. Review the generated code
3. Refine specific parts using targeted prompts
4. Verify the logic matches your intent

## Example: Boilerplate Reduction

**Before (manual typing)**:
```python
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    def get_name(self):
        return self.name
    
    def get_email(self):
        return self.email
```

**With Copilot (ghost text suggestions)**:
```python
class User:
    def __init__(self, name, email):
        # Type: self.name = name
        # Copilot suggests: self.email = email
        # Press Tab to accept
```

## Common Patterns

### Array Mapping

```javascript
// Type: const doubled = numbers.map(
// Copilot suggests: (n) => n * 2);
```

### Error Handling

```python
# Type: try:
# Copilot suggests: 
#     # operation
# except Exception as e:
#     # error handling
```

### Closing Tags

```html
<!-- Type: <div> -->
<!-- Copilot suggests: </div> -->
```

## Limitations

Code completion is less effective for:

- Complex algorithmic logic (use comment-driven development instead)
- Security-critical code (always review carefully)
- Domain-specific business logic (may require more context)
- Entire file rewrites (use targeted refactoring)

## Tips

- **Type faster**: Copilot triggers more suggestions when you type at a steady pace
- **Pause after signatures**: Let Copilot implement function bodies
- **Use descriptive names**: Better names = better suggestions
- **Accept partially**: You can accept part of a suggestion and edit the rest

## Related Content

- [Code Generation from Comments](./code-generation-comments.md) - For more complex logic
- [Anti-Patterns](./anti-patterns.md) - What to avoid
- [Code Examples](../examples/python-example.md) - See it in action

