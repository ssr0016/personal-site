#!/bin/bash
set -e
ROOT=~/Documents/Workspace/personal-site
for dir in frontend backend; do
  echo ">>> Pushing $dir..."
  (cd "$ROOT/$dir" && git push "$@")
  echo ""
done
echo "✅ Done pushing all repos."
