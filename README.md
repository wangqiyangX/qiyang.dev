# [qiyang.dev](https://qiyang.dev)

Qiyang Wang's personal website and shadcn registry.

## Overview

### Stack

- Next.js 16
- Tailwind CSS v4
- shadcn/ui
- MDX
- pnpm
- Vercel

### Featured

- Personal profile and project pages
- Blog and component documentation powered by MDX
- Light and dark themes
- vCard integration
- SEO metadata, JSON-LD, sitemap, and robots
- AI-readable `/llms.txt` and raw `.mdx` endpoints
- Installable PWA
- shadcn registry for reusable components, hooks, blocks, examples, and utilities

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md).

```bash
pnpm install
pnpm dev
pnpm check-types
pnpm build
```

## Registry

Registry source files live in `src/registry/`. Generated registry output lives in `src/__registry__/` and `public/r/`.

```bash
pnpm registry:build
```

## License

Licensed under the [MIT license](./LICENSE).
