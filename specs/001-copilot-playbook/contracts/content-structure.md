# Content Structure Contract

**Created**: 2025-12-06  
**Purpose**: Define the contract for playbook content organization and structure

## Content Organization Contract

### Role-Based Organization (Primary)

The playbook MUST be organized into role-based guides:

1. **Developer Guide** (`developer-guide/`)
   - Target audience: Individual developers
   - Focus: Daily usage patterns, best practices, code examples

2. **Architect Guide** (`architect-guide/`)
   - Target audience: Engineering leads, architects
   - Focus: Organizational standards, governance, model selection

3. **QA Guide** (`qa-guide/`)
   - Target audience: QA engineers, testers
   - Focus: Testing patterns, TDD with AI, test generation

4. **DevOps Guide** (`devops-guide/`)
   - Target audience: DevOps engineers, SREs
   - Focus: Deployment, CI/CD, infrastructure as code

5. **Shared Content** (`shared/`)
   - Target audience: All roles
   - Focus: Prompt engineering, security/compliance, AI tools ecosystem

### Workflow-Based Navigation (Secondary)

Each role guide MUST support workflow-based navigation:

- **Getting Started**: Introduction, setup, basic concepts
- **Daily Usage**: Common patterns, practical examples
- **Advanced Patterns**: Complex scenarios, optimization
- **Governance**: Policies, compliance, organizational adoption

### Experience Level Marking

All content sections MUST be explicitly marked with experience level:

- `beginner`: No prior AI tool experience required
- `intermediate`: Basic AI tool familiarity assumed
- `advanced`: Deep expertise in AI tools expected
- `all`: Content applicable to all experience levels

### Cross-Reference Requirements

- Sections MUST include cross-references to related content
- Cross-references MUST use valid section IDs
- Cross-references MUST be bidirectional where logical

### Code Example Requirements

- Code examples MUST specify language (Python, JavaScript/TypeScript, Java, Go) or mark as language-agnostic
- Code examples MUST include before/after comparisons where demonstrating anti-patterns
- Code examples MUST include explanations of why patterns work or fail

### Prompt Template Requirements

- Prompt templates MUST specify task type (code-generation, refactoring, testing, debugging, documentation)
- Prompt templates MUST include example usage
- Prompt templates MUST specify expected output format

## Navigation Contract

### Sidebar Structure

The static site MUST provide:

1. **Role-based navigation** (primary sidebar)
   - Developer Guide
   - Architect Guide
   - QA Guide
   - DevOps Guide
   - Shared Content

2. **Workflow-based navigation** (within each role guide)
   - Getting Started
   - Daily Usage
   - Advanced Patterns
   - Governance

3. **Search functionality**
   - Full-text search across all content
   - Search results must include section titles and descriptions
   - Search must support finding content within 2 minutes (SC-001)

### Cross-Reference Display

- Cross-references MUST be displayed as clickable links
- Cross-references MUST show target section title
- Cross-references MUST maintain context (breadcrumbs)

## Content Quality Contract

### Completeness Requirements

- All functional requirements (FR-001 through FR-016) MUST have corresponding content sections
- All success criteria (SC-001 through SC-008) MUST be verifiable through content structure
- All user stories (US1, US2, US3) MUST have dedicated content paths

### Clarity Requirements

- All technical terms MUST be defined on first use
- All code examples MUST include explanations
- All anti-patterns MUST include specific risks and avoidance guidance

### Consistency Requirements

- Terminology MUST be consistent across all sections
- Code example format MUST be consistent
- Prompt template format MUST be consistent
- Experience level marking MUST be consistent

## Validation Contract

### Build Validation

The static site build MUST:

1. Generate without errors
2. Validate all internal links
3. Check all cross-references resolve
4. Verify all code examples have syntax highlighting
5. Ensure all images/assets load correctly

### Content Validation

Content validation MUST check:

1. All sections have required frontmatter
2. All experience levels are explicitly marked
3. All code examples specify language
4. All anti-patterns have risk levels
5. All cross-references resolve to valid sections

### Accessibility Validation

The static site MUST:

1. Pass WCAG 2.1 AA accessibility standards
2. Support keyboard navigation
3. Provide screen reader compatibility
4. Include alt text for all images
5. Maintain proper heading hierarchy


