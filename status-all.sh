#!/bin/bash
ROOT=~/Documents/Workspace/personal-site
for dir in frontend backend; do
  echo "════════════════════════════════════"
  echo "  📦 $dir"
  echo "════════════════════════════════════"
  (cd "$ROOT/$dir" && git status -sb && echo "" && git log --oneline -3)
  echo ""
done
