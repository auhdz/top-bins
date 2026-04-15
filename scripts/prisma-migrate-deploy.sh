#!/usr/bin/env bash
# Prisma CLI reads .env by default, not .env.local. This script loads both (local wins for duplicates).
set -euo pipefail
cd "$(dirname "$0")/.."
set -a
if [[ -f .env ]]; then
  # shellcheck disable=SC1091
  source .env
fi
if [[ -f .env.local ]]; then
  # shellcheck disable=SC1091
  source .env.local
fi
set +a
if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "Error: DATABASE_URL is not set. Add it to .env or .env.local, then run again."
  echo "Example: DATABASE_URL=\"postgresql://user:pass@host:5432/dbname\""
  exit 1
fi
exec npx prisma migrate deploy "$@"
