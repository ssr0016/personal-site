#!/bin/bash
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
git -C "$ROOT" status -sb
git -C "$ROOT" log --oneline -3
