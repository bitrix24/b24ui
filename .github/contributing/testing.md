# Testing

Component tests use Vitest with Vue Test Utils and snapshot testing.

There is a second, much smaller suite that is **not** Vitest: `test/workflows/`
covers the shell and Python under `.github/scripts/` — the release watchdog and
the action-pin check — by running them against stubbed `gh` and `npm`. It is
plain bash, runs in about a second, and CI runs it before anything else.

```bash
pnpm run test:workflows
```

A third covers the module itself — `test/module/` boots Nuxt with `loadNuxt` so
the module's real `setup()` runs. It has its own config and its own invocation
rather than being a third project in `vitest.config.ts`; the reason is measured
and written down in `vitest.module.config.ts`.

```bash
pnpm run test:module
```

And a fourth, which is the only thing here that starts an application:

```bash
pnpm build && pnpm test:smoke
```

`test/smoke/run.mjs` builds a small Nuxt app and the Vue playground **against
the built package**, serves both, loads them in Chromium and fails on anything
the browser logs as an error. Everything else in this repository tests source;
this is the step that would have caught #301, a client-only boot failure that
shipped and left the unit suite green for five weeks.

The `pnpm build` is not optional. `pnpm dev:prepare` leaves `dist/` as a jiti
stub that re-exports `src/`, so a smoke run against it would boot the sources
under a different name — the script detects that and refuses rather than
passing quietly. It also needs a browser once:

```bash
pnpm exec playwright-core install chromium
```

CI runs that same command with `--with-deps`, which installs the system
libraries Chromium needs through apt. Locally that is usually unnecessary and
wants sudo, so it is left off here — add it if the browser fails to launch.

**It is not part of `ci.yml`.** `.github/workflows/smoke.yml` runs it nightly
and on `workflow_dispatch`, so a boot failure is found the morning after it
lands rather than before it merges. That is a deliberate trade against putting
a browser download and two application builds on every pull request. Dispatch
it on your branch by hand if you touched a runtime plugin, the module's
`setup()`, or a dependency that ends up in the client bundle.

Two things it asserts that nothing else can:

- **the `platform` plugin's SSR branch** — `useRequestHeader('user-agent')`
  never runs under Vitest, because the Nuxt test environment is client-only.
  The smoke run fetches the page with three user agents and checks the
  `data-platform` / `data-version` attributes the Tailwind `bitrix-mobile:` and
  `bitrix-desktop:` variants key on;
- **that the page rendered anything at all** — a Vue app that throws in
  `setup()` still answers 200 with an empty root, so `curl` cannot tell a
  working app from a dead one and a browser can.

## When a worker dies instead of failing

```
FATAL ERROR: Ineffective mark-compacts near heap limit
Error: [vitest-pool]: Worker forks emitted error.
Caused by: Error: Worker exited unexpectedly
```

Vitest cannot name the file in this path — the process is gone — so the failure
reads as a property of the whole suite. It usually is not. Halve the heap
first, before doing anything else:

```bash
NODE_OPTIONS=--max-old-space-size=1024 pnpm run test --project vue
```

If the same number of files passes with an eight-times-smaller heap, nothing is
accumulating across files and **exactly one file** is responsible. Name it by
diffing what reported against what was collected:

```bash
NODE_OPTIONS=--max-old-space-size=1024 npx vitest run --project vue --reporter=verbose
```

That is how #485 was found — a snapshot guard whose directory walk descended
into `node_modules` — after an afternoon spent believing it was a vitest leak.

## File Location

Tests live in `test/components/` matching the component name (e.g., `Button.spec.ts`).

## Basic Test Structure

