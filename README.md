# github-playbook

A playbook repository demonstrating spec-driven development with GitHub SpecKit and comprehensive GitHub Copilot guidance.

## About

This project uses [GitHub SpecKit](https://github.com/github/spec-kit) for spec-driven development. SpecKit is an open-source toolkit that enables specification-first development, where specifications become the centerpiece of your software workflow.

## GitHub Copilot Cookbook

📚 **[GitHub Copilot Cookbook](./copilot-cookbook/README.md)** - A comprehensive guide to leveraging GitHub Copilot across all SDLC phases, with role-specific best practices and real-world scenarios.

### Role-Specific Guides

| Role | Guide | Description |
|------|-------|-------------|
| 👨‍💻 Developer | [Developer Guide](./copilot-cookbook/roles/developer-guide.md) | Code generation, debugging, testing, PR reviews |
| 🧪 QA Engineer | [QA Guide](./copilot-cookbook/roles/qa-guide.md) | Test automation, test case design, defect analysis |
| 📋 Product Manager | [PM Guide](./copilot-cookbook/roles/pm-guide.md) | Requirements, roadmaps, stakeholder communication |
| 📝 Product Owner | [PO Guide](./copilot-cookbook/roles/po-guide.md) | User stories, backlog management, acceptance criteria |
| 🏗️ Engineering Lead | [Engineering Lead Guide](./copilot-cookbook/roles/engineering-lead-guide.md) | Architecture, code standards, team productivity |
| 🚀 Delivery Manager | [Delivery Manager Guide](./copilot-cookbook/roles/delivery-manager-guide.md) | Release planning, risk management, reporting |

### SDLC Coverage

The cookbook covers all phases of the software development lifecycle:

1. **Planning & Requirements** - Using Copilot for specifications and user stories
2. **Design & Architecture** - Technical planning and API design
3. **Task Breakdown** - Sprint planning and work decomposition
4. **Implementation** - Code generation and development
5. **Testing & QA** - Test automation and quality assurance
6. **Deployment & Release** - CI/CD and release management
7. **Monitoring & Maintenance** - Operations and technical debt

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
| `/speckit.checklist` | Generate custom quality checklists for requirements validation |
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
