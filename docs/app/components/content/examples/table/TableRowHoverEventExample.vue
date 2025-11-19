<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { refDebounced } from '@vueuse/core'
import type { TableColumn, TableRow } from '@bitrix24/b24ui-nuxt'

const B24Checkbox = resolveComponent('B24Checkbox')
const B24Badge = resolveComponent('B24Badge')

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
  }
])

const columns: TableColumn<Payment>[] = [{
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
  })
}, {
  accessorKey: 'id',
  header: '#',
  cell: ({ row }) => `#${row.getValue('id')}`
}, {
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
}, {
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
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
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
}]

const anchor = ref({ x: 0, y: 0 })

const reference = computed(() => ({
  getBoundingClientRect: () =>
    ({
      width: 0,
      height: 0,
      left: anchor.value.x,
      right: anchor.value.x,
      top: anchor.value.y,
      bottom: anchor.value.y,
      ...anchor.value
    } as DOMRect)
}))

const open = ref(false)
const openDebounced = refDebounced(open, 10)
const selectedRow = ref<TableRow<Payment> | null>(null)

function onHover(_e: Event, row: TableRow<Payment> | null) {
  selectedRow.value = row

  open.value = !!row
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
    <B24Table
      :data="data"
      :columns="columns"
      class="flex-1"
      @pointermove="(ev: PointerEvent) => {
        anchor.x = ev.clientX
        anchor.y = ev.clientY
      }"
      @hover="onHover"
    />

    <B24Popover
      :content="{ side: 'top', sideOffset: 16, updatePositionStrategy: 'always' }"
      :open="openDebounced"
      :reference="reference"
    >
      <template #content>
        <div class="p-4">
          {{ selectedRow?.original?.id }}
        </div>
      </template>
    </B24Popover>
  </B24Card>
</template>
