import { configDefaults, defineConfig } from 'vitest/config'
import { moduleInclude } from './test/vitest-include'

/**
 * The module suite, deliberately in its own vitest invocation.
 *
 * `test/module/` boots Nuxt with `loadNuxt` to run the module's real `setup()`,
 * which rules out both of the projects in `vitest.config.ts`: the `nuxt` one is
 * itself a Nuxt instance and the `vue` one is happy-dom. Plain Node is what it
 * needs.
 *
 * A separate config rather than a third project in the same run, for a reason
 * measured rather than assumed. The component suite already sits close to the
 * fork heap limit — running the `vue` project on its own is enough to OOM a
 * worker on a 4-core machine, on `main`, with none of this branch's files in
 * it — and CI has been passing on the near side of that edge. Adding a Nuxt
 * instance to the same pool is not a risk worth taking for three specs, and
 * a fresh process costs about four seconds.
 *
 *     pnpm test:module
 *
 * The underlying growth is a real defect and is not this file's to fix; it is
 * filed separately.
 */
export default defineConfig({
  test: {
    globals: true,
    silent: true,
    name: 'module',
    environment: 'node',
    dir: './test',
    include: moduleInclude,
    exclude: configDefaults.exclude
  }
})
