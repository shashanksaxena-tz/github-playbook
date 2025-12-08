---
id: python-example
title: Python Code Example - Good vs. Risky Patterns
role: developer
experience_level: intermediate
workflow_stage: daily-usage
description: Practical Python example demonstrating good and risky patterns with GitHub Copilot
cross_references:
  - code-generation-comments
  - anti-patterns
tags:
  - python
  - examples
  - code-generation
last_updated: 2025-12-06
---

# Python Code Example: Good vs. Risky Patterns

This example demonstrates how to use GitHub Copilot effectively and what to avoid when generating Python code.

## Scenario: User Authentication Function

We need to create a function that validates user credentials and returns authentication status.

## ❌ Risky Approach: Vague Prompt

**Prompt**: "Create a function to authenticate users"

**AI-Generated Code (Risky)**:

```python
def authenticate_user(username, password):
    # ⚠️ RISKY: Hardcoded credentials, no hashing, no error handling
    users = {
        "admin": "password123",
        "user": "userpass"
    }
    if username in users and users[username] == password:
        return True
    return False
```

**Problems**:
- 🔴 Hardcoded credentials (security risk)
- 🔴 Plain text password storage (security risk)
- 🔴 No error handling
- 🔴 No input validation
- 🔴 Not production-ready

## ✅ Good Approach: Specific Prompt with Context

**Prompt**: 
```
Create a secure user authentication function:
- Accept username and password
- Hash password using bcrypt
- Check against database (use get_user_by_username function)
- Return (success: bool, user_id: int | None, error: str | None)
- Handle errors: user not found, wrong password, database errors
- Add input validation for empty strings
```

**AI-Generated Code (Good)**:

```python
import bcrypt
from typing import Optional, Tuple

def authenticate_user(username: str, password: str) -> Tuple[bool, Optional[int], Optional[str]]:
    """
    Authenticate a user with username and password.
    
    Returns:
        Tuple of (success, user_id, error_message)
    """
    # Input validation
    if not username or not password:
        return False, None, "Username and password are required"
    
    try:
        # Get user from database
        user = get_user_by_username(username)
        if not user:
            return False, None, "User not found"
        
        # Verify password hash
        if bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
            return True, user.id, None
        else:
            return False, None, "Invalid password"
    
    except DatabaseError as e:
        return False, None, f"Database error: {str(e)}"
    except Exception as e:
        return False, None, f"Unexpected error: {str(e)}"
```

**Why This is Better**:
- ✅ Secure password hashing
- ✅ Proper error handling
- ✅ Input validation
- ✅ Type hints for clarity
- ✅ Database abstraction (not hardcoded)
- ✅ Comprehensive return values

## Before vs. After Comparison

### Security

**Before**: Plain text passwords, hardcoded credentials
**After**: Bcrypt hashing, database-backed, no secrets in code

### Error Handling

**Before**: No error handling, may crash on exceptions
**After**: Comprehensive try/except with specific error messages

### Maintainability

**Before**: Hardcoded data, difficult to extend
**After**: Database-backed, easy to add features

### Testing

**Before**: Hard to test (hardcoded values)
**After**: Easy to test (can mock database calls)

## Key Takeaways

1. **Be specific in prompts**: Include security requirements, error handling, return types
2. **Never hardcode secrets**: Use environment variables or secure storage
3. **Always hash passwords**: Never store or compare plain text passwords
4. **Add input validation**: Check for empty strings, None values, type mismatches
5. **Handle errors explicitly**: Don't let exceptions bubble up unhandled
6. **Review generated code**: Even "good" code needs human verification

## Related Content

- [Code Generation from Comments](../daily-usage/code-generation-comments.md) - Learn comment-driven development
- [Anti-Patterns](../daily-usage/anti-patterns.md) - Avoid common mistakes
- [Security & Compliance](../../shared/security-compliance/overview.md) - Security best practices