```ts
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ComponentName from '../../src/runtime/components/ComponentName.vue'
import { renderEach } from '../component-render'
import theme from '#build/b24ui/component-name'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

describe('ComponentName', () => {
  // Extract variant keys for dynamic testing
  const sizes = Object.keys(theme.variants.size) as any

  renderEach(ComponentName, [
    // Props
    ['with label', { props: { label: 'Label' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { label: 'Label', size } }]),
    ['with icon', { props: { icon: Search2Icon } }],
    ['with disabled', { props: { label: 'Label', disabled: true } }],
    ['with class', { props: { label: 'Label', class: 'custom-class' } }],
    ['with b24ui', { props: { label: 'Label', b24ui: { base: 'font-bold' } } }],

    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }],
    ['with trailing slot', { slots: { trailing: () => 'Trailing slot' } }]
  ])

  // Accessibility test
  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ComponentName, {
      props: {
        label: 'Accessible Label'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
```

## Testing Patterns

### Props Variations

Test all significant prop combinations:

```ts
renderEach(Button, [
  // Basic props
  ['with label', { props: { label: 'Button' } }],

  // All sizes
  ...sizes.map((size: string) => [`with size ${size}`, { props: { label: 'Button', size } }]),

  // Icon variations
  ['with icon', { props: { icon: Search2Icon } }],
  ['with leading and icon', { props: { leading: true, icon: Search2Icon } }],
  ['with leadingIcon', { props: { leadingIcon: Search2Icon } }],
  ['with trailing and icon', { props: { trailing: true, icon: Search2Icon } }],
  ['with trailingIcon', { props: { trailingIcon: Search2Icon } }],

  // States
  ['with loading', { props: { loading: true } }],
  ['with disabled', { props: { label: 'Button', disabled: true } }],

  // Customization
  ['with class', { props: { label: 'Button', class: 'rounded-full font-bold' } }],
  ['with b24ui', { props: { label: 'Button', b24ui: { label: 'font-bold' } } }]
])
```

### Slots Testing

```ts
// Simple slot
['with default slot', { slots: { default: () => 'Default slot' } }],

// Slot with props access
['with default slot using props', {
  slots: {
    default: (props: any) => `UI: ${JSON.stringify(props.b24ui)}`
  }
}],

// Multiple slots
['with all slots', {
  slots: {
    leading: () => 'Leading',
    default: () => 'Default',
    trailing: () => 'Trailing'
  }
}]
```

### Interactive Behavior Tests

```ts
test('with loading-auto works', async () => {
  let resolve: any | null = null
  const wrapper = await mountSuspended({
    components: { Button },
    setup() {
      function onClick() {
        return new Promise(res => resolve = res)
      }
      return { onClick }
    },
    template: `<Button loading-auto @click="onClick">Click</Button>`
  })

  const button = wrapper.find('button')
  button.trigger('click')
  await flushPromises()

  const icon = wrapper.findComponent({ name: 'Icon' })
  expect(icon.classes()).toContain('animate-spin')

  resolve?.(null)
})
```

### Form Integration Tests

```ts
test('works with B24Form', async () => {
  const wrapper = await mountSuspended({
    components: { Input, UForm },
    setup() {
      const form = ref()
      return { form }
    },
    template: `
      <B24Form :state="{}" ref="form">
        <Input name="test" />
      </B24Form>
    `
  })

  // Test form integration
})
```

## Accessibility Testing

Always include accessibility tests:

```ts
it('passes accessibility tests', async () => {
  const wrapper = await mountSuspended(ComponentName, {
    props: {
      // Provide props that ensure accessible markup
      label: 'Accessible Label',
      // For images
      avatar: {
        src: 'https://github.com/bitrix24.png',
        alt: 'Description'
      }
    }
  })

  expect(await axe(wrapper.element)).toHaveNoViolations()
})
```

## Snapshot Updates

When component changes require snapshot updates:

```bash
pnpm run test:update    # the whole suite, never a subset — see below
pnpm run test run       # verify, without -u
```

Review the diff before committing it, and **never edit a snapshot file by
hand**.

### Regenerate with the full suite, not a targeted run

