import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TableWrapper from '../../src/runtime/components/TableWrapper.vue'
import { renderEach } from '../component-render'

describe('TableWrapper', () => {
  const props = { }

  renderEach(TableWrapper, [
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
    ['with b24ui', { props: { ...props, b24ui: { base: 'font-(--ui-font-weight-bold)' } }, slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }],
    // Slots
    ['with default slot', { slots: { default: () => '<table><tbody><tr><th>1</th><td>2</td></tr></tbody></table>' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(TableWrapper, {
      slots: {
        default: () => '<table><caption>Deals</caption><thead><tr><th scope="col">Name</th><th scope="col">Sum</th></tr></thead><tbody><tr><th scope="row">First</th><td>100</td></tr></tbody></table>'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
