# GitHub Copilot Engineering Lead Guide

A comprehensive guide for Engineering Leads to leverage GitHub Copilot for architecture decisions, code quality, team productivity, and technical leadership.

## Table of Contents

- [Overview](#overview)
- [Architecture & Design](#architecture--design)
- [Code Quality & Standards](#code-quality--standards)
- [Team Productivity](#team-productivity)
- [Technical Debt Management](#technical-debt-management)
- [Security & Compliance](#security--compliance)
- [Real-World Scenarios](#real-world-scenarios)
- [Customizations & Tips](#customizations--tips)

## Overview

As an Engineering Lead, GitHub Copilot helps you:

- **Design robust architectures**: Generate and evaluate design options
- **Maintain code quality**: Establish and enforce coding standards
- **Improve team productivity**: Optimize workflows and reduce friction
- **Manage technical debt**: Identify and prioritize remediation
- **Ensure security**: Review code for vulnerabilities and compliance

## Architecture & Design

### Generating Architecture Decision Records (ADRs)

```
@workspace "Create an ADR for choosing a message queue system:
Context: Need async processing for order fulfillment
Options: RabbitMQ, Apache Kafka, AWS SQS
Constraints: Must handle 10K messages/sec, team has AWS experience
Include trade-offs and recommendation"
```

**Copilot generates**:

```markdown
# ADR-015: Message Queue System Selection

## Status
Proposed

## Context

Our order fulfillment system needs asynchronous processing to:
- Decouple order creation from inventory updates
- Handle payment processing without blocking user requests
- Enable event-driven notifications to customers
- Support future event sourcing requirements

**Requirements:**
- Throughput: 10,000 messages/second minimum
- Latency: < 100ms p99 for message delivery
- Durability: Messages must survive system failures
- Team skills: Strong AWS experience

## Options Considered

### Option 1: RabbitMQ

| Aspect | Details |
|--------|---------|
| **Pros** | Mature, flexible routing, AMQP standard |
| **Cons** | Requires self-management, scaling complexity |
| **Throughput** | ~50K msg/sec (sufficient) |
| **Team effort** | High - new technology to learn |

### Option 2: Apache Kafka

| Aspect | Details |
|--------|---------|
| **Pros** | Highest throughput, event sourcing ready, replay capability |
| **Cons** | Operational complexity, overkill for current scale |
| **Throughput** | ~1M msg/sec (far exceeds need) |
| **Team effort** | Very High - steep learning curve |

### Option 3: AWS SQS + SNS

| Aspect | Details |
|--------|---------|
| **Pros** | Fully managed, integrates with AWS ecosystem, familiar to team |
| **Cons** | Vendor lock-in, less flexible routing than RabbitMQ |
| **Throughput** | ~100K msg/sec with batching (sufficient) |
| **Team effort** | Low - team already uses AWS |

## Decision

**Recommended: AWS SQS + SNS**

## Rationale

1. **Team Productivity**: Leverages existing AWS expertise, minimal ramp-up
2. **Operational Simplicity**: Fully managed = zero infrastructure burden
3. **Cost Efficiency**: Pay-per-use model fits current scale
4. **Scalability Path**: Can migrate to Kafka later if event sourcing needed
5. **Integration**: Native integration with Lambda, ECS, and existing services

## Consequences

### Positive
- Faster time-to-implementation (est. 2 weeks)
- Lower operational overhead
- Built-in monitoring via CloudWatch
- Automatic scaling

### Negative
- AWS vendor lock-in increases
- Less flexibility for complex routing scenarios
- Future migration to Kafka would require significant effort

### Mitigations
- Abstract queue interface to enable future migration
- Document AWS-specific implementations clearly
- Review decision in 12 months based on scale growth

## Related Decisions
- ADR-012: AWS as Primary Cloud Provider
- ADR-008: Microservices Architecture
```

### System Design Reviews

```
@workspace "Review this microservices architecture for a payment processing system:
- Order Service → Payment Service → Notification Service
- Each service has its own database
- Communication via REST API
Identify potential issues and suggest improvements"
```

**Copilot analyzes**:

```markdown
## Architecture Review: Payment Processing System

### Current Architecture
```
Order Service ──REST──► Payment Service ──REST──► Notification Service
     │                        │                         │
     ▼                        ▼                         ▼
 Order DB              Payment DB               Notification DB
```

### Issues Identified

#### 🔴 Critical Issues

**1. Synchronous Payment Processing**
- **Problem**: REST calls create tight coupling; if Payment Service is slow, Order Service blocks
- **Impact**: Poor user experience, cascade failures possible
- **Fix**: Use async messaging for payment initiation

**2. No Compensation Logic (Saga Pattern Missing)**
- **Problem**: If notification fails after payment succeeds, system is inconsistent
- **Impact**: Customer charged but not notified
- **Fix**: Implement Saga pattern with compensating transactions

**3. Missing Idempotency**
- **Problem**: Network retries could result in double payments
- **Impact**: Financial loss, customer complaints
- **Fix**: Add idempotency keys to all payment operations

#### 🟡 Moderate Issues

**4. Single Points of Failure**
- **Problem**: Each service is single instance (assumed)
- **Fix**: Add load balancing, multiple replicas

**5. No Circuit Breaker**
- **Problem**: Failures cascade through the chain
- **Fix**: Implement circuit breaker pattern (Hystrix, Resilience4j)

**6. Missing API Gateway**
- **Problem**: Direct service-to-service calls expose internal details
- **Fix**: Add API Gateway for routing, auth, rate limiting

### Recommended Architecture

```
                    API Gateway
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   Order Service   Payment Service  Notification Service
        │               │               │
        └───────► Message Queue ◄───────┘
        │               │               │
        ▼               ▼               ▼
    Order DB       Payment DB     Notification DB
```

### Key Changes

1. **Async Communication**: Event-driven via message queue
2. **Saga Orchestrator**: Manages distributed transactions
3. **Circuit Breakers**: Prevent cascade failures
4. **Idempotency**: Built into all payment operations
5. **API Gateway**: Single entry point with auth/rate limiting

### Implementation Priority

| Change | Effort | Impact | Priority |
|--------|--------|--------|----------|
| Idempotency keys | Low | Critical | P0 |
| Async messaging | Medium | High | P1 |
| Circuit breakers | Low | High | P1 |
| Saga pattern | High | Critical | P2 |
| API Gateway | Medium | Medium | P3 |
```

### Tech Stack Evaluation

```
@workspace "Evaluate tech stack options for a new microservices project:
Team size: 8 engineers (5 backend, 2 frontend, 1 devops)
Team skills: Java, Python, basic Go
Requirements: High performance, easy hiring, long-term maintainability
Compare: Java/Spring Boot, Node.js/NestJS, Go/Gin"
```

**Copilot evaluates**:

```markdown
## Tech Stack Evaluation

### Evaluation Criteria (Weighted)

| Criterion | Weight | Rationale |
|-----------|--------|-----------|
| Team productivity | 30% | Current skills leverage |
| Performance | 25% | Business requirement |
| Hiring market | 20% | Team growth capability |
| Maintainability | 15% | Long-term health |
| Ecosystem | 10% | Library/tool availability |

### Option Analysis

#### Java/Spring Boot

| Criterion | Score (1-5) | Weighted | Notes |
|-----------|-------------|----------|-------|
| Team productivity | 5 | 1.5 | 5 devs already skilled |
| Performance | 4 | 1.0 | Good with tuning |
| Hiring market | 5 | 1.0 | Large talent pool |
| Maintainability | 5 | 0.75 | Strong typing, mature |
| Ecosystem | 5 | 0.5 | Excellent libraries |
| **Total** | - | **4.75** | |

#### Node.js/NestJS

| Criterion | Score (1-5) | Weighted | Notes |
|-----------|-------------|----------|-------|
| Team productivity | 3 | 0.9 | Learning curve for backend |
| Performance | 3 | 0.75 | Good for I/O, less for CPU |
| Hiring market | 4 | 0.8 | Good availability |
| Maintainability | 4 | 0.6 | TS helps, JS ecosystem chaos |
| Ecosystem | 4 | 0.4 | npm packages vary in quality |
| **Total** | - | **3.45** | |

#### Go/Gin

| Criterion | Score (1-5) | Weighted | Notes |
|-----------|-------------|----------|-------|
| Team productivity | 2 | 0.6 | Only basic Go skills |
| Performance | 5 | 1.25 | Excellent performance |
| Hiring market | 3 | 0.6 | Growing but smaller pool |
| Maintainability | 4 | 0.6 | Simple language, clear code |
| Ecosystem | 3 | 0.3 | Maturing ecosystem |
| **Total** | - | **3.35** | |

### Recommendation

**Java/Spring Boot** - Score: 4.75/5

**Rationale:**
1. Immediate productivity - team already proficient
2. Strong hiring market for growth
3. Enterprise-grade ecosystem (Spring Cloud, security, etc.)
4. Performance meets requirements with proper tuning
5. Excellent long-term maintainability

**Alternative path for future:**
- Consider Go for specific high-performance services
- Invest in Go training for 1-2 team members
- Re-evaluate in 12 months as team grows
```

## Code Quality & Standards

### Creating Coding Standards

```
@workspace "Create coding standards document for our TypeScript backend:
- Framework: NestJS
- Testing: Jest
- Database: PostgreSQL with Prisma
Include: naming conventions, error handling, logging, testing requirements"
```

**Copilot generates**:

```markdown
# TypeScript Backend Coding Standards

## Table of Contents
1. [Naming Conventions](#naming-conventions)
2. [Code Organization](#code-organization)
3. [Error Handling](#error-handling)
4. [Logging](#logging)
5. [Testing Requirements](#testing-requirements)
6. [Database Conventions](#database-conventions)

---

## Naming Conventions

### Files & Directories
```
src/
├── modules/
│   └── users/
│       ├── users.controller.ts    # PascalCase.type.ts
│       ├── users.service.ts
│       ├── users.module.ts
│       ├── dto/
│       │   ├── create-user.dto.ts # kebab-case.dto.ts
│       │   └── update-user.dto.ts
│       └── entities/
│           └── user.entity.ts      # singular.entity.ts
```

### Classes & Interfaces
```typescript
// Classes: PascalCase with descriptive suffixes
class UserService {}
class CreateUserDto {}
class UserNotFoundException extends HttpException {}

// Interfaces: PascalCase, prefix with 'I' for contracts
interface IUserRepository {}
interface IPaymentGateway {}

// Types: PascalCase, no prefix
type UserRole = 'admin' | 'user' | 'guest';
type CreateUserInput = Omit<User, 'id' | 'createdAt'>;
```

### Variables & Functions
```typescript
// camelCase for variables and functions
const userId = '123';
const isActive = true;
function getUserById(id: string): Promise<User> {}

// SCREAMING_SNAKE_CASE for constants
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 20;

// Boolean prefixes: is, has, can, should
const isValid = true;
const hasPermission = false;
const canDelete = user.role === 'admin';
```

---

## Code Organization

### Module Structure
```typescript
// users.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommonModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
  exports: [UsersService],
})
export class UsersModule {}
```

### Service Layer Pattern
```typescript
// users.service.ts
@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly logger: LoggerService,
  ) {}

  async findById(id: string): Promise<User> {
    this.logger.debug(`Finding user by id: ${id}`);
    
    const user = await this.userRepository.findOne(id);
    
    if (!user) {
      throw new UserNotFoundException(id);
    }
    
    return user;
  }
}
```

---

## Error Handling

### Custom Exceptions
```typescript
// exceptions/user-not-found.exception.ts
export class UserNotFoundException extends HttpException {
  constructor(userId: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'UserNotFound',
        message: `User with id ${userId} not found`,
        code: 'USER_001',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
```

### Global Exception Filter
```typescript
// filters/global-exception.filter.ts
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const { status, body } = this.formatException(exception);
    
    this.logger.error('Unhandled exception', { exception, body });
    
    response.status(status).json(body);
  }
}
```

### Error Response Format
```typescript
// All error responses follow this structure
interface ErrorResponse {
  statusCode: number;
  error: string;      // Error type name
  message: string;    // Human-readable message
  code: string;       // Machine-readable code (e.g., USER_001)
  timestamp: string;  // ISO 8601
  path: string;       // Request path
  details?: object;   // Optional additional context
}
```

---

## Logging

### Log Levels
```typescript
// Use appropriate log levels
logger.error()  // Errors requiring immediate attention
logger.warn()   // Potential issues, recoverable errors
logger.log()    // Important business events
logger.debug()  // Detailed debugging info
logger.verbose() // Very detailed tracing
```

### Structured Logging
```typescript
// Always use structured logging with context
this.logger.log('User created', {
  userId: user.id,
  email: user.email,
  action: 'CREATE_USER',
  duration: elapsedMs,
});

// Never log sensitive data
// ❌ BAD
this.logger.log('Login attempt', { password: user.password });

// ✅ GOOD
this.logger.log('Login attempt', { email: user.email, success: true });
```

---

## Testing Requirements

### Coverage Thresholds
```json
// jest.config.js
{
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

### Test Structure
```typescript
// users.service.spec.ts
describe('UsersService', () => {
  let service: UsersService;
  let repository: MockType<IUserRepository>;

  beforeEach(async () => {
    // Arrange: Setup test fixtures
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      // Arrange
      const expectedUser = createMockUser();
      repository.findOne.mockResolvedValue(expectedUser);

      // Act
      const result = await service.findById('123');

      // Assert
      expect(result).toEqual(expectedUser);
      expect(repository.findOne).toHaveBeenCalledWith('123');
    });

    it('should throw UserNotFoundException when not found', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findById('123'))
        .rejects
        .toThrow(UserNotFoundException);
    });
  });
});
```

### Test Naming Convention
```typescript
// Pattern: should [expected behavior] when [condition]
it('should return empty array when no users exist')
it('should throw ValidationException when email is invalid')
it('should update user and return updated entity when valid data provided')
```

---

## Database Conventions

### Prisma Schema
```prisma
// schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  role      UserRole @default(USER)
  isActive  Boolean  @default(true) @map("is_active")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  orders    Order[]

  @@map("users")  // snake_case table names
}

enum UserRole {
  ADMIN
  USER
  GUEST
}
```

### Transaction Handling
```typescript
// Use transactions for multi-step operations
async createOrderWithItems(data: CreateOrderDto): Promise<Order> {
  return this.prisma.$transaction(async (tx) => {
    const order = await tx.order.create({ data: { userId: data.userId } });
    
    await tx.orderItem.createMany({
      data: data.items.map(item => ({
        orderId: order.id,
        ...item,
      })),
    });
    
    return order;
  });
}
```
```

### Code Review Templates

```
@workspace "Create PR review checklist for our team:
Focus areas: Security, Performance, Testing, Code style
Include automated and manual check items"
```

**Copilot generates**:

```markdown
# Pull Request Review Checklist

## Automated Checks (CI/CD)
- [ ] All tests pass
- [ ] Code coverage meets threshold (80%)
- [ ] Linting passes (ESLint, Prettier)
- [ ] Security scan passes (Snyk, npm audit)
- [ ] Build succeeds
- [ ] No merge conflicts

## Code Quality
- [ ] Code follows project coding standards
- [ ] Functions are focused (single responsibility)
- [ ] No unnecessary complexity (cyclomatic complexity < 10)
- [ ] No code duplication (DRY principle)
- [ ] Variable/function names are descriptive
- [ ] Comments explain "why", not "what"

## Security Review
- [ ] No secrets/credentials in code
- [ ] Input validation on all user inputs
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] Authentication/authorization checks present
- [ ] Sensitive data not logged
- [ ] Dependencies are up to date

## Performance
- [ ] Database queries are optimized (indexes, N+1)
- [ ] No blocking operations in hot paths
- [ ] Proper caching implemented where needed
- [ ] Pagination for list endpoints
- [ ] No memory leaks introduced

## Testing
- [ ] Unit tests for new code
- [ ] Integration tests for API changes
- [ ] Edge cases covered
- [ ] Negative scenarios tested
- [ ] Mocks are reasonable (not over-mocked)

## Documentation
- [ ] README updated if needed
- [ ] API documentation updated (OpenAPI)
- [ ] Changelog entry added
- [ ] Complex logic has inline comments

## Architecture
- [ ] Changes align with system architecture
- [ ] No circular dependencies introduced
- [ ] Proper error handling and propagation
- [ ] Logging added for debugging/monitoring
- [ ] Feature flags for risky changes

## Reviewer Actions
- [ ] Checked out branch and ran locally (for significant changes)
- [ ] Verified manual test scenarios work
- [ ] Considered backward compatibility
- [ ] Approved or requested changes with constructive feedback
```

## Team Productivity

### Onboarding Documentation

```
@workspace "Create developer onboarding guide:
Project: E-commerce platform
Tech stack: Node.js, NestJS, PostgreSQL, Redis, Docker
Include: Setup steps, architecture overview, common workflows"
```

**Copilot generates**:

```markdown
# Developer Onboarding Guide

## Welcome!

This guide will help you get started with our e-commerce platform codebase.

## Prerequisites

Before you begin, ensure you have:
- [ ] Git configured with SSH keys
- [ ] Node.js 20.x (use nvm)
- [ ] Docker Desktop installed
- [ ] VS Code with recommended extensions
- [ ] Access to GitHub repository

## Quick Start

### 1. Clone and Setup

```bash
# Clone repository
git clone git@github.com:company/ecommerce-platform.git
cd ecommerce-platform

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start infrastructure (Postgres, Redis)
docker-compose up -d

# Run database migrations
npm run db:migrate

# Seed development data
npm run db:seed
```

### 2. Start Development Server

```bash
# Start in watch mode
npm run dev

# API available at http://localhost:3000
# Swagger docs at http://localhost:3000/api/docs
```

### 3. Run Tests

```bash
# Unit tests
npm run test

# Integration tests (requires Docker)
npm run test:e2e

# Coverage report
npm run test:cov
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    API Gateway                       │
│                  (NestJS + Express)                  │
└─────────────────────┬───────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐
   │ Orders  │  │  Users  │  │Products │
   │ Module  │  │ Module  │  │ Module  │
   └────┬────┘  └────┬────┘  └────┬────┘
        │             │             │
        └─────────────┼─────────────┘
                      ▼
              ┌───────────────┐
              │   PostgreSQL  │
              │    (Prisma)   │
              └───────────────┘
                      │
              ┌───────────────┐
              │     Redis     │
              │   (Caching)   │
              └───────────────┘
```

## Code Organization

```
src/
├── modules/           # Feature modules
│   ├── orders/
│   ├── users/
│   └── products/
├── common/           # Shared utilities
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   └── pipes/
├── config/           # Configuration
├── database/         # Prisma schema & migrations
└── main.ts           # Application entry point
```

## Common Workflows

### Creating a New Feature

```bash
# 1. Create feature branch
git checkout -b feature/ABC-123-add-wishlist

# 2. Generate module scaffold
nest g module modules/wishlist
nest g controller modules/wishlist
nest g service modules/wishlist

# 3. Implement feature (TDD approach)
# - Write tests first
# - Implement code
# - Run tests

# 4. Create PR
git push origin feature/ABC-123-add-wishlist
```

### Database Changes

```bash
# Create migration after schema change
npm run db:migrate:dev -- --name add_wishlist_table

# Apply migration
npm run db:migrate

# Generate Prisma client
npm run db:generate
```

## Getting Help

- **Slack**: #engineering-help
- **Documentation**: Confluence space
- **Architecture questions**: @tech-lead
- **Code review**: Tag team members in PR
```

### Developer Workflow Optimization

```
@workspace "Analyze our development workflow and suggest improvements:
Current: Feature branch → PR → Code review → Merge → Deploy
Pain points: Long PR review times, inconsistent code quality
Team size: 8 developers"
```

## Technical Debt Management

### Identifying Technical Debt

```
@workspace "Analyze this codebase for technical debt:
- Look for code smells (long methods, large classes, duplications)
- Check for outdated dependencies
- Identify missing tests
- Find architectural violations
Provide prioritized remediation plan"
```

**Copilot analyzes**:

```markdown
## Technical Debt Assessment

### Summary

| Category | Items | Priority |
|----------|-------|----------|
| Security vulnerabilities | 3 | Critical |
| Outdated dependencies | 12 | High |
| Code smells | 8 | Medium |
| Missing tests | 15 modules | Medium |
| Documentation gaps | 5 areas | Low |

### Critical Issues

#### 1. Security Vulnerabilities (P0)
| Package | Vulnerability | Fix |
|---------|--------------|-----|
| lodash 4.17.19 | Prototype pollution | Update to 4.17.21 |
| axios 0.21.0 | SSRF vulnerability | Update to 0.21.4+ |
| express-jwt 5.x | JWT bypass | Migrate to 7.x |

**Estimated effort**: 1 sprint
**Impact if not fixed**: Security breach risk

#### 2. Database N+1 Queries (P1)
```typescript
// Current: N+1 query in OrdersService
async getOrdersWithItems() {
  const orders = await this.orderRepo.findAll();
  for (const order of orders) {
    order.items = await this.itemRepo.findByOrderId(order.id); // N queries!
  }
}

// Fix: Use join/include
async getOrdersWithItems() {
  return this.orderRepo.findAll({
    include: { items: true }
  });
}
```

**Locations**: OrdersService, UsersService, ProductsService
**Estimated effort**: 3 days
**Impact**: 90% reduction in database calls

### High Priority Issues

#### 3. Outdated Dependencies
| Package | Current | Latest | Breaking Changes |
|---------|---------|--------|------------------|
| TypeScript | 4.5 | 5.3 | Yes - strict checks |
| NestJS | 8.x | 10.x | Yes - decorators |
| Prisma | 3.x | 5.x | Yes - API changes |

**Recommended approach**: 
- Update TypeScript first (1 sprint)
- Update NestJS second (2 sprints)
- Update Prisma last (1 sprint)

#### 4. Missing Test Coverage
```
Module          | Current | Target | Gap
----------------|---------|--------|----
OrdersService   | 45%     | 80%    | 35%
PaymentService  | 30%     | 90%    | 60% (critical)
UserService     | 65%     | 80%    | 15%
```

### Medium Priority Issues

#### 5. Code Smells
- **Long methods**: `processOrder()` - 250 lines
- **Large classes**: `OrdersService` - 15 dependencies
- **Duplicated code**: Validation logic in 4 controllers

### Remediation Roadmap

| Quarter | Focus | Stories |
|---------|-------|---------|
| Q1 | Security & critical bugs | Vuln fixes, N+1 queries |
| Q2 | Modernization | TypeScript, NestJS upgrade |
| Q3 | Quality | Test coverage, code smells |
| Q4 | Architecture | Refactor large services |
```

### Refactoring Planning

```
@workspace "Create refactoring plan for this large service:
OrdersService has:
- 25 public methods
- 15 injected dependencies
- 800 lines of code
- Mixed concerns (validation, payment, notification)
Suggest how to break it down"
```

## Security & Compliance

### Security Review

```
@workspace "Review this authentication code for security issues:
[paste code]
Check for: OWASP Top 10, JWT best practices, session management"
```

### Compliance Checklist

```
@workspace "Create compliance checklist for SOC2 Type 2:
Focus on: Access control, Data encryption, Audit logging, Change management
For a SaaS application"
```

**Copilot generates**:

```markdown
# SOC2 Type 2 Compliance Checklist

## CC6: Logical and Physical Access Controls

### User Access Management
- [ ] Unique user IDs for all system users
- [ ] Strong password policy (12+ chars, complexity)
- [ ] MFA enabled for all admin access
- [ ] Quarterly access reviews documented
- [ ] Immediate access revocation on termination
- [ ] Principle of least privilege enforced

### System Access
- [ ] SSH key-based authentication (no passwords)
- [ ] VPN required for production access
- [ ] Bastion hosts for server access
- [ ] Network segmentation implemented
- [ ] Firewall rules documented and reviewed

### Application Access
- [ ] Role-based access control (RBAC)
- [ ] Session timeout configured (30 min)
- [ ] Failed login lockout (5 attempts)
- [ ] Password reset requires email verification

## CC7: System Operations

### Data Encryption
- [ ] TLS 1.2+ for all data in transit
- [ ] AES-256 encryption for data at rest
- [ ] Database encryption enabled
- [ ] Backup encryption enabled
- [ ] Key rotation policy (annual)

### Audit Logging
- [ ] All authentication events logged
- [ ] All data access events logged
- [ ] All administrative actions logged
- [ ] Logs retained for 1 year minimum
- [ ] Log integrity protection (WORM)
- [ ] Log monitoring and alerting active

## CC8: Change Management

### Development Practices
- [ ] All changes via pull requests
- [ ] Code review required (2 approvers)
- [ ] Automated testing in CI/CD
- [ ] Security scanning in pipeline
- [ ] Staging environment testing

### Deployment
- [ ] Production deployments logged
- [ ] Rollback procedures documented
- [ ] Change approval records maintained
- [ ] Emergency change process defined

## Evidence Collection

| Control | Evidence Required | Location |
|---------|-------------------|----------|
| Access reviews | Quarterly review docs | Confluence |
| MFA enforcement | IAM policy screenshots | AWS Console |
| Encryption at rest | DB/S3 config screenshots | AWS Console |
| Audit logs | Sample log exports | CloudWatch |
| Code reviews | PR history with approvals | GitHub |
```

## Real-World Scenarios

### Scenario 1: Architecture Decision

**Context**: Team needs to decide on API versioning strategy

```
@workspace "Recommend API versioning strategy for our REST API:
Current: No versioning
Constraints: 
- Multiple mobile apps (Android, iOS) with different release cycles
- Third-party integrations that can't update frequently
- Team of 8 developers
Options: URL versioning, Header versioning, No versioning
Include migration path from current state"
```

### Scenario 2: Performance Crisis

**Context**: Production system experiencing slowdowns

```
@workspace "Create incident response plan for performance degradation:
Symptoms: API response times increased from 100ms to 2s
Impact: 50% of users experiencing timeouts
Current setup: NestJS API, PostgreSQL, Redis cache, AWS ECS

Include: Diagnostic steps, potential causes, mitigation actions"
```

### Scenario 3: Team Scaling

**Context**: Team growing from 5 to 12 developers

```
@workspace "Create plan for scaling engineering team:
Current: 5 developers, 1 repo, feature branches
Future: 12 developers
Challenges: Code ownership, PR review bottlenecks, coordination
Suggest: Team structure, process changes, tooling"
```

## Customizations & Tips

### Engineering Lead Copilot Instructions

```markdown
# Engineering Lead Copilot Instructions

## Architecture Reviews
- Always consider scalability implications
- Identify single points of failure
- Suggest observability requirements
- Consider operational complexity

## Code Quality
- Reference project coding standards
- Prioritize maintainability over cleverness
- Consider team skill level in recommendations
- Always suggest test coverage improvements

## Security
- Default to secure options
- Identify OWASP Top 10 vulnerabilities
- Recommend security scanning tools
- Consider compliance requirements
```

### Useful Prompts for Engineering Leads

| Task | Prompt |
|------|--------|
| ADR creation | "Create ADR for [decision] comparing [options] given [constraints]" |
| Architecture review | "Review this architecture for [concerns]: [description]" |
| Tech debt assessment | "Analyze this codebase for technical debt and prioritize remediation" |
| Code standards | "Create coding standards for [stack] covering [areas]" |
| Incident response | "Create incident response plan for [scenario]" |
| Team scaling | "Plan for scaling team from [current] to [future] developers" |

### Integration with SpecKit

```bash
# Technical planning workflow
/speckit.plan "Review technical approach for [feature] considering:
- Current architecture
- Team capacity
- Technical debt impact
- Security implications"
```

---

[Back to Cookbook](../README.md) | [PO Guide](./po-guide.md) | [Delivery Manager Guide](./delivery-manager-guide.md)
