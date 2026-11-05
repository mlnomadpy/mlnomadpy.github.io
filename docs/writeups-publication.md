# Reviewed writeup publication · November 5, 2026

Taha explicitly authorized: “publish all the writups with the dates we used to have”. This covers all 24 personal pieces in the local reviewed writeups collection, including Poem 0.1. The five technical article drafts remain unpublished and outside the production content loader.

The production sources preserve the reviewed prose. Migration changes are limited to publication frontmatter, local draft links becoming production links, and the two reviewed photographs moving to `/writing-images/` with exact image bytes, descriptive alt text and reserved dimensions. The essays retain their direct openings and no internal section headings. Editorial comparison pages, revision notes, original snapshots and technical assets are excluded from the deployment.

Every `pubDate` was compared with the original source at blog revision `91097822996155d168932edef65c6a89836b5369`. Those dates populate visible bylines, listing order, structured data and RSS. Actual revised essays separately retain November 5, 2026 as `updatedDate`. The unchanged four-line poem has no invented revision date and retains CreativeWork / Poetry markup with its known September 20, 2021 publication date.

## Validation

Run `npm run build && npm run check` with Node 24. The combined artifact contains 70 canonical pages, including 24 approved writeups, with exact manifest selection in routes, search, feeds and both sitemaps. Check all production responses after cutover, including dates, schema, CSS, photographs and exclusion of technical drafts.

## Routing and rollback

The separate `mlnomadpy/blog` Pages project previously shadowed `/blog/` on the portfolio domain. Disable that project’s deploy workflow and Pages publishing after the portfolio artifact is deployed, allowing the root Pages site to serve its integrated writing. The legacy repository source/history and `gh-pages` branch remain intact. No legacy technical article is imported by this operation; retired URLs are excluded from the new indexes and sitemap.

Before cutover, the legacy `gh-pages` head was `d722743bfead9d0cbc1ce26f58297064105ec804`; Pages used legacy branch publishing from `gh-pages` at `/`, with no project CNAME. The portfolio prior head was `45c4b03253ee8494c592281d8b5377724c7458ed`. Local rollback evidence is saved in ignored `.blog-review/cutover-2026-11-05/`.

To restore the previous routing, re-enable legacy Pages with `build_type: legacy` and source branch `gh-pages`, path `/`, then re-enable its `deploy.yml` workflow. Revert the portfolio publication commit if the root artifact must also be restored. Do not delete either repository or force-push away its history.
