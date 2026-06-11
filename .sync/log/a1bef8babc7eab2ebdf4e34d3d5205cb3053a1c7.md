# port — nuxt/ui@a1bef8babc7eab2ebdf4e34d3d5205cb3053a1c7

**Upstream:** feat(ContentSearch): add async search support via `useSearchCollection` (#6432)

**Decision:** port (core + docs 1:1, per user). Large: 93 files upstream.

## Core (src/test/locale)
- **utils**: `git mv fuse.ts → search.ts`; added `sanitizeSnippet` (escapes FTS
  snippets to safe HTML, preserving `<mark>`). Updated the lone importer
  (`CommandPalette.vue`).
- **useContentSearch.ts**: added `mapLinks`, `findNavItem`, `mapSearchResults`.
  **Adaptation:** upstream uses `appConfig.ui.icons.file/hash` (string names);
  b24ui uses its **`icons` dictionary** (b24icons component objects) + the
  `IconComponent` type cast — already the file's established pattern. Imported
  `sanitizeSnippet` from `../utils/search`.
- **ContentSearch.vue**: new optional props `search?: ContentSearchFn` and
  `searchStatus?: ContentSearchStatus` + new interfaces (ContentSearchResult/
  Options/Status/Fn); debounced `runSearch` with a stale-response request-id
  guard; `linksGroup`/`searchGroups`/`navigationGroups`; `groups` branches on
  `props.search` (async results) vs navigation (Fuse). **Default Fuse path is
  unchanged when `search` is not passed** → no regression for existing users.
- **types/locale.ts**: added required `contentSearch.search`. Added the key to
  **all 20 b24ui locales** with translations mapped from upstream by language
  (b24ui codes → upstream: br→pt_br, in→hi, kz→kk, la→es, sc→zh_cn, tc→zh_tw,
  ua→uk, vn→vi; rest direct). Upstream's anthropic/iconify-only locales N/A.
- **tests**: new `test/utils/search.spec.ts` (sanitizeSnippet, 6 cases);
  `ContentSearch.spec.ts` async-search describe block + `with search function`
  render case; regenerated snapshot.

## Docs (1:1, adapted — done partly via sub-agent, reviewed)
- `app.vue`: removed the `useLazyAsyncData('search', …)` files block + the
  b24ui-only `provide('files', files)`; `<Search>` no longer passed `:files`.
- `error.vue`: **skipped** — b24ui's error.vue has no files/Search block.
- `search/Search.vue`: switched to `useSearchCollection('docs', …)` + `open`
  watcher calling `init()`; passes `:search`/`:search-status`; kept
  `B24ContentSearch` + `:color-mode="false"`. Fuse opts → `resultLimit: 20`,
  `useTokenSearch:false`, `threshold:0`.
- `useSearch.ts`: moved the `framework` group first (kept b24ui's
  `config.public.useAI` conditional; icon left as b24icon `RobotIcon` — the
  `i-lucide-bot` rename is N/A).
- `ContentSearchExample.vue`: added `ignoredTags: ['style']`.
- `content-search.md`: ported the Navigation/Files/Search sections (B24 prefixes,
  bitrix24 links).
- **typography (15 files)**: `title` → `Prose<Name>` + added `navigation.title`.
  Skipped `code-tree.md`, `icon.md` (absent in b24ui).
- `form.md` / `use-form-field.md`: **skipped** — upstream deletes the
  use-form-field page; b24ui keeps a diverged richer version, so its link stays
  valid (removing would drop b24ui content).

**Validation:** dev:prepare · full `typecheck` (incl. `nuxt typecheck docs`) ·
`lint` · full `vitest run` (4971 passed | 6 skipped) · module `build`.
