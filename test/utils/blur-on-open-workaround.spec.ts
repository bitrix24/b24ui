import { createRequire } from 'node:module'
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * `useBlurOnOpen` exists only because reka-ui's `useHideOthers` reaches for
 * `hideOthers` from the `aria-hidden` package, which sets `aria-hidden` on
 * siblings that may still contain the focused trigger — so the browser refuses
 * it and logs a warning. #159 tracks removing the workaround; the upstream bug
 * is unovue/reka-ui#1280, open since August 2024 with no assignee and no PR.
 *
 * The problem with a tracking issue is that nobody re-reads it. This asserts
 * the condition instead, so the day a reka-ui bump ships the fix, the suite
 * says so rather than waiting for someone to check by hand:
 *
 *  - as long as the shipped `useHideOthers` calls `hideOthers`, the workaround
 *    is still needed and the test passes;
 *  - when it changes — `inertOthers` and `suppressOthers` both already exist in
 *    `aria-hidden`, and `suppressOthers` picks between them by feature
 *    detection — this fails, naming #159.
 *
 * A failure here is good news, not a regression. Follow the removal steps in
 * that issue.
 */
const require = createRequire(import.meta.url)

function rekaHideOthersSource(): string | undefined {
  const packageJson = require.resolve('reka-ui/package.json')
  const candidate = join(dirname(packageJson), 'dist/shared/useHideOthers.js')

  return existsSync(candidate) ? readFileSync(candidate, 'utf8') : undefined
}

describe('useBlurOnOpen workaround', () => {
  it('is still required by the reka-ui we depend on', () => {
    const source = rekaHideOthersSource()

    // Not found is not a pass. reka-ui moving the file is exactly the kind of
    // change that ships the fix alongside it, so this has to be looked at by
    // hand rather than skipped.
    expect(
      source,
      'reka-ui no longer ships dist/shared/useHideOthers.js — re-check unovue/reka-ui#1280 by hand and update this spec (#159)'
    ).toBeDefined()

    // Matched as an import of that exact name and as a call, not as a bare
    // substring: `import { inertOthers as hideOthers }` would keep a substring
    // check passing while the behaviour underneath had changed completely.
    expect(
      source,
      'reka-ui\'s useHideOthers no longer imports hideOthers from aria-hidden — the upstream fix may have landed. Verify unovue/reka-ui#1280 and remove the useBlurOnOpen workaround per #159'
    ).toMatch(/import\s*\{[^}]*\bhideOthers\b[^}]*\}\s*from\s*["']aria-hidden["']/)

    expect(
      source,
      'reka-ui\'s useHideOthers imports hideOthers but no longer calls it — check what replaced the call before trusting this guard (#159)'
    ).toMatch(/\bhideOthers\s*\(/)
  })

  it('keeps every site findable by the documented search', async () => {
    // #159 tells the next reader to run `grep -rn 'reka-ui#1280' src/ test/`.
    // That returned nothing at all until this spec was written, because the
    // only annotation spelled the reference as a URL.
    const files = await glob(['src/**/*.{ts,vue}', 'test/**/*.ts'], {
      cwd: process.cwd(),
      ignore: ['**/node_modules/**', '**/__snapshots__/**']
    })

    const tagged = files
      .filter(file => readFileSync(join(process.cwd(), file), 'utf8').includes('reka-ui#1280'))
      .sort()

    // Asserted as a subset, not an exact set: the property worth keeping is
    // that no known site loses its tag, and a future component wrapping the
    // same primitive should be able to add one without failing a spec that
    // says "the upstream fix may have landed".
    expect(tagged, 'a site lost its reka-ui#1280 tag — the search #159 documents no longer finds everything').toEqual(
      expect.arrayContaining([
        'src/runtime/components/Drawer.vue',
        'src/runtime/components/Modal.vue',
        'src/runtime/components/Slideover.vue',
        'src/runtime/composables/useBlurOnOpen.ts',
        'test/components/Drawer.spec.ts',
        'test/components/Modal.spec.ts',
        'test/components/Slideover.spec.ts',
        'test/composables/useBlurOnOpen.spec.ts',
        'test/utils/blur-on-open-workaround.spec.ts'
      ])
    )
  })
})
