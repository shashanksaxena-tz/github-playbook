# Phase 1: Data Model

**Feature**: Advanced Role Documentation for Senior, Lead, and Principal Engineers  
**Date**: 2025-12-08  
**Status**: Complete

## Overview

This document defines the content entities, relationships, and validation rules for the advanced role guide documentation system.

---

## Core Entities

### 1. Role Guide

**Description**: A collection of documentation for a specific job function using GitHub Copilot and AI tools.

**Attributes**:
- `role_name`: string (developer | architect | qa | devops)
- `base_path`: string (e.g., "playbook/content/developer-guide/")
- `existing_sections`: array of strings (e.g., ["getting-started", "daily-usage", "examples"])
- `advanced_section_path`: string (e.g., "playbook/content/developer-guide/advanced/")

**Relationships**:
- Contains multiple **Advanced Practice Documents** (3 per role)
- References multiple **Experience Levels** (senior, lead, principal)
- May cross-reference other **Role Guides**

**Validation Rules**:
- Role name must be one of: developer, architect, qa, devops
- Base path must exist in repository
- Advanced section path = base_path + "advanced/"
- Must contain exactly 3 advanced practice documents

**Instances**: 4 total
- Developer Guide
- Architect Guide  
- QA Guide
- DevOps Guide

---

### 2. Experience Level

**Description**: A categorization of professional maturity defining the scope and depth of documentation content.

**Attributes**:
- `level_name`: enum (senior | lead | principal)
- `years_experience`: range
  - Senior: 5-8 years
  - Lead: 8-12 years
  - Principal: 12+ years
- `primary_focus`: enum (technical_depth | team_coordination | organizational_strategy)
- `decision_scope`: enum (individual_technical | team_scale | multi_team_organizational)
- `file_suffix`: string (always "-practices.md")

**Relationships**:
- Applied to **Advanced Practice Documents** (1:1)
- Referenced in **Frontmatter Metadata**
- Cross-referenced between documents

**Validation Rules**:
- Level name must be one of: senior, lead, principal
- Primary focus must align with level:
  - Senior → technical_depth
  - Lead → team_coordination  
  - Principal → organizational_strategy
- Years experience ranges must not overlap

**Instances**: 3 total (senior, lead, principal)

---

### 3. Advanced Practice Document

**Description**: A markdown file containing experience-level-specific AI tool usage patterns, examples, and frameworks.

**Attributes**:
- `file_path`: string (full path to .md file)
- `frontmatter`: Frontmatter Metadata object
- `content_sections`: array of Content Section objects
- `code_examples`: array of Code Example objects (3-5 for senior level)
- `case_studies`: array of Case Study objects (3-5 for lead level)
- `frameworks`: array of Framework objects (for principal level)
- `cross_references`: array of Cross Reference objects

**Relationships**:
- Belongs to one **Role Guide**
- Has one **Experience Level**
- Contains **Frontmatter Metadata** (1:1)
- Contains multiple **Content Sections** (variable)
- Contains multiple **Code Examples** OR **Case Studies** OR **Frameworks** (level-dependent)
- References other **Advanced Practice Documents**

**Validation Rules**:
- File name must match pattern: `{level}-practices.md`
- Must have valid frontmatter (see Frontmatter Metadata validation)
- Senior documents must have 3-5 Code Examples
- Lead documents must have 3-5 Case Studies
- Principal documents must have strategic Frameworks
- Must include "When to Use This Guide" section
- Must include "Measuring Success" section
- Must include "Related Content" section
- All cross-references must point to existing documents

**Instances**: 12 total (3 levels × 4 roles)

---

### 4. Frontmatter Metadata

**Description**: YAML metadata block at the start of each markdown document providing structured information.

**Attributes**:
```yaml
id: string                    # Unique identifier
title: string                 # Display title
role: enum                    # developer | architect | qa | devops
experience_level: enum        # senior | lead | principal
workflow_stage: string        # Always "advanced" for these docs
description: string           # 50-150 characters
cross_references: array       # List of document IDs
tags: array                   # 3-7 relevant tags
last_updated: date            # YYYY-MM-DD format
```

