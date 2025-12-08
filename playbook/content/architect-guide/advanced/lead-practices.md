---
id: architect-lead-practices
title: "Lead Architect: Multi-Team AI Governance & Strategy"
role: architect
experience_level: lead
workflow_stage: advanced
description: Strategic frameworks for lead architects coordinating AI adoption across multiple teams and establishing organization-wide standards
cross_references:
  - model-selection
  - context-management
  - governance-policies
  - human-oversight
  - senior-practices
tags:
  - lead
  - architecture
  - governance
  - multi-team
  - strategy
last_updated: 2025-12-08
---

> **Experience Level**: Lead (8-12 years)  
> **Workflow Stage**: Advanced Practices

# Lead Architect: Multi-Team AI Governance & Strategy

As a Lead Architect, you coordinate AI adoption across multiple teams, establish organization-wide standards, and drive strategic initiatives. This guide provides frameworks for scaling AI governance, managing cross-team dependencies, and building a culture of responsible AI usage.

## Prerequisites

Before implementing these multi-team strategies, you should be familiar with:
- [Senior Architect Practices](./senior-practices) - Single-team patterns
- [Model Selection Strategy](../standards/model-selection) - Technical foundations
- [Governance Policies](../governance/policies) - Policy frameworks
- [Context Management](../standards/context-management) - Organizational context

## Case Study 1: Establishing Cross-Team AI Governance

### Situation
A fintech company with 8 engineering teams (60+ engineers) across payments, lending, fraud detection, and customer service needed to adopt AI tools while maintaining strict security and compliance requirements (PCI DSS, SOC 2, GDPR).

### Challenges
- **Inconsistent Security Practices**: Each team had different approaches to code review and security scanning
- **Context Fragmentation**: No shared understanding of architectural standards or compliance requirements
- **Model Cost Explosion**: Teams using expensive models for simple tasks, budget overruns
- **Compliance Risk**: No centralized visibility into AI-generated code in production systems
- **Skill Disparity**: Wide range of AI tool proficiency across teams

### Approach: Federated Governance Model

#### Phase 1: Governance Council Formation (Weeks 1-2)

```yaml
# governance/ai-governance-council.yml

council_structure:
  steering_committee:
    members:
      - role: Lead Architect
        responsibility: Technical direction and standards
      - role: Engineering Manager
        responsibility: Team adoption and training
      - role: Security Lead
        responsibility: Security policies and compliance
      - role: Legal/Compliance
        responsibility: Regulatory requirements
    
    meeting_cadence: Weekly
    decision_authority: Policies, model selection, budget allocation
  
  working_groups:
    - name: Security & Compliance
      lead: Security Lead
      members: [Security engineers from each team]
      focus: Security review processes, vulnerability management
      
    - name: Developer Experience
      lead: Senior Developer
      members: [Developer representatives from each team]
      focus: Prompt libraries, best practices, training
      
    - name: Architecture & Standards
      lead: Lead Architect
      members: [Tech leads from each team]
      focus: Context management, model selection, technical standards
  
  champions_network:
    description: Early adopters who drive adoption within their teams
    size: 1-2 per team
    responsibilities:
      - Share best practices
      - Provide feedback on policies
      - Support team members
      - Contribute to prompt library
```

#### Phase 2: Multi-Tier Policy Framework (Weeks 3-4)

```markdown
# docs/ai-governance/policy-framework.md

## Tier 1: Universal Policies (All Teams)

### Security Non-Negotiables
1. **No Secrets in AI Context**
   - Never paste credentials, API keys, or tokens into AI tools
   - Use placeholder values in examples
   - Auto-scan commits for leaked secrets

2. **Human Review Gates**
   - Authentication/authorization code: 2 senior engineer reviews
   - Payment processing code: Security review + QA validation
   - Database migrations: DBA approval
   - Infrastructure changes: DevOps lead approval

3. **Compliance Requirements**
   - PCI DSS: No cardholder data in AI context
   - GDPR: No PII in AI prompts without anonymization
   - SOC 2: Audit trail for all AI-assisted production changes

### Model Usage Standards
- Default: GPT-4o-mini for autocomplete, simple generation
- Complex tasks: GPT-4o with explicit justification
- Deep reasoning: o1-preview with lead architect approval
- Monthly budget: $500 per engineer

## Tier 2: Domain-Specific Policies (By Team Type)

### Payments Team
```yaml
additional_requirements:
  security_level: critical
  
  mandatory_reviews:
    - payment_flow_changes: 3 senior engineers + security lead
    - api_endpoint_changes: 2 senior engineers
    - data_schema_changes: lead architect + DBA
  
  forbidden_ai_tasks:
    - generating_encryption_code: Use vetted crypto libraries only
    - payment_gateway_integration: Use official SDKs only
  
  required_testing:
    - unit_tests: 90%+ coverage
    - integration_tests: All payment flows
    - security_tests: OWASP Top 10 automated scan
    - penetration_tests: Quarterly by external firm
