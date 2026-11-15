# Visualization engine

The writing components contain 86 shared-engine canvas figures and one semantic HTML field guide. They are reusable source components, not automatically published pages. The production MDX loader compiles only IDs in `writing/approved-posts.json`; adding visualization source or data does not approve an article.

`writing/src/components/viz/engine/vizkit.js` provides controls, elapsed-time stepping calibrated to 60 Hz, coalesced rendering, reduced-motion support, lazy setup, asynchronous task status, retry, in-page expansion and PNG export with an opaque background. Figures set an explicit `data-min-width` for their actual layout; wide diagrams scroll inside their figure.

## Lifecycle

Keep the existing `defineViz(className, spec)` setup/step/draw interface. `api.onCleanup(fn)` runs before reset and on disposal; `api.onDispose(fn)` and `api.listen(...)` are lifetime-scoped. `api.signal`, `api.generation` and `api.isCurrent(state)` guard asynchronous work. `gate()` and `withJax()` ignore obsolete callbacks and report current failures. Register resources with cleanup rather than attaching permanent document listeners. The shared drag helper returns a disposer and releases pointer capture on cancellation.

Dense boundary and maze visualizations use cooperative typed-array evaluators. They retain all grid points and iteration snapshots. The maze evaluator matches the previous float32 computation; the boundary evaluator uses Float64 with checked agreement to the prior float32 implementation. These are implementation optimizations, not changes to trained weights or model quality.

## Validation

```sh
npm ci
npm run test:visualizations
npm run build
npm run check
```

The engine tests cover display-rate independence, keyboard control boundaries, stale asynchronous results, asset retry, cancellation, reset/disposal, canvas buffer reuse, numeric input and expansion. The Pages workflow runs them before building and checking the site. Existing publication tests verify that unapproved prose, components and routes do not enter feeds, search or deployment output, even with `SHOW_DRAFTS=true`.

Blog drafts and private review pages are not part of this deployment. Publishing an article requires its own explicit owner approval and matching content hash.