**Relationships**:
- Embedded in one **Advanced Practice Document** (1:1)
- References other documents via `cross_references` array

**Validation Rules**:
- `id` format: `{role}-{level}-practices` (e.g., "developer-senior-practices")
- `id` must be unique across all documents
- `title` must be 10-100 characters
- `role` must match one of 4 valid roles
- `experience_level` must match one of 3 valid levels
- `workflow_stage` must be "advanced"
- `description` must be 50-150 characters
- `cross_references` must contain valid document IDs
- `tags` must have 3-7 items
- `last_updated` must be valid ISO date (YYYY-MM-DD)

**Example**:
```yaml
---
id: developer-senior-practices
title: "Advanced Development Patterns for Senior Engineers"
role: developer
experience_level: senior
workflow_stage: advanced
description: "Advanced AI-assisted development patterns, mentorship strategies, and code review practices for senior developers with 5-8 years experience"
cross_references:
  - developer-guide-introduction
  - developer-lead-practices
  - python-example
tags:
  - advanced-patterns
  - code-review
  - mentorship
  - senior-developer
  - ai-assisted-development
last_updated: 2025-12-08
---
```

---

### 5. Content Section

**Description**: A major division of content within a document, identified by a heading.

**Attributes**:
- `heading`: string (h2 or h3 level)
- `heading_level`: integer (2 or 3)
- `content_type`: enum (text | code | case_study | framework | list | table)
- `body`: string (markdown content)
- `required`: boolean (some sections mandatory per template)

**Relationships**:
- Contained in **Advanced Practice Document** (many:1)
- May contain **Code Examples**, **Case Studies**, or **Frameworks**

**Validation Rules**:
- Required sections must exist:
  - "When to Use This Guide"
  - "Measuring Success" or "Measuring [Team/Organizational] Impact"
  - "Related Content"
- Section headings must be unique within document
- Content must be non-empty
- Markdown syntax must be valid

**Standard Sections by Level**:

**Senior**:
- When to Use This Guide (required)
- Advanced Technical Patterns (required, contains Code Examples)
- Mentorship & Code Review (required)
- Performance & Optimization (role-specific, required)
- Measuring Success (required)
- Related Content (required)

**Lead**:
- When to Use This Guide (required)
- Team-Scale AI Adoption (required, contains Case Studies)
- Technical Decision Frameworks (required)
- Cross-Functional Collaboration (required)
- Measuring Team Impact (required)
- Related Content (required)

**Principal**:
- When to Use This Guide (required)
- Organization-Wide AI Strategy (required)
- Multi-Team Governance (required, contains Frameworks)
- Innovation Assessment Framework (required)
- High-Impact Architectural Decisions (required)
- Measuring Organizational Impact (required)
- Related Content (required)

---

### 6. Code Example

**Description**: An annotated code block demonstrating advanced AI-assisted development patterns.

**Attributes**:
- `pattern_name`: string (descriptive name)
- `context`: string (when to use)
- `prompt_example`: string (actual R.I.C.E. structured prompt)
- `code_block`: string (code with inline annotations)
- `language`: string (programming language)
- `benefits`: array of strings (why it works)
- `pitfalls`: array of strings (anti-patterns to avoid)
- `success_metric`: string (measurable outcome)

**Relationships**:
- Contained in **Advanced Practice Document** (senior level only)
- Part of **Content Section** (Advanced Technical Patterns)

**Validation Rules**:
- Senior documents must have 3-5 Code Examples
- Each example must demonstrate AI tool usage (not generic code)
- Code must be syntactically valid
- Must include all required attributes (pattern_name, context, prompt, code, benefits, pitfalls, metrics)
- Code must demonstrate secure patterns (no hardcoded secrets, proper validation, etc.)
- Language must match role context (Python/JS/Java for developers, Terraform/YAML for DevOps, etc.)