```

### Fraud Detection Team
```yaml
additional_requirements:
  security_level: high
  
  mandatory_reviews:
    - ml_model_changes: Data science lead + senior engineer
    - rule_engine_changes: 2 senior engineers
  
  allowed_ai_tasks:
    - feature_engineering: Encouraged with validation
    - test_data_generation: Allowed with anonymization
    - code_optimization: Allowed with benchmarking
  
  required_monitoring:
    - false_positive_rate: Track and alert
    - false_negative_rate: Track and alert
    - model_drift: Weekly analysis
```

## Tier 3: Team-Specific Guidelines (By Team)

Each team maintains their own copilot-instructions.md with:
- Team conventions (naming, patterns, frameworks)
- Service-specific security rules
- Testing requirements
- Deployment procedures
```

#### Phase 3: Centralized Context Repository (Weeks 5-6)

```
# Architecture: Hierarchical Context Inheritance

organization/
├── .github/
│   └── copilot-instructions.md          # Universal standards
├── domains/
│   ├── payments/
│   │   ├── .github/
│   │   │   └── copilot-instructions.md  # Domain standards
│   │   └── services/
│   │       ├── payment-gateway/
│   │       │   └── .github/
│   │       │       └── copilot-instructions.md  # Service-specific
│   │       └── payment-processor/
│   │           └── .github/
│   │               └── copilot-instructions.md
│   └── lending/
│       └── .github/
│           └── copilot-instructions.md
```

```markdown
# organization/.github/copilot-instructions.md (Universal)

## Universal Standards

### Security Requirements
- All API endpoints require authentication (OAuth 2.0)
- Use parameterized queries for all database operations
- Sanitize all user input using our `@company/sanitizer` package
- Encrypt PII at rest using AES-256
- Log all security-relevant events to SIEM

### Code Quality
- TypeScript strict mode required
- Minimum 80% test coverage
- Follow our ESLint configuration
- Use Prettier for formatting
- Document public APIs with JSDoc

### AI Tool Usage
- Review all AI-generated code before committing
- Use code review checklists for AI-assisted changes
- Report false positives to improve our prompt library
- Never disable security scanning for AI-generated code

## Model Selection (Organization-Wide)

| Task Type | Recommended Model | Rationale |
|-----------|-------------------|-----------|
| Autocomplete | GPT-4o-mini | Speed critical |
| Refactoring | GPT-4o | Balance speed/quality |
| Architecture | o1-preview | Deep reasoning needed |
| Security Review | o1-preview | Thorough analysis required |
```

```markdown
# domains/payments/.github/copilot-instructions.md (Domain-Specific)

Inherits from: organization/.github/copilot-instructions.md

## Payments Domain Standards

### Payment-Specific Security
- Implement idempotency for all payment operations (idempotency keys)
- Use Stripe SDK version 12.x for payment processing
- Never log credit card numbers, CVV, or full account numbers
- Implement circuit breakers for external payment gateway calls
- Require 3D Secure authentication for transactions > $1000

### Compliance Requirements
- PCI DSS Level 1 compliance mandatory
- Store card data using tokenization only
- Implement rate limiting: 100 requests per minute per user
- Retain transaction logs for 7 years (compliance requirement)

### Testing Requirements
- Mock all external payment gateway calls in tests
- Test idempotency by running operations twice
- Validate currency handling (avoid floating point)
- Test timeout and retry scenarios
```

#### Phase 4: Automated Compliance Monitoring (Weeks 7-8)

