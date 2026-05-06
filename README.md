# qiyang.dev

Personal portfolio, project home, and shadcn registry for Qiyang Wang.

This repository is a personal fork of
[ncdai/chanhdai.com](https://github.com/ncdai/chanhdai.com), adapted for
[qiyang.dev](https://qiyang.dev). The original project provides the foundation;
this fork changes the identity, content, portfolio data, and registry namespace
for my own site.

## Overview

### Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- MDX
- pnpm

### Features

- Portfolio homepage with profile, projects, tech stack, bookmarks, and reading
  notes
- MDX-powered content and component documentation
- Custom shadcn registry under the `@qiyang` namespace
- SEO support with metadata, sitemap, robots, and dynamic OG images
- Light and dark themes
- PWA support
- Analytics hooks for PostHog and OpenPanel

### Registry

Registry source files live in `src/registry/`. Generated registry output lives
in `src/__registry__/` and `public/r/`; those generated files should be rebuilt
instead of edited by hand.

Some unregistered components, examples, and block source files are kept as
upstream references for easier future merges. The published registry surface is
defined by the corresponding `_registry.ts` files.

```bash
pnpm registry:build
```

The default registry URL pattern is:

```txt
https://qiyang.dev/r/{name}.json
```

## Development

Install dependencies:

```bash
pnpm install
```

Copy environment variables:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
pnpm dev
```

The default `dev` script uses Portless with the `qiyang` local domain. If you do
not use Portless, run Next.js directly instead:

```bash
pnpm exec next dev
```

## Scripts

```bash
pnpm dev             # Start the local dev server
pnpm build           # Build for production
pnpm start           # Start the production server
pnpm lint            # Run ESLint
pnpm check-types     # Run TypeScript type checking
pnpm format:write    # Format source files
pnpm registry:build  # Build the shadcn registry
```

## Project Structure

```txt
src/app/              App Router pages, layouts, and API routes
src/components/       Shared application UI
src/features/         Feature modules for portfolio, blog, docs, and sponsors
src/registry/         Registry source components, hooks, blocks, examples, lib
src/__registry__/     Generated registry files
src/config/           Site and registry configuration
public/r/             Generated public registry JSON
```

## Attribution

This site is based on
[ncdai/chanhdai.com](https://github.com/ncdai/chanhdai.com) by Nguyen Chanh Dai.
Please keep the original project attribution when reusing this fork or the
upstream code.

## License

Licensed under the [MIT license](./LICENSE).
