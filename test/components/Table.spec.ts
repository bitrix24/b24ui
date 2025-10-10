import { h, ref, computed } from 'vue'
import { describe, it, expect } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { B24Checkbox, B24Button, B24Badge, B24DropdownMenu } from '#components'
import Table from '../../src/runtime/components/Table.vue'
import type { TableProps, TableSlots, TableColumn, TableRow } from '../../src/runtime/components/Table.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/table'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Table', () => {
  const loadingColors = Object.keys(theme.variants.loadingColor) as any
  const loadingAnimations = Object.keys(theme.variants.loadingAnimation) as any

  const data = [
    {
      id: 'm5gr84i9',
      amount: 316,
      status: 'success',
      email: 'ken99@yahoo.com'
    },
    {
      id: '3u1reuv4',
      amount: 242,
      status: 'success',
      email: 'Abe45@gmail.com'
    },
    {
      id: 'derv1ws0',
      amount: 837,
      status: 'processing',
      email: 'Monserrat44@gmail.com'
    },
    {
      id: '5kma53ae',
      amount: 874,
      status: 'success',
      email: 'Silas22@gmail.com'
    },
    {
      id: 'bhqecj4p',
      amount: 721,
      status: 'failed',
      email: 'carmella@hotmail.com'
    }
  ]

  const columns: TableColumn<typeof data[number]>[] = [
    {
      id: 'select',
      header: ({ table }) => h(B24Checkbox, {
        'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate' | undefined) => table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all'
      }),
      cell: ({ row }) => h(B24Checkbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate' | undefined) => row.toggleSelected(!!value),
        'ariaLabel': 'Select row'
      }),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => `#${row.getValue('id')}`
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        return new Date(row.getValue('date')).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const color = ({
          paid: 'air-primary-success' as const,
          failed: 'air-primary-alert' as const,
          refunded: 'air-primary' as const
        })[row.getValue('status') as string]

        return h(B24Badge, { class: 'capitalize', color }, () => row.getValue('status'))
      }
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()

        return h(B24Button, {
          color: 'air-primary-copilot',
          label: 'Email',
          icon: isSorted ? (isSorted === 'asc' ? SignIcon : Cross30Icon) : SignIcon,
          class: '-mx-2.5',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        })
      },
      cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email'))
    },
    {
      accessorKey: 'amount',
      header: () => h('div', { class: 'text-right' }, 'Amount'),
      footer: ({ column }) => {
        const total = column.getFacetedRowModel().rows.reduce((acc: number, row: TableRow<typeof data[number]>) => acc + Number.parseFloat(row.getValue('amount')), 0)

        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR'
        }).format(total)

        return h('div', { class: 'text-right font-(--ui-font-weight-medium)' }, `Total: ${formatted}`)
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue('amount'))

        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR'
        }).format(amount)

        return h('div', { class: 'text-right font-(--ui-font-weight-medium)' }, formatted)
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const items = [{
          type: 'label',
          label: 'Actions'
        }, {
          label: 'Copy payment ID'
        }, {
          label: row.getIsExpanded() ? 'Collapse' : 'Expand'
        }, {
          type: 'separator'
        }, {
          label: 'View customer'
        }, {
          label: 'View payment details'
        }]

        return h('div', { class: 'text-right' }, h<any>(B24DropdownMenu, {
          content: {
            align: 'end'
          },
          items
        }, () => h(B24Button, {
          icon: SignIcon,
          color: 'air-primary-copilot',
          class: 'ml-auto'
        })))
      }
    }
  ]

  const props = { data }

  it.each([
    // Props
    ['with data', { props }],
    ['without data', {}],
    ['with empty', { props: { empty: 'There is no data' } }],
    ['with caption', { props: { ...props, caption: 'Table caption' } }],
    ['with columns', { props: { ...props, columns } }],
    ['with sticky', { props: { ...props, sticky: true } }],
    ['with loading', { props: { ...props, loading: true } }],
    ...loadingColors.map((loadingColor: string) => [`with loading color ${loadingColor}`, { props: { ...props, loading: true, loadingColor } }]),
    ...loadingAnimations.map((loadingAnimation: string) => [`with loading animation ${loadingAnimation}`, { props: { ...props, loading: true, loadingAnimation } }]),
    ['with meta prop', { props: { ...props, meta: { class: { tr: 'custom-row-class' }, style: { tr: { backgroundColor: 'lightgray' } } } } }],
    ['with meta field on columns', { props: { ...props, columns: columns.map(c => ({ ...c, meta: { class: { th: 'custom-heading-class', td: 'custom-cell-class' }, style: { th: { backgroundColor: 'black' }, td: { backgroundColor: 'lightgray' } } } })) } }],
    ['with virtualize', { props: { ...props, virtualize: true } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'absolute' } }],
    ['with b24ui', { props: { ...props, b24ui: { base: 'table-auto' } } }],
    // Slots
    ['with header slot', { props, slots: { 'id-header': () => 'ID Header slot' } }],
    ['with cell slot', { props, slots: { 'id-cell': () => 'ID Cell slot' } }],
    ['with expanded slot', { props, slots: { expanded: () => 'Expanded slot' } }],
    ['with empty slot', { props: { columns }, slots: { empty: () => 'Empty slot' } }],
    ['with loading slot', { props: { columns, loading: true }, slots: { loading: () => 'Loading slot' } }],
    ['with caption slot', { props, slots: { caption: () => 'Caption slot' } }],
    ['with body-top slot', { props, slots: { 'body-top': () => 'Body top slot' } }],
    ['with body-bottom slot', { props, slots: { 'body-bottom': () => 'Body bottom slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: TableProps, slots?: Partial<TableSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Table)
    expect(html).toMatchSnapshot()
  })

  it('reactive columns', async () => {
    const wrapper = await mountSuspended({
      components: { Table },
      setup() {
        const filter = ref<1 | 2>(1)

        const columns = computed<TableColumn<typeof data[number]>[]>(() => [
          {
            accessorKey: 'id'
          },
          ...(filter.value === 2
            ? [
              {
                accessorKey: 'amount',
                header: () => h('div', { ['data-test-th']: 'amount' }, 'Amount')
              } satisfies TableColumn<typeof data[number]>
              ]
            : [])
        ])

        function onClick() {
          filter.value = 2
        }

        return { data, columns, onClick }
      },
      template: `
            <div>
              <button @click="onClick">Change filter</button>
              <Table :data :columns />
            </div>
          `
    })

    expect(wrapper.find('[data-test-th="amount"]').exists()).toBeFalsy()

    wrapper.find('button').trigger('click')
    await flushPromises()

    expect(wrapper.find('[data-test-th="amount"]').exists()).toBeTruthy()
  })
})
