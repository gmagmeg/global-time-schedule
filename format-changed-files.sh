#!/bin/bash

# Get the list of changed files
changed_files=$(git diff --name-only --diff-filter=d)

# Loop through each file and format it with Prettier
for file in $changed_files; do
  # Prepend the directory name to the file path
  file_path="/global-time-schedule/$file"
  # Run Prettier on the file
  npx prettier --write $file_path
done