```typescript
// tools/ai-compliance-monitor/src/index.ts

interface ComplianceViolation {
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  file: string;
  line: number;
  description: string;
  remediation: string;
}

/**
 * Scans PRs for AI-generated code compliance violations
 */
export async function scanPullRequest(
  octokit: Octokit,
  owner: string,
  repo: string,
  prNumber: number
): Promise<ComplianceViolation[]> {
  const violations: ComplianceViolation[] = [];
  
  // Get PR files
  const { data: files } = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: prNumber
  });
  
  // Detect AI-generated code
  const aiFiles = files.filter(file => 
    file.patch?.includes('GitHub Copilot') ||
    file.patch?.includes('AI-generated') ||
    detectAIPatterns(file.patch)
  );
  
  for (const file of aiFiles) {
    // Check 1: Secrets detection
    const secrets = await scanForSecrets(file);
    violations.push(...secrets.map(s => ({
      severity: 'critical',
      type: 'SECRETS_DETECTED',
      file: file.filename,
      line: s.line,
      description: `Potential secret detected: ${s.type}`,
      remediation: 'Remove secret and use environment variable or secret manager'
    })));
    
    // Check 2: PII detection
    if (await containsPII(file)) {
      violations.push({
        severity: 'high',
        type: 'PII_DETECTED',
        file: file.filename,
        line: -1,
        description: 'Potential PII detected in code or comments',
        remediation: 'Remove PII or anonymize data'
      });
    }
    
    // Check 3: Payments domain checks
    if (file.filename.includes('payments/')) {
      const paymentViolations = await scanPaymentCompliance(file);
      violations.push(...paymentViolations);
    }
    
    // Check 4: Required review check
    const requiredReviewers = getRequiredReviewers(file.filename);
    const { data: reviews } = await octokit.rest.pulls.listReviews({
      owner,
      repo,
      pull_number: prNumber
    });
    
    const hasRequiredReviews = requiredReviewers.every(reviewer =>
      reviews.some(r => r.user?.login === reviewer && r.state === 'APPROVED')
    );
    
    if (!hasRequiredReviews) {
      violations.push({
        severity: 'high',
        type: 'MISSING_REQUIRED_REVIEW',
        file: file.filename,
        line: -1,
        description: `Missing required review from: ${requiredReviewers.join(', ')}`,
        remediation: 'Request review from required reviewers'
      });
    }
  }
  
  return violations;
}

/**
 * Payment-specific compliance checks
 */
async function scanPaymentCompliance(file: PRFile): Promise<ComplianceViolation[]> {
  const violations: ComplianceViolation[] = [];
  const content = file.patch || '';
  
  // Check for credit card number patterns
  const ccPattern = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/;
  if (ccPattern.test(content)) {
    violations.push({
      severity: 'critical',
      type: 'CARD_NUMBER_DETECTED',
      file: file.filename,
      line: -1,
      description: 'Potential credit card number in code',
      remediation: 'Never store or log credit card numbers. Use tokenization.'
    });
  }
  
  // Check for missing idempotency
  if (content.includes('payment') && !content.includes('idempotency')) {
    violations.push({
      severity: 'medium',
      type: 'MISSING_IDEMPOTENCY',
      file: file.filename,
      line: -1,
      description: 'Payment operation may be missing idempotency handling',
      remediation: 'Implement idempotency keys for payment operations'
    });
  }
  
  // Check for raw currency calculations (floating point risk)
  if (content.match(/\d+\.\d+\s*[\+\-\*\/]/)) {
    violations.push({
      severity: 'high',
      type: 'UNSAFE_CURRENCY_MATH',
      file: file.filename,
      line: -1,
      description: 'Floating point arithmetic detected in payment code',
      remediation: 'Use integer cents or BigDecimal for currency calculations'
    });
  }
  
  return violations;
}

// GitHub Actions integration
// .github/workflows/ai-compliance-check.yml
```

### Results

**Metrics After 6 Months:**
- **Security**: Zero AI-related security incidents
- **Compliance**: 100% passing audits (PCI DSS, SOC 2)
- **Adoption**: 85% of engineers actively using AI tools
- **Productivity**: 30% reduction in time-to-first-PR
- **Quality**: 45% fewer bugs in AI-generated code vs. baseline
- **Cost**: Within budget ($500/engineer/month average)
- **Satisfaction**: 4.5/5 from developer surveys

**Key Success Factors:**
1. **Clear governance structure** with decision-making authority
2. **Tiered policies** allowing team autonomy within guardrails
3. **Automated compliance** reducing manual review burden
4. **Champion network** driving grassroots adoption
5. **Continuous measurement** enabling data-driven iteration

### Lessons Learned

**What Worked:**
- Federated governance balanced control with autonomy
- Automated scanning caught issues early
- Champion network accelerated adoption
- Hierarchical context simplified maintenance
- Regular metrics reviews drove improvement

