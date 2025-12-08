---
id: anti-patterns
title: Anti-Patterns to Avoid
role: developer
experience_level: all
workflow_stage: daily-usage
description: Dangerous patterns and common mistakes when using GitHub Copilot
cross_references:
  - security-compliance-overview
tags:
  - anti-patterns
  - security
  - best-practices
last_updated: 2025-12-06
---

> **Experience Level**: All Levels  
> **Workflow Stage**: Daily Usage

# Anti-Patterns to Avoid

This section documents dangerous or ineffective approaches when using GitHub Copilot. Understanding these anti-patterns helps you avoid security vulnerabilities, bugs, and productivity losses.

## High-Risk Anti-Patterns

### The Blind Commit 🔴 HIGH RISK

**What it is**: Accepting Copilot suggestions (Tab) → Saving → Committing without reading the code.

**Why it's dangerous**:
- Security vulnerabilities may be introduced
- Logic errors can break functionality
- Hallucinated dependencies cause build failures
- Code may not match your actual intent

**How to avoid**:
- Always read generated code before accepting
- Review the full function, not just the suggestion
- Run tests before committing
- Use code review for AI-generated code

**Example**:

```python
# You type: def authenticate_user(username, password):
# Copilot suggests:
def authenticate_user(username, password):
    # ⚠️ RISKY: No password hashing!
    if username in users and users[username] == password:
        return True
    return False
```

**Correct approach**:

```python
# Review and fix:
def authenticate_user(username, password):
    if username not in users:
        return False
    # Use secure password hashing
    return bcrypt.checkpw(password.encode(), users[username].encode())
```

### The Secret Leaker 🔴 HIGH RISK

**What it is**: Asking Copilot to hardcode secrets, API keys, or connection strings for "testing."

**Why it's dangerous**:
- Secrets may be committed to version control
- Credentials exposed in code history
- Production credentials accidentally used
- Compliance violations (GDPR, HIPAA, etc.)

**How to avoid**:
- Never hardcode secrets in prompts
- Use environment variables
- Use secret management services
- Never ask Copilot to "add a test API key"

**Example**:

```python
# ❌ NEVER DO THIS:
# Prompt: "Add AWS credentials for testing"
# Copilot might generate:
AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
```

**Correct approach**:

```python
# ✅ Use environment variables:
import os
AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')
```

### Context Overload 🟡 MEDIUM RISK

**What it is**: Asking Copilot to architect an entire system or generate a massive codebase in one prompt.

**Why it's dangerous**:
- High chance of hallucination
- Missing critical components
- Inconsistent patterns across codebase
- Difficult to review and validate

**How to avoid**:
- Break large requests into smaller, focused prompts
- Generate one component at a time
- Review each component before moving to the next
- Use iterative refinement

**Example**:

```python
# ❌ Too broad:
# "Create a complete e-commerce system with user auth, payment, inventory, and shipping"

# ✅ Better approach:
# 1. "Create user authentication module"
# 2. Review and refine
# 3. "Create payment processing module"
# 4. Review and refine
# etc.
```

### The Silent Failure 🟡 MEDIUM RISK

**What it is**: Assuming Copilot's imports and library calls are correct without verification.

**Why it's dangerous**:
- Copilot may hallucinate non-existent libraries
- Wrong import paths cause runtime errors
- Version mismatches break functionality
- Missing error handling

**How to avoid**:
- Verify all imports exist
- Check library versions match your project
- Test imports in isolation
- Review error handling

**Example**:

```python
# ⚠️ Copilot might generate:
from utils.helpers import process_data  # Does this module exist?
from lib.validator import validate  # Is this the correct path?

# Always verify:
# 1. Check if modules exist
# 2. Verify import paths
# 3. Test imports
```

## Medium-Risk Anti-Patterns

### The Magic Wand

**What it is**: Writing vague comments like "Process data" and accepting the first massive block of code generated.

**Why it's problematic**:
- Generated code may not match your intent
- Difficult to review and understand
- May include unnecessary complexity
- Hard to debug when issues arise

**How to avoid**:
- Use specific, step-by-step comments
- Break complex logic into smaller prompts
- Review generated code thoroughly
- Refine iteratively

### Blind Rewrite

**What it is**: Selecting an entire file and asking Copilot to "Make this better" without specific guidance.

**Why it's problematic**:
- May change behavior unintentionally
- Breaks existing tests
- Introduces inconsistencies
- Hard to review changes

**How to avoid**:
- Target specific functions or sections
- Specify what to improve (performance, readability, etc.)
- Verify tests still pass
- Review all changes

## Best Practices Summary

### ✅ DO

- Read all generated code before accepting
- Verify imports and dependencies
- Test AI-generated code thoroughly
- Use environment variables for secrets
- Break large requests into smaller prompts
- Review security-critical code extra carefully
- Verify test assertions are correct
- Use iterative refinement

### ❌ DON'T

- Commit code without reading it
- Hardcode secrets or credentials
- Ask for entire systems in one prompt
- Assume imports are correct
- Accept vague suggestions blindly
- Skip code review for AI-generated code
- Trust AI-generated tests without verification
- Use AI for security-critical code without human review

## Related Content

- [Security & Compliance](../../shared/security-compliance/security-compliance-overview) - Security best practices
- [Code Examples](../examples/python-example) - See good vs. risky patterns
- [R.I.C.E. Framework](../../shared/prompt-engineering/rice-framework) - Better prompting techniques

