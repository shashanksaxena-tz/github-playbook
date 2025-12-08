---
id: javascript-example
title: JavaScript/TypeScript Code Example - Good vs. Risky Patterns
role: developer
experience_level: intermediate
workflow_stage: daily-usage
description: Practical JavaScript/TypeScript example demonstrating good and risky patterns with GitHub Copilot
cross_references:
  - code-generation-comments
  - anti-patterns
tags:
  - javascript
  - typescript
  - examples
  - code-generation
last_updated: 2025-12-06
---

# JavaScript/TypeScript Code Example: Good vs. Risky Patterns

This example demonstrates effective use of GitHub Copilot for JavaScript/TypeScript development.

## Scenario: API Data Fetching with Error Handling

We need to create a function that fetches user data from an API with proper error handling and retry logic.

## ❌ Risky Approach: Vague Prompt

**Prompt**: "Fetch user data from API"

**AI-Generated Code (Risky)**:

```javascript
// ⚠️ RISKY: No error handling, no retries, hardcoded URL
async function fetchUserData(userId) {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    return data;
}
```

**Problems**:
- 🔴 No error handling (network failures, API errors)
- 🔴 No retry logic
- 🔴 Hardcoded URL
- 🔴 No timeout handling
- 🔴 Doesn't check response status
- 🔴 May throw unhandled exceptions

## ✅ Good Approach: Specific Prompt with Requirements

**Prompt**:
```
Create a robust API data fetching function:
- Accept userId parameter
- Use environment variable for API base URL
- Implement retry logic (3 attempts with exponential backoff)
- Handle errors: network failures, 404, 500, timeout
- Return typed result: { success: boolean, data?: User, error?: string }
- Add request timeout (5 seconds)
- Log errors for debugging
```

**AI-Generated Code (Good)**:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

interface FetchResult {
    success: boolean;
    data?: User;
    error?: string;
}

async function fetchUserData(userId: number): Promise<FetchResult> {
    const API_BASE_URL = process.env.API_BASE_URL || 'https://api.example.com';
    const MAX_RETRIES = 3;
    const TIMEOUT_MS = 5000;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            // Create abort controller for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
            
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            clearTimeout(timeoutId);
            
            // Check response status
            if (!response.ok) {
                if (response.status === 404) {
                    return { success: false, error: 'User not found' };
                }
                if (response.status >= 500) {
                    // Retry on server errors
                    if (attempt < MAX_RETRIES) {
                        await delay(Math.pow(2, attempt) * 1000); // Exponential backoff
                        continue;
                    }
                    return { success: false, error: 'Server error after retries' };
                }
                return { success: false, error: `HTTP ${response.status}` };
            }
            
            const data: User = await response.json();
            return { success: true, data };
            
        } catch (error) {
            if (error instanceof Error) {
                // Network error or timeout
                if (error.name === 'AbortError') {
                    if (attempt < MAX_RETRIES) {
                        console.warn(`Request timeout, retrying... (attempt ${attempt}/${MAX_RETRIES})`);
                        await delay(Math.pow(2, attempt) * 1000);
                        continue;
                    }
                    return { success: false, error: 'Request timeout after retries' };
                }
                
                if (attempt < MAX_RETRIES) {
                    console.warn(`Network error, retrying... (attempt ${attempt}/${MAX_RETRIES}):`, error.message);
                    await delay(Math.pow(2, attempt) * 1000);
                    continue;
                }
                
                return { success: false, error: `Network error: ${error.message}` };
            }
            
            return { success: false, error: 'Unknown error occurred' };
        }
    }
    
    return { success: false, error: 'Failed after all retries' };
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

**Why This is Better**:
- ✅ Comprehensive error handling
- ✅ Retry logic with exponential backoff
- ✅ Timeout handling
- ✅ TypeScript types for safety
- ✅ Environment variable for configuration
- ✅ Proper HTTP status code handling
- ✅ Detailed error messages
- ✅ Logging for debugging

## Before vs. After Comparison

### Error Handling

**Before**: No error handling, crashes on network failures
**After**: Handles network errors, timeouts, HTTP errors, retries automatically

### Reliability

**Before**: Fails on first error
**After**: Retries with exponential backoff, handles transient failures

### Type Safety

**Before**: No types, runtime errors possible
**After**: TypeScript types prevent many errors at compile time

### Configuration

**Before**: Hardcoded URL
**After**: Environment variable, easy to configure

## Key Takeaways

1. **Specify error handling**: Always ask for comprehensive error handling
2. **Request retry logic**: For network operations, retries are essential
3. **Use TypeScript**: Types catch errors early and improve code quality
4. **Environment variables**: Never hardcode URLs or API keys
5. **Timeout handling**: Network requests should have timeouts
6. **Status code checking**: Check HTTP status codes, don't assume success

## Related Content

- [Code Generation from Comments](../daily-usage/code-generation-comments.md) - Learn structured prompting
- [Anti-Patterns](../daily-usage/anti-patterns.md) - Avoid common mistakes
- [Security & Compliance](../../shared/security-compliance/overview.md) - Security best practices


