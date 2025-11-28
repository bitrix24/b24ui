<script setup lang="ts">
import { h, resolveComponent, ref } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn, TableRow } from '@bitrix24/b24ui-nuxt'
import type { Column } from '@tanstack/vue-table'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { useClipboard, refDebounced } from '@vueuse/core'
import usePageMeta from './../../composables/usePageMeta'
import { useState } from '#imports'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'
import SortIcon from '@bitrix24/b24icons-vue/actions/SortIcon'
import ChevronTopLIcon from '@bitrix24/b24icons-vue/outline/ChevronTopLIcon'
import ChevronDownLIcon from '@bitrix24/b24icons-vue/outline/ChevronDownLIcon'
import PinIcon from '@bitrix24/b24icons-vue/outline/PinIcon'
import UnpinIcon from '@bitrix24/b24icons-vue/outline/UnpinIcon'

usePageMeta.setPageTitle('CheckboxGroup')

const B24Button = resolveComponent('B24Button')
const B24Checkbox = resolveComponent('B24Checkbox')
const B24Badge = resolveComponent('B24Badge')
const B24DropdownMenu = resolveComponent('B24DropdownMenu')

const toast = useToast()
const { copy } = useClipboard()

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  firstName: string
  lastName: string
  email: string
  amount: number
}

const table = useTemplateRef('table')

const virtualize = ref(false)

const statuses: Payment['status'][] = ['paid', 'failed', 'refunded']
const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'company.com', 'mail.com']
const firstNames = ['john', 'jane', 'alex', 'sarah', 'mike', 'emma', 'david', 'lisa', 'chris', 'anna']
const lastNames = ['smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller', 'davis', 'rodriguez', 'martinez']

function makeData(id: number | string, index?: number): Payment {
  const i = index ?? Number(id)
  const firstName = firstNames[i % firstNames.length]!
  const lastName = lastNames[i % lastNames.length]!

  return {
    id: id.toString(),
    date: index !== undefined ? new Date(Date.now() - index * 3600000 * 2).toISOString() : new Date().toISOString(),
    firstName,
    lastName,
    status: statuses[i % statuses.length]!,
    email: `${firstName}.${lastName}${i > 100 ? Math.floor(i / 10) : ''}@${domains[i % domains.length]}`,
    amount: Math.floor(Math.random() * 900) + 100
  }
}

const data = useState<Payment[]>('data', () => Array.from({ length: 1000 }, (_, i) => makeData(45800 - i, i)))

function getRowItems(row: TableRow<Payment>) {
  return [
    {
      type: 'label' as const,
      label: 'Actions'
    },
    {
      label: 'Copy payment ID',
      onSelect() {
        copy(row.original.id)

        toast.add({
          title: 'Payment ID copied to clipboard!',
          color: 'air-primary-success',
          icon: CircleCheckIcon
        })
      }
    },
    {
      label: row.getIsExpanded() ? 'Collapse' : 'Expand',
      onSelect() {
        row.toggleExpanded()
      }
    },
    {
      type: 'separator' as const
    },
    {
      label: 'View customer'
    },
    {
      label: 'View payment details'
    }
  ]
}

