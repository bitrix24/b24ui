# Port: feat(theme): uniformize focus styles across components (#6576)

**Upstream:** `b026ca2cdb0e4d6aff6d271a95e2d7e5e1bd7e3f` (nuxt/ui)
**Decision:** skip

## Upstream change
Large theme change (~50 `src/theme/*` files, 200+ files incl. snapshots):
replaces nuxt/ui's per-component focus styling with one uniform pattern —
`outline-{color}/25 focus-visible:outline-3` (+ `focus-visible:ring-{color}`
where a ring is kept) — built on `options.theme.colors` loops and semantic
tokens (`outline-inverted`, `ring-accented`, `bg-{color}`, …). Also adds a
base `a:focus-visible { outline-offset: 0 }` reset (`index.css`) and
`overflow: hidden` to the accordion/collapsible `@keyframes` (`keyframes.css`).

## b24ui decision — skip (maintainer call)
Not portable 1:1 and **skipped** per maintainer decision (no source change):
- b24ui has its **own focus system in air-design tokens**
  (`focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-(--b24ui-border-color)`,
  `--ui-color-design-selection-content`, `style-blurred-bg-input`, …),
  intentionally different from nuxt/ui's generic `outline`/`ring` model.
- b24ui has **no `options.theme.colors`** — the upstream per-color compound
  structure (`outline-${color}/25`, `bg-${color}`) has no equivalent.
- Adopting upstream's model would overwrite b24ui's air design system focus
  styles (a design regression), so it is not done as part of the sync.

Whether b24ui wants a uniform focus model expressed in air tokens (and the two
generic, design-agnostic bits — the `a:focus-visible` reset and the keyframes
`overflow: hidden`) is tracked separately in **issue #191** for a deliberate
design pass.

No file change — bookkeeping only (ledger marks this `skip`, advances cursor).
