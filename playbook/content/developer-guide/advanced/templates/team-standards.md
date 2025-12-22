---
id: team-standards
title: Team Standards Template
description: Template for defining team-specific AI standards
---

# Team Standards Template

## Team Name: [Team Name]

## 1. Tool Stack
- **Code Completion**: GitHub Copilot
- **Chat**: GitHub Copilot Chat / ChatGPT Team
- **Testing**: [Framework]

## 2. Usage Guidelines
- **Allowed Tasks**:
  - Boilerplate generation
  - Unit test generation
  - Documentation
  - Refactoring
- **Restricted Tasks**:
  - Security-critical code (requires manual review)
  - PII data processing
  - Proprietary algorithm design

## 3. Review Process
- All AI-generated code requires **2 approvals** if modifying core logic.
- Must include **"AI-Generated"** label in PR if significant portion is AI.

## 4. Prompt Engineering
- Use the **team prompt library** for standard tasks.
- Share successful prompts in `#ai-tips` channel.

## 5. Learning
- Monthly "AI Tips" session.
- Mandatory "AI Security" training.
