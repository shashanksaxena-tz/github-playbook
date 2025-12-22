---
id: before-after-examples
title: "Before vs. After: Prompt Quality Examples"
role: shared
experience_level: intermediate
workflow_stage: daily-usage
description: Examples demonstrating vague prompts vs. high-quality prompts with explanations
cross_references:
  - rice-framework
  - code-generation-template
tags:
  - prompt-engineering
  - examples
  - best-practices
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

# Before vs. After: Prompt Quality Examples

This section demonstrates how to transform vague prompts into high-quality prompts that produce better results.

## Example 1: Code Generation

### ❌ Before: Vague Prompt

```
Create a function to process users
```

**Problems**:
- No context about what "process" means
- No input/output specification
- No technology constraints
- No error handling requirements

**Typical AI Output**:
```python
def process_users(users):
    # Vague implementation
    for user in users:
        # What should we do?
        pass
    return users
```

### ✅ After: High-Quality Prompt (R.I.C.E.)

```
Act as a Python Backend Engineer.

Create a function to process user registration data with validation and database storage.

Input/Instruction:
- Function: process_user_registration(data: dict)
- Validate: email format, password strength (8+ chars, uppercase, number)
- Hash password using bcrypt
- Save to PostgreSQL database using SQLAlchemy
- Return: {success: bool, user_id?: int, error?: str}

Context:
- Framework: Flask with SQLAlchemy ORM
- Database: PostgreSQL
- Password hashing: bcrypt with 12 rounds
- Error handling: Return structured errors, don't raise exceptions
- Logging: Log registration attempts

Example/Output:
- Function signature: def process_user_registration(data: dict) -> dict
- Success response: {"success": True, "user_id": 123}
- Error response: {"success": False, "error": "Invalid email format"}
```

**Improved AI Output**:
```python
import bcrypt
from sqlalchemy.orm import Session
import re
import logging

logger = logging.getLogger(__name__)

def process_user_registration(data: dict, db: Session) -> dict:
    """
    Process user registration with validation and database storage.
    
    Args:
        data: Dictionary with 'email' and 'password' keys
        db: SQLAlchemy database session
    
    Returns:
        dict: {"success": bool, "user_id": int, "error": str}
    """
    # Validate email
    email = data.get('email', '').strip()
    if not email or not re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
        logger.warning(f"Invalid email format: {email}")
        return {"success": False, "error": "Invalid email format"}
    
    # Validate password
    password = data.get('password', '')
    if len(password) < 8:
        return {"success": False, "error": "Password must be at least 8 characters"}
    if not any(c.isupper() for c in password):
        return {"success": False, "error": "Password must contain uppercase letter"}
    if not any(c.isdigit() for c in password):
        return {"success": False, "error": "Password must contain a number"}
    
    try:
        # Hash password
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(12))
        
        # Save to database
        user = User(email=email, password_hash=password_hash)
        db.add(user)
        db.commit()
        db.refresh(user)
        
        logger.info(f"User registered successfully: {user.id}")
        return {"success": True, "user_id": user.id}
    
    except Exception as e:
        db.rollback()
        logger.error(f"Database error during registration: {str(e)}")
        return {"success": False, "error": "Database error occurred"}
```

**Why It's Better**:
- ✅ Specific function signature
- ✅ Clear validation requirements
- ✅ Security considerations (password hashing)
- ✅ Error handling specified
- ✅ Logging included
- ✅ Database integration clear

## Example 2: Refactoring

### ❌ Before: Vague Prompt

```
Make this code better
```

**Problems**:
- No specific improvement goal
- No constraints stated
- No pattern to follow
- AI doesn't know what "better" means

**Typical AI Output**: May change behavior unintentionally or make arbitrary changes.

### ✅ After: High-Quality Prompt (R.I.C.E.)

```
Act as a Code Quality Expert.

Refactor the validateUserInput() function to extract validation logic into separate functions following single responsibility principle.

Input/Instruction:
- Target: validateUserInput() function (currently 60 lines)
- Extract: Email validation and password validation into separate functions
- Maintain: Exact same validation logic and error messages
- Return format: Keep same ValidationResult structure

Context:
- Current code: Single function with nested if statements
- Architecture: Follow single responsibility principle
- Dependencies: Used by UserController.register() endpoint
- Language: TypeScript with Express.js

Example/Output:
- Structure:
  - validateEmail(email: string): ValidationResult
  - validatePassword(password: string): ValidationResult
  - validateUserInput(data: UserInput): ValidationResult (calls above)
- Patterns: Single responsibility, composition
- Maintain: Same validation rules, same error messages, same return format
```

