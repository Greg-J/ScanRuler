#!/usr/bin/env bash
# Automation-branch infrastructure; not part of an upstream contribution.
set -euo pipefail
cd "$(dirname "$0")/.."

# Isolated runner worktrees start without dependencies. npm ci uses the
# existing lockfiles and never installs a global tool or browser.
if [[ ! -d node_modules ]]; then npm ci --ignore-scripts --no-audit --no-fund; fi
if [[ ! -d mcp/node_modules ]]; then npm --prefix mcp ci --ignore-scripts --no-audit --no-fund; fi

# Vitest covers .test.ts. Standalone Node tests (including the supervisor's
# failure probes) must also affect the gate, including teardown failures.
shopt -s nullglob
node_tests=(tests/*.test.mjs)
if (( ${#node_tests[@]} )); then
  result=$(mktemp)
  trap 'rm -f "$result"' EXIT
  node --test --test-reporter=tap "${node_tests[@]}" > "$result" 2>&1 || { cat "$result"; exit 1; }
  cat "$result"
  if rg -q '^\s*not ok\b' "$result"; then exit 1; fi
fi

node scripts/check-plugin-boundary.mjs
node scripts/check-units.mjs
