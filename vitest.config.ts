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
     * Coverage of the shipped surface, gated below the measured baseline (#85).
     *
     * Off unless asked for: instrumenting every worker costs about 90s on top
     * of a 240s suite, which is worth paying in CI and not on every local run.
     * `pnpm run test:coverage` turns it on.
     *
     * Scope is `src/runtime` and `src/theme` — what a browser receives. The
     * module half of `src/` (`module.ts`, `unplugin.ts`, `vite.ts`, `plugins/`,
     * `templates.ts`) is deliberately out: it is exercised by `test/module`,
     * which runs under its own config in its own process and is not
     * instrumented, so counting it here reported ~175 statements as untested
     * that are in fact tested, and no amount of module testing could ever move
     * the number. The extensions are spelled out because a bare `**` pulls in
     * the design-token stylesheets and token JSON, which carry no statements
     * and land in the report as three dozen rows at 0%.
     *
     * `reportOnFailure` because the CI job uploads `coverage/` as an artifact
     * with `if: always()`. The default drops the report when a test fails,
     * which is precisely the run somebody wants to look at.
     *
     * Thresholds are the measured baseline minus one point, floored — not the
     * baseline floored. Rounding alone gives wildly uneven margins: the first
     * version of this block put functions at 69 against a measured 69.04,
     * which tolerated exactly **one** new uncovered function while statements
     * tolerated 38. That is not a baseline gate, it is a tripwire on one
     * metric. A flat point of margin also absorbs the difference between a
     * contributor's Node and CI's.
     *
     * The gate catches a large new area arriving untested. It does not catch a
     * component losing the tests it had — `describe.skip` on the whole Button
     * suite leaves the numbers where they were, because `Button.vue` is
     * mounted by dozens of other specs and keeps executing. Coverage measures
     * execution, not assertion; see `.github/contributing/testing.md`.
     *
     * The thresholds are calibrated on a full run. `--project` or a path
     * filter still checks them against the whole of `src/`, so a partial run
     * with coverage is red by construction — that is vitest's behaviour, not a
     * regression.
     */
    coverage: {
      provider: 'v8',
      include: ['src/runtime/**/*.{ts,vue}', 'src/theme/**/*.ts'],
      exclude: ['**/*.d.ts', 'src/runtime/types/**'],
      reporter: ['text-summary', 'json-summary', 'html'],
      reportOnFailure: true,
      thresholds: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0
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
