import { describe, it, expect } from 'vitest'
import Error from '../../src/runtime/components/Error.vue'
import type { ErrorProps, ErrorSlots } from '../../src/runtime/components/Error.vue'
import ComponentRender from '../component-render'

describe('Error', () => {
  const error = {
    statusCode: 404,
    statusMessage: 'Not Found',
    message: 'The page you are looking for does not exist.'
  }

  const props = { error }

  it.each([
    // Props
    ['with error', { props }],
    ['with redirect', { props: { ...props, redirect: '/blog' } }],
    ['with clear', { props: { ...props, clear: { label: 'Home' } } }],
    ['with as', { props: { ...props, as: 'div' } }],
    ['with class', { props: { ...props, class: 'min-h-full' } }],
    ['with b24ui', { props: { ...props, b24ui: { links: 'mt-16' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with statusCode slot', { props, slots: { statusCode: () => 'Status code slot' } }],
    ['with statusMessage slot', { props, slots: { statusMessage: () => 'Status message slot' } }],
    ['with message slot', { props, slots: { message: () => 'Message slot' } }],
    ['with links slot', { props, slots: { links: () => 'Links slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ErrorProps, slots?: Partial<ErrorSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Error)
    expect(html).toMatchSnapshot()
  })
})
