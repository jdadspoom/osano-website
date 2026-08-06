# OSANO Content Guide

## Source of truth

The approved page inventory and relationship map is
`docs/OSANO-Sitemap-DEV-Ready-v3.pdf`. Content records and public links must
remain aligned with it.

## Edit from one place

| Content | File |
| --- | --- |
| Brand, base URL and contact details | `data/site.ts` |
| Header and footer links | `data/navigation.ts` |
| Health, Hygiene and Pets worlds | `data/worlds.ts` |
| Solution pages and status | `data/solutions.ts` |
| Products and cross-links | `data/products.ts` |
| Technology pages and cross-links | `data/technologies.ts` |
| Stories and community previews | `data/community.ts` |
| Public route inventory | `data/routes.ts` |

## Replace placeholders

1. Add the approved file under a clearly named folder in `public/`.
2. For raster imagery, add `src` and meaningful `alt` values to the appropriate
   media object. The shared component uses `next/image` with stable dimensions.
3. For video or documents, retain the current label until the real interaction
   and downloadable file are approved.
4. Run `npm run validate:content` and `npm run check`.

Do not use external stock-image URLs or add third-party image dependencies.

## Publish a pending item

1. Confirm its public title, slug, claims and mapping against an approved source.
2. Change `status` from `pending` or `draft` to `published`.
3. Set the confirmed public `route`.
4. Add the route to `data/routes.ts` or ensure its published collection generates
   the route.
5. Add navigation only if the approved sitemap calls for it.
6. Verify that every related ID exists and points to a published public page.
7. Run the full check before review.

Current pending records are QRS, Oxygen Wellness Use Cases and Hydrogen Wellness
Use Cases. Their public routes remain intentionally unavailable.

## SEO

Set `NEXT_PUBLIC_SITE_URL` to the approved preview or production origin. Without
it, canonical, sitemap and structured-data URLs use `http://localhost:3002`.
Each content record includes an SEO title and description for generated pages.
