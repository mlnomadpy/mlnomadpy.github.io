# Contributing

This is Taha’s personal website. Keep changes readable, maintainable, and consistent with the direction in `docs/design-audit-and-redesign.md`.

Start with the setup commands in README.md. Before submitting a change, run `npm run build` and `npm run check`, then review relevant pages on desktop and a narrow screen. Check keyboard focus, browser Back, long titles, and multilingual text when affected.

Preserve poem wording and existing public URLs. Avoid invented personal details, unsupported professional claims, placeholder links, and decorative controls. Content should work in the generated HTML before client JavaScript loads.

Use the shared stylesheet in `src/assets/site.css`. Introduce a new component or dependency only when it removes real repetition or solves a concrete need.
