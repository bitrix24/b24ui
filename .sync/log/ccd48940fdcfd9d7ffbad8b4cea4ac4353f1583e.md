# Port: test(components): fix path expectations on windows

**Upstream:** `ccd48940fdcfd9d7ffbad8b4cea4ac4353f1583e` (nuxt/ui)
**Decision:** port — verbatim, one fixture prefix aside

## Upstream change

`test/utils/components.spec.ts` built its expected paths with `node:path` while
the code under test builds them with `pathe`. On Windows those disagree —
`node:path` emits backslashes, `pathe` forward slashes — so the assertions
compared two spellings of the same directory and failed.

```diff
-import { join } from 'node:path'
+import { join, normalize } from 'pathe'
-  const dir = realpathSync(mkdtempSync(join(tmpdir(), 'nuxt-ui-cd-')))
+  const dir = normalize(realpathSync(mkdtempSync(join(tmpdir(), 'nuxt-ui-cd-'))))
```

`normalize` on top of the `join` switch because `realpathSync` comes from
`node:fs` and returns native separators regardless.

## b24ui port

Applies unchanged; the only difference in the touched lines is our fixture
prefix (`b24ui-cd-`). The defect is ours in full:

- `src/utils/components.ts` — the module under test — imports
  `dirname, join, normalize, resolve` from `pathe`, so `resolveExtraScanDirs`
  emits forward slashes;
- the spec compared against `node:path` output in two places,
  `.toEqual([outside])` and `.toEqual([join(outside, 'components')])`, both fed
  by `fixtureRoot()`.

`pathe` is already a root `dependencies` entry (`^2.0.3`), so nothing new is
pulled in. No `node:path` import remains in the file.

## Verify

**This cannot be demonstrated on Linux, and saying so is the honest report.**
On POSIX `pathe.join` and `node:path.join` return identical strings and
`normalize` is an identity on an already-normal path — checked rather than
assumed:

```
node:path "/tmp/x/z"
pathe     "/tmp/x/z"
identical on this platform: true | platform: linux
```

So the suite is green before and after, and a mutation cannot make it red here.
What is verifiable locally is the mechanism: the implementation uses `pathe`,
the test now uses the same module, and the two comparison sites are the ones
that consume `fixtureRoot()`. The Windows behaviour rests on upstream's report,
not on a run here.

`CI=true`: `lint` · `typecheck` · `test` (6622 passed, 6 skipped, 288 files) ·
`build` — all green. No `docs:generate`: the commit touches no `docs/`.
