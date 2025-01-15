import { describe, it, expect } from 'vitest'
// import DescriptionList, { type DescriptionListProps, type DescriptionListSlots } from '../../../src/runtime/components/content/DescriptionList.vue'
import DescriptionList, { type DescriptionListProps } from '../../../src/runtime/components/content/DescriptionList.vue'
import ComponentRender from '../../component-render'

describe('DescriptionList', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: '' } }],
    ['with b24ui', { props: { b24ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  // ])('renders %s correctly', async (nameOrHtml: string, options: { props?: DescriptionListProps, slots?: Partial<DescriptionListSlots> }) => {
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: DescriptionListProps }) => {
    const html = await ComponentRender(nameOrHtml, options, DescriptionList)
    expect(html).toMatchSnapshot()
  })
})
