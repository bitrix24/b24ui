import { ref } from 'vue'
import { describe, it, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { renderEach } from '../component-render'
import Button from '../../src/runtime/components/Button.vue'
import theme from '#build/b24ui/button'
import { B24Form } from '#components'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import Shining2Icon from '@bitrix24/b24icons-vue/main/Shining2Icon'

describe('Button', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const colors = Object.keys(theme.variants.color) as any

  renderEach(Button, [
    // Props
    ['with label', { props: { label: 'Button' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { label: 'Button', size } }]),
    ...colors.map((color: string) => [`with normal color ${color}`, { props: { label: 'Button', color } }]),
    ...colors.map((color: string) => [`with light color ${color}`, { props: { label: 'Button', color, depth: 'light' } }]),
    ...colors.map((color: string) => [`with dark color ${color}`, { props: { label: 'Button', color, depth: 'dark' } }]),
    ['with icon', { props: { icon: Search2Icon } }],
    ['with leading and icon', { props: { leading: true, icon: Shining2Icon } }],
    ['with leadingIcon', { props: { leadingIcon: Shining2Icon } }],
    ['with trailingIcon', { props: { trailingIcon: Search2Icon } }],
    // The dropdown chevron comes from the dictionary's `chevronDown` role
    // (#380); nothing else in this file renders it.
    ['with useDropdown', { props: { label: 'Button', useDropdown: true } }],
    ['with avatar', { props: { avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with avatar and leadingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, leadingIcon: Search2Icon } }],
    ['with avatar and trailingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, trailingIcon: Shining2Icon } }],
    ['with loading', { props: { loading: true } }],
    ['with loading and avatar', { props: { loading: true, avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with disabled', { props: { label: 'Button', disabled: true } }],
    ['with disabled and with link', { props: { label: 'Button', disabled: true, to: '/link' } }],
    ['with block', { props: { label: 'Button', block: true } }],
    ['with rounded', { props: { label: 'Button', rounded: true } }],
    ['with as', { props: { label: 'Button', as: 'div' } }],
    ['with class', { props: { label: 'Button', class: 'rounded-full font-(--ui-font-weight-bold)' } }],
    ['with b24ui', { props: { label: 'Button', b24ui: { label: 'font-bold' } } }],
    // Bitrix24-only props, absent from `nuxt/ui`. `normalCase` defaults to
    // `true`, so `false` is the case that renders something. `loadingAuto` is
    // left out: it only reacts to an async click handler.
    ['with normalCase false', { props: { label: 'Button', normalCase: false } }],
    ['with loading and useWait', { props: { label: 'Button', loading: true, useWait: true } }],
    ['with loading and useClock', { props: { label: 'Button', loading: true, useClock: true } }],
    ['with inactiveClass', { props: { label: 'Button', inactiveClass: 'is-off' } }],
    ['with active and activeClass', { props: { label: 'Button', active: true, activeClass: 'is-on' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }],
    ['with trailing slot', { slots: { trailing: () => 'Trailing slot' } }]
  ])

  /**
   * `activeColor` and `activeDepth` land on colours the snapshot matrix
   * already renders, so a `renderEach` case for either one collides with a
   * sibling and proves nothing (#454). What is actually worth pinning is the
   * override: the prop must take effect only while the button is active.
   */
  describe('active overrides', () => {
    const render = async (props: Record<string, any>) =>
      (await mountSuspended(Button, { props: { label: 'Button', ...props } })).html()

    it('applies activeColor only while active', async () => {
      const inactive = await render({ activeColor: 'air-primary-success' })
      const active = await render({ active: true, activeColor: 'air-primary-success' })

      expect(active).not.toBe(inactive)
      expect(active).toBe(await render({ active: true, color: 'air-primary-success' }))
      expect(inactive).toBe(await render({}))
    })

    // On a legacy colour name, because `depth` has compound variants only for
    // those — on the `air-*` default the prop renders nothing either way, so
    // the assertion would hold for the wrong reason. That gap is why both
    // `depth` and `activeDepth` are `@deprecated`; the test stays, so the
    // behaviour is pinned until they go in `3.0.0`.
    it('applies activeDepth only while active', async () => {
      const inactive = await render({ color: 'primary', activeDepth: 'dark' })
      const active = await render({ color: 'primary', active: true, activeDepth: 'dark' })

      expect(active).not.toBe(inactive)
      expect(active).toBe(await render({ color: 'primary', active: true, depth: 'dark' }))
      expect(inactive).toBe(await render({ color: 'primary' }))
    })
  })

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
      template: `
        <Button loading-auto @click="onClick"> Click </Button>
      `
    })

    const button = wrapper.find('button')
    button.trigger('click')
    await flushPromises()

    // const icon = wrapper.findComponent({ name: 'Icon' })

    // expect(icon.classes()).toContain('animate-spin')
    // expect(icon?.vm?.name).toBe('i-lucide-loader-circle')

    resolve?.(null)
  })

  test('with loading-auto works with forms', async () => {
    let resolve: any | null = null
    const wrapper = await mountSuspended({
      components: { Button, B24Form },
      setup() {
        function onSubmit() {
          return new Promise(res => resolve = res)
        }

        const form = ref()
        return { form, onSubmit }
      },
      template: `
        <B24Form :state="{}" ref="form" @submit="onSubmit">
          <Button type="submit" loading-auto> Click </Button>
        </B24Form>
      `
    })

    const form = wrapper.setupState.form
    form.value.submit()
    await flushPromises()

    // const icon = wrapper.findComponent({ name: 'Icon' })

    // expect(icon.classes()).toContain('animate-spin')
    // expect(icon?.vm?.name).toBe('i-lucide-loader-circle')

    resolve?.(null)
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        label: 'Button',
        avatar: {
          src: 'https://github.com/bitrix24.png',
          alt: 'Some User'
        },
        icon: Search2Icon

      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  it('replaces a slot class through a `:b24ui` function', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        label: 'Button',
        b24ui: { label: () => 'text-3xl font-bold' }
      }
    })

    const label = wrapper.get('[data-slot="label"]')
    expect(label.classes()).toContain('text-3xl')
    // A default label class (e.g. `text-clip`) is dropped, not merged.
    expect(label.classes()).not.toContain('text-clip')
  })
})
