---
id: java-example
title: Java Code Example - Good vs. Risky Patterns
role: developer
experience_level: intermediate
workflow_stage: daily-usage
description: Practical Java example demonstrating good and risky patterns with GitHub Copilot
cross_references:
  - code-generation-comments
  - anti-patterns
tags:
  - java
  - examples
  - code-generation
last_updated: 2025-12-06
---

# Java Code Example: Good vs. Risky Patterns

This example demonstrates effective use of GitHub Copilot for Java development.

## Scenario: Data Validation Service

We need to create a service that validates user input data with proper error handling and validation rules.

## ❌ Risky Approach: Vague Prompt

**Prompt**: "Create a validator for user data"

**AI-Generated Code (Risky)**:

```java
// ⚠️ RISKY: No null checks, no validation, returns raw boolean
public class UserValidator {
    public boolean validate(String email, String password) {
        if (email.contains("@") && password.length() > 0) {
            return true;
        }
        return false;
    }
}
```

**Problems**:
- 🔴 No null safety (NullPointerException risk)
- 🔴 Weak validation (just checks for @ symbol)
- 🔴 No error messages
- 🔴 No input sanitization
- 🔴 Not thread-safe if used in concurrent context
- 🔴 No logging

## ✅ Good Approach: Specific Prompt with Requirements

**Prompt**:
```
Create a comprehensive user data validation service:
- Validate email format using regex pattern
- Validate password strength (8+ chars, uppercase, lowercase, number, special char)
- Return ValidationResult with isValid, errors list, and field-specific errors
- Handle null inputs gracefully
- Add input sanitization (trim whitespace)
- Make it thread-safe
- Log validation failures
- Use dependency injection for configuration
```

**AI-Generated Code (Good)**:

```java
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class UserValidator {
    private static final String EMAIL_PATTERN = 
        "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
    private static final Pattern emailRegex = Pattern.compile(EMAIL_PATTERN);
    
    private final int minPasswordLength;
    private final boolean requireUppercase;
    private final boolean requireLowercase;
    private final boolean requireNumber;
    private final boolean requireSpecialChar;
    
    public UserValidator(int minPasswordLength, boolean requireUppercase,
                        boolean requireLowercase, boolean requireNumber,
                        boolean requireSpecialChar) {
        this.minPasswordLength = minPasswordLength;
        this.requireUppercase = requireUppercase;
        this.requireLowercase = requireLowercase;
        this.requireNumber = requireNumber;
        this.requireSpecialChar = requireSpecialChar;
    }
    
    public ValidationResult validate(String email, String password) {
        List<String> errors = new ArrayList<>();
        Map<String, String> fieldErrors = new HashMap<>();
        
        // Validate email
        String emailError = validateEmail(email);
        if (emailError != null) {
            errors.add("Email: " + emailError);
            fieldErrors.put("email", emailError);
        }
        
        // Validate password
        String passwordError = validatePassword(password);
        if (passwordError != null) {
            errors.add("Password: " + passwordError);
            fieldErrors.put("password", passwordError);
        }
        
        boolean isValid = errors.isEmpty();
        
        if (!isValid) {
            logValidationFailure(email, errors);
        }
        
        return new ValidationResult(isValid, errors, fieldErrors);
    }
    
    private String validateEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return "Email is required";
        }
        
        String sanitized = email.trim();
        
        if (!emailRegex.matcher(sanitized).matches()) {
            return "Invalid email format";
        }
        
        if (sanitized.length() > 254) { // RFC 5321 limit
            return "Email is too long (max 254 characters)";
        }
        
        return null; // Valid
    }
    
    private String validatePassword(String password) {
        if (password == null || password.isEmpty()) {
            return "Password is required";
        }
        
        if (password.length() < minPasswordLength) {
            return String.format("Password must be at least %d characters", minPasswordLength);
        }
        
        List<String> missingRequirements = new ArrayList<>();
        
        if (requireUppercase && !password.matches(".*[A-Z].*")) {
            missingRequirements.add("uppercase letter");
        }
        if (requireLowercase && !password.matches(".*[a-z].*")) {
            missingRequirements.add("lowercase letter");
        }
        if (requireNumber && !password.matches(".*[0-9].*")) {
            missingRequirements.add("number");
        }
        if (requireSpecialChar && !password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*")) {
            missingRequirements.add("special character");
        }
        
        if (!missingRequirements.isEmpty()) {
            return "Password must contain: " + String.join(", ", missingRequirements);
        }
        
        return null; // Valid
    }
    
    private void logValidationFailure(String email, List<String> errors) {
        // In production, use proper logging framework
        System.err.println(String.format(
            "Validation failed for email: %s. Errors: %s",
            email != null ? email : "null",
            String.join("; ", errors)
        ));
    }
    
    // Result class
    public static class ValidationResult {
        private final boolean isValid;
        private final List<String> errors;
        private final Map<String, String> fieldErrors;
        
        public ValidationResult(boolean isValid, List<String> errors, Map<String, String> fieldErrors) {
            this.isValid = isValid;
            this.errors = Collections.unmodifiableList(errors);
            this.fieldErrors = Collections.unmodifiableMap(fieldErrors);
        }
        
        public boolean isValid() { return isValid; }
        public List<String> getErrors() { return errors; }
        public Map<String, String> getFieldErrors() { return fieldErrors; }
    }
}
```

**Why This is Better**:
- ✅ Null safety checks
- ✅ Comprehensive validation rules
- ✅ Detailed error messages
- ✅ Field-specific error mapping
- ✅ Input sanitization (trim)
- ✅ Configurable validation rules
- ✅ Thread-safe (immutable results)
- ✅ Logging for debugging
- ✅ Proper encapsulation

## Before vs. After Comparison

### Null Safety

**Before**: May throw NullPointerException
**After**: Explicit null checks with clear error messages

### Validation Quality

**Before**: Weak validation (just checks for @)
**After**: Regex-based email validation, comprehensive password rules

### Error Reporting

**Before**: Just returns boolean
**After**: Detailed error messages, field-specific errors

### Maintainability

**Before**: Hardcoded rules
**After**: Configurable via constructor, easy to extend

## Key Takeaways

1. **Always check for null**: Java doesn't have null safety, always validate
2. **Use proper validation**: Regex for emails, comprehensive rules for passwords
3. **Return detailed results**: Don't just return boolean, provide error details
4. **Make it configurable**: Use dependency injection for flexibility
5. **Thread safety**: Consider concurrent access when designing services
6. **Input sanitization**: Trim whitespace, validate length limits

## Related Content

- [Code Generation from Comments](../daily-usage/code-generation-comments.md) - Learn structured prompting
- [Anti-Patterns](../daily-usage/anti-patterns.md) - Avoid common mistakes
- [Security & Compliance](../../shared/security-compliance/overview.md) - Security best practices


