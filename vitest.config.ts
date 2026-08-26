import { fileURLToPath } from 'node:url'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from './src/vite'
import { glob } from 'tinyglobby'
import { nuxtInclude, vueInclude, vueExclude } from './test/vitest-include'

/**
 * Pin the suite's timezone.
 *
 * The date specs freeze "now" at `new Date('2025-01-01')`, which parses as UTC
 * midnight — in any negative-offset zone that is still 2024-12-31 locally, so
 * the calendar's `data-today` lands a day early and every snapshot carrying it
 * fails: 69 tests per project, in both, on a clean clone. CI runners are UTC,
 * so nothing here ever goes red; the failure is reserved for contributors west
 * of Greenwich, who get a red checkout and no hint why.
 *
 * This is an assignment on `process.env` rather than vitest's `test.env`
 * because the two are not interchangeable. `test.env` is handed to the worker
 * as a JavaScript object: under the default `forks` pool that becomes the
 * child process's real environment and V8 reads `TZ` from it, but under
 * `--pool=threads` it is only a per-worker `process.env` copy — ICU keeps
 * reading the OS environment, and the pin silently does nothing while
 * `process.env.TZ` still reads `'UTC'`. Assigning here calls `setenv` in the
 * parent before any pool starts, so both pools inherit a genuinely UTC
 * environment. Asserted by `test/utils/timezone-determinism.spec.ts`, which
 * checks observed `Date` behaviour and not just the variable.
 */
process.env.TZ = 'UTC'

const components = await glob('./src/runtime/components/*.vue', { absolute: true })
const vueComponents = await glob('./src/runtime/vue/components/*.vue', { absolute: true })
const vueRouterOverrides = await glob('./src/runtime/vue/overrides/vue-router/*.vue', { absolute: true })

export default defineConfig({
  test: {
    testTimeout: 5000,
    globals: true,
    silent: true,
    /**
     * Coverage of the published surface, gated at the measured baseline (#85).
     *
     * Off unless asked for: instrumenting every worker costs about 100s on top
     * of a 240s suite, which is worth paying in CI and not on every local run.
     * `pnpm run test:coverage` turns it on.
     *
     * `include` is `src/**` and not the repository, because that is what ships.
     * It is spelled with extensions on purpose — a bare `src/**` pulls in the
     * 36 design-token stylesheets and two token JSON files, which carry no
     * statements, cannot be covered, and show up in the report as three dozen
     * files sitting at 0%.
     *
     * The thresholds are the numbers this suite actually reaches, rounded down
     * to the whole percent. They exist to catch erosion, not to demand a level
     * nobody has reached: a change that lowers them goes red, and raising them
     * is a deliberate edit to this file. `src/theme/**` is in scope for the
     * same reason — a variant nothing renders is a variant nothing tested, and
     * theme edits are the most common change in this fork.
     */
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,vue}'],
      exclude: ['**/*.d.ts', 'src/runtime/types/**'],
      reporter: ['text-summary', 'json-summary', 'html'],
      thresholds: {
        statements: 69,
        branches: 67,
        functions: 69,
        lines: 68
      }
    },
    // The timezone is pinned above, before this config object — see the note
    // on the `process.env.TZ` assignment for why it cannot live here.
    resolveSnapshotPath(path, extension, { config }) {
      if (config.name === 'vue') {
        return path.replace(/\/([^/]+)\.spec\.ts$/, `/__snapshots__/$1-vue.spec.ts${extension}`)
      } else {
        return path.replace(/\/([^/]+)\.spec\.ts$/, `/__snapshots__/$1.spec.ts${extension}`)
      }
    },
    projects: [
      await defineVitestProject({
        extends: true,
        test: {
          name: 'nuxt',
          dir: './test',
          include: nuxtInclude,
          // Vitest applies these when `exclude` is unset, so this line changes
          // nothing today. It is here so the two projects look the same: the
          // `vue` one below has to spell them out, and the next person adding a
          // project-specific exclusion should copy a pattern that keeps them.
          exclude: configDefaults.exclude,
          // Benchmarks run in the `vue` project only (happy-dom, faster); keep them
          // out of the nuxt project so a bare `vitest bench` doesn't double-run them.
          benchmark: { include: [] },
          environment: 'nuxt',
          environmentOptions: {
            nuxt: {
              rootDir: fileURLToPath(new URL('test/nuxt/', import.meta.url))
            }
          },
          setupFiles: fileURLToPath(new URL('test/nuxt/setup.ts', import.meta.url))
        }
      }),
      {
        extends: true,
        test: {
          name: 'vue',
          environment: 'happy-dom',
          dir: './test',
          include: vueInclude,
          // Spreading the defaults back in: `exclude` replaces them wholesale
          // rather than adding to them, and dropping `**/node_modules/**`
          // would let this project collect specs out of installed packages.
          exclude: [...configDefaults.exclude, ...vueExclude],
          benchmark: { include: ['bench/**/*.bench.ts'] },
          setupFiles: ['./test/utils/setup.ts']
        },
        plugins: [
          vue(),
          bitrix24UIPluginVite({ dts: false }),
          {
            name: 'bitrix24-ui-test:components',
            enforce: 'pre',
            resolveId(id) {
              if (id === '@nuxt/test-utils/runtime') {
                return fileURLToPath(new URL('test/utils/mount.ts', import.meta.url))
              }
            }
          },
          {
            name: 'bitrix24-ui-test:components',
            enforce: 'pre',
            resolveId(id) {
              if (id === '#components') {
                // Resolve to a `\0`-prefixed virtual id so Vite treats it as a
                // virtual module and doesn't reparse the `#` as a URL fragment.
                // Vite 8 turns a returned `#components` into `?import#components`
                // (empty pathname), which its builtin resolver then rejects.
                return '\0virtual:bitrix24-ui-components'
              }
            },
            load(id) {
              if (id === '\0virtual:bitrix24-ui-components') {
                const resolvedComponents = [...vueRouterOverrides, ...vueComponents, ...components]
                const renderedComponents = new Set<string>()
                return resolvedComponents.map((file) => {
                  const componentName = file.split('/').pop()!.replace('.vue', '')
                  if (renderedComponents.has(componentName)) {
                    return ''
                  }
                  renderedComponents.add(componentName)
                  return `export { default as B24${componentName} } from '${file}'`
                }).join('\n')
              }
            }
          }
        ]
      }
    ]
  }
})
