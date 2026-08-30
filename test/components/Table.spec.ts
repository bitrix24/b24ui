import { h, ref, computed } from 'vue'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import { B24Checkbox, B24Button, B24Badge, B24DropdownMenu } from '#components'
import Table from '../../src/runtime/components/Table.vue'
import type { TableColumn, TableRow } from '../../src/runtime/components/Table.vue'
import theme from '#build/b24ui/table'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'
import SearchIcon from '@bitrix24/b24icons-vue/main/Search2Icon'

describe('Table', () => {
  const loadingColors = Object.keys(theme.variants.loadingColor) as any
  const loadingAnimations = Object.keys(theme.variants.loadingAnimation) as any

  const data = [
    {
      id: 'm5gr84i9',
      amount: 316,
      date: '2024-03-11T15:30:00',
      status: 'paid',
      email: 'ken99@yahoo.com'
    },
    {
      id: '3u1reuv4',
      amount: 242,
      date: '2024-03-11T10:10:00',
      status: 'failed',
      email: 'Abe45@gmail.com'
    },
    {
      id: 'derv1ws0',
      amount: 837,
      date: '2024-03-11T08:50:00',
      status: 'refunded',
      email: 'Monserrat44@gmail.com'
    },
    {
      id: '5kma53ae',
      amount: 874,
      date: '2024-03-10T19:45:00',
      status: 'paid',
      email: 'Silas22@gmail.com'
    },
    {
      id: 'bhqecj4p',
      amount: 721,
      date: '2024-03-10T15:55:00',
      status: 'paid',
      email: 'carmella@hotmail.com'
    }
  ]

  const columns: TableColumn<typeof data[number]>[] = [
    {
      id: 'select',
      header: ({ table }) => h(B24Checkbox<boolean>, {
        'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': value => table.toggleAllPageRowsSelected(!!value),
        'label': 'Select all'
      }),
      cell: ({ row }) => h(B24Checkbox<boolean>, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': value => row.toggleSelected(!!value),
        'aria-label': 'Select row'
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
      // The fixture carries `date` because this cell formats it. Without the
      // field `row.getValue('date')` was `undefined`, `new Date(undefined)` was
      // an Invalid Date, and the snapshots recorded `Invalid Date` ten times as
      // the expected output — the column asserted that a broken render stayed
      // broken (#420). The values come from the docs example for this table.
      //
      // Why this is timezone-independent, which is not the obvious reason: the
      // values carry no `Z`, so they parse as *local*, and the formatter names
      // no `timeZone`, so it renders in *local*. The two cancel on wall-clock
      // fields, and the rendered string is identical in all 418 IANA zones. The
      // suite's `TZ=UTC` pin (#418) is a backstop here, not the mechanism —
      // this spec passes with the pin removed.
      //
      // Two things that would break it, both easy to do by accident:
      //
      //   - **Do not add `timeZone: 'UTC'`** to match the docs example. Every
      //     docs copy has it and this one deliberately does not: pinning the
      //     format side without pinning the parse side stops the cancellation,
      //     and four assertions diverge the moment the `TZ` pin is lifted —
      //     `Mar 10, 19:45` becomes `Mar 11, 02:45`.
      //   - **Keep new values out of hour `00`, and out of `00:00`–`02:59` on
      //     2024-03-10.** Node 20 resolves `hour12: false` to `h24`, so a
      //     midnight value renders `24:15` there and `00:15` on CI's node 24;
      //     and that window is the spring-forward gap, where 52 of 418 zones
      //     have no such wall time and the cancellation fails.
      //
      // What the five values actually pin: `month: 'short'` and the `en-US`
      // locale (via `Mar` and the comma) and `hour12: false` (via the absent
      // `AM`). Not pinned: `day: 'numeric'`, since every value is a two-digit
      // day, and `hour`/`minute` `'2-digit'`, which ECMA-402 resolves to the
      // same output as `'numeric'` whenever `hour12: false` is set — no fixture
      // value can distinguish those.
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
      // The fixture's statuses are the map's keys, which they were not: it
      // carried `success`/`processing` while the map handles
      // `paid`/`failed`/`refunded`, so four of five rows resolved to
      // `undefined` and rendered the badge's default and two of the three
      // colour branches were unreachable (#450). The statuses and their
      // vocabulary come from the docs example for this table, as the dates do —
      // `id`, `email` and `amount` do not, they are the upstream fixture.
      //
      // One branch is still only half-covered, and it is worth knowing which.
      // `refunded` maps to `air-primary`, which is `src/theme/badge.ts`'s own
      // default, so its rendered bytes are indistinguishable from an unmapped
      // status: changing that colour fails four tests, but *deleting* the
      // `refunded` entry fails none. Closing it needs the fixture's `status`
      // typed as the union so a dropped key is a compile error — `getValue`
      // returns `unknown` and the `as string` erases the key set. Tracked with
      // the rest of that family in #454.
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
          // Three distinct icons for three states. The fixture used to give
          // `asc` and unsorted the same one, so even a sorted case could only
          // ever have distinguished `desc` (#454).
          icon: isSorted ? (isSorted === 'asc' ? Cross30Icon : SearchIcon) : SignIcon,
          class: '-mx-2.5',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        })
      },
      meta: {
        class: {
          td: 'lowercase'
        }
      }
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      meta: {
        class: {
          th: 'text-right',
          td: 'text-right font-medium'
        }
      },
      footer: ({ column }) => {
        const total = column.getFacetedRowModel().rows.reduce((acc: number, row: TableRow<typeof data[number]>) => acc + Number.parseFloat(row.getValue('amount')), 0)
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR'
        }).format(total)

        return `Total: ${formatted}`
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue('amount'))
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR'
        }).format(amount)
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      meta: {
        class: {
          td: 'text-right'
        }
      },
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

        return h<any>(B24DropdownMenu, {
          // `open` and `portal: false` so the menu renders inline and its items
          // reach the snapshot. Without them every label in `items` above
          // appeared zero times in the file — the whole array was dead (#454),
          // which is how a column definition can look covered and prove
          // nothing. This mirrors what DropdownMenu.spec.ts does for the same
          // reason.
          open: true,
          portal: false,
          content: {
            align: 'end'
          },
          items
        }, () => h(B24Button, {
          'icon': SignIcon,
          'color': 'air-primary-copilot',
          'aria-label': 'Actions'
        }))
      }
    }
  ]

  const props = { data }

  renderEach(Table, [
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
    // `sorting` is a v-model too. Before these two, `column.getIsSorted()`
    // returned false in all 35 entries, so both branches of every sortable
    // header were unreachable and `aria-sort` appeared zero times in the file
    // (#454).
    ['with sorting asc', { props: { ...props, columns, sorting: [{ id: 'email', desc: false }] } }],
    ['with sorting desc', { props: { ...props, columns, sorting: [{ id: 'email', desc: true }] } }],
    ['with virtualize', { props: { ...props, virtualize: true } }],
    ['with virtualize and sticky', { props: { ...props, columns, virtualize: true, sticky: true } }],
    ['with virtualize external scroll element', { props: { ...props, virtualize: { getScrollElement: () => document.body, scrollMargin: 20 } } }],
    ['with row pinning', { props: { ...props, rowPinning: { top: ['2'], bottom: ['3'] } } }],
    // No combined pinning-and-virtualization case. Virtualization under
    // happy-dom renders a single row — the virtualiser sizes its window from
    // scroll geometry the environment does not compute — so there is nothing
    // for `rowPinning` to pin and the case was byte-identical to
    // `with virtualize` (#454). `with row pinning` on its own does assert
    // something and stays. Same shape as ChatMessages' viewport slot: not a
    // fixture to fix, a branch this environment cannot reach.
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'absolute' } }],
    ['with b24ui', { props: { ...props, b24ui: { base: 'table-auto' } } }],
    // Slots
    ['with header slot', { props, slots: { 'id-header': () => 'ID Header slot' } }],
    ['with cell slot', { props, slots: { 'id-cell': () => 'ID Cell slot' } }],
    // `expanded` is a v-model, so the state can be handed in directly. The
    // slot renders inside `v-if="row.getIsExpanded()"`, so without it the case
    // was byte-identical to `with data` (#454). Upstream's spec has the same
    // omission.
    ['with expanded slot', { props: { ...props, expanded: { 0: true } }, slots: { expanded: () => 'Expanded slot' } }],
    ['with empty slot', { props: { columns }, slots: { empty: () => 'Empty slot' } }],
    ['with loading slot', { props: { columns, loading: true }, slots: { loading: () => 'Loading slot' } }],
    ['with caption slot', { props, slots: { caption: () => 'Caption slot' } }],
    ['with body-top slot', { props, slots: { 'body-top': () => 'Body top slot' } }],
    ['with body-bottom slot', { props, slots: { 'body-bottom': () => 'Body bottom slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Table, {
      props: {
        ...props,
        columns: columns as any,
        caption: 'Table caption'
      }
    })
    expect(await axe(wrapper.element, {
      rules: {
        // This is just incorrect test setup, and generally something
        // that is in the control of the developer using the component.
        'empty-table-header': { enabled: false },
        // Checkbox buttons inside table are labelled via <label for="..."> from reka-ui,
        // but axe-core in JSDOM cannot resolve the association on custom elements.
        'button-name': { enabled: false },
        // reka-ui's `hideOthers` marks the trigger `aria-hidden` while the
        // popup is open, and leaves it focusable — which is what this rule
        // catches. Measured: with the production default `portal: true` the
        // violation is gone, because the content teleports out and the
        // trigger is no longer its sibling. These specs pass `portal: false`
        // so the content lands inside the wrapper and can be asserted on, and
        // that arrangement is the whole reason the rule fires. Auditing
        // `document.body` instead is worse, not better: it then trips on
        // reka-ui's own `data-reka-focus-guard` spans, which carry
        // `tabindex="0"` next to `aria-hidden="true"` by design.
        'aria-hidden-focus': { enabled: false }
      }
    })).toHaveNoViolations()
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
