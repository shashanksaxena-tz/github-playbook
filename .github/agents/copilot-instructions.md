# github-playbook Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-12-05

## Spec-Driven Development

This project uses GitHub SpecKit for spec-driven development. Use the following commands:

### Available Commands

- `/speckit.constitution` - Create or update project governing principles
- `/speckit.specify` - Define what you want to build (requirements and user stories)
- `/speckit.clarify` - Clarify underspecified areas in the spec
- `/speckit.plan` - Create technical implementation plans
- `/speckit.tasks` - Generate actionable task lists
- `/speckit.analyze` - Cross-artifact consistency analysis
- `/speckit.checklist` - Generate custom quality checklists
- `/speckit.implement` - Execute all tasks to build the feature

### Workflow

1. Start with `/speckit.constitution` to establish project principles
2. Use `/speckit.specify` to define your feature requirements
3. Optionally use `/speckit.clarify` to refine requirements
4. Use `/speckit.plan` to create the technical implementation plan
5. Use `/speckit.tasks` to break down into actionable tasks
6. Use `/speckit.implement` to execute the implementation

## Project Structure

```text
.specify/
├── memory/
│   └── constitution.md    # Project principles and guidelines
├── scripts/
│   └── bash/              # Shell scripts for workflow automation
├── specs/                 # Feature specifications
└── templates/
    ├── commands/          # Slash command definitions
    ├── spec-template.md   # Feature specification template
    ├── plan-template.md   # Implementation plan template
    └── tasks-template.md  # Task list template
```

## Active Technologies
- Markdown (CommonMark spec), YAML 1.2 (frontmatter) + None (pure markdown documentation) (001-advanced-role-guides)
- File system (git repository) (001-advanced-role-guides)

[To be populated based on project needs]

## Commands

[To be populated based on technology stack]

## Code Style

[To be populated based on technology stack]

## Recent Changes
- 001-advanced-role-guides: Added Markdown (CommonMark spec), YAML 1.2 (frontmatter) + None (pure markdown documentation)

- Initial setup: Added GitHub SpecKit for spec-driven development

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
