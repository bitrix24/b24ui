import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import Card from '../../src/runtime/components/Card.vue'
import theme from '#build/b24ui/card'

describe('Card', () => {
  const variants = Object.keys(theme.variants.variant) as any
  const sizes = Object.keys(theme.variants.size) as any

  renderEach(Card, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with title', { props: { title: 'Title' } }],
    ['with description', { props: { description: 'Description' } }],
    ['with title and description', { props: { title: 'Title', description: 'Description' } }],
    ...variants.map((variant: string) => [`with variant ${variant}`, { props: { variant } }]),
    // `header` / `body` / `footer` only render when they have content, and the
    // padding lives on those three slots — a size case without content shows no
    // padding class at all and collides with every other bare case (#454).
    ...sizes.map((size: string) => [`with size ${size}`, {
      props: { size, title: 'Title', description: 'Description' },
      slots: { default: () => 'Body', footer: () => 'Footer' }
    }]),
    ['with class', { props: { class: 'rounded-xl' } }],
    ['with b24ui', { props: { b24ui: { body: 'font-bold' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with header slot', { slots: { header: () => 'Header slot' } }],
    ['with title slot', { slots: { title: () => 'Title slot' } }],
    ['with description slot', { slots: { description: () => 'Description slot' } }],
    ['with footer slot', { slots: { footer: () => 'Footer slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Card)

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
