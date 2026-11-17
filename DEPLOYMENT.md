# Deployment

The site runs in two places:

| Part  | Runs on                         | Deployed by                             | Purpose                                         |
| ----- | ------------------------------- | --------------------------------------- | ----------------------------------------------- |
| `web` | Cloudflare Workers              | `.github/workflows/cloudflare.yml`      | TanStack Start SSR app                          |
| `cms` | A server with Docker, port 8090 | `deploy.sh` + `docker-compose.prod.yml` | PocketBase: content, uploads, admin UI at `/_/` |

The Worker calls the CMS over the internet, and browsers load uploaded images from it, so the CMS domain must be public. Deploy the CMS first (steps 1 to 5), then the web app (step 7).

To run both parts locally in Docker, use `docker-compose.yml` (`bun run docker:up`). It still builds `apps/web/Dockerfile`.

## 1. CMS image (GitHub Actions)

Workflow: `.github/workflows/docker.yml`. It builds the `cms` image for `linux/amd64` and pushes it to `ghcr.io/reynadi531/web-alkautsar-cms`.

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

After the first push, the package shows up under the GitHub profile → Packages. It is private by default. Either make it public (package → Package settings → Change visibility) or log the server in to GHCR (step 3).

ARM server (e.g. Ampere, Raspberry Pi): set `platforms: linux/amd64,linux/arm64` in the workflow and add a `docker/setup-qemu-action@v4` step before Buildx. Emulated builds are much slower.

## 2. Server prerequisites

- Linux host with Docker Engine and the Compose plugin (`docker compose version`).
- A DNS record pointing at the server, for example `cms.alkautsar.example.org`.
- Ports 80 and 443 open. 8090 stays closed: the compose file binds it to `127.0.0.1` only.

## 3. First deploy

```sh
# On the server
mkdir -p /opt/web-alkautsar && cd /opt/web-alkautsar
# Copy docker-compose.prod.yml and deploy.sh from the repo, then:
chmod +x deploy.sh
./deploy.sh

# If the GHCR package is private. Token: classic PAT with read:packages.
GHCR_USER=<github-username> GHCR_TOKEN=<token> ./deploy.sh
```

`deploy.sh` creates `.env` on the first run, pulls the image, starts `cms`, and waits until it is healthy. On first start PocketBase runs the migrations in `apps/cms/pb_migrations`, which create the schema and seed the initial content.

Create the CMS admin account. The leading space keeps the password out of shell history when `HISTCONTROL=ignorespace` is set:

```sh
 docker compose -f docker-compose.prod.yml exec cms \
  /pb/pocketbase superuser upsert admin@example.org 'a-long-password' --dir=/pb/pb_data
```

Then sign in at `https://cms.alkautsar.example.org/_/` (after step 4).

## 4. Reverse proxy (HTTPS)

Any proxy works. Example with [Caddy](https://caddyserver.com/), which fetches TLS certificates automatically. `/etc/caddy/Caddyfile`:

```caddyfile
cms.alkautsar.example.org {
	request_body {
		max_size 50MB
	}
	reverse_proxy 127.0.0.1:8090
}
```

```sh
sudo systemctl reload caddy
curl -fsS https://cms.alkautsar.example.org/api/health
```

## 5. Updates

Run `deploy.sh` again. It pulls the image, backs up `cms_data` to `./backups` (stopping `cms` briefly), starts `cms`, and waits for it to be healthy.

```sh
./deploy.sh                    # deploy IMAGE_TAG from .env (default latest); generates .env if missing
./deploy.sh --init             # (re)generate .env only, no deploy
./deploy.sh --tag 1.2.3        # pin a version (saved to .env); also used to roll back
./deploy.sh --no-backup        # skip the backup
./deploy.sh --keep 14          # backups to keep (default 7)
```

New migrations in `pb_migrations` run automatically when the `cms` container restarts.

Roll back: `./deploy.sh --tag <previous tag>`. If the newer `cms` already ran a migration, restore the backup taken before the update (step 6).

Servers set up before the web app moved to Cloudflare also ran a `web` container. The next `./deploy.sh` removes it. Remove the web domain's block from the Caddyfile too.

## 6. Backups

All content (database and uploads) lives in the `web-alkautsar_cms_data` volume. `deploy.sh` backs it up before each update. Manual backup and restore:

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

## 7. Web app (Cloudflare Workers)

`NITRO_PRESET=cloudflare_module` builds `apps/web` for Workers. Without it, the build targets Node (`node-server`), which the local Docker setup uses.

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

After setting them, run the workflow once from the Actions tab (Cloudflare Workers → Run workflow).

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

## Environment reference

Server, in `.env` next to `docker-compose.prod.yml` (generated by `deploy.sh`):

| Variable    | Required | Default  | Notes         |
| ----------- | -------- | -------- | ------------- |
| `IMAGE_TAG` | no       | `latest` | CMS image tag |

Web app, at Worker build time (GitHub variables or shell environment):

| Variable                | Required | Notes                                                       |
| ----------------------- | -------- | ----------------------------------------------------------- |
| `POCKETBASE_URL`        | yes      | CMS address the Worker calls for content                    |
| `POCKETBASE_PUBLIC_URL` | yes      | CMS address browsers use for images and files; usually same |

## Troubleshooting

- `cms` stays unhealthy: `docker compose -f docker-compose.prod.yml logs cms`.
- Pages show no content or 500s: the Worker cannot reach `POCKETBASE_URL`. Check `curl https://cms.<domain>/api/health` from outside the server, then redeploy the Worker if the URL changed.
- Images missing on pages: `POCKETBASE_PUBLIC_URL` is wrong or the CMS domain is not reachable from the browser.
- Cloudflare workflow skipped: the `POCKETBASE_URL` repository variable is not set.
- `denied` on pull: the package is private and the server is not logged in to GHCR.
- Uploads fail with 413: raise the proxy's body size limit.
