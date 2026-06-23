# Port: fix(LocaleSelect): add missing keys in emoji mapping (#6629)

**Upstream:** `fab73ab2ecceccd6a2d4e55eabf42efe9f7c9e23` (nuxt/ui)
**Decision:** no-op

## Upstream change
`src/runtime/components/locale/LocaleSelect.vue` — adds four entries to
nuxt/ui's `getEmojiFlag` `languageToCountry` map: `be` → `by` (Belarusian),
`eu` → `es` (Basque), `is` → `is` (Icelandic), `lo` → `la` (Lao), so those
upstream locales render a flag.

## b24ui decision — no-op
Two independent reasons, both pointing to no-op:

1. **Different map.** b24ui's `getEmojiFlag` map is its **own curated set**
   (`en, de, la, br, fr, it, pl, ru, ua, tr, sc, tc, ja, vn, id, ms, th, ar,
   kk, hi`), not nuxt/ui's ISO `languageToCountry` table. The upstream
   "missing keys" fix targets nuxt/ui's specific map, which b24ui does not
   share — there is nothing structurally equivalent to patch.
2. **Locale invariant (PORTING.md §2).** The added keys are for languages
   (`be`, `eu`, `is`, `lo`) that are **not** in b24ui's locale set. b24ui
   maintains its own curated locales and does not adopt new ones from upstream,
   so these flag mappings are intentionally not added.

No file change — bookkeeping only.
