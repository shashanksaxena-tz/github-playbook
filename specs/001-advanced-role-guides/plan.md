# Implementation Plan: Advanced Role Documentation for Senior, Lead, and Principal Engineers

**Branch**: `001-advanced-role-guides` | **Date**: 2025-12-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-advanced-role-guides/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature extends the GitHub Copilot Playbook by adding advanced-level documentation for Senior (5-8 years), Lead (8-12 years), and Principal (12+ years) engineers across all four role guides (Developer, Architect, QA, DevOps). The implementation will create 12 new markdown documents (3 experience levels × 4 roles) following the existing guide structure, including detailed code examples, team-scale case studies, and strategic frameworks. The content will use the existing frontmatter format, maintain cross-references between experience levels, and integrate seamlessly with the current documentation architecture.

## Technical Context

**Language/Version**: Markdown (CommonMark spec), YAML 1.2 (frontmatter)  
**Primary Dependencies**: None (pure markdown documentation)  
**Storage**: File system (git repository)  
**Testing**: Manual content review, markdown linting (markdownlint-cli2 if exists), frontmatter validation  
**Target Platform**: Static site generators (Jekyll, Hugo, or similar), rendered via GitHub Pages or equivalent
**Project Type**: Documentation (static content)  
**Performance Goals**: N/A (static documentation)  
**Constraints**: 
  - Maintain consistency with existing guide structure
  - Follow established frontmatter schema (id, title, role, experience_level, workflow_stage, description, cross_references, tags, last_updated)
  - Ensure cross-references remain valid
  - Keep content focused on AI-assisted development patterns (not generic programming)
**Scale/Scope**: 
  - 12 new markdown documents (3 experience levels × 4 role guides)
  - 3-5 code examples per senior-practices.md (16 total examples minimum)
  - 3-5 case studies per lead-practices.md (16 total case studies minimum)
  - Strategic frameworks in all principal-practices.md files
  - Cross-reference updates to existing beginner/intermediate content

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Principle I: AI-Native Mindset: Human-in-the-Loop
**Status**: PASS  
**Rationale**: This is documentation content about AI tool usage patterns. All content will be human-authored and reviewed. No AI-generated code will be committed without review. The advanced guides themselves teach proper human oversight of AI tools.

### ✅ Principle II: Spec-First Development
**Status**: PASS  
**Rationale**: Feature specification exists in `specs/001-advanced-role-guides/spec.md` with complete user stories, requirements, and success criteria. Implementation follows the specification.

### ✅ Principle III: Context Management: The Open-Tab Strategy
**Status**: PASS (N/A for documentation)  
**Rationale**: This principle applies to code generation. Documentation creation doesn't require IDE tab context, but we will reference existing guide files to maintain consistency.

### ✅ Principle IV: Prompt Engineering: The R.I.C.E. Framework
**Status**: PASS  
**Rationale**: When using AI to help draft documentation sections, we will apply R.I.C.E. framework (Role: technical writer for senior engineers, Input: create advanced patterns section, Context: existing guide structure and experience level requirements, Example: follow existing guide format).

### ✅ Principle V: Test-Driven Development with AI
**Status**: PASS (Modified for documentation)  
**Rationale**: While TDD doesn't directly apply to documentation, we will verify documentation against acceptance criteria before considering it complete. Manual review acts as our "test" phase.

### ✅ Principle VI: Security & Compliance: Skeptical Review
**Status**: PASS  
**Rationale**: Documentation will be reviewed for accuracy and security best practices. Code examples in documentation will demonstrate secure patterns (password hashing, input validation, etc.) not vulnerabilities.

### ✅ Principle VII: Iterative Refinement: No Blind Acceptance
**Status**: PASS  
**Rationale**: Documentation content will be drafted, reviewed, and refined iteratively. No content will be committed without human review and verification against requirements.

**GATE RESULT**: ✅ **PASS** - All principles satisfied or appropriately adapted for documentation context.

---

### Post-Phase 1 Re-Check (Design Complete)

**Re-evaluation Date**: 2025-12-08  
**Status**: ✅ **PASS** - All principles remain satisfied after Phase 1 design completion.

**Design Artifacts Validated**:
- ✅ `research.md` - All technical decisions documented with rationale
- ✅ `data-model.md` - Content entities and validation rules defined
- ✅ `contracts/` - Frontmatter schema and content templates created
- ✅ `quickstart.md` - Implementation guide for content authors
- ✅ Agent context updated via `update-agent-context.sh copilot`

**Constitution Compliance Verified**:
- All templates include security review guidelines (Principle VI)
- All templates emphasize human review of AI-generated content (Principle I)
- Templates follow structured format from research decisions (Principle II)
- No complexity violations introduced (all gates passed initially)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

## Project Structure

### Documentation (this feature)

```text
specs/001-advanced-role-guides/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output - research decisions
├── data-model.md        # Phase 1 output - content structure entities
├── quickstart.md        # Phase 1 output - implementation guide
├── contracts/           # Phase 1 output - content templates and schemas
│   ├── frontmatter-schema.yaml        # YAML schema for frontmatter validation
│   ├── senior-practices-template.md    # Template for senior-level content
│   ├── lead-practices-template.md      # Template for lead-level content
│   └── principal-practices-template.md # Template for principal-level content
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
playbook/content/
├── developer-guide/
│   ├── getting-started/
│   ├── daily-usage/
│   ├── examples/
│   └── advanced/                          # NEW
│       ├── senior-practices.md            # NEW - 3-5 advanced code examples
│       ├── lead-practices.md              # NEW - 3-5 team adoption case studies
│       └── principal-practices.md         # NEW - org-wide governance frameworks
│
├── architect-guide/
│   ├── getting-started/
│   ├── governance/
│   └── advanced/                          # NEW
│       ├── senior-practices.md            # NEW
│       ├── lead-practices.md              # NEW
│       └── principal-practices.md         # NEW
│
├── qa-guide/
│   ├── getting-started/
│   └── advanced/                          # NEW
│       ├── senior-practices.md            # NEW
│       ├── lead-practices.md              # NEW
│       └── principal-practices.md         # NEW
│
├── devops-guide/
│   ├── getting-started/
│   └── advanced/                          # NEW
│       ├── senior-practices.md            # NEW
│       ├── lead-practices.md              # NEW
│       └── principal-practices.md         # NEW
│
└── shared/                                # EXISTING - may add cross-references
```

**Structure Decision**: Using "advanced" directory pattern to match existing "getting-started", "daily-usage", and "examples" directories. Each role guide receives identical three-file structure (senior, lead, principal) to maintain consistency and predictability across all guides.

## Complexity Tracking

> **No violations to report** - all Constitution Check gates passed without exceptions.
