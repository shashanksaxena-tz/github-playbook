# Data Model: Playbook Content Structure

**Created**: 2025-12-06  
**Purpose**: Define the content structure and organization model for the playbook

## Content Entities

### Playbook Section

**Description**: A major organizational unit of content covering a specific topic.

**Attributes**:
- `id`: Unique identifier (e.g., "developer-guide-getting-started")
- `title`: Section title (e.g., "Getting Started with GitHub Copilot")
- `role`: Target role (developer, architect, qa, devops, shared)
- `experience_level`: Target experience (beginner, intermediate, advanced, all)
- `workflow_stage`: Workflow position (getting-started, daily-usage, advanced-patterns, governance)
- `content_path`: File path relative to playbook root
- `description`: Brief description for navigation
- `cross_references`: Array of section IDs this section references
- `last_updated`: Date of last content update

**Relationships**:
- Belongs to one Role Guide
- Can reference multiple other Sections (cross-references)
- Contains multiple Subsections
- May contain multiple Code Examples
- May contain multiple Prompt Templates

### Best Practice Pattern

**Description**: A recommended approach for using AI tools effectively.

**Attributes**:
- `id`: Unique identifier
- `name`: Pattern name (e.g., "Open-Tab Strategy")
- `description`: What the pattern does
- `use_cases`: Array of scenarios where this applies
- `step_by_step`: Ordered list of technique steps
- `rationale`: Why this pattern works
- `related_patterns`: Array of pattern IDs
- `code_examples`: Array of code example IDs

**Relationships**:
- Appears in one or more Sections
- May reference Code Examples
- May be related to other Patterns

### Anti-Pattern

**Description**: A dangerous or ineffective approach to avoid.

**Attributes**:
- `id`: Unique identifier
- `name`: Anti-pattern name (e.g., "The Blind Commit")
- `description`: What makes this dangerous
- `risk_level`: high | medium
- `specific_risks`: Array of risk descriptions
- `how_to_avoid`: Guidance on avoiding this pattern
- `related_best_practices`: Array of best practice pattern IDs that prevent this

**Relationships**:
- Appears in one or more Sections
- Contrasts with Best Practice Patterns

### Prompt Template

**Description**: A reusable prompt structure for common development tasks.

**Attributes**:
- `id`: Unique identifier
- `name`: Template name (e.g., "Code Generation Template")
- `task_type`: code-generation | refactoring | testing | debugging | documentation
- `template`: Markdown template with placeholders
- `example_usage`: Example of filled template
- `expected_output_format`: Description of expected AI response
- `use_case_scenarios`: Array of scenarios where this applies
- `language_specific`: Array of languages this applies to (empty = language-agnostic)

**Relationships**:
- Appears in Prompt Engineering section
- May be referenced by multiple Sections
- May have language-specific variants

### Code Example

**Description**: A practical demonstration showing implementation patterns.

**Attributes**:
- `id`: Unique identifier
- `scenario_description`: What this example demonstrates
- `prompt_used`: The prompt that generated the code
- `language`: python | javascript | typescript | java | go | language-agnostic
- `ai_generated_code`: Code block showing AI output
- `human_review_critique`: Analysis of issues in AI code
- `corrected_version`: Improved code (if applicable)
- `explanation`: Why the corrected version is better
- `pattern_demonstrated`: good | risky | before-after-comparison

**Relationships**:
- Appears in one or more Sections
- Demonstrates Best Practice Patterns or Anti-Patterns
- May be referenced by Prompt Templates

## Content Organization Hierarchy

```
Playbook Root
├── Role Guides (Developer, Architect, QA, DevOps)
│   ├── Workflow Stages (Getting Started, Daily Usage, Advanced Patterns, Governance)
│   │   ├── Sections
│   │   │   ├── Subsections
│   │   │   ├── Best Practice Patterns
│   │   │   ├── Anti-Patterns
│   │   │   ├── Code Examples
│   │   │   └── Cross-references
│   │   └── Prompt Templates (if applicable)
└── Shared Content
    ├── Prompt Engineering
    ├── Security & Compliance
    └── AI Tools Ecosystem
```

## Content Metadata Schema

Each content file should include frontmatter:

```yaml
---
id: unique-section-id
title: Section Title
role: developer | architect | qa | devops | shared
experience_level: beginner | intermediate | advanced | all
workflow_stage: getting-started | daily-usage | advanced-patterns | governance
description: Brief description for navigation
cross_references:
  - other-section-id-1
  - other-section-id-2
tags:
  - tag1
  - tag2
last_updated: YYYY-MM-DD
---
```

## Validation Rules

1. **Section IDs**: Must be unique across entire playbook
2. **Cross-references**: Must reference valid section IDs
3. **Experience Levels**: Must be explicitly marked (beginner/intermediate/advanced/all)
4. **Code Examples**: Must specify language or mark as language-agnostic
5. **Anti-Patterns**: Must have risk_level (high/medium) and specific_risks
6. **Prompt Templates**: Must specify task_type and use_case_scenarios
7. **Best Practice Patterns**: Must include step_by_step and rationale

## Content Relationships

- **Sections** can contain multiple **Subsections**
- **Sections** can reference other **Sections** (cross-references)
- **Sections** can contain **Best Practice Patterns**, **Anti-Patterns**, and **Code Examples**
- **Best Practice Patterns** can reference **Code Examples**
- **Anti-Patterns** contrast with **Best Practice Patterns**
- **Prompt Templates** can be referenced by multiple **Sections**
- **Code Examples** can demonstrate **Best Practice Patterns** or **Anti-Patterns**


