import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import Drawer from '../../src/runtime/components/Drawer.vue'
import theme from '#build/b24ui/drawer'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Drawer', () => {
  const directions = Object.keys(theme.variants.direction) as any

  const props = { open: true, portal: false }

  renderEach(Drawer, [
    // Props
    ['with title', { props: { ...props, title: 'Title' } }],
    ['with description', { props: { ...props, title: 'Title', description: 'Description' } }],
    ['with close', { props: { ...props, title: 'Title', close: true } }],
    ['with closeIcon', { props: { ...props, title: 'Title', close: true, closeIcon: Cross30Icon } }],
    ...directions.map((direction: string) => [`with direction ${direction}`, { props: { ...props, direction, title: 'Title', description: 'Description' } }]),
    ...directions.map((direction: string) => [`with direction ${direction} inset`, { props: { ...props, direction, inset: true, title: 'Title', description: 'Description' } }]),
    ['without handle', { props: { ...props, handle: false, title: 'Title', description: 'Description' } }],
    ['without overlay', { props: { ...props, overlay: false, title: 'Title', description: 'Description' } }],
    ['with class', { props: { ...props, class: 'bg-elevated' } }],
    ['with b24ui', { props: { ...props, b24ui: { handle: 'w-20' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with header slot', { props, slots: { header: () => 'Header slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with actions slot', { props: { ...props, title: 'Title' }, slots: { actions: () => 'Actions slot' } }],
    ['with close slot', { props: { ...props, title: 'Title', close: true }, slots: { close: () => 'Close slot' } }],
    ['with body slot', { props, slots: { body: () => 'Body slot' } }],
    ['with footer slot', { props, slots: { footer: () => 'Footer slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Drawer, {
      props: {
        open: true,
        portal: false,
        title: 'Title',
        description: 'Description'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  // Asserts the reka-ui#1280 workaround; delete with it when upstream is fixed (#159).
  it('blurs the active element when opening to avoid reka-ui aria-hidden focus warning', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()
    expect(document.activeElement).toBe(trigger)

    const wrapper = await mountSuspended(Drawer, {
      props: { open: false, portal: false, title: 'Title' }
    })
    await wrapper.setProps({ open: true })

    expect(document.activeElement).not.toBe(trigger)
    trigger.remove()
  })

  // Restoring focus is the other half of the reka-ui#1280 workaround, and the
  // half the first version got wrong: with no trigger slot rendered, reka-ui
  // falls back to capturing `document.activeElement` and skips when it is
  // `<body>` — which the blur above had just made true — so focus was
  // stranded. Delete with the workaround (#159).
  it('returns focus to the pre-open element after closing', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()

    const wrapper = await mountSuspended(Drawer, {
      props: { open: false, portal: false, title: 'Title' }
    })
    await wrapper.setProps({ open: true })
    await wrapper.setProps({ open: false })
    // The restore waits a tick and then a macrotask, so the overlay it is
    // handing focus back from has finished unmounting; outwait both.
    await new Promise(resolve => setTimeout(resolve, 20))

    expect(document.activeElement).toBe(trigger)
    trigger.remove()
  })
})
