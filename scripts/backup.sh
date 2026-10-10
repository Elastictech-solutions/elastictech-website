#!/bin/sh
set -eu

backup_dir="${1:-./backups}"
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$backup_dir"

docker compose exec -T database pg_dump -U elastictech -d elastictech -Fc > "$backup_dir/database-$timestamp.dump"
docker compose cp app:/app/media "$backup_dir/media-$timestamp"
printf 'Saved database and media backups under %s\n' "$backup_dir"
