---
id: human-oversight
title: Human-in-the-Loop Checkpoints
role: architect
experience_level: intermediate
workflow_stage: governance
description: Define mandatory human oversight checkpoints for AI-generated code
cross_references:
  - governance-policies
  - anti-patterns
tags:
  - governance
  - human-oversight
  - security
last_updated: 2025-12-06
---

> **Experience Level**: Intermediate  
> **Workflow Stage**: Governance

# Human-in-the-Loop Checkpoints

Human oversight is **non-negotiable** at critical checkpoints. This section defines mandatory review requirements for AI-generated code.

## Core Principle

**AI tools are assistants, not replacements for human judgment.** Critical decisions and security-sensitive code require mandatory human review.

## Mandatory Checkpoints

### 1. Security-Sensitive Code

**What Requires Review**:
- Authentication and authorization logic
- Password hashing and validation
- Input validation and sanitization
- SQL query construction
- API key and secret handling
- Encryption and decryption
- Session management

**Review Requirements**:
- Security team approval (for high-risk)
- Senior developer review (for medium-risk)
- Security-focused code review checklist
- Penetration testing (for critical systems)

**Example Checklist**:
```markdown
- [ ] No hardcoded secrets
- [ ] Input validation implemented
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output sanitization)
- [ ] Authentication properly implemented
- [ ] Authorization checks in place
- [ ] Error messages don't leak sensitive info
- [ ] Rate limiting implemented
```

### 2. Architectural Decisions

**What Requires Review**:
- System architecture changes
- Database schema design
- API design and contracts
- Technology stack decisions
- Integration patterns
- Performance-critical design

**Review Requirements**:
- Architect approval
- Design review session
- Documentation of rationale
- Impact analysis

**Example Process**:
1. Document proposed architecture
2. Present to architecture review board
3. Get approval before implementation
4. Document decision and rationale
5. Update architecture documentation

### 3. Production Deployments

**What Requires Review**:
- All production code changes
- Database migrations
- Configuration changes
- Infrastructure changes
- Dependency updates

**Review Requirements**:
- Code review by peer
- QA testing and approval
- Deployment plan review
- Rollback plan documented

**Example Checklist**:
```markdown
- [ ] Code reviewed by at least one peer
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance testing done
- [ ] Rollback plan documented
- [ ] Monitoring and alerts configured
- [ ] Documentation updated
```

### 4. Customer-Facing Features

**What Requires Review**:
- User interface changes
- API endpoint changes
- Data processing logic
- Business rule implementation
- User data handling

**Review Requirements**:
- Product owner approval
- UX review (for UI changes)
- Legal/compliance review (for data handling)
- QA testing
- User acceptance testing

### 5. Compliance-Critical Code

**What Requires Review**:
- GDPR compliance (data handling)
- HIPAA compliance (health data)
- PCI DSS compliance (payment data)
- SOX compliance (financial data)
- Industry-specific regulations

**Review Requirements**:
- Compliance team review
- Legal review
- Audit trail documentation
- Regular compliance audits

## Review Process

### Standard Review Flow

```
1. Developer creates code (with AI assistance)
   ↓
2. Self-review (developer reviews own code)
   ↓
3. Peer code review
   ↓
4. Security review (if applicable)
   ↓
5. QA testing
   ↓
6. Approval and merge
   ↓
7. Production deployment
```

### Expedited Review (Low Risk)

For low-risk changes (documentation, non-critical fixes):

```
1. Developer creates code
   ↓
2. Self-review
   ↓
3. Automated testing
   ↓
4. Approval and merge
```

### Enhanced Review (High Risk)

For high-risk changes (security, architecture, compliance):

```
1. Developer creates code
   ↓
2. Self-review
   ↓
3. Security team review
   ↓
4. Architecture review
   ↓
5. Compliance review (if applicable)
   ↓
6. Peer code review
   ↓
7. QA testing
   ↓
8. Leadership approval
   ↓
9. Production deployment
```

## Review Checklist Template

### Code Review Checklist

```markdown
## Code Review Checklist

### Functionality
- [ ] Code implements requirements correctly
- [ ] Edge cases handled
- [ ] Error handling implemented
- [ ] Tests written and passing

### Security
- [ ] No hardcoded secrets
- [ ] Input validation in place
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] Authentication/authorization correct

### Code Quality
- [ ] Follows coding standards
- [ ] No code duplication
- [ ] Proper error messages
- [ ] Logging implemented
- [ ] Documentation updated

### Performance
- [ ] No obvious performance issues
- [ ] Database queries optimized
- [ ] Caching used where appropriate
- [ ] Resource cleanup handled

### AI-Generated Code Specific
- [ ] All AI suggestions reviewed
- [ ] Logic understood by reviewer
- [ ] No blind acceptance
- [ ] Test assertions verified
```

## Anti-Patterns to Avoid

### ❌ The Blind Review

**What**: Approving code without reading it

**Why It's Dangerous**: Security vulnerabilities, bugs, and logic errors slip through

**How to Avoid**: Always read the code, understand the logic, verify tests

### ❌ The Rubber Stamp

**What**: Approving because "AI generated it, so it must be good"

**Why It's Dangerous**: AI can make mistakes, especially in complex logic

**How to Avoid**: Treat AI-generated code like any other code - review thoroughly

### ❌ Skipping Security Review

**What**: Approving security-sensitive code without security team review

**Why It's Dangerous**: Security vulnerabilities may not be obvious to developers

**How to Avoid**: Always involve security team for authentication, authorization, data handling

## Implementation Guidelines

### For Your Team

1. **Define Checkpoints**: List mandatory review points for your organization
2. **Create Checklists**: Develop review checklists for each checkpoint type
3. **Assign Roles**: Define who reviews what (security team, architects, etc.)
4. **Automate Where Possible**: Use automated tools for scanning, testing
5. **Document Process**: Make review process clear and accessible
6. **Train Team**: Ensure everyone understands review requirements

### Tools and Automation

**Automated Checks** (can't replace human review, but help):
- Static code analysis (SonarQube, CodeQL)
- Security scanning (Snyk, Dependabot)
- Automated testing (unit, integration, e2e)
- Linting and formatting

**Human Review** (mandatory for checkpoints):
- Code review (GitHub PRs, GitLab MRs)
- Security review (security team)
- Architecture review (architects)
- Compliance review (compliance team)

## Related Content

- [Governance Policies](./governance-policies) - Policy templates
- [Anti-Patterns](../../developer-guide/daily-usage/anti-patterns) - What to avoid
- [Security & Compliance](../../shared/security-compliance/security-compliance-overview) - Security guidance


