# Deployment

The site runs as two containers:

| Service | Image                                  | Port | Purpose                                         |
| ------- | -------------------------------------- | ---- | ----------------------------------------------- |
| `web`   | `ghcr.io/reynadi531/web-alkautsar-web` | 3001 | TanStack Start SSR app                          |
| `cms`   | `ghcr.io/reynadi531/web-alkautsar-cms` | 8090 | PocketBase: content, uploads, admin UI at `/_/` |

GitHub Actions builds the images; a server pulls them and runs them with `docker-compose.prod.yml` behind a reverse proxy that handles HTTPS.

The `web` app can instead run on Cloudflare Workers, with only `cms` on the server. See [Cloudflare Workers (web)](#7-cloudflare-workers-web).

## 1. Images (GitHub Actions)

Workflow: `.github/workflows/docker.yml`. It builds `web` and `cms` in parallel for `linux/amd64`.

| Trigger                                                 | Pushed tags                   |
| ------------------------------------------------------- | ----------------------------- |
| Push to `main`                                          | `latest`, `sha-<short>`       |
| Push tag `v1.2.3`                                       | `1.2.3`, `1.2`, `sha-<short>` |
| Pull request to `main`                                  | Builds only, pushes nothing   |
| Manual run (Actions tab → Docker images → Run workflow) | Same as the branch it runs on |

No secrets to configure: the workflow pushes with the built-in `GITHUB_TOKEN`.

Cut a release:

```sh
git tag v1.0.0
git push origin v1.0.0
```

After the first push, the packages show up under the GitHub profile → Packages. They are private by default. Either make each one public (package → Package settings → Change visibility) or log the server in to GHCR (step 3).

ARM server (e.g. Ampere, Raspberry Pi): set `platforms: linux/amd64,linux/arm64` in the workflow and add a `docker/setup-qemu-action@v4` step before Buildx. Emulated builds are much slower.

## 2. Server prerequisites

- Linux host with Docker Engine and the Compose plugin (`docker compose version`).
- Two DNS records pointing at the server, for example:
  - `alkautsar.example.org` → web
  - `cms.alkautsar.example.org` → CMS. Browsers load uploaded images from here, so it must be public.
- Ports 80 and 443 open. 3001 and 8090 stay closed: the compose file binds them to `127.0.0.1` only.

## 3. First deploy

```sh
# On the server
mkdir -p /opt/web-alkautsar && cd /opt/web-alkautsar

# Copy docker-compose.prod.yml and deploy.sh from the repo, then generate .env
# (prompts for the values, or pass them as flags):
./deploy.sh --init --public-url https://cms.alkautsar.example.org

# Only if the GHCR packages are private. Token: classic PAT with read:packages.
echo "$GHCR_TOKEN" | docker login ghcr.io -u <github-username> --password-stdin

docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml ps   # both should become "healthy"
```

On first start PocketBase runs the migrations in `apps/cms/pb_migrations`, which create the schema and seed the initial content.

Create the CMS admin account:

```sh
docker compose -f docker-compose.prod.yml exec cms \
  /pb/pocketbase superuser upsert admin@example.org 'a-long-password' --dir=/pb/pb_data
```

Then sign in at `https://cms.alkautsar.example.org/_/`.

## 4. Reverse proxy (HTTPS)

Any proxy works. Example with [Caddy](https://caddyserver.com/), which fetches TLS certificates automatically. `/etc/caddy/Caddyfile`:

```caddyfile
alkautsar.example.org {
	reverse_proxy 127.0.0.1:3001
}

cms.alkautsar.example.org {
	request_body {
		max_size 50MB
	}
	reverse_proxy 127.0.0.1:8090
}
```

```sh
sudo systemctl reload caddy
```

## 5. Updates

Copy `deploy.sh` next to `docker-compose.prod.yml` and run it. It pulls the images, backs up `cms_data` to `./backups` (stopping `cms` briefly), starts the stack, and waits for both services to be healthy.

```sh
./deploy.sh                    # deploy IMAGE_TAG from .env (default latest); generates .env if missing
./deploy.sh --init             # (re)generate .env only, no deploy
./deploy.sh --tag 1.2.3        # pin a version (saved to .env); also used to roll back
./deploy.sh --no-backup        # skip the backup
GHCR_USER=me GHCR_TOKEN=... ./deploy.sh   # log in first (private packages)
```

Manual equivalent:

```sh
cd /opt/web-alkautsar
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
docker image prune -f
```

New migrations in `pb_migrations` run automatically when the `cms` container restarts. Back up first (step 6).

Pin a version: set `IMAGE_TAG=1.2.3` (or `sha-abc1234`) in `.env`, then `pull` and `up -d`.

Roll back: set `IMAGE_TAG` to the previous tag and `up -d`. If the newer `cms` already ran a migration, restore the backup taken before the update.

## 6. Backups

All content (database and uploads) lives in the `web-alkautsar_cms_data` volume. The `web` container holds no state.

```sh
# Backup
docker compose -f docker-compose.prod.yml stop cms
docker run --rm -v web-alkautsar_cms_data:/data -v "$PWD":/backup alpine \
  tar czf /backup/cms_data-$(date +%F).tar.gz -C /data .
docker compose -f docker-compose.prod.yml start cms

# Restore
docker compose -f docker-compose.prod.yml stop cms
docker run --rm -v web-alkautsar_cms_data:/data -v "$PWD":/backup alpine \
  sh -c 'rm -rf /data/* && tar xzf /backup/cms_data-YYYY-MM-DD.tar.gz -C /data'
docker compose -f docker-compose.prod.yml start cms
```

Copy the archives off the server. PocketBase can also schedule backups to S3 itself: admin UI → Settings → Backups.

## 7. Cloudflare Workers (web)

Optional alternative to the `web` container. The CMS stays on the server (steps 2 to 6); the Worker calls it over the internet, so the CMS domain must be public.

The same code builds for both targets. `NITRO_PRESET` picks the target: unset means `node-server` for Docker, `cloudflare_module` means Workers.

On Workers, `POCKETBASE_URL` and `POCKETBASE_PUBLIC_URL` are baked in at build time, not read at startup. Changing them needs a redeploy. The build fails if either is unset or points at `localhost`/`127.0.0.1`. Usually both are the public CMS URL.

### Automatic deploys (GitHub Actions)

Workflow: `.github/workflows/cloudflare.yml`. It deploys on every push to `main` (except CMS-only or docs-only changes) and from the Actions tab. It stays skipped until `POCKETBASE_URL` is set.

Repository → Settings → Secrets and variables → Actions:

| Name                    | Kind     | Value                                                                               |
| ----------------------- | -------- | ----------------------------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | secret   | Cloudflare dashboard → My Profile → API Tokens → "Edit Cloudflare Workers" template |
| `CLOUDFLARE_ACCOUNT_ID` | secret   | Cloudflare dashboard → Workers & Pages → Account ID                                 |
| `POCKETBASE_URL`        | variable | `https://cms.alkautsar.example.org`                                                 |
| `POCKETBASE_PUBLIC_URL` | variable | Optional, defaults to `POCKETBASE_URL`                                              |

### Manual deploy

```sh
bunx wrangler login   # once, opens the browser
POCKETBASE_URL=https://cms.alkautsar.example.org \
POCKETBASE_PUBLIC_URL=https://cms.alkautsar.example.org \
  bun run deploy:cf
```

To try the Workers build locally first, run `bun run preview:cf` in `apps/web` with the same variables. It serves the build on `http://localhost:8787`.

### Domain

The Worker is named `web-alkautsar` (set in `apps/web/nitro.config.ts`) and is first served at `web-alkautsar.<account>.workers.dev`. To use your own domain: Workers & Pages → `web-alkautsar` → Settings → Domains & Routes → Add → Custom domain. The domain's DNS must be on Cloudflare.

If the web domain moves to Cloudflare, remove its block from the Caddyfile (step 4) and keep only the CMS block. The `web` container is then unused. It listens only on `127.0.0.1`, so leaving it running is harmless.

## Environment reference

Set in `.env` next to `docker-compose.prod.yml`:

| Variable                | Required | Default  | Notes                                                 |
| ----------------------- | -------- | -------- | ----------------------------------------------------- |
| `POCKETBASE_PUBLIC_URL` | yes      | none     | Public CMS URL that browsers use for images and files |
| `IMAGE_TAG`             | no       | `latest` | Image tag for both services                           |

`POCKETBASE_URL` is fixed to `http://cms:8090` in the compose file, so server-side requests stay on the internal network. Both URLs are read when the server starts, so changing them needs only a restart, not a rebuild.

## Troubleshooting

- `web` stays unhealthy: check `docker compose -f docker-compose.prod.yml logs web`. It waits for `cms` to be healthy before starting.
- Images missing on pages: `POCKETBASE_PUBLIC_URL` is wrong or the CMS domain is not reachable from the browser.
- `denied` on pull: the package is private and the server is not logged in to GHCR.
- Uploads fail with 413: raise the proxy's body size limit.