**What Didn't Work:**
- Initial blanket policies were too restrictive
- Top-down training without hands-on practice
- Generic prompt library (needed domain-specific prompts)
- Manual compliance checks didn't scale

**Improvements Made:**
- Relaxed policies for low-risk domains
- Switched to hands-on workshops with real code
- Built domain-specific prompt collections
- Automated all compliance checks

---

## Case Study 2: Cross-Team Context Standardization

### Situation
A SaaS company with 6 product teams found that AI tools were generating code that didn't follow organizational standards, leading to inconsistent codebases and increased technical debt.

### Challenge
Each team had evolved their own conventions over time. No shared understanding of:
- Naming conventions
- Error handling patterns
- Testing strategies
- Security practices
- Performance requirements

### Approach: Context Standardization Initiative

#### Step 1: Standards Audit

```typescript
// tools/context-analyzer/analyze-standards.ts

interface StandardsAnalysis {
  team: string;
  repo: string;
  conventions: {
    naming: NamingConvention[];
    errorHandling: ErrorPattern[];
    testing: TestingPattern[];
    security: SecurityPattern[];
  };
  divergenceScore: number; // 0-100, higher = more divergence from org baseline
}

async function analyzeTeamStandards(repos: string[]): Promise<StandardsAnalysis[]> {
  const analyses: StandardsAnalysis[] = [];
  
  for (const repo of repos) {
    // Analyze codebase patterns
    const files = await getRepoFiles(repo);
    const conventions = await extractConventions(files);
    
    // Compare against org baseline
    const divergence = calculateDivergence(conventions, orgBaseline);
    
    analyses.push({
      team: extractTeamName(repo),
      repo,
      conventions,
      divergenceScore: divergence
    });
  }
  
  // Generate report
  const report = generateConvergenceReport(analyses);
  return analyses;
}
```

**Findings:**
- 6 different error handling patterns
- 4 different naming conventions for async functions
- Inconsistent test organization
- 3 different API response formats
- Security practices ranged from excellent to concerning

#### Step 2: Standards Harmonization

```markdown
# docs/engineering-standards/unified-standards.md

## Unified Engineering Standards (Version 1.0)

### Naming Conventions

#### Functions
- **Sync functions**: `calculateTotal()`, `formatDate()`
- **Async functions**: `fetchUser()`, `saveOrder()` (not `getUserAsync`)
- **Event handlers**: `handleClick()`, `onSubmit()`
- **Boolean functions**: `isValid()`, `hasPermission()`, `canEdit()`

#### Variables
- **Constants**: `MAX_RETRY_COUNT`, `API_BASE_URL` (UPPER_SNAKE_CASE)
- **Local variables**: `userId`, `orderItems` (camelCase)
- **Private fields**: `_internalState` (prefix with underscore)
- **React components**: `UserProfile`, `OrderList` (PascalCase)

### Error Handling Standard

```typescript
// STANDARD: Use custom error classes with context

// Define error hierarchy
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', 400, context);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'AUTH_ERROR', 401, context);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'DATABASE_ERROR', 500, context);
  }
}

// STANDARD: Error handling pattern
async function processOrder(orderId: string): Promise<Order> {
  try {
    // Validate input
    if (!orderId || !isValidUUID(orderId)) {
      throw new ValidationError('Invalid order ID', { orderId });
    }
    
    // Business logic
    const order = await orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError('Order not found', { orderId });
    }
    
    // Process with specific error handling
    try {
      await paymentService.charge(order);
    } catch (error) {
      // Wrap external errors
      if (error instanceof StripeError) {
        throw new PaymentError('Payment processing failed', {
          orderId,
          stripeError: error.message
        });
      }
      throw error;
    }
    
    return order;
    
  } catch (error) {
    // Log with context
    logger.error('Order processing failed', {
      orderId,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Re-throw for upstream handling
    throw error;
  }
}
```

### Testing Standard

```typescript
// STANDARD: Test organization and naming

describe('OrderService', () => {
  // Setup and teardown
  beforeEach(async () => {
    await clearDatabase();
    await seedTestData();
  });
  
  afterEach(async () => {
    await cleanupResources();
  });
  
  describe('createOrder', () => {
    // Happy path tests
    it('should create order with valid data', async () => {
      const orderData = createValidOrderData();
      const result = await orderService.createOrder(orderData);
      
      expect(result.id).toBeDefined();
      expect(result.status).toBe('pending');
      expect(result.items).toHaveLength(orderData.items.length);
    });
    
    // Edge cases
    it('should handle empty cart', async () => {
      const orderData = { ...createValidOrderData(), items: [] };
      
      await expect(orderService.createOrder(orderData))
        .rejects
        .toThrow(ValidationError);
    });
    
    // Error cases
    it('should throw ValidationError for invalid user', async () => {
      const orderData = { ...createValidOrderData(), userId: 'invalid' };
      
      await expect(orderService.createOrder(orderData))
        .rejects
        .toThrow(ValidationError);
    });
    
    // Integration tests
    it('should integrate with payment service', async () => {
      const orderData = createValidOrderData();
      const paymentSpy = jest.spyOn(paymentService, 'initializePayment');
      
      await orderService.createOrder(orderData);
      
      expect(paymentSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: orderData.total,
          currency: 'USD'
        })
      );
    });
  });
});
```
```