`pnpm exec vitest run -u path/to/One.spec.ts` is the tempting shortcut, and on
the pinned vitest it does not do what it reads like. `-u` swallows the next
token as its value, so the path stops being a filter and **the whole project
runs** — one file named, 161 run, 77 snapshots rewritten:

```
$ pnpm exec vitest run -u test/components/Kbd.spec.ts --project nuxt
  Snapshots  77 updated
 Test Files  161 passed (161)

$ pnpm exec vitest run test/components/Kbd.spec.ts -u --project nuxt
  Snapshots  10 updated
 Test Files  1 passed (1)
```

Both spellings then leave a way to commit a snapshot that asserts markup the
source no longer produces. Reproduced end to end by adding a marker class to
`src/theme/kbd.ts`, updating, then reverting the theme:

```
# 1. marker in the theme, `-u` first  →  77 updated across 5 snapshot files,
#    only one of which was named.
# 2. revert the theme, targeted -u    →  Kbd's 10 snapshots come back clean.
#    The four unnamed files are not re-rendered, so their marker stays.
# 3. targeted verify                  →  11 passed. Green.
# 4. pnpm run test run                →  5 failed, in a component the change
#                                        never touched.
```

Step 3 is the false green #74 reported from the #72 ports: the sources are
right, every command the author ran was green, and a snapshot on disk is
wrong. It survives because the stale file is in a different directory — and
often a different vitest project — from the one being re-rendered.

A full `pnpm run test:update` fixes it in one pass. `test:update` exists so
that the safe command is the short one, and it takes no path on purpose.

## Every case is mounted into the document, and unmounted after

`componentRender` mounts with `attachTo: document.body` and calls `unmount()`
as soon as it has the markup. Both halves matter, and neither is the default.

Vue Test Utils renders into a detached element. That is invisible until
something asks the document a question, and reka-ui's dialog family does: it
checks its own accessibility with `document.getElementById(titleId)` in
`onMounted`. Against a detached tree the lookup fails, so every dialog spec
rendering with `portal: false` warned that `DialogContent` requires a
`DialogTitle` — with the title sitting in the markup it had just produced.
Measured across the suite, with the register in `test/utils/console-gate.ts`
emptied on both sides: 623 console messages from 62 tests detached, 366 from 56
attached.

Attached, the snapshots also record what a browser would: `Header` and `Table`
gain the `aria-hidden` reka-ui puts on everything behind an open dialog, and
`CheckboxGroup`/`RadioGroup` gain the `aria-label` it reads off the associated
`<label>` rather than the raw value.

Unmounting is the half that keeps cases independent, and it had never run
before. Without it reka-ui's **module-global** layer stack kept every layer any
case had ever mounted, so `DismissableLayer` rendered `pointer-events: auto`
according to how many earlier cases were still on the stack — not according to
anything under test. Four `#454` baseline groups were held apart by exactly
that byte.

Teardown running for the first time is also why a mock that implements only the
setup half now fails: `EditorDragHandle` and `EditorToolbar` mocked tiptap's
`registerPlugin` without `unregisterPlugin`, which nothing reached until
`beforeUnmount` did. If a component you are testing acquires something on
mount, the mock owes you the release too.

This applies to hand-written `mountSuspended` calls too, not only to the cases
`renderEach` builds — 293 call sites across 112 files, none of which had to be
edited. Both projects set the default in one place: the `vue` project in its
shim, `test/utils/mount.ts`, and the `nuxt` project through a `resolveId` in
`vitest.config.ts` that points `@vue/test-utils` at `test/utils/attach-mount.ts`.
`@nuxt/test-utils/runtime` is deliberately left alone, because `mockNuxtImport`
and `mockComponent` are macros keyed on that specifier and would stop being
transpiled.

Unmounting is not done by hand either. `enableAutoUnmount(afterEach)` in both
setup files unmounts every wrapper `mount` created, so nothing accumulates in
`document.body` between cases. Without it, attaching makes cases interfere:
reka-ui's focus scope from an earlier case steals the focus a later one just
set, which is how `Modal`'s two focus tests failed on the first attempt.

