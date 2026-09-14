# port — nuxt/ui@5fd94e13650caba0fbcab4a61abda8ceb35c406d

**Upstream:** docs: add theme editor (#6675)

**Decision:** port — **one token of 368 files**. Everything else is n/a. Sixth
of ten commits in this run, taken with `7224333b` (§6 4b, contiguous).

## Upstream change

368 files, all under `docs/`, and none outside it — checked by listing rather
than by reading the summary. It builds a "Theme Studio": an interactive editor
for their colour system, with `useThemeStudio` (517 new lines),
`useThemeStudioHistory`, `useThemeStudioToolbar`, `useTokenShades`, a curve
editor, a palette editor, preset picker, shuffle and share, plus a gallery of 17
new playground components. The old `ThemePicker` (267 lines) and
`ThemePickerButton` are deleted in the same move.

## Why almost none of it applies

**The thing it edits does not exist here.** The Theme Studio lets a reader pick
and reshape a Tailwind colour palette — shades, curves, presets. This fork's
colours are a fixed, enumerated set of Bitrix24 *air* styles mapped to CSS style
tokens: `'air-primary': '--style-filled'`, `'air-primary-success'`,
`'air-primary-alert'` and so on. There is no palette to shuffle and no shade to
drag. This fork has no `ThemePicker` either, and no `theme.vue` page — our docs
pages are `index`, `showcase`, `templates`, `docs`, `examples`.

Same shape as `fbb9e220` (ProseCodeTree): not "we declined it", but "the premise
is absent".

**The rest of the commit is upstream's docs site, and ours is a different site.**
20 of the modified text files exist here by the same path, which looks like
overlap until the contents are compared. Not one carries upstream's pre-image —
measured, file by file, against `5fd94e13^`:

| file | lines differing from upstream's pre-image |
| --- | --- |
| `docs/nuxt.config.ts` | 871 |
| `docs/server/api/ai.post.ts` | 453 |
| `docs/content/…/2.css-variables.md` | 395 |
| `docs/app/composables/useTheme.ts` | 362 |
| `docs/app/pages/index.vue` | 361 |
| … 15 more, none identical | |

So the hunks do not apply as written anywhere, and adapting 368 files would be
building a different product's site rather than porting a commit.

## The one token that does apply

`PopoverAnchorSlotExample.vue` changes
`w-(--reka-popper-anchor-width)` → `w-(--reka-popover-trigger-width)`. Our copy
of that example carries the old name — the only occurrence in the whole tree,
checked across `src/`, `docs/app`, `docs/content` and the playgrounds.

**It is a rename, not a fix, and the difference is worth stating.** Read from the
installed reka rather than assumed: `PopoverContentImpl.vue:81` sets
`'--reka-popover-trigger-width': 'var(--reka-popper-anchor-width)'` — the new
name is an alias of the old one, on the same element. Both resolve identically
and nothing renders differently.

Taken anyway because a docs example is what a reader copies, and the alias is the
documented Popover-level name; the generic Popper variable is an implementation
detail that happens to be exposed. No behaviour claim attached to it.
