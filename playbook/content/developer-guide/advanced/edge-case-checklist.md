---
id: edge-case-checklist
title: Edge Case Checklist
description: Checklist for identifying and testing edge cases with AI
---

# Edge Case Checklist

## Data Types
- [ ] Null / Undefined
- [ ] Empty Strings / Arrays / Objects
- [ ] Large values (max integer, long strings)
- [ ] Negative numbers / Zero
- [ ] Special characters / Emoji / Unicode
- [ ] Invalid formats (malformed JSON, invalid email)

## Logic & State
- [ ] Off-by-one errors (loops, array indices)
- [ ] Concurrent modification
- [ ] Race conditions
- [ ] State transitions (valid/invalid)
- [ ] Timeouts / Latency

## System & Environment
- [ ] Network failure / Offline mode
- [ ] Disk full / Memory limit
- [ ] Permission denied
- [ ] API rate limits

## AI Prompt
```
Review this code and identify potential edge cases related to [category].
Generate test cases for the identified edge cases.
```
