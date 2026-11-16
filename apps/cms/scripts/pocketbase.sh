#!/usr/bin/env sh
# Runs the pinned PocketBase binary, downloading it on first use.
set -eu

VERSION="${POCKETBASE_VERSION:-0.40.6}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BIN="$ROOT/.bin/pocketbase-$VERSION"

if [ ! -x "$BIN" ]; then
  case "$(uname -s)" in
    Linux) os=linux ;;
    Darwin) os=darwin ;;
    *) echo "Unsupported OS: $(uname -s). Download PocketBase $VERSION manually to $BIN" >&2; exit 1 ;;
  esac
  case "$(uname -m)" in
    x86_64 | amd64) arch=amd64 ;;
    arm64 | aarch64) arch=arm64 ;;
    *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
  esac

  url="https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${os}_${arch}.zip"
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT
  echo "Downloading PocketBase $VERSION ($os/$arch)..." >&2
  curl -fsSL "$url" -o "$tmp/pocketbase.zip"
  unzip -q "$tmp/pocketbase.zip" pocketbase -d "$tmp"
  mkdir -p "$ROOT/.bin"
  mv "$tmp/pocketbase" "$BIN"
  chmod +x "$BIN"
fi

cd "$ROOT"
exec "$BIN" "$@" \
  --dir="${POCKETBASE_DATA_DIR:-$ROOT/pb_data}" \
  --migrationsDir="$ROOT/pb_migrations" \
  --hooksDir="$ROOT/pb_hooks"
