#!/bin/bash
set -e
ROOT=~/Documents/Workspace/personal-site

echo ">>> Syncing skills to frontend..."
rm -rf "$ROOT/frontend/.agents"
cp -r "$ROOT/.agents" "$ROOT/frontend/.agents"
cp "$ROOT/skills-lock.json" "$ROOT/frontend/skills-lock.json"

echo ">>> Syncing skills to backend..."
rm -rf "$ROOT/backend/.agents"
cp -r "$ROOT/.agents" "$ROOT/backend/.agents"
cp "$ROOT/skills-lock.json" "$ROOT/backend/skills-lock.json"

echo "✅ Skills synced. Commit in each repo."