Two things only became reachable once trees were in the document, and both are
worth knowing about before writing a test that touches either:

- `getComputedStyle` returns a real declaration rather than an empty one. reka-ui
  keeps it in a `ref`, which deep-wraps it in a proxy, and happy-dom's getters
  check their receiver — so `Drawer` threw
  `TypeError: Receiver must be an instance of class CSSStyleDeclaration` four
  times per run, uncaught. `test/utils/patchComputedStyle.ts` hands the
  declaration back with `markRaw`.
- reka-ui's `hideOthers` marks the trigger `aria-hidden` while a popup is open
  and leaves it focusable, which axe reports as `aria-hidden-focus`. It is an
  artefact of `portal: false`, which the specs pass so the popup lands inside
  the wrapper: measured, the production default `portal: true` has no violation.
  The rule is disabled in `Select` and `Table`'s accessibility cases, with that
  measurement recorded there.

## Console warnings fail the test

A component that renders while logging a warning is a defect the suite already
found. Since #87 it fails the test that found it.

Nothing else surfaces those: `silent: true` throws away console output from
passing tests, and turning it off does not help — vitest prints console output
only for tests that *fail*. The output of a green test is unreachable by
configuration, which is why the gate exists rather than a setting.

### When it goes red

The failure names the spec and up to five distinct messages. Three ways out,
in order of preference:

1. **Fix whatever is warning** — and check which side that is before
   assuming. The first run of this gate reported three findings that read like
   component defects and were not: two were defects in the *tests* (a spec
   emitting an event under a name reka-ui does not declare, and an axe case
   that never registered the components it mounted), and one came from inside
   reka-ui. A warning names a symptom, not an owner.
2. **Take ownership of the warning**, if the test is asserting on it:

   ```ts
   const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
   try {
     // …
   } finally {
     warn.mockRestore()
   }
   ```

   It has to be inside the test body. A spy installed in `beforeAll` is
   overwritten by the gate's own `beforeEach`.
3. **Add an entry to `KNOWN_NOISY_SPECS`** in `test/utils/console-gate.ts`.
   Last resort, and it needs a stated reason next to it — an entry is a debt
   record, not a switch.

### An inline template does not register components

This is worth knowing before writing an axe case, because it fails silently:

```ts
// Renders <b24input></b24input> — an unknown element. axe finds nothing to
// audit and reports zero violations.
slots: { default: { template: `<B24Input />` } }

// Renders a real input.
global: { components: { B24Input } },
slots: { default: { template: `<B24Input aria-label="Search" />` } }
```

A slot template is compiled at runtime with no access to the spec's imports.
Without a registration the tag stays an unknown element, the component never
mounts, and an axe assertion over it passes on nothing — the vacuous shape
#454 is about. `FieldGroup`'s axe case did exactly this until the gate's
`Failed to resolve component` warning surfaced it.

Registering the components is half of it. The other half is that a fixture
running through axe needs the accessible names a markup comparison does not: a
bare `<input>` has none, which is why `Input`'s own axe case gives it a
`placeholder`.

### The register

Keyed `project:path`, because the two projects mount different code —
`#components` resolves `B24Link` to `vue/overrides/vue-router` under `vue` and
to `runtime/components` under `nuxt`. An entry earned by one must not cover the
other; while the key was the path alone, 9 of 26 paths were already clean under
`nuxt` and a Nuxt-side regression would have stayed green.

**Deleting an entry is how a fix is proved.** The warning coming back turns the
file red, so a fix that did not work cannot be mistaken for one that did.

Two limits worth knowing rather than discovering. Nothing enforces that the
register is minimal, so an entry can outlive its cause. And the window is one
test: anything logged at module scope, in `beforeAll`/`afterAll`, or from an
async continuation resolving after the test, is not seen.

Only `warn` and `error` are watched — plus `console.trace`, which Node routes
through `error`. The full list of blind spots is in the file's own header.

