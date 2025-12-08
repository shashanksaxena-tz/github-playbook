# Tasks: GitHub Copilot & AI-Native SDLC Playbook

**Input**: Design documents from `/specs/001-copilot-playbook/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL for documentation projects - validation tasks included instead.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Documentation project**: `playbook/content/` for source, `docs/` for generated output
- Paths follow plan.md structure with role-based organization

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and Docusaurus setup

- [x] T001 Create playbook directory structure per implementation plan in playbook/
- [x] T002 Initialize Docusaurus 3.x project with npm create docusaurus@latest in playbook/
- [x] T003 [P] Configure package.json with dependencies: markdownlint, markdown-link-check, axe-core
- [x] T004 [P] Create directory structure: playbook/content/developer-guide/, playbook/content/architect-guide/, playbook/content/qa-guide/, playbook/content/devops-guide/, playbook/content/shared/
- [x] T005 [P] Create scripts directory with build.sh, validate-links.sh, lint-markdown.sh in scripts/
- [x] T006 Configure Docusaurus docusaurus.config.js with basic settings in playbook/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story content can be created

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Configure Docusaurus sidebar structure for role-based navigation in playbook/docusaurus.config.js
- [x] T008 [P] Setup markdownlint configuration in .markdownlint.json
- [x] T009 [P] Setup markdown-link-check configuration in .markdown-link-check.json
- [x] T010 Configure Docusaurus theme for code syntax highlighting (Python, JavaScript, TypeScript, Java, Go) in playbook/docusaurus.config.js
- [x] T011 Setup build scripts: npm run build, npm run lint:markdown, npm run check:links in playbook/package.json
- [x] T012 Create base template for content files with frontmatter schema in playbook/content/_template.md
- [x] T013 Configure Docusaurus search functionality (built-in or Algolia) in playbook/docusaurus.config.js
- [x] T014 Setup GitHub Pages deployment configuration in playbook/docusaurus.config.js

**Checkpoint**: Foundation ready - user story content creation can now begin in parallel

---

## Phase 3: User Story 1 - Developer Learning GitHub Copilot Best Practices (Priority: P1) 🎯 MVP

**Goal**: Create Developer Guide content covering GitHub Copilot usage patterns, anti-patterns, and code examples that enable developers to learn and apply best practices independently.

**Independent Test**: A developer can read the GitHub Copilot best practices section and successfully apply at least three different usage patterns (ghost text, comment-driven development, test generation) in their next coding session. They can identify and avoid at least two anti-patterns.

### Implementation for User Story 1

- [x] T015 [US1] Create Developer Guide getting started section: playbook/content/developer-guide/getting-started/introduction.md
- [x] T016 [P] [US1] Create code completion (ghost text) usage pattern section: playbook/content/developer-guide/daily-usage/code-completion.md
- [x] T017 [P] [US1] Create code generation from comments usage pattern section: playbook/content/developer-guide/daily-usage/code-generation-comments.md
- [x] T018 [P] [US1] Create unit test generation usage pattern section: playbook/content/developer-guide/daily-usage/test-generation.md
- [x] T019 [P] [US1] Create refactoring techniques section: playbook/content/developer-guide/daily-usage/refactoring.md
- [x] T020 [US1] Create anti-patterns section with "The Blind Commit" in playbook/content/developer-guide/daily-usage/anti-patterns.md
- [x] T021 [US1] Add "The Secret Leaker" anti-pattern to playbook/content/developer-guide/daily-usage/anti-patterns.md
- [x] T022 [US1] Add "Context Overload" anti-pattern (high-risk) to playbook/content/developer-guide/daily-usage/anti-patterns.md with explanation of why asking AI to architect entire systems in one prompt is dangerous
- [x] T023 [P] [US1] Create Python code example showing good vs. risky pattern in playbook/content/developer-guide/examples/python-example.md
- [x] T024 [P] [US1] Create JavaScript/TypeScript code example showing good vs. risky pattern in playbook/content/developer-guide/examples/javascript-example.md
- [x] T025 [P] [US1] Create Java code example showing good vs. risky pattern in playbook/content/developer-guide/examples/java-example.md
- [x] T026 [P] [US1] Create .NET (C#) code example showing good vs. risky pattern in playbook/content/developer-guide/examples/dotnet-example.md
- [x] T027 [US1] Create language-agnostic pattern examples in playbook/content/developer-guide/examples/language-agnostic-patterns.md
- [x] T028 [US1] Add experience level markers (beginner, intermediate, advanced) to all Developer Guide sections
- [x] T029 [US1] Create cross-references from Developer Guide to Shared Content sections in playbook/content/developer-guide/

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. A developer can navigate to Developer Guide sections, read usage patterns, identify anti-patterns, and view code examples.

---

## Phase 4: User Story 2 - Architect Establishing Organizational AI Standards (Priority: P2)

**Goal**: Create Architect Guide content covering model selection, context management, and governance policies that enable architects to create team-specific AI adoption policies.

**Independent Test**: An architect can use the playbook to create a team-specific AI adoption policy that includes model selection criteria, context management guidelines, and human-in-the-loop checkpoints. They can present this policy to their team with confidence.

### Implementation for User Story 2

- [x] T030 [US2] Create Architect Guide getting started section: playbook/content/architect-guide/getting-started/introduction.md
- [x] T031 [P] [US2] Create model selection strategy section explaining flash/turbo vs. high-reasoning vs. deep reasoning models in playbook/content/architect-guide/standards/model-selection.md
- [x] T032 [P] [US2] Create context management section with "Open-Tab Strategy" in playbook/content/architect-guide/standards/context-management.md
- [x] T033 [P] [US2] Create .github/copilot-instructions.md usage guide in playbook/content/architect-guide/standards/copilot-instructions.md
- [x] T034 [US2] Create governance section covering data privacy, IP protection, acceptable use policies in playbook/content/architect-guide/governance/policies.md
- [x] T035 [US2] Create human-in-the-loop checkpoints section in playbook/content/architect-guide/governance/human-oversight.md
- [x] T036 [US2] Add experience level markers to all Architect Guide sections
- [x] T037 [US2] Create cross-references from Architect Guide to Shared Content (security/compliance) in playbook/content/architect-guide/

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. An architect can navigate to Architect Guide, read model selection guidance, understand context management, and access governance policies.

---

## Phase 5: User Story 3 - Developer Learning Prompt Engineering (Priority: P3)

**Goal**: Create Prompt Engineering content covering R.I.C.E. framework, prompt templates, and before/after examples that enable developers to improve their AI interactions.

**Independent Test**: A developer can apply the R.I.C.E. framework to create a prompt for a complex refactoring task. They can identify why a vague prompt fails and rewrite it using the framework to produce better results.

### Implementation for User Story 3

- [x] T038 [US3] Create Prompt Engineering introduction section: playbook/content/shared/prompt-engineering/introduction.md
- [x] T039 [US3] Create R.I.C.E. framework section with detailed explanations in playbook/content/shared/prompt-engineering/rice-framework.md
- [x] T040 [P] [US3] Create code generation prompt template in playbook/content/shared/prompt-engineering/templates/code-generation.md
- [x] T041 [P] [US3] Create refactoring prompt template in playbook/content/shared/prompt-engineering/templates/refactoring.md
- [x] T042 [P] [US3] Create testing prompt template in playbook/content/shared/prompt-engineering/templates/testing.md
- [x] T043 [P] [US3] Create debugging prompt template in playbook/content/shared/prompt-engineering/templates/debugging.md
- [x] T044 [US3] Create "Before vs. After" prompt examples section demonstrating vague vs. high-quality prompts in playbook/content/shared/prompt-engineering/before-after-examples.md
- [x] T045 [US3] Add example usage for each prompt template in playbook/content/shared/prompt-engineering/templates/
- [x] T046 [US3] Add experience level markers to Prompt Engineering sections
- [x] T047 [US3] Create cross-references from Prompt Engineering to Developer Guide sections in playbook/content/shared/prompt-engineering/

**Checkpoint**: All user stories should now be independently functional. A developer can navigate to Prompt Engineering, learn R.I.C.E. framework, use prompt templates, and understand prompt quality through before/after examples.

---

## Phase 6: Shared Content & Additional Requirements

**Purpose**: Complete remaining functional requirements that support all user stories

- [x] T048 [P] Create Security & Compliance section covering data privacy, IP protection, vulnerability risks in playbook/content/shared/security-compliance/overview.md
- [x] T049 [P] Create AI Tools Ecosystem section covering GitHub Copilot, Agents, Spec Kit, Codespaces, Cloud Agents, Copilot CLI in playbook/content/shared/ai-tools-ecosystem/overview.md
- [x] T050 Create AI-Native SDLC workflows section covering all phases (requirements, architecture, development, testing, deployment, documentation) in playbook/content/shared/ai-native-sdlc/workflows.md
- [x] T051 Create spec-first development approach section in playbook/content/shared/ai-native-sdlc/spec-first.md
- [x] T052 Create TDD with AI section in playbook/content/shared/ai-native-sdlc/tdd-with-ai.md
- [x] T053 Create measuring success section (metrics that matter vs. metrics to avoid) in playbook/content/shared/governance/measuring-success.md
- [x] T054 [P] Create QA Guide getting started section: playbook/content/qa-guide/getting-started/introduction.md
- [x] T055 [P] Create DevOps Guide getting started section: playbook/content/devops-guide/getting-started/introduction.md
- [x] T056 Add experience level markers to all Shared Content sections
- [x] T057 Create cross-references between all role guides and shared content sections
- [x] T073 [P] Create extensibility framework section explaining how to extend playbook for tools not covered in playbook/content/shared/ai-tools-ecosystem/extensibility-framework.md
- [x] T074 [P] Create conflict resolution guidance section explaining how playbook handles conflicting best practices, prioritizing security and human oversight in playbook/content/shared/governance/conflict-resolution.md

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [x] T058 [P] Validate all internal links using markdown-link-check script
- [x] T059 [P] Lint all Markdown files using markdownlint script
- [x] T060 [P] Verify all code examples have syntax highlighting configured
- [x] T061 Verify all sections have required frontmatter (id, title, role, experience_level, workflow_stage)
- [x] T062 Verify all cross-references resolve to valid section IDs
- [x] T063 Verify all anti-patterns have risk_level (high/medium) and specific_risks
- [x] T064 Verify all prompt templates have task_type and example_usage
- [x] T065 Verify at least 5 code examples with before/after comparisons exist (SC-005)
- [x] T066 Verify at least 4 prompt templates exist (SC-006)
- [x] T067 Verify at least 3 high-risk anti-patterns documented (SC-007)
- [x] T068 Run accessibility testing using axe-core
- [x] T069 Build static site and verify no errors: npm run build in playbook/
- [x] T070 Test search functionality returns results within 2 minutes (SC-001)
- [x] T071 Configure GitHub Pages deployment workflow in .github/workflows/deploy.yml
- [x] T072 Run quickstart.md validation scenarios from specs/001-copilot-playbook/quickstart.md
- [x] T075 Verify Docusaurus config file location: docusaurus.config.js should be at playbook/ root (not in playbook/config/)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Shared Content (Phase 6)**: Can proceed in parallel with user stories once Foundational complete
- **Polish (Phase 7)**: Depends on all desired user stories and shared content being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May reference Shared Content but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May reference Developer Guide but should be independently testable

### Within Each User Story

- Content structure before detailed content
- Base sections before examples
- Examples before cross-references
- Experience level markers added during content creation
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Content sections within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members
- Shared Content sections marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all usage pattern sections for User Story 1 together:
Task: "Create code completion (ghost text) usage pattern section"
Task: "Create code generation from comments usage pattern section"
Task: "Create unit test generation usage pattern section"
Task: "Create refactoring techniques section"

# Launch all code examples for User Story 1 together:
Task: "Create Python code example showing good vs. risky pattern"
Task: "Create JavaScript/TypeScript code example showing good vs. risky pattern"
Task: "Create Java code example showing good vs. risky pattern"
Task: "Create Go code example showing good vs. risky pattern"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently using quickstart.md scenarios
5. Build and deploy if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Build/Deploy (MVP!)
3. Add User Story 2 → Test independently → Build/Deploy
4. Add User Story 3 → Test independently → Build/Deploy
5. Add Shared Content → Test cross-references → Build/Deploy
6. Polish & Validate → Final deployment
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple content creators:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Writer A: User Story 1 (Developer Guide)
   - Writer B: User Story 2 (Architect Guide)
   - Writer C: User Story 3 (Prompt Engineering)
   - Writer D: Shared Content sections
3. Stories complete and integrate independently
4. Cross-reference validation happens in Polish phase

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Content validation happens continuously during creation
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All content must include frontmatter with required metadata (id, title, role, experience_level, workflow_stage)
- Follow data-model.md schema for content structure
- Reference contracts/content-structure.md for organization requirements