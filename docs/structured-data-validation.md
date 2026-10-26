# Structured data validation

Validated locally on 2026-10-26. The changes have not been deployed.

## Coverage

Every indexable portfolio page has one server-rendered JSON-LD graph, including a shared `Person` and `WebSite` identity. The graph uses the production canonical URL and updates during client navigation. The old static homepage script was removed to prevent duplicate identities.

| Pages | Schema |
| --- | --- |
| Home | `WebPage`, about the author |
| About and CV | `ProfilePage`, with the author as `mainEntity` |
| Research | `CollectionPage`, ordered `ItemList`, three `ScholarlyArticle` references |
| Talks | `CollectionPage`, ordered `ItemList` matching the visible filtered results |
| Each talk | `WebPage`, presentation `CreativeWork`, `VideoObject` for verified recordings, `PresentationDigitalDocument` for available slides |
| Poetry | `CollectionPage`, ordered `ItemList` |
| Each poem | `WebPage`, `CreativeWork` with genre `Poetry`, original text and language |
| Music | `CollectionPage`, curated `MusicPlaylist`, six visible `MusicRecording` selections |
| Non-root content pages | `BreadcrumbList` following the site’s navigation |

Coverage totals: **44 canonical content pages**, **45 generated HTML documents with schema** (including the `/about` alias of `/aboutme`), and **27 recording pages** backed by **26 unique verified videos**. Two time-series sessions share a combined recording. The generated 404 and unknown detail routes are `noindex` and contain no JSON-LD. A neutral keyed JSON script replaces stale fallback metadata on missing routes.

The separate `/blog/` project and other repositories hosted on this domain are outside this change.

## Validation results

| Check | Result |
| --- | --- |
| Generated HTML, every page | Passed JSON parsing, official vocabulary subset, domains/ranges, entity links, canonical identities, duplicate detection and visible-content checks |
| Schema.org Validator, combined graph from every generated page | **44 page items, 0 errors, 0 warnings** |
| Google Rich Results Test, About HTML | **2 valid items:** profile and breadcrumbs |
| Google Rich Results Test, representative recording HTML | **2 valid items:** video and breadcrumbs |
| Google Rich Results Test, Research HTML | **4 valid items:** three articles and breadcrumbs; optional article-image recommendations |
| Browser navigation | One current graph through Home, About, Research, filtered Talks, talk detail, Poetry, successive poem details and Music; missing talk has no JSON-LD; returning to Music restores the graph and indexing metadata |
| Regression tests | Safe script serialization, valid linked profiles, invalid vocabulary, duplicate IDs, dangling references, missing video dates and impossible calendar dates |

Google’s optional `image` recommendation applies to each scholarly reference. The bibliography has no article-specific images, so those fields remain absent. No errors were reported. These are bibliography references to external publications, not hosted full articles.

External tests used **code input**, since Google cannot fetch localhost. Schema.org received a deduplicated graph assembled from all generated documents; Google received complete generated HTML for the three representative pages. These tests validate markup, not live crawling or media retrieval. After deployment, run URL tests against production and check Search Console following recrawl. Rich-result display is never guaranteed.

Google result links (temporary service-generated results): [About](https://search.google.com/test/rich-results/result?id=XuoTxq54dzgkXRre-ZkYzA), [recording](https://search.google.com/test/rich-results/result?id=wya-EMLocGV06zYdK5uabA), [Research](https://search.google.com/test/rich-results/result?id=4vLIshav7pvuD4x5nCn3Ow).

The subsequent [SEO audit](seo-audit.md) changed recording pages to native lazy-loaded privacy-enhanced iframes so their videos can be discovered without a click. It also added responsive WebP artwork and recording-specific social images. All generated-page schema checks were rerun after these changes. The external code-test results above document the earlier schema validation, not a post-deployment URL test.

## Metadata accuracy

- Recording publication timestamps and durations were read from the original YouTube watch-page metadata. `src/data/video-metadata.json` preserves each source URL, source title and verification date. A recording’s upload date is displayed beside its talk metadata; it is not presented as the event date.
- Two incorrect talk links were corrected using original DevMENA recordings: [Transformers](https://www.youtube.com/watch?v=LKgnuzgYv6w) and [LoRA](https://www.youtube.com/watch?v=fqwOjLxrUcA). Both had pointed to the GAN recording. Titles and existing portfolio URLs were preserved.
- Video `embedUrl` points to the privacy-enhanced player. A YouTube watch page is never presented as a downloadable `contentUrl`.
- Poems use the supported `CreativeWork` type with genre `Poetry`. Year-only and year-range labels are not converted into invented complete dates. Full poem text appears only in detail-page schema.
- Research submission/presentation dates are not asserted as publication dates. Venue names are represented as the containing creative work.
- Playlist ownership does not imply authorship of the songs, and six preview tracks are not asserted to be the complete playlist length.
- The decorative homepage background film is not presented as a watch-page video.

## Reproduce and maintain

```sh
npm run build
npm run check
```

`npm run check:schema` reruns schema tests against an existing build. The deploy workflow runs the same checks. Generated validation fixtures and the per-page report are in the ignored `.schema-validation/` directory. Paste `schemaorg-input.html` into [Schema.org Validator](https://validator.schema.org/) or a representative complete HTML fixture into [Google Rich Results Test](https://search.google.com/test/rich-results).

The builders live in `src/utils/structuredData.js`; `usePageMeta` owns the single head script. Collection graphs use the same source data as the visible views. When adding a recording, verify its original timestamp and duration and add its source to `video-metadata.json`. When adding routes or vocabulary, update the coverage assertions and reviewed vocabulary subset as appropriate.

`scripts/schema-vocabulary.json` is a reviewed subset of the [official Schema.org vocabulary](https://schema.org/version/latest/schemaorg-current-https.jsonld), retrieved on 2026-10-26. The local validator checks the emitted subset, not every rule in the full Schema.org or Google ecosystem; external validators remain part of release verification.

References: [Schema.org validation](https://schema.org/docs/validator.html), [Google profile pages](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [Google videos](https://developers.google.com/search/docs/appearance/structured-data/video), [Google breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [CreativeWork](https://schema.org/CreativeWork), [ScholarlyArticle](https://schema.org/ScholarlyArticle), [MusicPlaylist](https://schema.org/MusicPlaylist).