#### Step 3: Organization-Wide Context Distribution

```markdown
# .github/copilot-instructions.md (Organization Root)

## Engineering Standards

This file contains organization-wide standards that ALL code must follow.
See full documentation: https://docs.company.com/engineering-standards

### Naming Conventions
[Copy from unified-standards.md]

### Error Handling
[Copy from unified-standards.md]

### Testing
[Copy from unified-standards.md]

### Security
- Use our `@company/sanitizer` package for all user input
- Validate all API inputs with Zod schemas
- Use parameterized queries for database operations
- Never log sensitive data (passwords, tokens, PII)
- Implement rate limiting on all public endpoints

### Performance
- API endpoints must respond in < 200ms (p95)
- Database queries must use indexes (no full table scans)
- Implement caching for frequently accessed data
- Use pagination for list endpoints (max 100 items per page)

### AI Tool Usage
- ALWAYS follow these standards when generating code
- If AI suggests code that violates standards, modify it before accepting
- Use our prompt library for common patterns
- Request code review for complex AI-generated code

## Prompt Examples

### Generate Function Following Standards
```
Create a function to [purpose]:

Requirements:
- Follow our naming conventions (see above)
- Use our error handling pattern (custom error classes)
- Include JSDoc documentation
- Add unit tests following our testing standard
- Handle edge cases
- Validate inputs

Return complete implementation with tests.
```
```

#### Step 4: Training & Rollout

```markdown
# rollout-plan.md

## Phase 1: Pilot (2 weeks)
- Teams: Platform team (10 engineers)
- Deliverables:
  - Updated copilot-instructions.md for platform repos
  - Migrated 5 existing modules to new standards
  - Created 20 prompt examples in library
- Success criteria:
  - 90%+ code following standards (automated check)
  - Developer satisfaction > 4/5

## Phase 2: Expansion (4 weeks)
- Teams: Add 2 product teams (15 engineers)
- Deliverables:
  - Team-specific context files
  - 50 prompt examples
  - Weekly office hours for questions
- Success criteria:
  - 85%+ code following standards
  - <10% standards violations in PRs

## Phase 3: Organization-wide (6 weeks)
- Teams: Remaining 3 product teams
- Deliverables:
  - Full prompt library (100+ examples)
  - Automated standards enforcement
  - Self-service training materials
- Success criteria:
  - 80%+ code following standards
  - <5% standards violations in PRs
  - All teams have context files
```

### Results

**Metrics After 4 Months:**
- **Code Consistency**: 87% of new code follows unified standards
- **Technical Debt**: 35% reduction in standards violations
- **Code Review Time**: 25% faster reviews (clearer expectations)
- **AI Code Quality**: 60% improvement in first-pass acceptance rate
- **Developer Experience**: 4.3/5 satisfaction (up from 3.1/5)

**Unexpected Benefits:**
- Easier onboarding (clear standards documented)
- Better cross-team collaboration (shared vocabulary)
- Faster incident response (consistent error handling)
- Improved AI suggestions (better context)

---

## Case Study 3: Model Selection Economics

### Situation
An e-commerce company saw their AI tool costs increase from $50K/month to $150K/month in 3 months as adoption grew from 30 to 100 engineers.

### Challenge
- No visibility into which models were being used for what tasks
- Engineers defaulting to most powerful (expensive) models
- Unclear ROI on different model tiers
- Budget concerns threatening continued adoption

