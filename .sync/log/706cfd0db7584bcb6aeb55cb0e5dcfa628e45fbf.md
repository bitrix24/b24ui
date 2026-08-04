# Port: fix(ContentToc): prevent list from collapsing

**Upstream:** `706cfd0db7584bcb6aeb55cb0e5dcfa628e45fbf` (nuxt/ui)
**Decision:** port — adapted (b24ui link metrics differ)

## Upstream change
The desktop ToC list sat in a flex column with `lg:min-h-0`, so it could shrink
to nothing. The fix gives the theme a floor that never inflates a short list:

- `ContentToc.vue` — new `listStyle` computed exposing `--list-height`
  (`links.length * linkHeight` rem, `linkHeight = 1.75`), bound on the desktop
  content div alongside `scrollShadowStyle`.
- `content-toc.ts` — `content` slot `lg:min-h-0` →
  `lg:min-h-[min(var(--list-height,8rem),8rem)]`; `root` drops `lg:overflow-hidden`.

## b24ui port
- **`ContentToc.vue`** — added the same `listStyle` computed and bound it as
  `:style="[listStyle, scrollShadowStyle]"` on the desktop content div.
  **Adapted constant:** upstream's `1.75rem` is for `text-sm` + `py-1`. b24ui's
  link is `text-(length:--ui-font-size-lg)/(--ui-font-line-height-3xs)` +
  `pb-[12px]`, i.e. `15px x 1.2 = 18px` line box + `12px` padding = **30px**.
  Used px (`${count * 30}px`) rather than rem — b24ui's design tokens are
  px-based, so this stays exact regardless of root font size. `min()` mixes
  units fine, so the theme expression is unchanged from upstream.
- **`content-toc.ts`** — `content` slot `lg:min-h-0` →
  `lg:min-h-[min(var(--list-height,8rem),8rem)]` (verbatim).

### Skipped
- **`root` slot `lg:overflow-hidden` removal** — not applied. Upstream's `root`
  is a sticky scroll container (`overflow-y-auto ... max-h-[calc(100vh-...)]`)
  where the `lg:` override had to go so the root scrolls on desktop too.
  b24ui's `root` is just `flex flex-col lg:overflow-hidden` with no
  `overflow-y-auto` and no `max-h`, so dropping it would only remove clipping
  with nothing compensating. The collapse fix does not depend on it.

## Tests
Regenerated `ContentToc.spec.ts.snap` (16 snapshots). Diff is exactly the two
expected deltas: the `content` slot's `lg:min-h-0` → `lg:min-h-[min(...)]`, and
`style="--list-height: 210px"` on the desktop content div (7 links x 30px).
The mobile collapsible content carries the class but no inline var — it falls
back to `8rem`, and the `lg:` prefix makes it inert below the breakpoint.

## Verify (CI=true)
`lint` · `typecheck` · `test` · `build` — all green.
