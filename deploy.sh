#!/usr/bin/env bash
# Deploy the prebuilt GHCR images with docker-compose.prod.yml.
# Run on the server, from the directory holding docker-compose.prod.yml and .env.
# See DEPLOYMENT.md.
#
# Usage: ./deploy.sh [--tag TAG] [--no-backup] [--keep N]
#
#   --tag TAG     Image tag to deploy (latest, 1.2.3, sha-abc1234). Saved as
#                 IMAGE_TAG in .env so restarts keep the same version.
#   --no-backup   Skip the cms_data backup taken before the update.
#   --keep N      Backups to keep in ./backups (default 7).
#
# Env:
#   GHCR_USER, GHCR_TOKEN   Log in to ghcr.io first (private packages only).
#                           Token: classic PAT with read:packages.

set -euo pipefail

cd "$(dirname "$(readlink -f "$0")")"

COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE=".env"
PROJECT="web-alkautsar"
BACKUP_DIR="backups"
TAG=""
BACKUP=1
KEEP=7

log() { printf '\033[1;34m==>\033[0m %s\n' "$*"; }
die() { printf '\033[1;31merror:\033[0m %s\n' "$*" >&2; exit 1; }

while [[ $# -gt 0 ]]; do
  case "$1" in
    --tag) TAG="${2:?--tag needs a value}"; shift 2 ;;
    --no-backup) BACKUP=0; shift ;;
    --keep) KEEP="${2:?--keep needs a value}"; shift 2 ;;
    -h|--help) sed -n '2,15p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) die "unknown option: $1" ;;
  esac
done

[[ "$KEEP" =~ ^[0-9]+$ ]] || die "--keep must be a number"

command -v docker >/dev/null || die "docker not installed"
docker compose version >/dev/null 2>&1 || die "docker compose plugin not installed"
[[ -f "$COMPOSE_FILE" ]] || die "$COMPOSE_FILE not found in $PWD"
[[ -f "$ENV_FILE" ]] || die "$ENV_FILE not found in $PWD (needs POCKETBASE_PUBLIC_URL)"
grep -qE '^POCKETBASE_PUBLIC_URL=.+' "$ENV_FILE" || die "POCKETBASE_PUBLIC_URL not set in $ENV_FILE"

compose() { docker compose -p "$PROJECT" -f "$COMPOSE_FILE" --env-file "$ENV_FILE" "$@"; }

if [[ -n "$TAG" ]]; then
  log "Setting IMAGE_TAG=$TAG in $ENV_FILE"
  if grep -qE '^IMAGE_TAG=' "$ENV_FILE"; then
    sed -i "s|^IMAGE_TAG=.*|IMAGE_TAG=$TAG|" "$ENV_FILE"
  else
    printf '\nIMAGE_TAG=%s\n' "$TAG" >> "$ENV_FILE"
  fi
fi

if [[ -n "${GHCR_TOKEN:-}" ]]; then
  [[ -n "${GHCR_USER:-}" ]] || die "GHCR_TOKEN set but GHCR_USER missing"
  log "Logging in to ghcr.io as $GHCR_USER"
  printf '%s' "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
fi

# Pull before stopping anything, so a failed pull leaves the site running.
log "Pulling images"
compose pull

if [[ "$BACKUP" == 1 ]]; then
  VOLUME="$(docker volume ls -q \
    --filter "label=com.docker.compose.project=$PROJECT" \
    --filter "label=com.docker.compose.volume=cms_data")"
  if [[ -n "$VOLUME" ]]; then
    mkdir -p "$BACKUP_DIR"
    ARCHIVE="$BACKUP_DIR/cms_data-$(date +%Y%m%d-%H%M%S).tar.gz"
    # Stop cms so the SQLite files are consistent; new migrations run on start.
    log "Stopping cms for backup"
    compose stop cms
    log "Backing up $VOLUME to $ARCHIVE"
    docker run --rm -v "$VOLUME":/data:ro -v "$PWD/$BACKUP_DIR":/backup alpine \
      sh -c "tar czf /backup/$(basename "$ARCHIVE") -C /data . && chown $(id -u):$(id -g) /backup/$(basename "$ARCHIVE")"
    if [[ "$KEEP" -gt 0 ]]; then
      ls -1t "$BACKUP_DIR"/cms_data-*.tar.gz | tail -n +"$((KEEP + 1))" | xargs -r rm -f
    fi
  else
    log "No cms_data volume yet (first deploy), skipping backup"
  fi
fi

log "Starting containers"
if ! compose up -d --remove-orphans --wait --wait-timeout 180; then
  compose ps
  compose logs --tail=50
  die "containers did not become healthy"
fi

compose ps

log "Pruning dangling images"
docker image prune -f >/dev/null

DEPLOYED_TAG="$(grep -E '^IMAGE_TAG=' "$ENV_FILE" | cut -d= -f2- || true)"
log "Deployed IMAGE_TAG=${DEPLOYED_TAG:-latest}"
