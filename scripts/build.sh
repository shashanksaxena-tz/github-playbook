#!/bin/bash
# Build script for the playbook static site

set -e

cd "$(dirname "$0")/../playbook" || exit 1

echo "Building Docusaurus site..."
npm run build

echo "Build complete! Output in playbook/build/"
