import { afterEach, beforeEach } from 'vitest'

/**
 * Fails a test that renders while logging a warning or an error.
 *
 * `vitest.config.ts` sets `silent: true`, so console output from a passing
 * test is thrown away. Flipping that to `false` does not help — vitest 4
 * prints console output only for tests that fail, which is measurable: a probe
 * logging from one passing and one failing test printed only the failing one,
 * under both settings. The output of a green test is unreachable by
 * configuration; the only way to act on it is to stop the test being green.
 *
 * That matters because Vue's warnings are findings, not noise. Measuring what
 * was being discarded turned up 8208 of them across 49 of 318 spec files,
 * including 1138 in the accessibility class — `DialogContent` without a
 * `DialogTitle`, missing `aria-describedby`, `aria-hidden` on focusable
 * content — and a component that does not resolve at all. One root cause,
 * `Link` forwarding `isAction` to `NuxtLink`, accounted for 2825 on its own
 * and took one word to fix (#87).
 *
 * A test that takes over `console.warn` itself — `vi.spyOn(console, 'warn')` —
 * replaces this collector for its duration and the gate sees nothing. That is
 * deliberate: a test asserting on a warning owns it. It has to happen *inside*
 * the test body, though: a spy installed in `beforeAll` is overwritten by this
 * collector's `beforeEach` and then discarded by its `afterEach`.
 *
 * What it does not see, stated so nobody has to discover it:
 *
 *  - anything logged at module scope, in `beforeAll` or in `afterAll` — the
 *    window is one test;
 *  - an async continuation that resolves after `afterEach` has run, which is
 *    dropped or attributed to the next test;
 *  - `console.info` / `debug` / `trace` and `process.emitWarning`, none of
 *    which Vue uses for warnings;
 *  - a later patcher of `console`, which would replace this one silently —
 *    nothing else in `test/` patches it today;
 *  - `test.concurrent`, because `captured` is one variable per file. There are
 *    none in this repository; adding one would misattribute warnings.
 *
 * `installConsoleGate()` is not idempotent either: calling it twice in one
 * setup file would leave the second collector reading an empty buffer.
 */
const CHANNELS = ['warn', 'error'] as const

/**
 * Spec files whose warnings predate the gate, with what each one still emits.
 *
 * This is a debt register, not a configuration file. It exists so the gate can
 * be switched on today rather than after the last of them is fixed, and it may
 * only ever shrink — deleting an entry is how a fix is proved, because the
 * warning coming back turns the file red.
 *
 * Adding an entry is a decision, not a formality. A new spec belongs here only
 * if the warning it emits is one somebody has looked at and chosen to leave.
 */
