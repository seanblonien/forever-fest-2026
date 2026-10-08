#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/../.."

if [[ "${1:-}" != "" && "${1:-}" != "--with-deps" ]] || (( $# > 1 )); then
  echo 'Usage: pnpm agent:setup [--with-deps]' >&2
  exit 1
fi

node -e 'if (Number(process.versions.node.split(".")[0]) < 24) { console.error("Node >=24 is required; use the version in .nvmrc."); process.exit(1); }'
expected_pnpm="$(node -p 'require("./package.json").packageManager.split("+")[0].slice(5)')"
if [[ "$(pnpm --version)" != "$expected_pnpm" ]]; then
  echo "Use pnpm $expected_pnpm from package.json before running setup." >&2
  exit 1
fi

pnpm install --frozen-lockfile
pnpm exec playwright install chromium "$@"
pnpm exec next typegen
