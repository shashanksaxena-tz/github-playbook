---
id: code-generation-template
title: Code Generation Prompt Template
role: shared
experience_level: intermediate
workflow_stage: daily-usage
description: Reusable template for generating code with GitHub Copilot
cross_references:
  - rice-framework
  - refactoring-template
tags:
  - prompt-engineering
  - templates
  - code-generation
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

> **Experience Level**: Intermediate  
> **Workflow Stage**: Daily Usage

# Code Generation Prompt Template

This template helps you generate code effectively using the R.I.C.E. framework.

## Template Structure

```
[Role] Create a [function/class/module] to [task description].

[Input/Instruction]
- Primary function: [what it does]
- Input parameters: [list parameters with types]
- Return value: [return type and structure]

[Context]
- Technology: [languages, frameworks, libraries]
- Architecture: [patterns to follow]
- Constraints: [requirements, limitations]
- Dependencies: [existing code to use]

[Example/Output]
- Function signature: [exact signature]
- Return format: [structure]
- Error handling: [how to handle errors]
```

## Template Examples

### Example 1: API Endpoint

```
Act as a Senior Backend Engineer.

Create a REST API endpoint to retrieve user profile data.

Input/Instruction:
- Endpoint: GET /api/users/:id
- Parameters: user ID (number) from URL
- Return: User profile data with email, name, role

Context:
- Framework: Express.js with TypeScript
- Database: PostgreSQL with Prisma ORM
- Authentication: JWT token required (in Authorization header)
- Use UserRepository.getUserById() method
- Handle errors: user not found (404), unauthorized (401), server error (500)

Example/Output:
- Route handler: async function getUserProfile(req: Request, res: Response)
- Success response: { success: true, data: { id, email, name, role } }
- Error response: { success: false, error: { code, message } }
- Status codes: 200 (success), 401 (unauthorized), 404 (not found), 500 (error)
```

### Example 2: Data Processing Function

```
Act as a Python Data Engineer.

Create a function to process and clean CSV data.

Input/Instruction:
- Accept CSV file path (string)
- Process: remove duplicates, handle missing values, validate data types
- Return: cleaned DataFrame and processing report

Context:
- Library: pandas for data processing
- Missing values: fill numeric with median, categorical with mode
- Validation: check required columns exist, validate data types
- Performance: handle files up to 1GB efficiently

Example/Output:
- Function: def process_csv(file_path: str) -> Tuple[pd.DataFrame, dict]
- Return: (cleaned_dataframe, {rows_removed, rows_processed, errors: []})
- Handle errors: file not found, invalid format, memory errors
```

### Example 3: Validation Utility

```
Act as a JavaScript Developer.

Create a utility function to validate form input data.

Input/Instruction:
- Accept form data object
- Validate: email format, password strength, required fields
- Return: validation result with field-specific errors

Context:
- Framework: React with TypeScript
- Validation library: Use zod for schema validation
- Password rules: 8+ chars, uppercase, lowercase, number, special char
- Email: RFC 5322 compliant regex

Example/Output:
- Function: function validateForm(data: FormData): ValidationResult
- Return: { isValid: boolean, errors: { field: string, message: string }[] }
- Error format: { field: 'email', message: 'Invalid email format' }
```

## Customization Guide

### For Different Languages

**Python**:
- Emphasize type hints
- Mention specific libraries (pandas, numpy, etc.)
- Include docstring format

**JavaScript/TypeScript**:
- Specify framework (React, Vue, Express)
- Include type definitions
- Mention async/await patterns

**Java**:
- Specify framework (Spring, Jakarta EE)
- Include annotations
- Mention dependency injection

**.NET/C#**:
- Specify framework (ASP.NET Core, Entity Framework)
- Include async patterns
- Mention dependency injection

### For Different Complexity Levels

**Simple Function**:
- Minimal context needed
- Focus on input/output
- Basic error handling

**Complex Module**:
- Extensive context required
- Multiple components
- Comprehensive error handling
- Integration requirements

## Usage Tips

### 1. Fill in the Template

Replace placeholders with your specific requirements:
- [Role] → Your specific role/expertise
- [task] → Your exact task
- [Technology] → Your tech stack
- [Example] → Your expected format

### 2. Add Specific Details

Include:
- Exact function signatures
- Return value structures
- Error handling approaches
- Performance requirements
- Security considerations

### 3. Reference Existing Code

Mention:
- Similar functions to follow
- Existing patterns to match
- Code style to emulate
- Architecture to follow

### 4. Iterate and Refine

After getting initial code:
- Review the output
- Ask for specific improvements
- Refine constraints
- Add missing requirements

## Common Variations

### With Security Focus

Add security requirements:
- Input validation
- SQL injection prevention
- XSS prevention
- Authentication checks

### With Performance Focus

Add performance requirements:
- Response time targets
- Memory constraints
- Scalability requirements
- Optimization needs

### With Testing Focus

Include test requirements:
- Test framework
- Coverage targets
- Test scenarios
- Mock requirements

## Related Content

- [R.I.C.E. Framework](../rice-framework) - Framework explanation
- [Refactoring Template](./refactoring-template) - For code improvements
- [Testing Template](./testing-template) - For test generation