## Coverage

```bash
pnpm run test:coverage    # the whole suite, instrumented
```

Off by default. Instrumenting every worker costs about 80s on top of a 240s
suite, which is worth paying once in CI and not on every local run. CI runs
this instead of a plain `vitest run`, uploads `coverage/` as an artifact, and
fails when the run drops below the thresholds in `vitest.config.ts`.

**It only works as a whole run.** `pnpm run test:coverage --project vue`, or
with a path filter, still checks the thresholds against the whole of `src/` —
so a partial run is red by construction, on code that never had a chance to
execute. That is vitest's behaviour, not a regression in your branch. Use a
plain `pnpm run test <name>` while iterating.

### Scope

`src/runtime` and `src/theme` — what a browser receives.

The module half of `src/` (`module.ts`, `unplugin.ts`, `vite.ts`, `plugins/`,
`templates.ts`) is deliberately out. It is exercised by `test/module`, which
runs under its own config in its own process and is not instrumented, so
counting it here reported about 175 statements as untested that are in fact
tested — and no amount of module testing could ever have moved the number.

The extensions are spelled out (`**/*.{ts,vue}`) because a bare `**` pulls in
the 36 design-token stylesheets and two token JSON files, which carry no
statements, cannot be covered, and land in the report as three dozen rows at
0%.

### The baseline and what the thresholds buy

Measured on Node 24, which is what CI pins:

```
Statements   : 71.89% ( 5265/7323 )
Branches     : 69.86% ( 5134/7348 )
Functions    : 71.04% ( 1875/2639 )
Lines        : 71.45% ( 4659/6520 )
```

Thresholds are that **minus one point, floored** — `70 / 68 / 70 / 70`. Not
the baseline floored: rounding alone produces wildly uneven margins, and the
first version of this gate proved it by putting functions at 69 against a
measured 69.04, which tolerated exactly *one* new uncovered function while
statements tolerated 38.

A point of margin buys this much new uncovered code before the gate goes red:

| metric | headroom |
|---|---|
| statements | 198 |
| branches | 202 |
| functions | 39 |
| lines | 135 |

Against the shape of this repository — 182 components, median 14 statements
and 6 functions, p75 38 and 15, largest `InputMenu.vue` at 190 and 88 — that
means a **large new area arriving with no tests is caught**, on functions and
lines first. A single median component is not.

The margin is a point rather than a rounding because the denominator wobbles.
Three full runs of the same clean tree gave two different totals — 7323 and
7324 statements — and it is not the Node version: both came out of Node 24,
with Node 22 landing on the second. One fully-covered function in `Button.vue`
appears or does not, worth about 0.01pp. Tiny, but it means the number is not
reproducible to the digit, and a threshold set exactly at the baseline would
eventually go red on nothing at all.

### What it does not catch

A component *losing* the tests it had. Measured rather than assumed —
`describe.skip` on the whole `Button` suite stops 212 tests and leaves the
numbers where they were:

```
Statements   : unchanged
Functions    : unchanged
Lines        : unchanged
Branches     : -0.19pp
```

`Button.vue` is mounted by dozens of other specs — inside forms, menus,
toolbars — so its code keeps executing whether or not anything asserts about
it. **Coverage measures execution, not assertion.**

A per-file threshold would close that gap and cannot be turned on yet: 93
files sit at 0% today, so `perFile` would be red on the first run.

Treat the number as a floor under the shipped surface, not as evidence that a
component is tested. For that, the component needs its own spec.

## Running Tests

```bash
# Run all component tests (the `nuxt` and `vue` projects)
pnpm run test

# The module's own setup(), in its own process
pnpm run test:module

# Boot the built package in a browser
pnpm build && pnpm run test:smoke

# Run specific test file
pnpm run test Button

# Run with coverage — see the Coverage section above
pnpm run test:coverage

# Watch mode
pnpm run test -- --watch
```