### Approach: Data-Driven Model Optimization

#### Step 1: Usage Analysis

```typescript
// tools/model-usage-analyzer/analyze.ts

interface ModelUsageData {
  engineer: string;
  model: string;
  taskType: string;
  tokensUsed: number;
  cost: number;
  acceptanceRate: number;
  timestamp: Date;
}

async function analyzeModelUsage(
  startDate: Date,
  endDate: Date
): Promise<ModelUsageReport> {
  // Collect data from Copilot API
  const usageData = await fetchCopilotUsage(startDate, endDate);
  
  // Analyze by model
  const byModel = groupBy(usageData, 'model');
  const modelStats = Object.entries(byModel).map(([model, data]) => ({
    model,
    totalCost: sum(data.map(d => d.cost)),
    totalTokens: sum(data.map(d => d.tokensUsed)),
    avgAcceptanceRate: avg(data.map(d => d.acceptanceRate)),
    taskBreakdown: groupBy(data, 'taskType')
  }));
  
  // Find optimization opportunities
  const opportunities = findOptimizationOpportunities(modelStats);
  
  return {
    totalCost: sum(modelStats.map(m => m.totalCost)),
    costByModel: modelStats,
    optimizationOpportunities: opportunities,
    projectedSavings: calculateSavings(opportunities)
  };
}

function findOptimizationOpportunities(
  stats: ModelStats[]
): Opportunity[] {
  const opportunities: Opportunity[] = [];
  
  // Find tasks using expensive models that could use cheaper ones
  for (const model of stats) {
    if (model.model === 'o1-preview') {
      const simpleTaskUsage = model.taskBreakdown['autocomplete'] || [];
      if (simpleTaskUsage.length > 0) {
        opportunities.push({
          type: 'DOWNGRADE_MODEL',
          currentModel: 'o1-preview',
          recommendedModel: 'gpt-4o-mini',
          taskType: 'autocomplete',
          currentCost: sum(simpleTaskUsage.map(t => t.cost)),
          projectedCost: sum(simpleTaskUsage.map(t => t.cost * 0.1)), // 90% savings
          estimatedSavings: sum(simpleTaskUsage.map(t => t.cost * 0.9))
        });
      }
    }
  }
  
  return opportunities;
}
```

**Findings:**
- 40% of o1-preview usage was for simple autocomplete (should use gpt-4o-mini)
- 30% of gpt-4o usage was for documentation (could use gpt-4o-mini)
- 15% of engineers accounted for 60% of costs
- Acceptance rates varied by task, not model (hint: better prompting needed)

#### Step 2: Model Selection Policy

```yaml
# .github/copilot-instructions.md - Model Selection Policy

model_selection:
  autocomplete:
    model: gpt-4o-mini
    max_tokens: 500
    rationale: "Speed critical, simple patterns"
    
  code_generation:
    simple:
      model: gpt-4o-mini
      max_tokens: 2000
      examples:
        - CRUD endpoints
        - Simple utilities
        - Test boilerplate
    complex:
      model: gpt-4o
      max_tokens: 4000
      examples:
        - Business logic with multiple conditions
        - Integration with multiple services
        - Complex refactoring
        
  architecture_design:
    model: o1-preview
    max_tokens: 8000
    approval_required: Lead architect
    examples:
      - System design decisions
      - Database schema design
      - API contract design
      - Performance optimization strategies
      
  security_audit:
    model: o1-preview
    max_tokens: 8000
    approval_required: Security lead
    use_cases:
      - Authentication/authorization code review
      - Cryptography implementation review
      - Input validation audit
      
  documentation:
    model: gpt-4o-mini
    max_tokens: 2000
    rationale: "Lower complexity task"

# Cost Controls
budget:
  per_engineer_monthly: 500  # USD
  team_monthly: 5000  # USD
  
  alerts:
    - threshold: 80%
      action: Notify engineer and manager
    - threshold: 100%
      action: Require approval for expensive models
    - threshold: 150%
      action: Block expensive models until review
```

#### Step 3: Automated Model Enforcement

