# github-playbook

A playbook repository demonstrating spec-driven development with GitHub SpecKit.

## About

This project uses [GitHub SpecKit](https://github.com/github/spec-kit) for spec-driven development. SpecKit is an open-source toolkit that enables specification-first development, where specifications become the centerpiece of your software workflow.

## Getting Started

### Prerequisites

- [uv](https://docs.astral.sh/uv/) for package management (optional, for CLI usage)
- [Python 3.11+](https://www.python.org/downloads/) (optional, for CLI usage)
- [Git](https://git-scm.com/downloads)

### Using SpecKit Commands

The project includes slash commands for AI coding assistants that support the spec-driven workflow:

| Command | Description |
|---------|-------------|
| `/speckit.constitution` | Create or update project governing principles and development guidelines |
| `/speckit.specify` | Define what you want to build (requirements and user stories) |
| `/speckit.clarify` | Clarify underspecified areas (recommended before `/speckit.plan`) |
| `/speckit.plan` | Create technical implementation plans with your chosen tech stack |
| `/speckit.tasks` | Generate actionable task lists for implementation |
| `/speckit.analyze` | Cross-artifact consistency & coverage analysis |
| `/speckit.implement` | Execute all tasks to build the feature according to the plan |

### Workflow

1. **Establish principles**: Use `/speckit.constitution` to create your project's governing principles
2. **Create specification**: Use `/speckit.specify` to describe what you want to build
3. **Clarify (optional)**: Use `/speckit.clarify` to refine underspecified areas
4. **Create plan**: Use `/speckit.plan` to provide your tech stack and architecture choices
5. **Break down tasks**: Use `/speckit.tasks` to create an actionable task list
6. **Implement**: Use `/speckit.implement` to execute all tasks and build your feature

## Project Structure

```
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

## Learn More

- [GitHub SpecKit Repository](https://github.com/github/spec-kit)
- [SpecKit Documentation](https://speckit.org/)
- [Spec-Driven Development Guide](https://github.com/github/spec-kit/blob/main/spec-driven.md)

## License

See [LICENSE](LICENSE) for details