const columns: TableColumn<Payment>[] = [
  {
    id: 'select',
    meta: {
      style: {
        td: {
          width: '20px',
          padding: '16px'
        }
      }
    },
    header: ({ table }) => h(B24Checkbox, {
      'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
      'size': 'sm',
      'aria-label': 'Select all'
    }),
    cell: ({ row }) => h(B24Checkbox, {
      'modelValue': row.getIsSelected(),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
      'size': 'sm',
      'aria-label': 'Select row'
    }),
    enableSorting: false,
    enableHiding: false,
    size: 32
  },
  {
    id: 'actions',
    meta: {
      style: {
        td: {
          width: '20px',
          padding: '16px 4px'
        }
      }
    },
    enableHiding: false,
    cell: ({ row }) => {
      return h('div', { class: 'text-right' }, h(B24DropdownMenu, {
        'content': {
          align: 'center',
          side: 'right',
          sideOffset: -2
        },
        'arrow': true,
        'items': getRowItems(row),
        'aria-label': 'Actions dropdown'
      }, () => h(B24Button, {
        'icon': MenuIcon,
        'color': 'air-tertiary-no-accent',
        'size': 'sm',
        'class': 'ms-auto',
        'aria-label': 'Actions dropdown'
      })))
    },
    size: 64
  },
  {
    accessorKey: 'id',
    header: ({ column }) => getPinnedHeader(column, '#', 'left'),
    cell: ({ row }) => `#${row.getValue('id')}`,
    size: 84
  },
  {
    accessorKey: 'date',
    header: 'Date',
    meta: {
      class: {
        td: 'text-center font-(--ui-font-weight-semi-bold)',
        th: 'text-right text-(--ui-color-accent-main-success) w-[192px]'
      }
    },
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    },
    size: 192
  },
  {
    accessorKey: 'status',
    header: ({ column }) => getPinnedHeader(column, 'Status', 'left'),
    cell: ({ row }) => {
      const color = ({
        paid: 'air-primary-success' as const,
        failed: 'air-primary-alert' as const,
        refunded: 'air-primary' as const
      })[row.getValue('status') as string]

      return h(B24Badge, { class: 'capitalize', color }, () => row.getValue('status'))
    },
    size: 102
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => getPinnedHeader(column, 'First Name', 'left'),
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('firstName')),
    size: 128
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => getPinnedHeader(column, 'Last Name', 'left'),
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('lastName')),
    size: 128
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(B24Button, {
        color: 'air-tertiary-no-accent',
        label: 'Email',
        size: 'sm',
        class: '-mx-2.5 [--ui-btn-height:20px]',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      }, {
        trailing: () => h(isSorted ? (isSorted === 'asc' ? ChevronTopLIcon : ChevronDownLIcon) : SortIcon, {
          class: 'text-(--ui-btn-color) shrink-0 size-(--ui-btn-icon-size)'
        })
      })
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
    size: 232
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => h('div', { class: 'text-right' }, getPinnedHeader(column, 'Amount', 'right')),
    footer: ({ column }) => {
      const total = column.getFacetedRowModel().rows.reduce((acc: number, row: TableRow<Payment>) => acc + Number.parseFloat(row.getValue('amount')), 0)

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
    },
    size: 117
  }
]

function getPinnedHeader(column: Column<Payment>, label: string, position: 'left' | 'right') {
  const isPinned = column.getIsPinned()

  return h(B24Button, {
    color: 'air-tertiary-no-accent',
    label,
    size: 'sm',
    icon: isPinned ? UnpinIcon : PinIcon,
    class: '-mx-2.5 [--ui-btn-height:20px]',
    onClick() {
      column.pin(isPinned === position ? false : position)
    }
  })
}

const loading = ref(true)
const columnPinning = ref({
  left: ['select'],
  right: ['actions']
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 50
})

function addElement() {
  const maxId = Math.max(...data.value.map(item => Number(item.id)))
  data.value.unshift(makeData(maxId + 1))
}

function randomize() {
  data.value.sort(() => Math.random() - 0.5)
}

const rowSelection = ref<Record<string, boolean>>({})

function onSelect(e: Event, row: TableRow<Payment>) {
  row.toggleSelected(!row.getIsSelected())
}

const contextmenuRow = ref<TableRow<Payment> | null>(null)
const contextmenuItems = computed(() => contextmenuRow.value ? getRowItems(contextmenuRow.value) : [])

function onContextmenu(e: Event, row: TableRow<Payment>) {
  contextmenuRow.value = row
}

const popoverOpen = ref(false)
const popoverOpenDebounced = refDebounced(popoverOpen, 1)
const popoverAnchor = ref({ x: 0, y: 0 })
const popoverRow = ref<TableRow<Payment> | null>(null)

