#!/bin/bash
set -e
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ">>> Syncing skills to frontend..."
rm -rf "$ROOT/frontend/.agents"
cp -r "$ROOT/.agents" "$ROOT/frontend/.agents"
cp "$ROOT/skills-lock.json" "$ROOT/frontend/skills-lock.json"

echo ">>> Syncing skills to backend..."
rm -rf "$ROOT/backend/.agents"
cp -r "$ROOT/.agents" "$ROOT/backend/.agents"
cp "$ROOT/skills-lock.json" "$ROOT/backend/skills-lock.json"

echo "✅ Skills synced. Commit changes at the monorepo root."