**Improved AI Output**:
```typescript
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email || email.trim().length === 0) {
    errors.push("Email is required");
  } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    errors.push("Invalid email format");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain uppercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain a number");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function validateUserInput(data: UserInput): ValidationResult {
  const emailResult = validateEmail(data.email);
  const passwordResult = validatePassword(data.password);
  
  return {
    isValid: emailResult.isValid && passwordResult.isValid,
    errors: [...emailResult.errors, ...passwordResult.errors]
  };
}
```

**Why It's Better**:
- ✅ Specific refactoring goal
- ✅ Constraints clearly stated
- ✅ Pattern to follow specified
- ✅ Maintains functionality
- ✅ Better code organization

## Example 3: Test Generation

### ❌ Before: Vague Prompt

```
Write tests for this function
```

**Problems**:
- No test framework specified
- No test cases defined
- No expected behavior described
- AI may guess wrong assertions

**Typical AI Output**: Generic tests with potentially incorrect expected values.

### ✅ After: High-Quality Prompt (R.I.C.E.)

```
Act as a Testing Expert.

Generate comprehensive unit tests for the UserService.authenticate() method using Jest framework.

Input/Instruction:
- Target: authenticate(email: string, password: string) method
- Test cases:
  1. Valid credentials → returns {success: true, user: {...}, token: "..."}
  2. Invalid email → returns {success: false, error: "Invalid email"}
  3. Wrong password → returns {success: false, error: "Invalid password"}
  4. User not found → returns {success: false, error: "User not found"}
  5. Database error → returns {success: false, error: "Database error"}
- Coverage: All code paths, error cases

Context:
- Framework: Jest for TypeScript
- Patterns: Arrange-Act-Assert, use describe/it blocks
- Mocks: UserRepository.getUserByEmail(), bcrypt.compare(), jwt.sign()
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

**Improved AI Output**:
```typescript
import { UserService } from './user-service';
import { UserRepository } from './user-repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('./user-repository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UserService.authenticate', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(mockUserRepository);
  });

  it('should authenticate valid user', async () => {
    // Arrange
    const email = 'test@example.com';
    const password = 'SecurePass123';
    const mockUser = { id: 1, email, passwordHash: 'hashed' };
    
    mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mock-token');

    // Act
    const result = await userService.authenticate(email, password);

    // Assert
    expect(result.success).toBe(true);
    expect(result.user).toEqual({ id: 1, email });
    expect(result.token).toBe('mock-token');
    expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
  });

  it('should reject invalid email', async () => {
    // Arrange
    const email = 'invalid-email';
    const password = 'SecurePass123';
    
    mockUserRepository.getUserByEmail.mockResolvedValue(null);

    // Act
    const result = await userService.authenticate(email, password);

    // Assert
    expect(result.success).toBe(false);
    expect(result.error).toBe('User not found');
  });

  // ... more test cases
});
```

**Why It's Better**:
- ✅ Specific test framework
- ✅ Clear test cases defined
- ✅ Expected behavior specified
- ✅ Mock setup clear
- ✅ Assertions verifiable

## Key Takeaways

### What Makes a Good Prompt

1. **Specificity**: Clear, detailed instructions
2. **Context**: Technology stack, patterns, constraints
3. **Examples**: Show expected output format
4. **Structure**: Use R.I.C.E. framework

### Common Mistakes to Avoid

1. **Vague verbs**: "Create", "Fix", "Improve" without details
2. **Missing context**: No tech stack, no patterns, no constraints
3. **No examples**: AI guesses the format
4. **Too broad**: Trying to do everything at once

### Improvement Process

1. **Start with vague prompt** (if needed)
2. **Review AI output** to understand what's missing
3. **Add specificity** using R.I.C.E. framework
4. **Iterate** until you get desired results

## Related Content

- [R.I.C.E. Framework](./rice-framework) - Learn the framework
- [Prompt Templates](./templates/code-generation.md) - Ready-to-use templates
- [Code Generation from Comments](../../developer-guide/daily-usage/code-generation-comments.md) - Alternative approach


