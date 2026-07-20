import { describe, expectTypeOf, it, expect, test, beforeAll, afterAll } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useAppConfig } from '#imports'
import { B24FormField } from '#components'
import type * as b24ui from '#build/b24ui'
import type { ThemeDefaults } from '../../src/runtime/types/theme'

/**
 * Hand-maintained list of `#build/b24ui` exports that intentionally don't
 * participate in `<B24Theme :props>` overrides:
 *
 *   - The matching Vue file doesn't run `useComponentProps`, so a `:props`
 *     entry would types-check but no-op at runtime. If a key stays here
 *     long-term, consider migrating the component to `useComponentProps`
 *     and removing it from this list.
 */
type NonProxyComponents
  = | 'link'
    | 'editorEmojiMenu'
    | 'editorMentionMenu'
    | 'editorSuggestionMenu'

type Expected = Exclude<keyof typeof b24ui, NonProxyComponents>

// Drift catchers — surfaced at the type level so any new themable component
// added to `#build/b24ui` without a `ThemeDefaults` entry (or vice versa) breaks
// `vue-tsc --noEmit` in CI. The error message names the offending key
// directly, e.g. `Type 'never' is not assignable to type '"button"'`.
type MissingFromThemeDefaults = Exclude<Expected, keyof ThemeDefaults>
type ExtraInThemeDefaults = Exclude<keyof ThemeDefaults, Expected>

describe('ThemeDefaults registry', () => {
  test('every themable `#build/b24ui` component has a ThemeDefaults entry', () => {
    expectTypeOf<MissingFromThemeDefaults>().toBeNever()
  })

  test('ThemeDefaults declares no entries beyond the `#build/b24ui` registry', () => {
    expectTypeOf<ExtraInThemeDefaults>().toBeNever()
  })
})

// `app.config.b24ui.<name>.defaultVariants` must override a prop the component
// pins in `withDefaults` (here `orientation`). Regression test for upstream #6683.
describe('app.config defaultVariants', () => {
  let appConfig: { b24ui?: Record<string, any> }

  beforeAll(() => {
    appConfig = useAppConfig() as { b24ui?: Record<string, any> }
    appConfig.b24ui ??= {}
    appConfig.b24ui.formField = { defaultVariants: { orientation: 'horizontal' } }
  })

  afterAll(() => {
    delete appConfig.b24ui!.formField
  })

  it('overrides the withDefaults fallback', async () => {
    const wrapper = await mountSuspended(B24FormField, {
      props: { label: 'Label' }
    })

    const root = wrapper.find('[data-slot="root"]')
    // Drives both the `data-orientation` attribute and the tv class resolution,
    // even though `orientation` isn't set in the theme's `defaultVariants`.
    expect(root.attributes('data-orientation')).toBe('horizontal')
    expect(root.classes()).toContain('place-items-baseline')
  })

  it('still lets an explicit prop win', async () => {
    const wrapper = await mountSuspended(B24FormField, {
      props: { label: 'Label', orientation: 'vertical' }
    })

    const root = wrapper.find('[data-slot="root"]')
    expect(root.attributes('data-orientation')).toBe('vertical')
  })
})
