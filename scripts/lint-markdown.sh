#!/bin/bash
# Markdown linting script

set -e

cd "$(dirname "$0")/.." || exit 1

echo "Linting Markdown files..."
cd playbook

# Run markdownlint on all markdown files
markdownlint content/**/*.md --config ../.markdownlint.json

echo "Markdown linting complete!"
