# web-alkautsar

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Start, Self, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - SSR framework with TanStack Router
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **Shared UI package** - shadcn/ui primitives live in `packages/ui`
- **Turborepo** - Optimized monorepo build system
- **Oxlint** - Oxlint + Oxfmt (linting & formatting)

### Beranda

- `/` implements Pencil desktop `jeYAp` and mobile `j1g948`, in Bahasa Indonesia only; no language switcher.
- Desktop retains the split aerial-photo hero and gallery. Mobile uses the green text-only hero, address before prayer times, stacked activity archive, and compact footer.
- Prayer times remain live Aladhan data, with the supplied unavailable state when data cannot be loaded. No hardcoded schedule replaces the existing integration.
- Navigation preserves the design's groups. Unbuilt destinations are marked `Belum tersedia` and are not links; confirmed routes, Google Maps, and Instagram remain actionable.
- Existing mosque imagery, Plus Jakarta Sans, and green/cream tokens retain the supplied identity. Brown section labels organize content; relevant icons distinguish location, schedule, and archive; darker text improves contrast. Dials: ENERGY 1 / RHYTHM 2 / MOTION 1.

### Artikel Pilihan

- `/artikel` implements Pencil desktop `C94Phy` and mobile `l4TUz`: editorial highlight, article cards, search, category/period filters, and the official-content empty state.
- `/artikel/detail` displays the sourced sample text; `?contoh=2` displays the second sample's available metadata and its missing-manuscript state.
- Content lives in `apps/web/src/lib/artikel.ts`. Samples have no confirmed author or publication date and are visibly labeled, not official publications.
- No pagination is shown for the two available samples. Additional pages require additional content, not duplicate sample cards.
- The existing green/cream palette and Plus Jakarta Sans follow the mosque design; the split highlight establishes hierarchy, while cards organize the remaining readings. Article-page text and control borders use darker shades for legibility.

### Layanan Masjid

- `/layanan` implements Pencil desktop `a3XXZR` and mobile `gVrZC`: validation notice, searchable sample cards, service filter, and the official-service empty state.
- `/layanan/detail` and `?contoh=2` show the corresponding sample and its unconfirmed-detail state. Service terms, schedules, and contact details are not invented.
- Content lives in `apps/web/src/lib/layanan.ts`. The period control is disabled until service dates are confirmed; search and service filters combine, with a reset action for no matches.
- `/kontak` uses the existing site address, Instagram, and Google Maps destinations. No unverified phone number or booking action is shown.
- Green/cream tokens, Plus Jakarta Sans, restrained corner radii, relevant location/conversation icons, and responsive spacing follow the supplied design. Equal cards present peer examples, while the pale notice and empty state distinguish unconfirmed official content. Page-local darker text and control borders improve legibility. Dials: ENERGY 1 / RHYTHM 1 / MOTION 1.

### Sejarah Masjid

- `/profil/sejarah` implements Pencil desktop `oNcSw` and mobile `iJaFb`, using the existing site header and footer.
- Desktop pairs the original aerial and exterior photos above a two-column narrative and timeline. Mobile keeps the aerial photo and stacks the narrative and timeline.
- The supplied validation notice and editorial placeholders remain visible. Founding dates and historical events are not invented; no asynchronous history data is fetched.
- Sejarah is available in desktop and mobile profile navigation and from the existing profile card. The return link opens `/profil`.
- Green/cream tokens, Plus Jakarta Sans, restrained radii, and responsive spacing preserve the supplied identity. The pale notice separates unverified content; the numbered list represents the proposed chronology; the return arrow signals navigation. Page-local darker text and button borders improve contrast. Dials: ENERGY 1 / RHYTHM 2 / MOTION 1.

### Agenda Detail

- `/agenda/detail` implements Pencil desktop `S3OWLQ` and mobile `LjtIz`. The existing agenda card opens this route.
- Desktop pairs the existing congregation photo with the information panel; mobile stacks the cropped photo above it. Shared navigation and footer remain unchanged.
- The design's sample warning, unconfirmed event details, inactive-registration notice, and related-agenda empty state remain explicit. Return and inquiry links open `/agenda` and `/kontak`; no registration is offered.
- Existing green/cream tokens and Plus Jakarta Sans preserve mosque identity. The pale panel groups event facts; directional arrows mark navigation; page-local darker text and borders improve contrast. Dials: ENERGY 1 / RHYTHM 2 / MOTION 1.

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the fullstack application.

## UI Customization

React web apps in this stack share shadcn/ui primitives through `packages/ui`.

- Change design tokens and global styles in `packages/ui/src/styles/globals.css`
- Update shared primitives in `packages/ui/src/components/*`
- Adjust shadcn aliases or style config in `packages/ui/components.json` and `apps/web/components.json`

### Add more shared components

Run this from the project root to add more primitives to the shared UI package:

```bash
npx shadcn@latest add accordion dialog popover sheet table -c packages/ui
```

Import shared components like this:

```tsx
import { Button } from "@web-alkautsar/ui/components/button";
```

### Add app-specific blocks

If you want to add app-specific blocks instead of shared primitives, run the shadcn CLI from `apps/web`.

## Environment Configuration

Each app owns its environment schema in `.env.schema`. Varlock generates `src/env.ts` during installation; run `bun run env:generate` after changing a schema. Commit schemas, and keep secrets in ignored env files or your deployment platform.

Import the generated `ENV` accessor in application code. Shared database and auth packages receive configuration or initialized clients from the application. See [Varlock's monorepo guide](https://varlock.dev/guides/monorepos/).

Bun's automatic env loading is disabled in `bunfig.toml`; the framework integration or server bootstrap loads Varlock. Node deployments must include Varlock and its dependencies alongside the app schema.

Run standalone Node/Bun tools that use Varlock from the owning app directory so they load that app's schema and env files. `env:generate` only generates TypeScript files; it does not initialize environment values in a subsequent command.

## Deployment

### Docker Compose

- Target: web + server
- Config: `docker-compose.yml` (app Dockerfiles live in `apps/*/Dockerfile`)
- Build images: bun run docker:build
- Start: bun run docker:up
- Logs: bun run docker:logs
- Stop: bun run docker:down

Environment variables are read from each app's `.env` file (baked into web builds for public variables) and overridden in `docker-compose.yml` for container networking.

For more details, see the guide on [Deploying with Docker Compose](https://www.better-t-stack.dev/docs/guides/docker).

## Git Hooks and Formatting

- Run checks: `bun run check`

## Project Structure

```
web-alkautsar/
├── apps/
│   └── web/         # Fullstack application (React + TanStack Start)
├── packages/
│   ├── ui/          # Shared shadcn/ui components and styles
```

## Available Scripts

- `bun run dev`: Start all applications in development mode
- `bun run build`: Build all applications
- `bun run dev:web`: Start only the web application
- `bun run check-types`: Check TypeScript types across all apps
- `bun run check`: Run Oxlint and Oxfmt
- `bun run docker:build`: Build the Docker Compose images
- `bun run docker:up`: Build and start the Docker Compose stack
- `bun run docker:logs`: Tail logs from the Docker Compose stack
- `bun run docker:down`: Stop the Docker Compose stack