export const KNOWN_NOISY_SPECS = new Set([
  // ── Accessibility, in the dialog family ──────────────────────────────────
  // `DialogContent requires a DialogTitle for the component to be accessible
  // for screen reader users`, `Missing Description or aria-describedby`, and
  // `console.error: aria-hidden` on focusable content. Real defects, the same
  // class #50 was about, each needing its own fix.
  'nuxt:components/Modal.spec.ts',
  'vue:components/Modal.spec.ts',
  'nuxt:components/Drawer.spec.ts',
  'vue:components/Drawer.spec.ts',
  'nuxt:components/Slideover.spec.ts',
  'vue:components/Slideover.spec.ts',
  'nuxt:components/Header.spec.ts',
  'vue:components/Header.spec.ts',
  'nuxt:components/DashboardSearch.spec.ts',
  'vue:components/DashboardSearch.spec.ts',
  'nuxt:components/DashboardSidebar.spec.ts',
  'vue:components/DashboardSidebar.spec.ts',
  'nuxt:components/content/ContentSearch.spec.ts',
  'nuxt:components/Select.spec.ts',
  'vue:components/Select.spec.ts',
  'nuxt:components/Table.spec.ts',
  'vue:components/Table.spec.ts',

  // ── `Invalid prop: type check failed for prop "textValue"` ───────────────
  // reka-ui receives a render function where it expects a string. The call
  // site is inside reka-ui, not `src/`.
  'nuxt:components/DropdownMenu.spec.ts',
  'vue:components/DropdownMenu.spec.ts',
  'nuxt:components/ContextMenu.spec.ts',
  'vue:components/ContextMenu.spec.ts',

  // ── Product defects the gate found on its first run ──────────────────────
  //   FieldGroup    renders `B24Button` and `B24Input`, neither of which
  //                 resolves — the components are not registered for it
  //   InputMenu     emits `remove-tag` without declaring it in `emits`
  //   ChatMessages  invokes the `viewport` slot outside the render function,
  //                 so it tracks no dependencies
  //   useKbd        calls `onMounted` with no active component instance
  //   useToast,
  //   useResizable  call `inject()` outside `setup()`
  'nuxt:components/FieldGroup.spec.ts',
  'vue:components/FieldGroup.spec.ts',
  'nuxt:components/InputMenu.spec.ts',
  'vue:components/InputMenu.spec.ts',
  'nuxt:components/ChatMessages.spec.ts',
  'vue:components/ChatMessages.spec.ts',
  'nuxt:composables/useKbd.spec.ts',
  'vue:composables/useKbd.spec.ts',
  'nuxt:composables/useToast.spec.ts',
  'vue:composables/useToast.spec.ts',
  'nuxt:composables/useResizable.spec.ts',
  'vue:composables/useResizable.spec.ts',

  // ── Test-router gaps, `vue` project only ────────────────────────────────
  // `[Vue Router warn]: No match found for location` and
  // `injection "Symbol(route location)" not found` — fixtures navigating to
  // routes the plain-Vue test router does not declare. Fixture work, not
  // product defects, and fixable in one pass over `test/utils/`.
  'vue:components/Banner.spec.ts',
  'vue:components/Breadcrumb.spec.ts',
  'vue:components/Button.spec.ts',
  'vue:components/Link.spec.ts',
  'vue:components/NavigationMenu.spec.ts',
  'vue:components/PageLinks.spec.ts',
  'vue:components/PageSection.spec.ts',
  'vue:components/FileUpload.spec.ts',
  'vue:composables/useContentSearch.spec.ts'
])

/**
 * One readable line for the failure message.
 *
 * Vue always hands a prepared string, but `logError` can pass a raw `Error`
 * and a third-party call can pass anything at all — where `String(value)`
 * collapses to `[object Object]` and says nothing. The full arguments still go
 * to the real console, which vitest prints for a failing test.
 */
function summarise(value: unknown): string {
  if (typeof value === 'string') return value.split('\n')[0]!
  if (value instanceof Error) return `${value.name}: ${value.message}`
  try {
    return JSON.stringify(value)?.slice(0, 200) ?? String(value)
  } catch {
    return String(value)
  }
}

/** Installs the collector. Called from both projects' setup files. */
export function installConsoleGate(): void {
  const original = Object.fromEntries(CHANNELS.map(channel => [channel, console[channel]])) as Record<typeof CHANNELS[number], typeof console.warn>
  let captured: string[] = []

  beforeEach(() => {
    captured = []
    for (const channel of CHANNELS) {
      console[channel] = (...args: unknown[]) => {
        captured.push(`${channel}: ${summarise(args[0])}`)
        original[channel](...args)
      }
    }
  })

  afterEach((ctx) => {
    for (const channel of CHANNELS) console[channel] = original[channel]
    if (captured.length === 0) return

    // Keyed by project as well as path. The two projects mount different
    // code — `#components` resolves `B24Link` to `vue/overrides/vue-router`
    // under `vue` and to `runtime/components` under `nuxt` — so an entry
    // earned by one of them must not cover the other. Measured while this
    // was still path-only: 9 of the 26 paths were already clean under `nuxt`,
    // and a Nuxt-side regression of exactly the kind #505 fixes would have
    // stayed green.
    const project = ctx.task.file?.projectName || 'nuxt'
    const spec = `${project}:${(ctx.task.file?.name ?? '').replace(/^test\//, '')}`
    if (KNOWN_NOISY_SPECS.has(spec)) return

    const seen = [...new Set(captured)]
    throw new Error([
      `${spec} logged ${captured.length} console message(s) while rendering:`,
      '',
      ...seen.slice(0, 5).map(line => `  ${line}`),
      seen.length > 5 ? `  …and ${seen.length - 5} more kinds` : '',
      '',
      'A component that renders while warning is a defect the suite already',
      'found. Fix it, or — if a test asserts on the warning — take ownership',
      'with vi.spyOn(console, ...). Adding this file to KNOWN_NOISY_SPECS in',
      'test/utils/console-gate.ts is the last resort and needs a reason.'
    ].filter(Boolean).join('\n'))
  })
}
