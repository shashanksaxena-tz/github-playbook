---
id: dotnet-example
title: .NET (C#) Code Example - Good vs. Risky Patterns
role: developer
experience_level: intermediate
workflow_stage: daily-usage
description: Practical .NET (C#) example demonstrating good and risky patterns with GitHub Copilot
cross_references:
  - code-generation-comments
  - anti-patterns
tags:
  - dotnet
  - csharp
  - examples
  - code-generation
last_updated: 2025-12-06
---

# .NET (C#) Code Example: Good vs. Risky Patterns

This example demonstrates effective use of GitHub Copilot for .NET (C#) development.

## Scenario: REST API Controller with Validation

We need to create a REST API controller that handles user registration with proper validation, error handling, and async operations.

## ❌ Risky Approach: Vague Prompt

**Prompt**: "Create a controller to register users"

**AI-Generated Code (Risky)**:

```csharp
// ⚠️ RISKY: No validation, synchronous operations, no error handling
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    public IActionResult Register(string email, string password)
    {
        // Save user directly without validation
        var user = new User { Email = email, Password = password };
        // Missing: database save, validation, error handling
        return Ok(user);
    }
}
```

**Problems**:
- 🔴 No input validation
- 🔴 Synchronous operations (blocks thread)
- 🔴 No password hashing (security risk)
- 🔴 No error handling
- 🔴 No async/await pattern
- 🔴 Missing dependency injection
- 🔴 No logging

## ✅ Good Approach: Specific Prompt with Requirements

**Prompt**:
```
Create a secure REST API controller for user registration:
- Use async/await for all operations
- Validate email format and password strength (8+ chars, uppercase, number)
- Hash password using BCrypt.Net
- Use dependency injection for UserService and ILogger
- Return proper HTTP status codes (201 Created, 400 BadRequest, 500 InternalServerError)
- Handle exceptions with try-catch
- Return structured error responses
- Add input validation using Data Annotations or FluentValidation
- Log registration attempts and errors
```

**AI-Generated Code (Good)**:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using BCrypt.Net;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (request == null)
            {
                return BadRequest(new ErrorResponse { Message = "Request body is required" });
            }

            // Validate input
            var validationResult = ValidateRegistrationRequest(request);
            if (!validationResult.IsValid)
            {
                _logger.LogWarning("Registration validation failed for email: {Email}", request.Email);
                return BadRequest(new ErrorResponse 
                { 
                    Message = "Validation failed",
                    Errors = validationResult.Errors
                });
            }

            try
            {
                // Check if user already exists
                var existingUser = await _userService.GetUserByEmailAsync(request.Email);
                if (existingUser != null)
                {
                    _logger.LogWarning("Registration attempt with existing email: {Email}", request.Email);
                    return Conflict(new ErrorResponse { Message = "User with this email already exists" });
                }

                // Hash password
                var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password, workFactor: 12);

                // Create user
                var user = new User
                {
                    Email = request.Email,
                    PasswordHash = passwordHash,
                    CreatedAt = DateTime.UtcNow
                };

                // Save user
                var createdUser = await _userService.CreateUserAsync(user);

                _logger.LogInformation("User registered successfully: {Email}", request.Email);

                return CreatedAtAction(
                    nameof(GetUser),
                    new { id = createdUser.Id },
                    new RegisterResponse
                    {
                        Id = createdUser.Id,
                        Email = createdUser.Email,
                        CreatedAt = createdUser.CreatedAt
                    });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error registering user with email: {Email}", request.Email);
                return StatusCode(500, new ErrorResponse 
                { 
                    Message = "An error occurred while registering the user" 
                });
            }
        }

        private ValidationResult ValidateRegistrationRequest(RegisterRequest request)
        {
            var errors = new List<string>();

            // Email validation
            if (string.IsNullOrWhiteSpace(request.Email))
            {
                errors.Add("Email is required");
            }
            else if (!IsValidEmail(request.Email))
            {
                errors.Add("Invalid email format");
            }

            // Password validation
            if (string.IsNullOrWhiteSpace(request.Password))
            {
                errors.Add("Password is required");
            }
            else
            {
                var passwordErrors = ValidatePasswordStrength(request.Password);
                errors.AddRange(passwordErrors);
            }

            return new ValidationResult
            {
                IsValid = errors.Count == 0,
                Errors = errors
            };
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private List<string> ValidatePasswordStrength(string password)
        {
            var errors = new List<string>();

            if (password.Length < 8)
            {
                errors.Add("Password must be at least 8 characters long");
            }

            if (!password.Any(char.IsUpper))
            {
                errors.Add("Password must contain at least one uppercase letter");
            }

            if (!password.Any(char.IsLower))
            {
                errors.Add("Password must contain at least one lowercase letter");
            }

            if (!password.Any(char.IsDigit))
            {
                errors.Add("Password must contain at least one number");
            }

            if (!password.Any(ch => !char.IsLetterOrDigit(ch)))
            {
                errors.Add("Password must contain at least one special character");
            }

            return errors;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }

    // DTOs
    public class RegisterRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }

    public class RegisterResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class ErrorResponse
    {
        public string Message { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
    }

    public class ValidationResult
    {
        public bool IsValid { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
    }
}
```

**Why This is Better**:
- ✅ Async/await for non-blocking operations
- ✅ Comprehensive input validation
- ✅ Secure password hashing with BCrypt
- ✅ Dependency injection for testability
- ✅ Proper HTTP status codes
- ✅ Structured error responses
- ✅ Exception handling with logging
- ✅ Data Annotations for validation
- ✅ Logging for debugging and monitoring

## Before vs. After Comparison

### Performance

**Before**: Synchronous operations block threads
**After**: Async/await allows better scalability

### Security

**Before**: Plain text passwords, no validation
**After**: BCrypt hashing, comprehensive validation

### Error Handling

**Before**: No error handling, may crash
**After**: Try-catch blocks, proper HTTP status codes, structured errors

### Maintainability

**Before**: Tightly coupled, hard to test
**After**: Dependency injection, testable, follows SOLID principles

## Key Takeaways

1. **Use async/await**: For I/O operations, always use async to avoid blocking threads
2. **Validate input**: Use Data Annotations or FluentValidation for comprehensive validation
3. **Hash passwords**: Never store plain text passwords, use BCrypt or similar
4. **Dependency injection**: Makes code testable and maintainable
5. **Proper HTTP status codes**: Use 201 for created, 400 for bad requests, 500 for server errors
6. **Structured error responses**: Return consistent error format for API consumers
7. **Logging**: Log important events and errors for debugging and monitoring

## Related Content

- [Code Generation from Comments](../daily-usage/code-generation-comments.md) - Learn structured prompting
- [Anti-Patterns](../daily-usage/anti-patterns.md) - Avoid common mistakes
- [Security & Compliance](../../shared/security-compliance/overview.md) - Security best practices


