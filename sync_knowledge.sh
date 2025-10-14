#!/bin/bash
set -e

# Ensure directories exist
mkdir -p knowledge/automation knowledge/design knowledge/hybrid knowledge/global

# Clean up any previous .md files
find knowledge -type f -name "*.md" -delete

current_file=""

# Parse the master markdown file line by line
while IFS= read -r line || [ -n "$line" ]; do
  # Detect lines like: ## `/knowledge/automation/intro.md`
  if echo "$line" | grep -qE '^##[[:space:]]*`?/knowledge/'; then
    # Extract the path, remove leading ##, spaces, and backticks
    path=$(echo "$line" | sed -E 's/^##[[:space:]]*`?([^`]*)`?$/\1/')
    relpath=${path#/} # remove leading slash
    dirpath=$(dirname "$relpath")
    mkdir -p "$dirpath"
    current_file="$relpath"
    : > "$current_file"  # create or clear file
  elif [ -n "$current_file" ]; then
    echo "$line" >> "$current_file"
  fi
done < full_knowledge_content.txt

echo "✅ All markdown files created successfully."
