<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn } from '@bitrix24/b24ui-nuxt'
import { useClipboard } from '@vueuse/core'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'
import SortIcon from '@bitrix24/b24icons-vue/actions/SortIcon'
import ChevronTopLIcon from '@bitrix24/b24icons-vue/outline/ChevronTopLIcon'
import ChevronDownLIcon from '@bitrix24/b24icons-vue/outline/ChevronDownLIcon'

const B24Button = resolveComponent('B24Button')
const B24Checkbox = resolveComponent('B24Checkbox')
const B24Badge = resolveComponent('B24Badge')
const B24DropdownMenu = resolveComponent('B24DropdownMenu')

const toast = useToast()
const { copy } = useClipboard()
const isLoading = ref(false)

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  },
  {
    id: '4595',
    date: '2024-03-10T13:40:00',
    status: 'refunded',
    email: 'ava.thomas@example.com',
    amount: 428
  },
  {
    id: '4594',
    date: '2024-03-10T09:15:00',
    status: 'paid',
    email: 'michael.wilson@example.com',
    amount: 683
  },
  {
    id: '4593',
    date: '2024-03-09T20:25:00',
    status: 'failed',
    email: 'olivia.taylor@example.com',
    amount: 947
  },
  {
    id: '4592',
    date: '2024-03-09T18:45:00',
    status: 'paid',
    email: 'benjamin.jackson@example.com',
    amount: 851
  },
  {
    id: '4591',
    date: '2024-03-09T16:05:00',
    status: 'paid',
    email: 'sophia.miller@example.com',
    amount: 762
  },
  {
    id: '4590',
    date: '2024-03-09T14:20:00',
    status: 'paid',
    email: 'noah.clark@example.com',
    amount: 573
  },
  {
    id: '4589',
    date: '2024-03-09T11:35:00',
    status: 'failed',
    email: 'isabella.lee@example.com',
    amount: 389
  },
  {
    id: '4588',
    date: '2024-03-08T22:50:00',
    status: 'refunded',
    email: 'liam.walker@example.com',
    amount: 701
  },
  {
    id: '4587',
    date: '2024-03-08T20:15:00',
    status: 'paid',
    email: 'charlotte.hall@example.com',
    amount: 856
  },
  {
    id: '4586',
    date: '2024-03-08T17:40:00',
    status: 'paid',
    email: 'mason.young@example.com',
    amount: 492
  },
  {
    id: '4585',
    date: '2024-03-08T14:55:00',
    status: 'failed',
    email: 'amelia.king@example.com',
    amount: 637
  },
  {
    id: '4584',
    date: '2024-03-08T12:30:00',
    status: 'paid',
    email: 'elijah.wright@example.com',
    amount: 784
  },
  {
    id: '4583',
    date: '2024-03-08T09:45:00',
    status: 'refunded',
    email: 'harper.scott@example.com',
    amount: 345
  },
  {
    id: '4582',
    date: '2024-03-07T23:10:00',
    status: 'paid',
    email: 'evelyn.green@example.com',
    amount: 918
  },
  {
    id: '4581',
    date: '2024-03-07T20:25:00',
    status: 'paid',
    email: 'logan.baker@example.com',
    amount: 567
  }
])

const columns: TableColumn<Payment>[] = [
  {
    id: 'select',
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
    enableHiding: false
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
      const items = [{
        type: 'label',
        label: 'Actions'
      }, {
        label: 'Copy payment ID',
        onSelect() {
          copy(row.original.id)

          toast.add({
            title: 'Payment ID copied to clipboard!',
            color: 'air-primary-success',
            icon: CircleCheckIcon
          })
        }
      }, {
        label: row.getIsExpanded() ? 'Collapse' : 'Expand',
        onSelect() {
          row.toggleExpanded()
        }
      }, {
        type: 'separator'
      }, {
        label: 'View customer'
      }, {
        label: 'View payment details'
      }]

      return h(B24DropdownMenu, {
        'content': {
          align: 'center',
          side: 'right',
          sideOffset: -2
        },
        'arrow': true,
        items,
        'aria-label': 'Actions dropdown'
      }, () => h(B24Button, {
        'icon': MenuIcon,
        'color': 'air-tertiary-no-accent',
        'size': 'sm',
        'aria-label': 'Actions dropdown'
      }))
    }
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
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email'))
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return h('div', { class: 'text-right font-(--ui-font-weight-medium)' }, formatted)
    }
  }
]

const table = useTemplateRef('table')

async function randomize() {
  isLoading.value = true
  await sleepAction(600)
  data.value = [...data.value].sort(() => Math.random() - 0.5)
  isLoading.value = false
}

async function sleepAction(timeout: number = 1000): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, timeout))
}
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
        <B24Input
          :model-value="(table?.tableApi?.getColumn('email')?.getFilterValue() as string)"
          class="max-w-sm min-w-[12ch]"
          placeholder="Filter emails..."
          @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)"
        />

        <B24Button color="air-primary-copilot" label="Randomize" @click="randomize" />

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
            class="ml-auto"
            aria-label="Columns select dropdown"
          />
        </B24DropdownMenu>
      </div>
    </template>

    <B24Table
      ref="table"
      :data="data"
      :columns="columns"
      :loading="isLoading"
      sticky
      class="h-[380px]"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
    </B24Table>

    <template #footer>
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
    </template>
  </B24Card>
</template>
