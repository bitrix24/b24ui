import { describe, it, expect } from 'vitest'
import SkeletonTaskAdd, { type SkeletonTaskAddProps, type SkeletonTaskAddSlots } from '../../../src/runtime/components/content/SkeletonTaskAdd.vue'
import ComponentRender from '../../component-render'

describe('SkeletonTaskAdd', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: '' } }],
    ['with b24ui', { props: { b24ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: SkeletonTaskAddProps, slots?: Partial<SkeletonTaskAddSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, SkeletonTaskAdd)
    expect(html).toMatchSnapshot()
  })
})
