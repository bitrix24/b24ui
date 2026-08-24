/**
 * Which specs each vitest project collects.
 *
 * This lives outside `vitest.config.ts` so the patterns have exactly one
 * definition and can be asserted against the files on disk — see
 * `test/utils/vitest-include.spec.ts`. Both were needed because the previous
 * inline patterns failed silently in two different ways at once:
 *
 *  - `test/Sidebar.spec.ts` matched no pattern in either project, so eight
 *    Sidebar components shipped with no effective coverage while a 46-line
 *    spec sat in the tree looking like coverage;
 *  - the two projects spelled the same intent differently: the `nuxt` pattern
 *    put a wildcard directory segment before the filename wildcard, the `vue`
 *    one did not. Only the first reaches nested directories, so the whole of
 *    `components/content/` was tested in one project and silently absent from
 *    the other.
 *
 * Neither failure could produce a red run: a glob that matches nothing just
 * runs fewer tests.
 *
 * Paths are relative to `test/` (`dir: './test'` in the vitest config).
 */

/**
 * Specs the plain-Node project runs.
 *
 * `module/` boots Nuxt itself with `loadNuxt` to exercise the module's
 * `setup()`, so it can run in neither of the other two: the `nuxt` project is
 * already inside a Nuxt instance, and the `vue` one is happy-dom.
 */
export const moduleInclude = [
  'module/**/*.spec.ts'
]

/** Specs the Nuxt-environment project runs. */
export const nuxtInclude = [
  'components/**/*.spec.ts',
  'composables/**/*.spec.ts',
  'plugins/**/*.spec.ts',
  'utils/**/*.spec.ts'
]

/**
 * Specs the plain-Vue project runs.
 *
 * `plugins/` is absent deliberately: those specs cover Nuxt plugins and have
 * no meaning in the unplugin distribution. `module/` is absent for the same
 * kind of reason — see `moduleInclude`.
 */
export const vueInclude = [
  'components/**/*.spec.ts',
  'composables/**/*.spec.ts',
  'utils/**/*.spec.ts'
]

/**
 * Directories the plain-Vue project cannot run, with the reason each is out.
 *
 * These are not "not ported yet" — they are surfaces that do not exist in the
 * Vue distribution, so a spec for them there would be asserting against
 * something the build never registers:
 *
 *  - `components/content/**` — `src/plugins/components.ts` excludes
 *    `content/*.vue` from the component source outright, so `B24Content*` is
 *    Nuxt-only by construction. `ContentToc.spec.ts` also needs
 *    `mockNuxtImport`.
 *  - `components/nuxt/**` — specs for Nuxt-specific behaviour (`LinkLocale`
 *    reaches for `useNuxtApp` from `#imports`).
 *
 * `components/prose/**` is deliberately NOT here: `Prose*` is registered for
 * the Vue build too (behind the `prose`/`mdc` option), so those specs belong
 * in both projects.
 */
export const vueExclude = [
  'components/content/**',
  'components/nuxt/**'
]
