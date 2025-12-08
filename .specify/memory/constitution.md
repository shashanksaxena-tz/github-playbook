<!--
Sync Impact Report:
Version change: N/A → 1.0.0 (Initial constitution creation)
Modified principles: N/A (new constitution)
Added sections:
  - Core Principles (7 principles)
  - AI Tooling & Configuration
  - Development Workflow
  - Governance
Templates requiring updates:
  ✅ plan-template.md - Constitution Check section aligns with principles
  ✅ spec-template.md - Aligned with spec-first approach
  ✅ tasks-template.md - Aligned with TDD and AI-assisted testing
  ✅ commands/*.md - No agent-specific references found
Follow-up TODOs: None
-->

# GitHub Playbook Constitution

## Core Principles

### I. AI-Native Mindset: Human-in-the-Loop (NON-NEGOTIABLE)
The developer role shifts from "writing code" to "reviewing & curating logic." AI tools are pair programmers, not autopilots. Human oversight is mandatory at critical checkpoints: security-sensitive code, architectural decisions, and production deployments. All AI-generated code MUST be reviewed before commit. Rationale: Prevents security vulnerabilities, hallucinated dependencies, and architectural drift.

### II. Spec-First Development (NON-NEGOTIABLE)
Every feature MUST start with a specification in `.github/specs/` or `specs/` before implementation. Specifications are the source of truth for AI tools. Never ask AI to "write code for a ticket" - ask it to "implement the logic defined in specs/feature-001.md." Rationale: Reduces hallucination, ensures architectural compliance, and maintains context within the IDE.

### III. Context Management: The Open-Tab Strategy
Keep relevant files (interfaces, DTOs, specs, type definitions) open in IDE tabs when working with AI tools. AI tools prioritize "neighboring tabs" for context. Maintain `.github/copilot-instructions.md` for project-specific coding styles. Rationale: AI tools generate more accurate code when they can reference actual project structure and patterns.

### IV. Prompt Engineering: The R.I.C.E. Framework
All prompts to AI tools MUST follow the R.I.C.E. structure:
- **R**ole: Define who the AI is (e.g., "Act as a Senior Security Engineer")
- **I**nput/Instruction: Specify the exact task
- **C**ontext: Define constraints (tech stack, patterns, performance requirements)
- **E**xample/Output: Specify the desired output format

For complex tasks, use "Chain of Thought" prompting ("Think step-by-step"). Explicitly state negative constraints ("Do not use deprecated library X"). Rationale: Structured prompts reduce errors, improve code quality, and minimize iteration cycles.

### V. Test-Driven Development with AI (NON-NEGOTIABLE)
TDD is mandatory: Tests written → User approved → Tests fail → Then implement. When using AI to generate tests, you MUST manually verify assertions are valid. AI often mocks data incorrectly. Generate tests FIRST, ensure they FAIL, then implement. Rationale: Ensures correctness, prevents regressions, and validates AI-generated test logic.

### VI. Security & Compliance: Skeptical Review
Assume AI-generated code contains at least one bug or security vulnerability. For security-critical code (authentication, authorization, data validation), use targeted prompts with explicit security constraints. Never accept AI suggestions that hardcode secrets, skip algorithm verification, or bypass security checks. Always audit AI-generated code for SQL injection, XSS, and authentication bypass risks. Rationale: AI tools may generate insecure patterns; human security expertise is irreplaceable.

### VII. Iterative Refinement: No Blind Acceptance
Do not accept the first massive block of code generated. Accept, review, then ask AI to optimize specific lines. If the first result is wrong, refine the prompt rather than manually rewriting. This "trains" the session context. Never use "Tab-Enter" workflow (accepting without reading). Rationale: First-generation code often needs refinement; iterative prompting improves results more than manual editing.

## AI Tooling & Configuration

### Model Selection Strategy
- **Flash/Turbo Models**: Use for high-velocity tasks (autocomplete, simple refactors, boilerplate)
- **High-Reasoning Models** (GPT-4o, Claude 3.5 Sonnet): Use for complex architecture, debugging, security auditing
- **Deep Reasoning Models** (o1-preview): Use for algorithm design, systematic architectural reviews

### GitHub Copilot Best Practices
- **Code Completion (Ghost Text)**: Best for boilerplate, repetitive patterns, closing tags, standard library implementations
- **Code Generation from Comments**: Use "Comment-Driven Development" - write step-by-step comment logic first
- **Unit Test Generation**: Open source file and test file in split panes; AI matches existing test style
- **Refactoring**: Use targeted refactors on specific code blocks, not entire files

### Anti-Patterns to Avoid
- **The Blind Commit**: Tab → Save → Commit without reading (🔴 High Risk)
- **The Secret Leaker**: Asking AI to hardcode connection strings (🔴 High Risk)
- **Context Overload**: Asking AI to architect entire systems in one prompt (🟡 Medium Risk)
- **The Silent Failure**: Assuming AI's imports are correct (🟡 Medium Risk)

## Development Workflow

### Spec-to-Code Workflow
1. Create or update specification in `.github/specs/` or `specs/`
2. Open specification file in IDE tab alongside implementation file
3. Prompt AI: "Implement [feature] following the specification in [spec-file]. Use [tech stack] and [patterns]."
4. Review generated code against specification
5. Generate tests from specification before implementation
6. Verify tests fail, then implement
7. Refine iteratively using targeted prompts

### Code Review Requirements
All AI-generated code MUST pass human review before merge. Reviewers MUST:
- Verify code matches specification requirements
- Check for security vulnerabilities
- Validate test assertions are correct
- Ensure no hallucinated dependencies
- Confirm architectural compliance

## Governance

This constitution supersedes all other development practices. All PRs and code reviews MUST verify compliance with these principles.

**Amendment Procedure**: 
- Amendments require documentation of rationale
- Version increments follow semantic versioning:
  - **MAJOR**: Backward incompatible principle removals or redefinitions
  - **MINOR**: New principles or materially expanded guidance
  - **PATCH**: Clarifications, wording fixes, non-semantic refinements
- Amendments must be reviewed and approved before adoption

**Compliance Review**: 
- Constitution Check gates in implementation plans MUST be evaluated
- Violations require explicit justification in Complexity Tracking section
- Regular audits ensure principles remain relevant and effective

**Version**: 1.0.0 | **Ratified**: 2025-12-06 | **Last Amended**: 2025-12-06
