---
id: debugging-prompts
title: Debugging Prompts
description: Prompts to assist with debugging complex issues
---

# Debugging Prompts

## Purpose
Accelerate debugging by using AI to analyze errors, logs, and code behavior.

## Prompts

### Error Analysis
```
I am getting this error: [Error Message]
Stack trace: [Stack Trace]
Code context: [Code Snippet]

Explain what this error means and what might be causing it in this context.
```

### Logical Bug Hunting
```
The following function is supposed to [Expected Behavior], but it returns [Actual Behavior].
Find the logical flaw in the code.
[Paste Code]
```

### Log Interpretation
```
Analyze these logs from the [Service Name] service.
Identify any anomalies or patterns that correlate with the reported failure at [Time].
[Paste Logs]
```

### Hypothesis Generation
```
The application is experiencing high latency.
Architecture: Node.js API -> Redis Cache -> Postgres DB.
What are the potential causes? Suggest steps to investigate each.
```
