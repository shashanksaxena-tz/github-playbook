---
id: code-review-prompts
title: AI-Enhanced Code Review Prompts
description: Collection of prompts for AI-assisted code review
---

# AI-Enhanced Code Review Prompts

## Purpose
These prompts help reviewers use AI tools to analyze code for specific quality attributes, security issues, and adherence to standards.

## Prompts

### Security Review
```
Analyze this code for security vulnerabilities, focusing on:
1. Input validation
2. Output encoding
3. Authentication/Authorization checks
4. Data protection
5. Error handling info leakage

Highlight potential risks and suggest secure alternatives.
```

### Performance Review
```
Review this code for performance bottlenecks. Look for:
1. N+1 queries
2. Inefficient loops
3. Memory leaks
4. Unoptimized data structures
5. Blocking operations

Suggest optimizations with code examples.
```

### Readability & Maintainability
```
Evaluate the readability of this code. Check for:
1. Variable/function naming clarity
2. Function size and complexity
3. Comment quality
4. Code duplication
5. Adherence to DRY and SOLID principles

Propose refactoring to improve maintainability.
```
