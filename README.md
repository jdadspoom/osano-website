# OSANO Website

OSANO is a premium innovation lifestyle brand connecting technology, context,
people, pets and better everyday living. This repository contains the first
English-language website foundation built from the approved OSANO sitemap.

## Prerequisites

- Node.js 22 or newer
- npm 10 or newer

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3002](http://localhost:3002). The port is fixed in the
`dev` script and should remain unchanged.

## Quality checks

```bash
npm run validate:content
npm run typecheck
npm run lint
npm run build
npm run check
```

`npm run check` runs content and link validation, TypeScript, ESLint and the
production build in sequence.

## Content architecture

- `data/site.ts` contains the brand statement, base URL and contact details.
- `data/navigation.ts` contains public header and footer navigation.
- `data/worlds.ts` contains Health, Hygiene and Pets brand worlds.
- `data/solutions.ts` contains published and pending solution records.
- `data/products.ts` contains the approved product inventory and relations.
- `data/technologies.ts` contains technology pages and product mappings.
- `data/community.ts` contains editorial and community preview content.
- `data/routes.ts` is the public route inventory used by the sitemap and validator.
- `types/content.ts` defines the shared typed content model.

UI components only render records from these files. Product, solution and
technology pages are generated from the centralized arrays.

## Updating content and assets

See [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) for the detailed workflow.
In short:

- Replace text in the appropriate `data/` record.
- Add approved images, video and documents under `public/`, then add the path to
  the record's media object.
- Update temporary email, phone and address values only in `data/site.ts`.
- Change `status` to `published` only after approval, add the confirmed route,
  and then update `data/routes.ts` and the relevant navigation or relation.

Never publish a pending route or add an unapproved specification,
certification, scientific claim or medical claim.

## Git and Vercel workflow

`feature branch → Local QA → Push → Vercel Preview → Merge main`

Production deployment and merging to `main` happen only after the local and
Vercel Preview review is approved.
