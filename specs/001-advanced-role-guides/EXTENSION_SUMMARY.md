# Extension Summary: Product & Design Role Guides

**Date**: 2025-12-08  
**Status**: Planning Complete  
**Feature**: Extended Advanced Role Documentation

## Overview

This document summarizes the extension of the Advanced Role Documentation feature to include 4 new role guides for product and design professionals, bringing the total from 4 to 8 role guides.

## New Roles Added

### Product Roles (2)
1. **Product Owner Guide** - Focus on backlog management, user story generation, stakeholder communication
2. **Product Manager Guide** - Focus on product strategy, market research, feature prioritization

### Design Roles (2)
3. **UI Designer Guide** - Focus on visual design, design systems, accessibility
4. **UX Designer Guide** - Focus on user research, journey mapping, usability testing

## Key Differences from Technical Roles

### Content Focus
- **Technical Roles** (Developer, Architect, QA, DevOps): Code examples, technical patterns, GitHub Copilot
- **Product/Design Roles**: Domain-specific examples, NO code, various AI tools (ChatGPT, Claude, Figma AI, etc.)

### AI Tools Used
**Product Owner & Product Manager**:
- ChatGPT, Claude, Gemini for text generation and analysis
- Use cases: User stories, market research, competitive analysis

**UI Designer**:
- Figma AI for design system generation
- Midjourney/DALL-E for visual exploration
- ChatGPT/Claude for documentation

**UX Designer**:
- ChatGPT/Claude for research synthesis
- Miro AI/FigJam AI for journey mapping
- Various research analysis tools

### Example Types
**Senior Level**:
- Technical roles: Code examples with prompts
- Product/Design roles: Domain examples (user stories, personas, design patterns) with prompts

**Lead Level**:
- All roles: Team-scale case studies in S.A.R. format

**Principal Level**:
- All roles: Strategic frameworks for organizational governance

## Updated Documents

### Planning Documents
1. **plan.md** - Extended to cover 8 roles (24 documents total)
2. **spec.md** - Already included 8 roles (no changes needed)
3. **data-model.md** - Added Domain Example entity, extended Role Guide entity
4. **research.md** - Added Decision 7 on AI tool selection for non-technical roles
5. **quickstart.md** - Extended with product/design role guidance

### Contract Templates
1. **frontmatter-schema.yaml** - Extended role enum to 8 values, added examples
2. **senior-practices-product-design-template.md** - NEW template for product/design senior docs

### Existing Templates (Reusable)
- **lead-practices-template.md** - Can be adapted for product/design roles
- **principal-practices-template.md** - Can be adapted for product/design roles
- **senior-practices-template.md** - For technical roles only

## Implementation Guidance

### Directory Structure
```
playbook/content/
├── product-owner-guide/advanced/
│   ├── senior-practices.md
│   ├── lead-practices.md
│   └── principal-practices.md
├── product-manager-guide/advanced/
│   ├── senior-practices.md
│   ├── lead-practices.md
│   └── principal-practices.md
├── ui-designer-guide/advanced/
│   ├── senior-practices.md
│   ├── lead-practices.md
│   └── principal-practices.md
└── ux-designer-guide/advanced/
    ├── senior-practices.md
    ├── lead-practices.md
    └── principal-practices.md
```

### Content Requirements

#### Product Owner Examples
- AI-assisted backlog grooming
- User story generation from requirements
- Sprint planning optimization
- Stakeholder communication templates

#### Product Manager Examples
- Market research synthesis
- Competitive analysis with AI
- Feature prioritization using data
- Go-to-market strategy development

#### UI Designer Examples
- Design system component variations
- Responsive layout exploration
- Accessibility compliance patterns
- Visual design concept exploration

#### UX Designer Examples
- User journey map generation
- Persona creation from research data
- Usability test plan templates
- Research synthesis and insights

## Validation Checklist

For each product/design role document:
- [ ] Uses appropriate AI tools (NOT GitHub Copilot)
- [ ] NO code examples (use domain-specific artifacts)
- [ ] Shows actual prompts and AI tool usage
- [ ] Demonstrates human refinement process
- [ ] Includes role-specific metrics
- [ ] Cross-references appropriate related roles
- [ ] Follows frontmatter schema (8 role values)
- [ ] 1500-4000 words depending on level

## Cross-References

### Within Product/Design Roles
- Product Owner ↔ Product Manager (strategy alignment)
- UI Designer ↔ UX Designer (design collaboration)

### To Technical Roles
- Product roles → Developer/Architect (implementation collaboration)
- Design roles → Developer (design system implementation)
- All roles → shared resources (security, governance)

## Success Metrics

### Scope Achievement
- ✅ 24 documents total (3 levels × 8 roles)
- ✅ 8 role guides with consistent structure
- ✅ Product/design roles have non-code examples
- ✅ All roles use experience-level differentiation

### Quality Standards
- Each senior doc: 3-5 domain-specific examples
- Each lead doc: 3-5 S.A.R. format case studies
- Each principal doc: Strategic frameworks with criteria
- All docs: 2+ cross-references, valid frontmatter

## Implementation Notes

### Author Expertise Required
- Product Owner/Manager authors: 5-12+ years product experience
- UI/UX Designer authors: 5-12+ years design experience
- Familiarity with AI tools used in their domain

### AI Tool Evolution
- Product/design roles use rapidly evolving AI tools
- Include tool name in examples (e.g., "ChatGPT-4", "Claude 3")
- Emphasize prompting techniques over specific tool features
- Plan for quarterly reviews to update tool references

### Terminology
- Avoid "code" terminology in product/design docs
- Use domain-appropriate language:
  - Product: backlog, user stories, acceptance criteria, sprint
  - Design: wireframes, prototypes, design systems, research synthesis

## Next Steps

1. **Content Creation**: Authors create 12 new documents for product/design roles
2. **Review Process**: Peer review for domain accuracy and AI tool usage
3. **Integration**: Add cross-references to/from technical role guides
4. **Validation**: Check all frontmatter, cross-references, and AI tool examples
5. **Publication**: Merge to main branch

## References

- Full spec: `specs/001-advanced-role-guides/spec.md`
- Data model: `specs/001-advanced-role-guides/data-model.md`
- Research decisions: `specs/001-advanced-role-guides/research.md`
- Implementation guide: `specs/001-advanced-role-guides/quickstart.md`
- Product/design template: `specs/001-advanced-role-guides/contracts/senior-practices-product-design-template.md`
