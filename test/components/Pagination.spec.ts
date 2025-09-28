import { describe, it, expect } from 'vitest'
import Pagination from '../../src/runtime/components/Pagination.vue'
import type { PaginationProps, PaginationSlots } from '../../src/runtime/components/Pagination.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/button'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Pagination', () => {
  const sizes = Object.keys(theme.variants.size) as any

  const props = { total: 100 }

  it.each([
    // Props
    ['with total', { props }],
    ['with defaultPage', { props: { ...props, defaultPage: 2 } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with itemsPerPage', { props: { ...props, itemsPerPage: 5 } }],
    ['with page', { props: { ...props, page: 2 } }],
    ['with showEdges', { props: { ...props, showEdges: true } }],
    ['with siblingCount', { props: { ...props, siblingCount: 1, showEdges: true, page: 5 } }],
    ['without showControls', { props: { ...props, showControls: false } }],
    ['with firstIcon', { props: { ...props, firstIcon: SignIcon } }],
    ['with prevIcon', { props: { ...props, prevIcon: Cross30Icon } }],
    ['with nextIcon', { props: { ...props, nextIcon: SignIcon } }],
    ['with lastIcon', { props: { ...props, lastIcon: Cross30Icon } }],
    ['with ellipsisIcon', { props: { ...props, ellipsisIcon: Cross30Icon, siblingCount: 1, showEdges: true, page: 5 } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ['with as', { props: { ...props, as: 'div' } }],
    ['with class', { props: { ...props, class: 'relative' } }],
    ['with b24ui', { props: { ...props, b24ui: { list: 'gap-3', first: 'rounded-full', prev: 'rounded-full', item: 'rounded-full', next: 'rounded-full', last: 'rounded-full' } } }],
    // Slots
    ['with first slot', { props, slots: { first: () => 'First slot' } }],
    ['with prev slot', { props, slots: { prev: () => 'Prev slot' } }],
    ['with next slot', { props, slots: { next: () => 'Next slot' } }],
    ['with last slot', { props, slots: { last: () => 'Last slot' } }],
    ['with ellipsis slot', { props: { ...props, siblingCount: 1, showEdges: true, page: 5 }, slots: { ellipsis: () => 'Ellipsis slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PaginationProps, slots?: Partial<PaginationSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Pagination)
    expect(html).toMatchSnapshot()
  })
})
