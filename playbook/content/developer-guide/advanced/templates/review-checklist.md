---
id: review-checklist
title: AI-Assisted Code Review Checklist
description: Checklist for reviewing AI-generated code
---

# AI-Assisted Code Review Checklist

## General
- [ ] Does the code actually solve the problem?
- [ ] Is the code understandable and maintainable?
- [ ] Does it follow project coding standards?

## AI-Specific Checks
- [ ] **Security**: Are there any hardcoded secrets?
- [ ] **Security**: Is input validation sufficient?
- [ ] **Correctness**: Does the logic handle edge cases correctly? (AI often misses these)
- [ ] **Performance**: Is the algorithm efficient? (AI might choose O(n^2) when O(n) is possible)
- [ ] **Dependencies**: Did AI introduce unnecessary or hallucinated dependencies?

## Testing
- [ ] Are unit tests provided?
- [ ] Do tests pass?
- [ ] Do tests cover the new logic?

## Documentation
- [ ] Are complex parts explained?
- [ ] Is the PR description accurate?
