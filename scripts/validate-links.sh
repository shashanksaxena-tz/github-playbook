#!/bin/bash
# Link validation script

set -e

cd "$(dirname "$0")/.." || exit 1

echo "Validating Markdown links..."
cd playbook

# Run markdown-link-check on all markdown files
find content -name "*.md" -type f | while read -r file; do
  echo "Checking: $file"
  markdown-link-check "$file" --config ../.markdown-link-check.json || true
done

echo "Link validation complete!"