**Format Template**:
```markdown
## Pattern Name: [Descriptive Name]

**Context**: [When to use this pattern]

**Prompt Example**:
```text
[R.I.C.E. structured prompt]
```

**Generated Code**:
```[language]
[Code with annotations]
// ✅ Good practice: [explanation]
// ⚠️ Watch out: [warning]
// 🔒 Security: [security note]
```

**Why This Works**:
- ✅ [Benefit 1]
- ✅ [Benefit 2]

**Common Pitfalls**:
- ❌ [Anti-pattern]

**Measuring Success**:
- [Metric]
```

---

### 7. Case Study

**Description**: A real-world scenario illustrating successful team-scale AI tool adoption.

**Attributes**:
- `title`: string (scenario name)
- `situation`: string (context and challenge)
- `action`: string (what was done)
- `result`: string (outcome and impact)
- `team_size`: string or integer (approximate)
- `time_frame`: string (duration)
- `success_metrics`: array of strings (measurable outcomes)
- `lessons_learned`: array of strings (key takeaways)

**Relationships**:
- Contained in **Advanced Practice Document** (lead level only)
- Part of **Content Section** (Team-Scale AI Adoption)

**Validation Rules**:
- Lead documents must have 3-5 Case Studies
- Each case study must use S.A.R. format (Situation, Action, Result)
- Must include team-level context (not individual)
- Must demonstrate AI tool adoption patterns
- Must include measurable outcomes
- Should be based on real scenarios (cited if borrowed)

**Format Template**:
```markdown
### Case Study: [Scenario Title]

**Situation**:
[Context: team size, challenge, constraints]

**Action**:
[What the lead engineer implemented, step-by-step]

**Result**:
[Quantifiable outcomes and team impact]

**Success Metrics**:
- [Metric 1: e.g., 30% reduction in PR cycle time]
- [Metric 2: e.g., 85% team adoption rate]

**Lessons Learned**:
- [Key takeaway 1]
- [Key takeaway 2]

**Applicability**:
[When this pattern works best]
```

---

### 8. Framework

**Description**: A strategic decision-making or governance structure for organization-wide AI adoption.

**Attributes**:
- `framework_name`: string
- `purpose`: string (what problem it solves)
- `components`: array of objects (framework elements)
- `application_guidance`: string (how to use)
- `decision_criteria`: array of strings (evaluation factors)
- `organizational_scope`: string (multi-team, company-wide, etc.)
- `example_application`: string (concrete example)

**Relationships**:
- Contained in **Advanced Practice Document** (principal level only)
- Part of **Content Section** (varies by section)

**Validation Rules**:
- Principal documents must include strategic frameworks
- Frameworks must address organizational-scale concerns
- Must include decision criteria or evaluation factors
- Must provide concrete application guidance
- Should reference security, compliance, or governance where applicable

**Format Template**:
```markdown
## [Framework Name]

**Purpose**: [What organizational problem this solves]

**Components**:
1. **[Component 1]**: [Description]
2. **[Component 2]**: [Description]
3. **[Component 3]**: [Description]

**Application Guidance**:
[Step-by-step process for applying framework]

**Decision Criteria**:
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

**Example Application**:
[Concrete scenario showing framework in use]

**Organizational Impact**:
[How this scales across multiple teams]
```

---

### 9. Cross Reference

**Description**: A link connecting related content across documents, experience levels, or role guides.

**Attributes**:
- `source_document_id`: string (document containing the reference)
- `target_document_id`: string (referenced document ID)
- `target_path`: string (relative markdown path)
- `reference_type`: enum (within_guide | experience_level_navigation | cross_role | shared_resource)
- `link_text`: string (display text)
- `context`: string (why this reference is relevant)

**Relationships**:
- Links two **Advanced Practice Documents** or one document to existing content
- Referenced in **Frontmatter Metadata** (`cross_references` array)
- Listed in **Content Section** ("Related Content")

