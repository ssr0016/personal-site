#!/bin/bash
set -e
ROOT=~/Documents/Workspace/personal-site
for dir in frontend backend; do
  echo ">>> Pulling $dir..."
  (cd "$ROOT/$dir" && git pull "$@")
  echo ""
done
echo "✅ Done pulling all repos."
