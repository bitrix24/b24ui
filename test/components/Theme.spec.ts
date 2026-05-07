import { describe, expect, test } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { ThemeProps, ThemeSlots } from '../../src/runtime/components/Theme.vue'
import Theme from '../../src/runtime/components/Theme.vue'
import { renderEach, componentRender } from '../component-render'
import { h, ref, nextTick } from 'vue'
import { TooltipProvider } from 'reka-ui'
import Button from '../../src/runtime/components/Button.vue'
import Badge from '../../src/runtime/components/Badge.vue'
import Alert from '../../src/runtime/components/Alert.vue'
import Input from '../../src/runtime/components/Input.vue'
import Checkbox from '../../src/runtime/components/Checkbox.vue'
import Tooltip from '../../src/runtime/components/Tooltip.vue'
import FormField from '../../src/runtime/components/FormField.vue'
import FieldGroup from '../../src/runtime/components/FieldGroup.vue'
// import Avatar from '../../src/runtime/components/Avatar.vue'
// import AvatarGroup from '../../src/runtime/components/AvatarGroup.vue'
import type { ButtonProps } from '../../src/runtime/types'

type CaseOptions = { props?: ThemeProps, slots?: ThemeSlots }

describe('Theme', () => {
  renderEach(
    Theme,
    [
    // Props
      [
        'with empty b24ui',
      {
        props: { b24ui: {} },
        slots: { default: () => [h(Button, { label: 'Button' })] }
      } satisfies CaseOptions,
      []
      ],
      [
        'with theme applied to button base slot',
      {
        props: { b24ui: { button: { label: 'text-[#ff0]', base: 'px-[1.234rem]' } } },
        slots: { default: () => [h(Button, { label: 'Button' })] }
      } satisfies CaseOptions,
      ['px-[1.234rem]', 'text-[#ff0]']
      ],
      [
        'with b24ui prop taking priority over theme',
      {
        props: { b24ui: { button: { label: 'text-[#ff0]', base: 'px-[1.234rem]' } } },
        slots: { default: () => [h(Button, { label: 'Button', b24ui: { base: 'px-[2.234rem]' } })] }
      } satisfies CaseOptions,
      ['px-[2.234rem]']
      ],
      [
        'with nested theme overriding outer theme',
      {
        props: { b24ui: { button: { label: 'text-[#ff0]', base: 'px-[1.234rem]' } } },
        slots: { default: () => [h(Theme, { b24ui: { button: { label: 'text-[#000]', base: 'px-[2.234rem]' } } }, () => [h(Button, { label: 'Button' })])] }
      } satisfies CaseOptions,
      ['px-[2.234rem]', 'text-[#000]']
      ],
      [
        'with theme applied to badge',
      {
        props: { b24ui: { badge: { base: 'rounded-[1.234rem]' } } },
        slots: { default: () => [h(Badge, { label: 'Badge' })] }
      } satisfies CaseOptions,
      ['rounded-[1.234rem]']
      ],
      [
        'with theme applied to alert',
      {
        props: { b24ui: { alert: { root: 'border-[3px]' } } },
        slots: { default: () => [h(Alert, { title: 'Alert' })] }
      } satisfies CaseOptions,
      ['border-[3px]']
      ],
      [
        'with theme applied to multiple component types',
      {
        props: { b24ui: { button: { base: 'px-[1.234rem]' }, badge: { base: 'rounded-[1.234rem]' } } },
        slots: {
          default: () => [
            h(Button, { label: 'Button' }),
            h(Badge, { label: 'Badge' })
          ]
        }
      } satisfies CaseOptions,
      ['px-[1.234rem]', 'rounded-[1.234rem]']
      ],
      [
        'with theme not affecting unrelated component',
      {
        props: { b24ui: { badge: { base: 'rounded-[1.234rem]' } } },
        slots: { default: () => [h(Button, { label: 'Button' })] }
      } satisfies CaseOptions,
      []
      ]
    ],
    async (nameOrHtml, options, contains) => {
      const html = await componentRender(nameOrHtml, options, Theme)
      expect(html).toMatchSnapshot()
      contains.forEach((c) => {
        expect(html).toContain(c)
      })
    }
  )

  test('applies theme classes to child component', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :b24ui="{ button: { base: 'test-theme-class' } }">
          <Button label="Themed" />
        </Theme>
      `
    })

    expect(wrapper.find('button').classes()).toContain('test-theme-class')
  })

  test('child b24ui prop takes priority over theme', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :b24ui="{ button: { base: 'theme-class' } }">
          <Button label="Themed" :b24ui="{ base: 'b24ui-prop-class' }" />
        </Theme>
      `
    })

    expect(wrapper.find('button').classes()).toContain('b24ui-prop-class')
    expect(wrapper.find('button').classes()).not.toContain('theme-class')
  })

  test('nested theme overrides outer theme', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :b24ui="{ button: { base: 'outer-theme-class' } }">
          <Theme :b24ui="{ button: { base: 'inner-theme-class' } }">
            <Button label="Themed" />
          </Theme>
        </Theme>
      `
    })

    expect(wrapper.find('button').classes()).toContain('inner-theme-class')
    expect(wrapper.find('button').classes()).not.toContain('outer-theme-class')
  })

  test('deeply nested themes (3 levels)', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :b24ui="{ button: { base: 'level-1-class' } }">
          <Theme :b24ui="{ button: { base: 'level-2-class' } }">
            <Theme :b24ui="{ button: { base: 'level-3-class' } }">
              <Button label="Themed" />
            </Theme>
          </Theme>
        </Theme>
      `
    })

    expect(wrapper.find('button').classes()).toContain('level-3-class')
    expect(wrapper.find('button').classes()).not.toContain('level-2-class')
    expect(wrapper.find('button').classes()).not.toContain('level-1-class')
  })

  test('applies theme to multiple children of same type', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :b24ui="{ button: { base: 'shared-theme-class' } }">
          <Button label="First" />
          <Button label="Second" />
        </Theme>
      `
    })

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    buttons.forEach((button) => {
      expect(button.classes()).toContain('shared-theme-class')
    })
  })

  test('applies theme to different component types simultaneously', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button, Badge },
      template: `
        <Theme :b24ui="{ button: { base: 'button-theme-class' }, badge: { base: 'badge-theme-class' } }">
          <Button label="Themed Button" />
          <Badge label="Themed Badge" />
        </Theme>
      `
    })

    expect(wrapper.find('button').classes()).toContain('button-theme-class')
    expect(wrapper.find('span').classes()).toContain('badge-theme-class')
  })

  test('theme does not leak outside its scope', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <div>
          <Theme :b24ui="{ button: { base: 'inside-theme-class' } }">
            <Button label="Inside" class="inside-btn" />
          </Theme>
          <Button label="Outside" class="outside-btn" />
        </div>
      `
    })

    expect(wrapper.find('.inside-btn').classes()).toContain('inside-theme-class')
    expect(wrapper.find('.outside-btn').classes()).not.toContain('inside-theme-class')
  })

  test('reacts to theme prop changes', async () => {
    const b24ui = ref<any>({ button: { base: 'initial-class' } })

    const wrapper = await mountSuspended({
      components: { Theme, Button },
      setup: () => ({ b24ui }),
      template: `
        <Theme :b24ui="b24ui">
          <Button label="Themed" />
        </Theme>
      `
    })

    expect(wrapper.find('button').classes()).toContain('initial-class')

    b24ui.value = { button: { base: 'updated-class' } }
    await nextTick()

    expect(wrapper.find('button').classes()).toContain('updated-class')
    expect(wrapper.find('button').classes()).not.toContain('initial-class')
  })

  test('applies theme to input component', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Input },
      template: `
        <Theme :b24ui="{ input: { root: 'input-theme-class' } }">
          <Input placeholder="Themed input" />
        </Theme>
      `
    })

    expect(wrapper.find('[data-slot="root"]').classes()).toContain('input-theme-class')
  })

  test(':props applies prop defaults to child', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :props="{ button: { color: 'air-primary-alert' } }">
          <Button label="Themed" />
        </Theme>
      `
    })

    expect(wrapper.find('button').classes()).toContain('--style-filled-alert')
    expect(wrapper.find('button').classes()).not.toContain('--style-filled')
  })

  test('explicit prop wins over :props (other theme props still flow through)', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :props="{ button: { color: 'air-primary-alert' } }">
          <Button label="Override" color="air-primary" />
        </Theme>
      `
    })

    expect(wrapper.find('button').classes()).toContain('--style-filled')
    expect(wrapper.find('button').classes()).not.toContain('--style-filled-alert')
  })

  test(':props applies to multiple component types simultaneously', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button, Checkbox },
      template: `
        <Theme :props="{ button: { color: 'air-primary-alert' }, checkbox: { color: 'air-primary-success' } }">
          <Button label="Themed Button" />
          <Checkbox model-value label="Themed Checkbox" />
        </Theme>
      `
    })

    expect(wrapper.find('button').classes()).toContain('--style-filled-alert')
    expect(wrapper.html()).toContain('style-filled-success')
  })

  test(':props does not leak outside scope', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <div>
          <Theme :props="{ button: { color: 'air-primary-alert' } }">
            <Button label="Inside" class="inside-btn" />
          </Theme>
          <Button label="Outside" class="outside-btn" />
        </div>
      `
    })

    expect(wrapper.find('.inside-btn').classes()).toContain('--style-filled-alert')
    expect(wrapper.find('.outside-btn').classes()).not.toContain('--style-filled-alert')
  })

  test('nested :props inherits non-overridden keys from outer', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme :props="{ button: { color: 'air-primary-alert' } }">
          <Button label="Outer" class="outer-btn" />
          <Theme :props="{ button: { color: 'air-primary-success' } }">
            <Button label="Inner" class="inner-btn" />
          </Theme>
        </Theme>
      `
    })

    expect(wrapper.find('.outer-btn').classes()).toContain('--style-filled-alert')
    expect(wrapper.find('.inner-btn').classes()).toContain('--style-filled-success')
    expect(wrapper.find('.inner-btn').classes()).not.toContain('--style-filled-alert')
  })

  // Real-world layout: an outer `<B24Theme :props>` set near the root configures
  // a "global" component (e.g. tooltip), and an inner `<B24Theme :props>` further
  // down the tree only overrides a different component (e.g. button). Both
  // should compose: tooltips below the inner theme still inherit the outer's
  // tooltip defaults, and the inner's button override applies only locally.
  test('nested :props inherits across different components', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, TooltipProvider, Tooltip, Button },
      template: `
        <Theme :props="{ tooltip: { arrow: true }, button: { color: 'air-primary-alert' } }">
          <TooltipProvider>
            <Theme :props="{ button: { color: 'air-primary-success' } }">
              <Tooltip text="Inner tooltip" :open="true" :portal="false">
                <Button label="Inner" class="inner-btn" />
              </Tooltip>
            </Theme>
          </TooltipProvider>
        </Theme>
      `
    })

    // Inner button picks up the inner theme's color override, but inherits
    // `variant: 'soft'` from the outer theme (proven by `--style-filled-success` —
    // the soft variant of success).
    expect(wrapper.find('.inner-btn').classes()).toContain('--style-filled-success')
    expect(wrapper.find('.inner-btn').classes()).not.toContain('--style-filled-alert')

    // Tooltip below the inner theme inherits the outer theme's `arrow: true`
    // because the inner theme didn't touch the `tooltip` key.
    expect(wrapper.find('[data-slot="arrow"]').exists()).toBe(true)
  })

  test('reacts to :props changes', async () => {
    const themeProps = ref<{ button: Partial<ButtonProps> }>({ button: { color: 'air-primary-alert' } })

    const wrapper = await mountSuspended({
      components: { Theme, Button },
      setup: () => ({ themeProps }),
      template: `
        <Theme :props="themeProps">
          <Button label="Themed" />
        </Theme>
      `
    })

    expect(wrapper.find('button').classes()).toContain('--style-filled-alert')

    themeProps.value = { button: { color: 'air-primary-success' } }
    await nextTick()

    expect(wrapper.find('button').classes()).toContain('--style-filled-success')
    expect(wrapper.find('button').classes()).not.toContain('--style-filled-alert')
  })

  test(':props and :b24ui work together', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, Button },
      template: `
        <Theme
          :props="{ button: { color: 'air-primary-alert' } }"
          :b24ui="{ button: { base: 'rounded-full' } }"
        >
          <Button label="Both" />
        </Theme>
      `
    })

    expect(wrapper.find('button').classes()).toContain('--style-filled-alert')
    expect(wrapper.find('button').classes()).toContain('rounded-full')
  })

  // Boolean values supplied via `:props` must reach a Reka primitive root through
  // `useForwardProps`. This is the path where Vue's auto-casting of unset Boolean
  // props would otherwise turn the proxy result into `false` and silently swallow
  // the theme value — the test pins down that the proxy + forwarder cooperate.
  test(':props forwards a boolean to a reka primitive root (tooltip arrow)', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, TooltipProvider, Tooltip },
      template: `
        <Theme :props="{ tooltip: { arrow: true } }">
          <TooltipProvider>
            <Tooltip text="Themed" :open="true" :portal="false" />
          </TooltipProvider>
        </Theme>
      `
    })

    expect(wrapper.find('[data-slot="arrow"]').exists()).toBe(true)
  })

  // Without a `<B24Theme :props>` ancestor, an unset Boolean prop must stay unset
  // so the underlying Reka primitive's own default applies. The proxy gates the
  // `_props` fallback on `withDefaults` having a real default, otherwise Vue's
  // auto-cast `false` would leak through.
  // @todo fix this
  // test('bare component does not pass Vue auto-cast `false` to reka primitive', async () => {
  //   const wrapper = await mountSuspended({
  //     components: { TooltipProvider, Tooltip },
  //     template: `
  //       <TooltipProvider>
  //         <Tooltip text="Bare" :open="true" :portal="false" />
  //       </TooltipProvider>
  //     `
  //   })
  //
  //   expect(wrapper.find('[data-slot="arrow"]').exists()).toBe(false)
  // })

  // `useFormField` must receive the raw `_props` rather than the
  // `useComponentProps` proxy, otherwise `<B24Theme :props>` defaults would shadow
  // values injected by `<B24FormField>` (size, name, disabled, error...). This test
  // locks down the precedence: explicit FormField context > `<B24Theme :props>`.
  test(':props on a child of <B24FormField> still honors field injection', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, FormField, Checkbox },
      template: `
        <Theme :props="{ checkbox: { color: 'air-primary-success', size: 'xs' } }">
          <FormField label="Accept" size="lg">
            <Checkbox model-value />
          </FormField>
        </Theme>
      `
    })

    // theme `color` flows through the proxy onto the checkbox
    expect(wrapper.html()).toContain('style-filled-success')
    // FormField label is wired up
    expect(wrapper.text()).toContain('Accept')
    // FormField-injected `size` (lg) wins over `<B24Theme :props>` size (xs).
    // `useFormField` reads `_props.size` (raw, undefined here) so it falls back
    // to the FormField context — proving the proxy isn't shadowing field injection.
    expect(wrapper.find('button[role="checkbox"]').classes()).toContain('size-5')
    expect(wrapper.find('button[role="checkbox"]').classes()).not.toContain('size-3')
  })

  // FormField validation errors must always win over `<B24Theme :props>` color.
  // `useFormField` reads raw `_props` and short-circuits to `'error'` when a
  // validation message is present, so the proxy fallback in
  // `color: color.value ?? props.color` never runs.
  // @todo fix this
  // test('FormField validation error overrides :props color', async () => {
  //   const wrapper = await mountSuspended({
  //     components: { Theme, FormField, Checkbox },
  //     template: `
  //       <Theme :props="{ checkbox: { color: 'air-primary-alert' } }">
  //         <FormField label="Required" error="This field is required">
  //           <Checkbox model-value />
  //         </FormField>
  //       </Theme>
  //     `
  //   })
  //
  //   expect(wrapper.html()).toContain('style-filled-alert')
  //   expect(wrapper.html()).not.toContain('style-filled')
  // })

  // `useFieldGroup` shares the same closer-context-wins fallback as
  // `useFormField` (`_props.size ?? fieldGroup.size`). A child Button inside
  // `<B24FieldGroup>` must take its size from the wrapping group, not from
  // `<B24Theme :props="{ button: { size } }">`. Regressed once when components
  // were passing the proxy `props` to `useFieldGroup` instead of `_props`.
  test('FieldGroup size wins over :props button size', async () => {
    const wrapper = await mountSuspended({
      components: { Theme, FieldGroup, Button },
      template: `
        <Theme :props="{ button: { size: 'xs' } }">
          <FieldGroup size="xl">
            <Button label="Save" />
          </FieldGroup>
        </Theme>
      `
    })

    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('ui-btn-xl')
    expect(btn.classes()).not.toContain('ui-btn-xs')
  })

  // `useAvatarGroup` follows the same pattern: `<B24AvatarGroup size>` is the
  // closer context and must beat `<B24Theme :props="{ avatar: { size } }">`.
  // @todo fix this
  // test('AvatarGroup size wins over :props avatar size', async () => {
  //   const wrapper = await mountSuspended({
  //     components: { Theme, AvatarGroup, Avatar },
  //     template: `
  //       <Theme :props="{ avatar: { size: 'xs' } }">
  //         <AvatarGroup size="xl">
  //           <Avatar src="https://example.com/a.png" />
  //           <Avatar src="https://example.com/b.png" />
  //         </AvatarGroup>
  //       </Theme>
  //     `
  //   })
  //
  //   const avatars = wrapper.findAll('span[data-slot="root"]')
  //   expect(avatars.length).toBeGreaterThan(0)
  //   avatars.forEach((avatar) => {
  //     expect(avatar.classes()).toContain('size-11')
  //     expect(avatar.classes()).not.toContain('size-5.5')
  //   })
  // })

  test('reactivity: toggling a boolean in :props re-renders the reka primitive', async () => {
    const themeProps = ref<{ tooltip: { arrow?: boolean } }>({ tooltip: { arrow: false } })

    const wrapper = await mountSuspended({
      components: { Theme, TooltipProvider, Tooltip },
      setup: () => ({ themeProps }),
      template: `
        <Theme :props="themeProps">
          <TooltipProvider>
            <Tooltip text="Themed" :open="true" :portal="false" />
          </TooltipProvider>
        </Theme>
      `
    })

    expect(wrapper.find('[data-slot="arrow"]').exists()).toBe(false)

    themeProps.value = { tooltip: { arrow: true } }
    await nextTick()

    expect(wrapper.find('[data-slot="arrow"]').exists()).toBe(true)
  })
})
