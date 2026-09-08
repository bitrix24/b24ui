# port — nuxt/ui@ebd4adfccc9e983ccd65d8d2bbbbaaa4e8e7d9e6

**Upstream:** chore(deps): update all non-major dependencies (#6925)

**Decision:** port, minus one package, plus one fork-only companion change.

Second of ten commits in this run.

## What applies

Every package this fork shares with upstream in the same section sat at
upstream's exact pre-image — no drift, checked package by package rather than
inferred from `dep-parity.json` being green:

| manifest | taken |
| --- | --- |
| `package.json` | `@internationalized/date` `^3.12.4`, `@internationalized/number` `^3.6.8`, `motion-v` `^2.4.2`, `ai` `^7.0.93`, `eslint` `^10.10.0` |
| `docs/package.json` | `@ai-sdk/vue` `^4.0.93`, `ai` `^7.0.93`, `joi` `^18.2.8`, `maska` `^3.2.1`, `motion-v` `^2.4.2` |
| `playgrounds/nuxt` | `@ai-sdk/vue` `^4.0.93`, `@internationalized/date` `^3.12.4`, `ai` `^7.0.93` |
| `playgrounds/vue` | `vue-router` `^5.3.1` |

Six of upstream's names are absent here — `@ai-sdk/anthropic`, `@ai-sdk/gateway`,
`@iconify-json/lucide`, `@takumi-rs/core`, `nuxt-agent-discovery` — and the
`@internationalized/*` **peer** ranges are `^3.0.0` on both sides, which upstream
did not touch either. Left alone in both cases.

Two upstream changes are n/a: the `zod` entry added to
`playgrounds/nuxt/nuxt.config.ts`'s `paths` (that config has no `typescript`
block at all here) and the `ContentToc` snapshot, which moves only because
happy-dom 20.14 emits `mask-image` in inline styles — see below, we do not take
that version.

## `playgrounds/demo`, ours alone

Four of the bumped packages are declared there. Two sat at upstream's pre-image
and take the bump mechanically (`@internationalized/date`, `maska`). The other
two had drifted **behind this fork's own root**: `@ai-sdk/vue` `^4.0.77` against
our `^4.0.85`, and `ai` `^7.0.77` against our `^7.0.85`. Brought to `^4.0.93` and
`^7.0.93` with the rest — this is exactly the "one-time divergence becomes
permanent" failure `dep-parity.json`'s note describes, and demo is invisible to
that file because upstream has no counterpart to compare against.

`maska` and `@internationalized/date` in `playgrounds/nuxt` and
`playgrounds/vue` are left at `^3.2.0` / `^3.9.0`: upstream does not declare them
in those manifests at all, so there is no pre-image to move from. Structural, not
drift.

## The one package not taken: `happy-dom`

Upstream goes `^20.12.0 → ^20.14.0`. **Taking it turns 1450 tests and 136
snapshots red** across 64 files:

```
TypeError: 'defineProperty' on proxy: trap returned falsish for property '__v_skip'
```

Vue's `markRaw` against a happy-dom proxy, raised from reka's `Presence` watcher
and reaching almost every component that renders a collapsible.

Isolated rather than guessed: with every other bump in this commit applied and
happy-dom alone moved back, the suite is green. Then bisected:

| version | Accordion suite |
| --- | --- |
| 20.12.0 | **44 passed** |
| 20.12.1 | 44 failed |
| 20.12.2 | 44 failed |
| 20.13.0 | 44 failed |
| 20.13.1 | 44 failed |
| 20.14.0 | 44 failed |

**The finding is larger than the port.** The declared range was `^20.12.0`, which
admits every one of those broken versions. It worked only because the lockfile
happened to hold 20.12.0 — any fresh resolution, a Dependabot bump or a lockfile
refresh, would have taken 20.14.0 and reddened the suite with no source change to
point at. `~20.12.0` is not enough either, since 20.12.1 already breaks. So the
declaration becomes an **exact pin**, `20.12.0`, and the reason goes in
`dep-parity.json`'s `exceptions` where the next `chore(deps)` port will read it.

That closes a landmine rather than adding a restriction. Upstream ships
`^20.14.0` and is presumably green, so whatever differs is on our side — reka's
version or the vitest environment — and finding it is not something a
dependency-bump port can do. Recorded for a follow-up: unpin and run the suite.

## Verification

`lint` · `typecheck` green. `test`: 7857 passed, 6 skipped, 0 failed. Resolved
versions read from `pnpm-lock.yaml` rather than `node_modules` — the store keeps
directories from earlier installs and has reported a package the lockfile did not
contain.
