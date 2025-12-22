---
id: cross-team-standards
title: Cross-Team AI Standards
description: Standards for AI usage across different development teams
---

# Cross-Team AI Standards

## Purpose
Ensure consistency and compatibility across teams when using AI tools.

## Standards

### 1. Code Style
- Follow the organization's style guide (e.g., Airbnb Style Guide for JS/TS).
- Configure linters (ESLint, Prettier) to enforce style automatically.
- AI suggestions should match the project's `.editorconfig`.

### 2. Documentation
- All public APIs must be documented (JSDoc, TSDoc).
- AI-generated code must include comments explaining *why*, not just *what*.
- Update `README.md` and `copilot-instructions.md` regularly.

### 3. Testing
- Minimum 80% code coverage for new features.
- Unit tests required for all business logic.
- Integration tests for API endpoints.
- Use specific testing libraries (Jest, React Testing Library).

### 4. Security
- No secrets in code or AI prompts.
- Sanitize inputs and encode outputs.
- Regular security scans (CodeQL, SonarQube).
