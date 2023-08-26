#!/bin/bash

changed_files=$(git diff --name-only --diff-filter=d)
new_files=$(git diff --name-only --diff-filter=A)

all_files=($changed_files $new_files)

for file in ${all_files[@]}; do
    file_path="/global-time-schedule/$file"
    npx prettier --write $file_path
done