const reference = computed(() => ({
  getBoundingClientRect: () =>
    ({
      width: 0,
      height: 0,
      left: popoverAnchor.value.x,
      right: popoverAnchor.value.x,
      top: popoverAnchor.value.y,
      bottom: popoverAnchor.value.y,
      ...popoverAnchor.value
    } as DOMRect)
}))

function onHover(_e: Event, row: TableRow<Payment> | null) {
  popoverRow.value = row

  popoverOpen.value = !!row
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1300)
})
</script>

<template>
  <B24Card
    variant="outline"
    class="flex-1 w-full"
    :b24ui="{
      header: 'p-[12px] px-[14px] py-[14px] sm:px-[14px] sm:py-[14px]',
      body: 'p-0 sm:px-0 sm:py-0',
      footer: 'p-[12px] px-[14px] py-[14px] sm:px-[14px] sm:py-[14px] text-(length:--ui-font-size-xs) text-(--b24ui-typography-legend-color)'
    }"
  >
    <template #header>
      <div class="flex items-center gap-2 overflow-x-auto">
        <B24Switch v-model="virtualize" label="Virtualize" />

        <B24Input
          :model-value="(table?.tableApi?.getColumn('email')?.getFilterValue() as string)"
          class="max-w-[400px]"
          placeholder="Filter emails..."
          @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)"
        />

        <B24Button color="air-primary-copilot" label="Randomize" @click="randomize" />
        <B24Button color="air-primary" label="Add element" @click="addElement" />

        <B24DropdownMenu
          :items="table?.tableApi?.getAllColumns().filter(column => column.getCanHide()).map(column => ({
            label: upperFirst(column.id),
            type: 'checkbox' as const,
            checked: column.getIsVisible(),
            onUpdateChecked(checked: boolean) {
              table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
            },
            onSelect(e: Event) {
              e.preventDefault()
            }
          }))"
          :content="{ align: 'end' }"
        >
          <B24Button
            label="Columns"
            color="air-secondary-accent-1"
            use-dropdown
            class="ms-auto"
          />
        </B24DropdownMenu>
      </div>
    </template>

    <div class="flex flex-col gap-4 w-full h-full">
      <B24ContextMenu :items="contextmenuItems">
        <B24Table
          ref="table"
          :key="String(virtualize)"
          :data="data"
          :columns="columns"
          :column-pinning="columnPinning"
          :row-selection="rowSelection"
          :loading="loading"
          :virtualize="virtualize"
          v-bind="virtualize ? {} : {
            data,
            pagination,
            paginationOptions: {
              getPaginationRowModel: getPaginationRowModel()
            },
            b24ui: {
              tr: 'divide-x divide-(--ui-color-design-outline-content-divider)'
            }
          }"
          sticky
          class="h-[380px]"
          @select="onSelect"
          @contextmenu="onContextmenu"
          @pointermove="(ev: PointerEvent) => {
            popoverAnchor.x = ev.clientX
            popoverAnchor.y = ev.clientY
          }"
          @hover="onHover"
        >
          <template #expanded="{ row }">
            <pre>{{ row.original }}</pre>
          </template>
        </B24Table>
      </B24ContextMenu>

      <B24Popover :content="{ side: 'top', sideOffset: 16, updatePositionStrategy: 'always' }" :open="popoverOpenDebounced" :reference="reference">
        <template #content>
          <ProseP class="p-4">
            {{ popoverRow?.original?.id || '?' }}
          </ProseP>
        </template>
      </B24Popover>
    </div>
    <template #footer>
      <div class="flex items-center justify-between gap-3">
        <div class="text-(length:--ui-font-size-sm) text-(--b24ui-typography-description-color)">
          {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
          {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
        </div>

        <div class="flex items-center gap-1.5">
          <B24Pagination
            :disabled="!!virtualize"
            :page="(table?.tableApi?.getState().pagination.pageIndex ?? 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize ?? 10"
            :total="table?.tableApi?.getFilteredRowModel().rows.length || 0"
            @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
          />
        </div>
      </div>
    </template>
  </B24Card>
</template>
