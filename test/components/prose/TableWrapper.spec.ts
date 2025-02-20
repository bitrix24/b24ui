import { describe, it, expect } from 'vitest'
import TableWrapper, { type TableWrapperProps, type TableWrapperSlots } from '../../../src/runtime/components/prose/TableWrapper.vue'
import ComponentRender from '../../component-render'

describe('DescriptionList', () => {
  const props = { }

  it.each([
    // Props
    ['with as', { props: { ...props, as: 'section' }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    ['with size xs', { props: { ...props, size: 'xs' as const }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    ['with rounded', { props: { rounded: true }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    ['with zebra', { props: { zebra: true }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    ['with pinRows', { props: { pinRows: true }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    ['with pinCols', { props: { pinCols: true }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    ['with rowHover', { props: { rowHover: true }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    ['with bordered', { props: { bordered: true }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    ['with scrollbarThin', { props: { scrollbarThin: false }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    ['with class', { props: { ...props, class: 'overflow-x-auto w-full' }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    ['with b24ui', { props: { ...props, b24ui: { base: 'font-bold' } }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    // Slots
    ['with default slot', { slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: TableWrapperProps, slots?: Partial<TableWrapperSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, TableWrapper)
    expect(html).toMatchSnapshot()
  })
})
