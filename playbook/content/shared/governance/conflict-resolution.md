---
id: conflict-resolution
title: Conflict Resolution
role: shared
experience_level: intermediate
workflow_stage: governance
description: How to handle conflicts between playbook recommendations and organizational policies
cross_references:
  - governance-policies
tags:
  - governance
  - conflict-resolution
  - policies
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Governance

> **Experience Level**: Intermediate  
> **Workflow Stage**: Governance

# Conflict Resolution

When playbook recommendations conflict with organizational policies, organizational policies take precedence. This section provides guidance on resolving conflicts.

## Core Principle

**Organizational policies always take precedence over playbook recommendations.**

The playbook provides general best practices, but your organization's specific requirements, regulations, and constraints must be followed.

## Common Conflict Scenarios

### Scenario 1: Secret Management

**Playbook Recommendation**: Use environment variables for secrets

**Organizational Policy**: Must use HashiCorp Vault

**Resolution**:
- Follow organizational policy (HashiCorp Vault)
- Adapt playbook guidance to fit policy
- Document the adaptation
- Update team documentation

**Example**:
```markdown
## Secret Management

**Organizational Requirement**: All secrets must use HashiCorp Vault

**Adapted from Playbook**: 
- Playbook recommends environment variables
- We use Vault for all secrets (organizational requirement)
- Same principle: Never hardcode secrets
```

### Scenario 2: Code Review Requirements

**Playbook Recommendation**: Peer code review for all changes

**Organizational Policy**: Security team review required for all AI-generated code

**Resolution**:
- Follow organizational policy (security team review)
- Add security review to workflow
- Document the enhanced process
- Maintain playbook principles (human oversight)

### Scenario 3: Testing Requirements

**Playbook Recommendation**: 80% test coverage target

**Organizational Policy**: 90% test coverage required

**Resolution**:
- Follow organizational policy (90% coverage)
- Use playbook guidance for test generation
- Maintain playbook principles (verify assertions)
- Document the higher standard

## Resolution Process

### Step 1: Identify the Conflict

**Questions to Ask**:
- What does the playbook recommend?
- What does organizational policy require?
- Where do they conflict?
- What's the rationale for the policy?

### Step 2: Understand the Rationale

**Understand Why**:
- Why does the policy exist?
- What problem does it solve?
- What are the constraints?
- What are the risks?

### Step 3: Adapt Playbook Guidance

**Adapt, Don't Ignore**:
- Keep playbook principles
- Adapt implementation to policy
- Maintain best practices
- Document the adaptation

### Step 4: Document the Resolution

**Document**:
- The conflict identified
- Organizational requirement
- How playbook guidance was adapted
- Rationale for the decision

### Step 5: Communicate to Team

**Share**:
- Updated guidelines
- Rationale for decisions
- How to follow both
- Where to find documentation

## Prioritization Framework

### Priority Order

1. **Legal/Regulatory Requirements** (Highest)
   - GDPR, HIPAA, PCI DSS
   - Industry regulations
   - Legal obligations

2. **Organizational Security Policies**
   - Security standards
   - Compliance requirements
   - Risk management

3. **Organizational Standards**
   - Coding standards
   - Architecture patterns
   - Technology choices

4. **Playbook Recommendations**
   - Best practices
   - General guidance
   - Suggested patterns

### Decision Matrix

| Conflict Type | Priority | Action |
|--------------|----------|--------|
| Legal/Regulatory | Highest | Follow regulation, adapt playbook |
| Security Policy | High | Follow policy, adapt playbook |
| Org Standards | Medium | Follow standards, adapt playbook |
| Playbook vs. Preference | Low | Team decision, document choice |

## Examples

### Example 1: Data Privacy

**Conflict**: Playbook says "use environment variables" but organization requires encrypted secret storage

**Resolution**:
- Use encrypted secret storage (organizational requirement)
- Maintain playbook principle: Never hardcode secrets
- Document: "We use [encrypted storage] instead of environment variables per organizational policy"

### Example 2: Testing Framework

**Conflict**: Playbook examples use Jest, but organization uses Mocha

**Resolution**:
- Use Mocha (organizational standard)
- Apply playbook testing principles
- Adapt examples to Mocha syntax
- Document the framework choice

### Example 3: Deployment Process

**Conflict**: Playbook recommends automated deployment, but organization requires manual approval

**Resolution**:
- Follow manual approval process (organizational requirement)
- Use playbook guidance for deployment scripts
- Maintain playbook principles: Review before deploy
- Document the enhanced process

## Best Practices

### Do's

✅ **Always follow organizational policies**
- Policies take precedence
- Adapt playbook to fit
- Document adaptations

✅ **Maintain playbook principles**
- Keep core principles
- Adapt implementation
- Don't abandon best practices

✅ **Document conflicts and resolutions**
- Record the conflict
- Document the resolution
- Explain the rationale
- Update team docs

### Don'ts

❌ **Don't ignore organizational policies**
- Always follow policies
- Don't use playbook as excuse
- Don't bypass requirements

❌ **Don't abandon playbook principles**
- Keep best practices
- Adapt, don't ignore
- Maintain quality standards

❌ **Don't create confusion**
- Document clearly
- Communicate changes
- Provide guidance

## Template for Documenting Conflicts

```markdown
## Conflict Resolution: [Topic]

### Conflict
- **Playbook Recommendation**: [What playbook says]
- **Organizational Policy**: [What policy requires]
- **Conflict**: [Where they differ]

### Resolution
- **Decision**: [What we will do]
- **Rationale**: [Why this decision]
- **Adaptation**: [How playbook guidance was adapted]

### Implementation
- **Process**: [How to follow both]
- **Documentation**: [Where to find details]
- **Exceptions**: [Any exceptions]
```

## Related Content

- [Governance Policies](../../architect-guide/governance/governance-policies) - Policy templates
- [Human Oversight](../../architect-guide/governance/human-oversight) - Review requirements

