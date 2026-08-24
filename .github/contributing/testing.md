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

1. Run tests: `pnpm run test`
2. Review changes carefully
3. Press `u` to update snapshots
4. Commit updated snapshots

**Never manually edit snapshot files.**

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

# Run with coverage
pnpm run test -- --coverage

# Watch mode
pnpm run test -- --watch
```