```typescript
// .github/workflows/model-usage-gate.yml via Actions

import { Octokit } from '@octokit/rest';

async function enforceModelPolicy(context: any) {
  const usage = await getCopilotUsage(context.actor);
  const budget = getEngineerBudget(context.actor);
  const utilizat = (usage.costThisMonth / budget) * 100;
  
  // Check budget utilization
  if (utilationion > 100 && context.model === 'o1-preview') {
    // Block expensive model
    await postComment(
      context.pr,
      `⚠️ Budget Alert: You've used ${utilization.toFixed(0)}% of your monthly budget.
      
      Access to \`o1-preview\` is temporarily restricted.
      You can still use:
      - \`gpt-4o-mini\` for autocomplete and simple tasks
      - \`gpt-4o\` for complex tasks
      
      Request approval from your lead architect for \`o1-preview\` access if needed.`
    );
    return false;
  }
  
  // Send warning at 80%
  if (utilization > 80 && utilization <= 100) {
    await postComment(
      context.pr,
      `📊 Budget Update: You've used ${utilization.toFixed(0)}% of your monthly budget ($${usage.costThisMonth.toFixed(2)}/$${budget}).
      
      Consider:
      - Using \`gpt-4o-mini\` for simpler tasks
      - Being selective with \`o1-preview\` usage
      - Reviewing your model selection patterns`
    );
  }
  
  return true;
}
```

### Results

**Metrics After 3 Months:**
- **Cost Reduction**: $150K/month → $95K/month (37% reduction)
- **Engineer Growth**: 100 → 120 engineers (20% increase)
- **Cost per Engineer**: $1500 → $792 (47% reduction)
- **Productivity**: No decrease (maintained 30% faster PRs)
- **Satisfaction**: 4.4/5 (engineers appreciated cost awareness)

**Key Optimizations:**
1. **Autocomplete Savings**: $40K/month by switching to gpt-4o-mini
2. **Documentation Savings**: $10K/month by downgrading model
3. **Better Prompting**: 15% fewer retries with improved prompts
4. **Budget Awareness**: Engineers self-optimized when shown costs

---

## Strategic Framework: The AI Governance Pyramid

```
                    /\
                   /  \
                  /    \
                 /      \
                /________\
               / Strategy \
              /____________\
             /   Policies   \
            /________________\
           /    Processes     \
          /____________________\
         /       Tooling        \
        /________________________\
       /        Culture          \
      /____________________________\
     
Level 5: Strategy
- Organization-wide vision
- Executive sponsorship
- Budget allocation
- Success metrics

Level 4: Policies
- Security requirements
- Compliance rules
- Model selection standards
- Budget limits

Level 3: Processes
- Code review workflows
- Training programs
- Incident response
- Continuous improvement

Level 2: Tooling
- Automated scanning
- Metrics dashboards
- Prompt libraries
- Context management

Level 1: Culture
- Champion network
- Community of practice
- Knowledge sharing
- Psychological safety
```

### Implementing the Pyramid

Start from the bottom and build up:

**Month 1-2: Culture**
- Identify champions
- Create safe experimentation space
- Share early wins
- Build community

**Month 3-4: Tooling**
- Set up automated scanning
- Create prompt library
- Implement metrics collection
- Build context management

**Month 5-6: Processes**
- Define code review workflows
- Create training materials
- Establish incident response
- Set up feedback loops

**Month 7-8: Policies**
- Document security requirements
- Define model selection rules
- Set budget limits
- Create compliance checklist

**Month 9-10: Strategy**
- Present to executives
- Set organization-wide goals
- Allocate budget
- Define success metrics

---

## Next Steps

### Immediate Actions for Lead Architects
1. **Assess Current State**: Map your organization using the pyramid framework
2. **Form Governance Council**: Establish decision-making structure
3. **Start Metrics Collection**: Implement usage and quality tracking
4. **Create Pilot Program**: Start with one team, prove value, then scale

### Continued Learning
- Review [Principal Practices](./principal-practices) for organization-wide strategy
- Study [Security & Compliance](../../shared/security-compliance/overview) for regulatory requirements
- Explore [Senior Practices](./senior-practices) for foundational patterns
- Reference [Developer Lead Practices](../../developer-guide/advanced/lead-practices) for technical depth

### Community Engagement
- Share your governance frameworks
- Contribute case studies
- Mentor other lead architects
- Participate in cross-company AI governance forums

---

## Related Resources

- [Senior Architect Practices](./senior-practices) - Single-team foundations
- [Principal Practices](./principal-practices) - Organization-wide strategy
- [Developer Lead Practices](../../developer-guide/advanced/lead-practices) - Engineering perspective
- [Model Selection](../standards/model-selection) - Technical details
- [Governance Policies](../governance/policies) - Policy templates
