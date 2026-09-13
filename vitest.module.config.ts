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
 * A separate config rather than a third project in the same run. The reason
 * given when this was written turned out to be wrong — the component suite
 * looked like it was leaking memory, and that was #485, a directory walk in a
 * spec of ours, fixed on this branch. The split survives its own bad argument:
 * a `loadNuxt` instance has nothing to share with a pool of component files,
 * three specs do not need one, and a fresh process costs about four seconds.
 *
 *     pnpm test:module
 */
export default defineConfig({
  test: {
    // `vitest.config.ts` pins `process.env.TZ` before its config object,
    // because the date specs there fail west of Greenwich without it. Not
    // carried over deliberately: nothing here reads a clock. A spec added to
    // `test/module/` that does will need the pin, and will not be told so by
    // anything but this comment.
    globals: true,
    silent: true,
    name: 'module',
    environment: 'node',
    dir: './test',
    include: moduleInclude,
    exclude: configDefaults.exclude
  }
})
