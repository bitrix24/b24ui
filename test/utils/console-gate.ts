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
 * deliberate: a test asserting on a warning owns it.
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
  // `Invalid prop: type check failed for prop "textValue"` — reka-ui receives a
  // render function where it expects a string. Not ours to fix in `src/`.
  'components/DropdownMenu.spec.ts',
  'components/ContextMenu.spec.ts',

  // `DialogContent requires a DialogTitle` and `Missing Description or
  // aria-describedby` — real accessibility defects, the same class #50 was
  // about. Each needs its own fix.
  'components/Slideover.spec.ts',
  'components/Drawer.spec.ts',
  'components/Modal.spec.ts',
  'components/DashboardSearch.spec.ts',
  'components/Select.spec.ts',
  'components/content/ContentSearch.spec.ts',
  'components/Table.spec.ts',
  'components/DashboardSidebar.spec.ts',
  'components/Header.spec.ts',
  'components/FieldGroup.spec.ts',
  'components/FileUpload.spec.ts',

  // `[Vue Router warn]: No match found for location` — fixtures navigating to
  // routes the test router does not declare.
  'components/NavigationMenu.spec.ts',
  'components/Breadcrumb.spec.ts',
  'components/PageLinks.spec.ts',
  'components/Link.spec.ts',

  'components/PageSection.spec.ts',
  'components/Button.spec.ts',
  'components/Banner.spec.ts',

  // Lifecycle and emit declarations. These three are product defects rather
  // than fixture noise, and the gate found all three on its first run — the
  // hand-rolled measurement that preceded it had missed them:
  //   InputMenu     emits `remove-tag` without declaring it
  //   ChatMessages  invokes the `viewport` slot outside the render function,
  //                 so it tracks no dependencies
  //   useKbd        calls `onMounted` with no active component instance
  'components/InputMenu.spec.ts',
  'components/ChatMessages.spec.ts',
  'composables/useKbd.spec.ts',

  // `inject() can only be used inside setup()` and friends.
  'composables/useToast.spec.ts',
  'composables/useContentSearch.spec.ts',
  'composables/useResizable.spec.ts'
])

/** Installs the collector. Called from both projects' setup files. */
export function installConsoleGate(): void {
  const original = Object.fromEntries(CHANNELS.map(channel => [channel, console[channel]])) as Record<typeof CHANNELS[number], typeof console.warn>
  let captured: string[] = []

  beforeEach(() => {
    captured = []
    for (const channel of CHANNELS) {
      console[channel] = (...args: unknown[]) => {
        captured.push(`${channel}: ${String(args[0]).split('\n')[0]}`)
        original[channel](...args)
      }
    }
  })

  afterEach((ctx) => {
    for (const channel of CHANNELS) console[channel] = original[channel]
    if (captured.length === 0) return

    // `test/` is stripped so an entry reads the same from either project.
    const spec = (ctx.task.file?.name ?? '').replace(/^test\//, '')
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