**Validation Rules**:
- Target document must exist
- Relative path must be valid
- Reference type must match actual relationship
- Each document must have at least 2 cross-references
- Existing beginner/intermediate documents should link to new advanced content

**Reference Types**:

1. **Within-guide**: Links to other content in same role guide
   - Example: `[Getting Started](../getting-started/introduction.md)`

2. **Experience-level navigation**: Links between experience levels in same role
   - Example: `[Senior Practices](./senior-practices.md)` (from lead doc)
   - Example: `[Intermediate Patterns](../daily-usage/code-generation-comments.md)` (from senior doc)

3. **Cross-role**: Links to relevant content in different roles
   - Example: `[Architect Lead Practices](../../architect-guide/advanced/lead-practices.md)`

4. **Shared resource**: Links to shared/common documentation
   - Example: `[Security & Compliance](../../shared/security-compliance/overview.md)`

---

## Entity Relationship Diagram

```text
Role Guide (4)
    └── contains ──> Advanced Practice Document (12)
            ├── has ──> Experience Level (1 of 3)
            ├── contains ──> Frontmatter Metadata (1)
            ├── contains ──> Content Section (6-8)
            │       └── may contain ──> Code Example (3-5, senior only)
            │       └── may contain ──> Case Study (3-5, lead only)
            │       └── may contain ──> Framework (multiple, principal only)
            └── references via ──> Cross Reference (2+)
```

---

## State Transitions

### Document Lifecycle

```text
[Draft] → [Under Review] → [Approved] → [Published] → [Needs Update] → [Under Review] → [Published]
                                                              ↓
                                                        [Deprecated]
```

**States**:
- **Draft**: Initial creation, incomplete sections
- **Under Review**: Complete, awaiting peer review
- **Approved**: Reviewed, ready to merge
- **Published**: Merged to main branch, publicly available
- **Needs Update**: AI tool evolution requires content refresh
- **Deprecated**: Pattern no longer recommended, marked for removal

**Triggers**:
- Draft → Under Review: All required sections complete, validation passes
- Under Review → Approved: Peer review completed, feedback addressed
- Approved → Published: Merged to main branch
- Published → Needs Update: Quarterly review identifies outdated content
- Needs Update → Under Review: Content updated, re-review required
- Published → Deprecated: Pattern obsolete or superseded

---

## Validation Rules Summary

### Document-Level Validation
- ✅ File exists at expected path
- ✅ Frontmatter present and valid
- ✅ All required sections present
- ✅ Markdown syntax valid
- ✅ Cross-references point to existing documents
- ✅ Content type matches experience level (code examples for senior, case studies for lead, frameworks for principal)
- ✅ Word count appropriate (1500-3000 words typical)

### Frontmatter Validation
- ✅ All required fields present
- ✅ ID follows naming convention
- ✅ ID is unique
- ✅ Role matches one of 4 valid values
- ✅ Experience level matches one of 3 valid values
- ✅ Workflow stage is "advanced"
- ✅ Description length 50-150 chars
- ✅ Tags count 3-7
- ✅ Date format YYYY-MM-DD

### Content Validation
- ✅ Senior docs have 3-5 code examples
- ✅ Lead docs have 3-5 case studies
- ✅ Principal docs have strategic frameworks
- ✅ All examples demonstrate AI tool usage
- ✅ Code examples are secure (no hardcoded secrets, proper validation)
- ✅ Metrics and success criteria present
- ✅ Cross-references section exists with 2+ links

### Quality Standards
- ✅ Language is clear and concise
- ✅ Content is role-specific and relevant
- ✅ Examples are production-ready, not toy code
- ✅ Security best practices demonstrated
- ✅ No generic programming examples (all must show AI usage)

---

## Next Steps

With data model complete, proceed to:
1. Create frontmatter schema in `contracts/frontmatter-schema.yaml`
2. Create content templates in `contracts/` for each experience level
3. Generate `quickstart.md` implementation guide
4. Update agent context files

**Data model complete. Ready for contracts and templates.**
