import { describe, it, expect } from 'vitest'
import Slideover, { type SlideoverProps, type SlideoverSlots } from '../../src/runtime/components/Slideover.vue'
import ComponentRender from '../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('Slideover', () => {
  const props = { open: true, portal: false }

  it.each([
    // Props
    ['with open', { props }],
    ['with title', { props: { ...props, title: 'Title' } }],
    ['with description', { props: { ...props, title: 'Title', description: 'Description' } }],
    ['with left side', { props: { ...props, side: 'left' as const, title: 'Title', description: 'Description' } }],
    ['with top side', { props: { ...props, side: 'top' as const, title: 'Title', description: 'Description' } }],
    ['with bottom side', { props: { ...props, side: 'bottom' as const, title: 'Title', description: 'Description' } }],
    ['without overlay', { props: { ...props, overlay: false, title: 'Title', description: 'Description' } }],
    ['without transition', { props: { ...props, transition: false, title: 'Title', description: 'Description' } }],
    ['without close', { props: { ...props, close: false, title: 'Title', description: 'Description' } }],
    ['with closeIcon', { props: { ...props, closeIcon: SignIcon } }],
    ['with class', { props: { ...props, class: 'bg-red-500' } }],
    ['with b24ui', { props: { ...props, b24ui: { close: 'end-2' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with header slot', { props, slots: { header: () => 'Header slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with actions slot', { props, slots: { actions: () => 'Actions slot' } }],
    ['with close slot', { props, slots: { close: () => 'Close slot' } }],
    ['with body slot', { props, slots: { body: () => 'Body slot' } }],
    ['with footer slot', { props, slots: { footer: () => 'Footer slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: SlideoverProps, slots?: Partial<SlideoverSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Slideover)
    expect(html).toMatchSnapshot()
  })
})
