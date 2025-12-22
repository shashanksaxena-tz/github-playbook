---
id: security-patterns
title: Security Patterns for AI Development
description: Common security patterns and best practices when using AI tools
---

# Security Patterns for AI Development

## Secure Coding with AI

### 1. Input Validation
**Pattern**: Always validate and sanitize user input.
**AI Prompt**: "Generate a validation schema for this user input using Zod/Joi."
**Verification**: Check that the schema covers type, length, format, and allowed values.

### 2. Output Encoding
**Pattern**: Encode data before rendering to prevent XSS.
**AI Prompt**: "Show how to safely render this user content in React/HTML."
**Verification**: Ensure context-appropriate encoding functions are used.

### 3. Authentication & Authorization
**Pattern**: Verify identity and permissions for every request.
**AI Prompt**: "Add middleware to check if the user has 'admin' role for this route."
**Verification**: Test with unauthenticated and unauthorized users.

### 4. Secret Management
**Pattern**: Never hardcode secrets. Use environment variables.
**AI Prompt**: "Refactor this code to use environment variables for API keys."
**Verification**: Scan code for hardcoded secrets.

## AI Usage Security
- **Data Privacy**: Do not send PII or sensitive customer data to public AI models.
- **Code Review**: Treat AI-generated code as "untrusted source" - review carefully.
- **Dependency Check**: AI may suggest outdated or vulnerable packages. Audit dependencies.
