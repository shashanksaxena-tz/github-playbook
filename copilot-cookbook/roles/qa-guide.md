# GitHub Copilot QA Engineer Guide

A comprehensive guide for QA engineers to leverage GitHub Copilot for test automation, test case design, defect analysis, and quality assurance activities.

## Table of Contents

- [Overview](#overview)
- [Test Planning with Copilot](#test-planning-with-copilot)
- [Test Case Design](#test-case-design)
- [Test Automation](#test-automation)
- [Defect Analysis](#defect-analysis)
- [Performance Testing](#performance-testing)
- [API Testing](#api-testing)
- [Real-World Scenarios](#real-world-scenarios)
- [Customizations & Tips](#customizations--tips)

## Overview

As a QA Engineer, GitHub Copilot helps you:

- **Design comprehensive test cases**: Cover functional, edge, and negative scenarios
- **Automate testing faster**: Generate test scripts and frameworks
- **Analyze defects**: Understand bugs and suggest root causes
- **Create test data**: Generate realistic fixtures and mocks
- **Improve test coverage**: Identify untested paths and scenarios

## Test Planning with Copilot

### Generating Test Plans from Specifications

```
@workspace "Generate a test plan for the user authentication feature in spec.md including:
- Functional test cases
- Security test scenarios
- Performance requirements
- Edge cases and boundary conditions
- Integration test scope"
```

**Real-World Example**:

```markdown
# Test Plan: User Authentication System

## Scope
- Login functionality
- Registration flow
- Password reset
- Session management
- Multi-factor authentication

## Test Categories

### Functional Tests
1. Valid login with correct credentials
2. Login with incorrect password
3. Login with non-existent user
4. Registration with valid data
5. Registration with duplicate email
...

### Security Tests
1. SQL injection attempts in login form
2. XSS attack vectors in input fields
3. Brute force protection verification
4. Session fixation vulnerability check
...

### Performance Tests
1. Login response time under load
2. Concurrent session handling
3. Database query optimization
...
```

### Mapping Requirements to Test Cases

```
@workspace "Map functional requirements from spec.md to test cases:
FR-001: System MUST validate email format
FR-002: System MUST hash passwords using bcrypt
FR-003: Users MUST receive confirmation email"
```

**Copilot generates traceability matrix**:

| Requirement | Test Case ID | Test Description | Priority |
|-------------|--------------|------------------|----------|
| FR-001 | TC-001 | Valid email formats accepted | High |
| FR-001 | TC-002 | Invalid email formats rejected | High |
| FR-001 | TC-003 | Empty email field validation | Medium |
| FR-002 | TC-004 | Password hashed in database | Critical |
| FR-002 | TC-005 | Original password not stored | Critical |
| FR-003 | TC-006 | Email sent on registration | High |
| FR-003 | TC-007 | Email contains activation link | High |

## Test Case Design

### Functional Test Cases

```typescript
// Generate test cases for user registration endpoint
// Endpoint: POST /api/users/register
// Request: { email, password, name }
// Consider: valid inputs, invalid formats, duplicates, edge cases

describe('User Registration', () => {
    // Copilot generates comprehensive test cases:
    
    describe('Valid Registration', () => {
        it('should register user with valid email and strong password', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({
                    email: 'newuser@example.com',
                    password: 'SecureP@ss123',
                    name: 'John Doe'
                });
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.email).toBe('newuser@example.com');
        });
    });
    
    describe('Email Validation', () => {
        it('should reject registration with invalid email format', async () => {
            const invalidEmails = [
                'notanemail',
                'missing@domain',
                '@nodomain.com',
                'spaces in@email.com',
                'email@.com'
            ];
            
            for (const email of invalidEmails) {
                const response = await request(app)
                    .post('/api/users/register')
                    .send({ email, password: 'ValidP@ss123', name: 'Test' });
                
                expect(response.status).toBe(400);
                expect(response.body.error).toContain('email');
            }
        });
    });
    
    describe('Password Requirements', () => {
        it('should reject weak passwords', async () => {
            const weakPasswords = [
                'short',           // Too short
                'nouppercase1!',   // No uppercase
                'NOLOWERCASE1!',   // No lowercase
                'NoNumbers!!',     // No numbers
                'NoSpecial123'     // No special characters
            ];
            
            // Test each weak password...
        });
    });
    
    describe('Edge Cases', () => {
        it('should handle maximum length inputs', async () => {
            // Test boundary conditions
        });
        
        it('should handle unicode characters in name', async () => {
            // Test international names
        });
        
        it('should handle concurrent registrations', async () => {
            // Test race conditions
        });
    });
});
```

### Boundary Value Analysis

```
@workspace "Generate boundary value test cases for age validation:
- Minimum age: 13
- Maximum age: 120
- Field type: integer"
```

**Copilot generates**:

```typescript
describe('Age Validation - Boundary Values', () => {
    // Below minimum
    it('should reject age 12 (just below minimum)', () => {
        expect(validateAge(12)).toBe(false);
    });
    
    // At minimum boundary
    it('should accept age 13 (at minimum)', () => {
        expect(validateAge(13)).toBe(true);
    });
    
    // Just above minimum
    it('should accept age 14 (just above minimum)', () => {
        expect(validateAge(14)).toBe(true);
    });
    
    // Normal value
    it('should accept age 30 (normal value)', () => {
        expect(validateAge(30)).toBe(true);
    });
    
    // Just below maximum
    it('should accept age 119 (just below maximum)', () => {
        expect(validateAge(119)).toBe(true);
    });
    
    // At maximum boundary
    it('should accept age 120 (at maximum)', () => {
        expect(validateAge(120)).toBe(true);
    });
    
    // Above maximum
    it('should reject age 121 (just above maximum)', () => {
        expect(validateAge(121)).toBe(false);
    });
    
    // Edge cases
    it('should reject negative age', () => {
        expect(validateAge(-1)).toBe(false);
    });
    
    it('should reject zero age', () => {
        expect(validateAge(0)).toBe(false);
    });
    
    it('should handle non-integer input', () => {
        expect(validateAge(25.5)).toBe(false);
    });
});
```

### Equivalence Partitioning

```
@workspace "Generate equivalence partition test cases for discount calculation:
- 0-99 items: 0% discount
- 100-499 items: 10% discount
- 500-999 items: 20% discount
- 1000+ items: 30% discount"
```

### Negative Test Cases

```typescript
// Generate negative test cases for payment processing
// Consider: invalid card numbers, expired cards, insufficient funds,
// network errors, timeout scenarios, malformed requests

describe('Payment Processing - Negative Scenarios', () => {
    // Copilot generates:
    
    describe('Invalid Card Data', () => {
        it('should reject invalid card number', async () => {
            const response = await processPayment({
                cardNumber: '1234567890123456', // Invalid
                expiry: '12/25',
                cvv: '123'
            });
            expect(response.error).toBe('INVALID_CARD_NUMBER');
        });
        
        it('should reject expired card', async () => {
            const response = await processPayment({
                cardNumber: '4111111111111111',
                expiry: '01/20', // Expired
                cvv: '123'
            });
            expect(response.error).toBe('CARD_EXPIRED');
        });
    });
    
    describe('Transaction Failures', () => {
        it('should handle insufficient funds', async () => {
            // Mock insufficient funds response
        });
        
        it('should handle network timeout', async () => {
            // Mock timeout scenario
        });
        
        it('should handle gateway unavailable', async () => {
            // Mock service unavailable
        });
    });
});
```

## Test Automation

### Generating Test Frameworks

```
@workspace "Create a test framework structure for E2E testing with Playwright:
- Page Object Model
- Test fixtures and helpers
- Configuration for multiple browsers
- CI/CD integration"
```

**Copilot generates project structure**:

```typescript
// tests/fixtures/base.ts
import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

type TestFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    authenticatedPage: Page;
};

export const test = base.extend<TestFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    authenticatedPage: async ({ page, loginPage }, use) => {
        await loginPage.login('testuser@example.com', 'password123');
        await use(page);
    },
});

// tests/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[data-testid="email-input"]');
        this.passwordInput = page.locator('[data-testid="password-input"]');
        this.loginButton = page.locator('[data-testid="login-button"]');
        this.errorMessage = page.locator('[data-testid="error-message"]');
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }
}
```

### Generating Test Data

```typescript
// Generate realistic test data for e-commerce testing
// Include: users, products, orders, reviews
// Consider: various locales, edge cases, relationships

// Copilot generates:
export const testData = {
    users: [
        {
            id: 'user-001',
            email: 'john.doe@example.com',
            name: 'John Doe',
            address: {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zip: '10001',
                country: 'US'
            }
        },
        {
            id: 'user-002',
            email: 'marie.dupont@example.fr',
            name: 'Marie Dupont',
            address: {
                street: '45 Rue de la Paix',
                city: 'Paris',
                state: '',
                zip: '75002',
                country: 'FR'
            }
        },
        // More diverse test users...
    ],
    
    products: [
        {
            id: 'prod-001',
            name: 'Wireless Headphones',
            price: 99.99,
            inventory: 100,
            category: 'Electronics'
        },
        {
            id: 'prod-002',
            name: 'Limited Edition Item',
            price: 999.99,
            inventory: 1, // Edge case: low inventory
            category: 'Collectibles'
        },
        // More products with various characteristics...
    ]
};
```

### Selenium/WebDriver Tests

```python
# Generate Selenium test for login flow
# Browser: Chrome
# Test: Login with valid credentials, verify dashboard access

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytest

class TestLoginFlow:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(10)
        yield
        self.driver.quit()
    
    def test_successful_login(self):
        # Navigate to login page
        self.driver.get("https://app.example.com/login")
        
        # Enter credentials
        email_field = self.driver.find_element(By.ID, "email")
        email_field.send_keys("testuser@example.com")
        
        password_field = self.driver.find_element(By.ID, "password")
        password_field.send_keys("SecurePassword123!")
        
        # Click login button
        login_button = self.driver.find_element(By.ID, "login-btn")
        login_button.click()
        
        # Wait for dashboard and verify
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "dashboard"))
        )
        
        assert "Dashboard" in self.driver.title
        assert self.driver.find_element(By.ID, "welcome-message").is_displayed()
    
    def test_invalid_credentials(self):
        # Copilot generates negative test case
        pass
    
    def test_account_lockout_after_failed_attempts(self):
        # Copilot generates security test case
        pass
```

## Defect Analysis

### Understanding Bug Reports

```
@workspace "Analyze this bug report and suggest root cause:

Bug: Users intermittently receive 'Session Expired' error during checkout
Steps to reproduce:
1. Add items to cart
2. Wait 5+ minutes
3. Proceed to checkout
4. Error appears

Environment: Production
Frequency: ~15% of checkout attempts
Recent changes: Updated session middleware last week"
```

**Copilot analyzes and suggests**:

```markdown
## Root Cause Analysis

### Likely Causes (by probability):

1. **Session Timeout Configuration** (HIGH)
   - Recent middleware update may have changed timeout settings
   - Check: `session.maxAge` configuration
   - Verify: Compare with previous middleware version

2. **Redis Connection Issues** (MEDIUM)
   - Session store may be experiencing connection drops
   - Check: Redis connection pool settings
   - Verify: Redis server logs for timeouts

3. **Load Balancer Session Affinity** (MEDIUM)
   - Requests may be routing to different servers
   - Check: Sticky session configuration
   - Verify: Session ID consistency across requests

### Recommended Tests:

1. Add logging to session middleware
2. Monitor Redis connection metrics
3. Test with different session durations
4. Verify load balancer configuration
```

### Reproducing Issues

```
@workspace "Generate a test script to reproduce the session timeout bug:
- Simulate user adding items to cart
- Wait for various time intervals
- Attempt checkout
- Log session state at each step"
```

### Regression Test Generation

```typescript
// Generate regression tests for the fixed session timeout bug
// Ensure the fix works and doesn't break other functionality

describe('Session Management - Regression Tests', () => {
    it('should maintain session during checkout flow', async () => {
        // Login
        const session = await loginUser('test@example.com', 'password');
        
        // Add items to cart
        await addToCart(session, 'product-123', 2);
        
        // Wait 10 minutes (simulated)
        jest.advanceTimersByTime(10 * 60 * 1000);
        
        // Verify session still valid
        const cartContents = await getCart(session);
        expect(cartContents.items).toHaveLength(1);
        
        // Complete checkout
        const order = await checkout(session);
        expect(order.status).toBe('completed');
    });
    
    it('should properly expire sessions after configured timeout', async () => {
        // Ensure sessions do expire when they should
    });
    
    it('should handle session refresh correctly', async () => {
        // Test session extension on activity
    });
});
```

## Performance Testing

### Load Test Scripts

```
@workspace "Generate a k6 load test script for the user API:
- Test endpoints: /api/users (GET, POST), /api/users/:id (GET, PUT, DELETE)
- Scenarios: 100 concurrent users, ramp up over 1 minute
- Thresholds: 95th percentile < 500ms, error rate < 1%"
```

**Copilot generates**:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
    stages: [
        { duration: '1m', target: 100 },  // Ramp up
        { duration: '5m', target: 100 },  // Stay at peak
        { duration: '1m', target: 0 },    // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
        errors: ['rate<0.01'],
    },
};

const BASE_URL = 'https://api.example.com';

export default function () {
    // GET all users
    let response = http.get(`${BASE_URL}/api/users`);
    check(response, {
        'GET users status is 200': (r) => r.status === 200,
        'GET users response time < 500ms': (r) => r.timings.duration < 500,
    });
    errorRate.add(response.status !== 200);
    
    // POST new user
    const newUser = {
        email: `user${Date.now()}@test.com`,
        name: 'Load Test User',
        password: 'TestPassword123!'
    };
    
    response = http.post(
        `${BASE_URL}/api/users`,
        JSON.stringify(newUser),
        { headers: { 'Content-Type': 'application/json' } }
    );
    check(response, {
        'POST user status is 201': (r) => r.status === 201,
        'POST user response time < 500ms': (r) => r.timings.duration < 500,
    });
    errorRate.add(response.status !== 201);
    
    // GET single user
    if (response.status === 201) {
        const userId = JSON.parse(response.body).id;
        response = http.get(`${BASE_URL}/api/users/${userId}`);
        check(response, {
            'GET user status is 200': (r) => r.status === 200,
        });
    }
    
    sleep(1);
}
```

### Stress Test Scenarios

```javascript
// Generate stress test for checkout API
// Find breaking point under high load

export const options = {
    stages: [
        { duration: '2m', target: 100 },
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 },
        { duration: '5m', target: 300 },
        { duration: '10m', target: 0 },
    ],
};
```

## API Testing

### Contract Testing

```typescript
// Generate contract tests for Order API based on OpenAPI spec
// Validate request/response schemas match specification

describe('Order API Contract Tests', () => {
    it('should match CreateOrder request schema', async () => {
        const validRequest = {
            customerId: 'cust-123',
            items: [
                { productId: 'prod-001', quantity: 2 }
            ],
            shippingAddress: {
                street: '123 Main St',
                city: 'New York',
                zip: '10001'
            }
        };
        
        const isValid = ajv.validate(createOrderSchema, validRequest);
        expect(isValid).toBe(true);
    });
    
    it('should match Order response schema', async () => {
        const response = await createOrder(validOrderRequest);
        const isValid = ajv.validate(orderResponseSchema, response);
        expect(isValid).toBe(true);
    });
    
    // More contract tests...
});
```

### Postman Collection Generation

```
@workspace "Generate a Postman collection for the User API:
- Authentication endpoints
- User CRUD operations
- Include pre-request scripts for auth token
- Include test assertions for each endpoint"
```

### API Mock Generation

```typescript
// Generate mock API server for frontend development
// Based on contracts/ specifications

import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
    rest.get('/api/users', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                { id: '1', name: 'John Doe', email: 'john@example.com' },
                { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
            ])
        );
    }),
    
    rest.post('/api/users', (req, res, ctx) => {
        const { name, email } = req.body as any;
        return res(
            ctx.status(201),
            ctx.json({
                id: Date.now().toString(),
                name,
                email,
                createdAt: new Date().toISOString()
            })
        );
    }),
    
    rest.get('/api/users/:id', (req, res, ctx) => {
        const { id } = req.params;
        // Return mock user or 404
    }),
    
    // More handlers...
];

export const server = setupServer(...handlers);
```

## Real-World Scenarios

### Scenario 1: Building a Test Suite for New Feature

**Context**: New user notification system needs comprehensive testing

```typescript
// Step 1: Generate test plan
@workspace "Create test plan for notification system covering:
- Email notifications
- Push notifications
- SMS notifications
- User preferences
- Delivery tracking"

// Step 2: Generate test cases for each notification type
@workspace "Generate test cases for email notifications including:
- Successful delivery
- Bounce handling
- Template rendering
- Attachment handling
- Rate limiting"

// Step 3: Create automation framework
@workspace "Create test automation for notification service using:
- Jest for unit tests
- Supertest for API tests
- Mock services for external providers"

// Step 4: Generate test data
@workspace "Generate test data for notification testing:
- Various user preferences
- Different notification templates
- Edge cases (long content, special characters, etc.)"
```

### Scenario 2: Investigating Flaky Tests

**Context**: CI pipeline has intermittent test failures

```
@workspace "Analyze these flaky test results and suggest fixes:

Test: 'should update user profile'
Failures: 3 out of 100 runs
Error: 'Expected profile to be updated but got stale data'
Timing: Failures occur during high CI load"
```

**Copilot analyzes and suggests**:

```typescript
// Original flaky test
it('should update user profile', async () => {
    await updateProfile(userId, { name: 'New Name' });
    const profile = await getProfile(userId);
    expect(profile.name).toBe('New Name'); // Sometimes fails
});

// Copilot's improved version
it('should update user profile', async () => {
    await updateProfile(userId, { name: 'New Name' });
    
    // Add retry with exponential backoff for eventual consistency
    const profile = await waitFor(
        () => getProfile(userId),
        (p) => p.name === 'New Name',
        { timeout: 5000, interval: 100 }
    );
    
    expect(profile.name).toBe('New Name');
});
```

### Scenario 3: Security Testing

**Context**: Need to verify security controls in authentication

```typescript
// Generate security test cases for authentication
// Based on OWASP guidelines

describe('Authentication Security Tests', () => {
    describe('Brute Force Protection', () => {
        it('should lock account after 5 failed attempts', async () => {
            for (let i = 0; i < 5; i++) {
                await login('user@test.com', 'wrongpassword');
            }
            
            const response = await login('user@test.com', 'correctpassword');
            expect(response.status).toBe(423); // Locked
        });
        
        it('should implement rate limiting', async () => {
            // Rapid-fire requests should be rate limited
        });
    });
    
    describe('Session Security', () => {
        it('should invalidate session on password change', async () => {
            // Change password should invalidate other sessions
        });
        
        it('should prevent session fixation', async () => {
            // Session ID should change after login
        });
    });
    
    describe('Input Validation', () => {
        it('should prevent SQL injection in login', async () => {
            const maliciousInputs = [
                "' OR '1'='1",
                "'; DROP TABLE users; --",
                "admin'--"
            ];
            
            for (const input of maliciousInputs) {
                const response = await login(input, 'password');
                expect(response.status).toBe(400);
            }
        });
    });
});
```

## Customizations & Tips

### QA-Specific Copilot Instructions

Create `.github/copilot-instructions.md`:

```markdown
# QA-Specific Copilot Instructions

## Test Framework
- Use Jest for unit and integration tests
- Use Playwright for E2E tests
- Use k6 for performance tests

## Test Style
- Follow AAA pattern (Arrange, Act, Assert)
- Use descriptive test names: "should [action] when [condition]"
- Include both positive and negative test cases
- Always test boundary values

## Assertions
- Prefer specific assertions over generic ones
- Include helpful error messages
- Test one concept per test case

## Test Data
- Use factories for test data generation
- Avoid hardcoded values where possible
- Include edge cases in test data sets
```

### Useful Prompts for QA

| Task | Prompt |
|------|--------|
| Generate test cases | "Generate test cases for [feature] covering happy path, edge cases, and error scenarios" |
| Create test data | "Generate realistic test data for [entity] including edge cases" |
| Analyze bug | "Analyze this bug report and suggest root cause: [details]" |
| Performance test | "Create load test for [API] with [X] concurrent users" |
| Security test | "Generate security test cases for [feature] based on OWASP guidelines" |
| Mock service | "Create mock implementation for [external service]" |

### Keyboard Shortcuts for Testing

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Run test at cursor | Ctrl+; then T | Cmd+; then T |
| Debug test at cursor | Ctrl+; then D | Cmd+; then D |
| Generate test | Ctrl+Shift+T | Cmd+Shift+T |

---

[Back to Cookbook](../README.md) | [Developer Guide](./developer-guide.md) | [PM Guide](./pm-guide.md)
