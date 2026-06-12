# port — nuxt/ui@3736eeeb2d3adff03a33db275edecaaf25f01dc5

**Upstream:** chore(deps): update nuxt framework to ^4.4.6 (#6408)

**Decision:** port (adapted + 1 forward-port fix).

## Change
Bump the Nuxt framework range `^4.4.2 → ^4.4.6` everywhere it appears, and the
`module.ts` type-import move:
- `package.json`: `@nuxt/kit`, `@nuxt/schema` (deps), `nuxt` (devDep),
  `resolutions["@nuxt/kit"]` → ^4.4.6.
- `docs/package.json`: `nuxt` → ^4.4.6.
- `playgrounds/nuxt/package.json`, `playgrounds/demo/package.json`: `nuxt` →
  ^4.4.6 (b24ui has an extra `demo` playground; bumped for monorepo
  consistency — upstream only has `playgrounds/nuxt`).
- `src/module.ts`: `import type { ModuleDependencies } from 'nuxt/schema'` +
  `import type { HookResult } from '@nuxt/schema'` →
  `import type { HookResult, ModuleDependencies } from '@nuxt/schema'`
  (4.4.6 re-exports `ModuleDependencies` from `@nuxt/schema`).
- `pnpm-lock.yaml`: fresh regen (resolved nuxt/kit/schema **4.4.8**, latest in
  `^4.4.6`).

## Extra fix required (not in upstream's commit)
Regenerating against **4.4.8** pulled a newer vue-router whose `NuxtLink` custom
slot types `href` as `string | null` (was `string`). b24ui's `LinkBase`
`href?: string` then rejected the `null`, failing typecheck at
`Link.vue:275`. Widened `LinkBase` `href?: string` → **`href?: string | null`**
to match **upstream's current `LinkBase`** (v4 HEAD already has
`href?: string | null`) — b24ui simply lagged this forward-port. `LinkBase`
only reads `href` as a truthy guard, so `null` is handled.

## Validation
dev:prepare · typecheck · lint · vitest run (4972 passed | 6 skipped) · module
build — all green after the `LinkBase` fix.

## CI follow-up — vite dedupe
First CI run failed (TS2322/2769 "two different types with this name exist" in
`app-config.ts` + `vitest.config.ts`): the 4.4.8 resolve left **two vite
copies** in the lockfile (7.3.2 + 7.3.5). Local incremental installs auto-dedupe
vite, so it only surfaced under CI's `--frozen-lockfile` install. Fixed with
`pnpm dedupe` → single `vite@7.3.5` (also bumped `vue` 3.5.32 → 3.5.38, clearing
the `@nuxtjs/mcp-toolkit` vue peer warning). Re-verified with a frozen install
to mirror CI: all green.

