<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@bitrix24/b24ui-nuxt'
import type { Column } from '@tanstack/vue-table'
import PinIcon from '@bitrix24/b24icons-vue/outline/PinIcon'
import UnpinIcon from '@bitrix24/b24icons-vue/outline/UnpinIcon'

const B24Badge = resolveComponent('B24Badge')
const B24Button = resolveComponent('B24Button')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([{
  id: '4600000000000000000000000000000000000000',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594000
}, {
  id: '4599000000000000000000000000000000000000',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276000
}, {
  id: '4598000000000000000000000000000000000000',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315000
}, {
  id: '4597000000000000000000000000000000000000',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 5290000
}, {
  id: '4596000000000000000000000000000000000000',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639000
}])

const columns: TableColumn<Payment>[] = [{
  accessorKey: 'id',
  header: ({ column }) => getHeader(column, 'ID', 'left'),
  cell: ({ row }) => `#${row.getValue('id')}`,
  size: 381
}, {
  accessorKey: 'date',
  header: ({ column }) => getHeader(column, 'Date', 'left'),
  size: 172
}, {
  accessorKey: 'status',
  header: ({ column }) => getHeader(column, 'Status', 'left'),
  cell: ({ row }) => {
    const color = ({
      paid: 'air-primary-success' as const,
      failed: 'air-primary-alert' as const,
      refunded: 'air-primary' as const
    })[row.getValue('status') as string]

    return h(B24Badge, { class: 'capitalize', color }, () => row.getValue('status'))
  },
  size: 103
}, {
  accessorKey: 'email',
  header: ({ column }) => getHeader(column, 'Email', 'left'),
  size: 232
}, {
  accessorKey: 'amount',
  header: ({ column }) => getHeader(column, 'Amount', 'right'),
  meta: {
    class: {
      th: 'text-right',
      td: 'text-right font-medium'
    }
  },
  cell: ({ row }) => {
    const amount = Number.parseFloat(row.getValue('amount'))
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  },
  size: 130
}]

function getHeader(column: Column<Payment>, label: string, position: 'left' | 'right') {
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

const columnPinning = ref({
  left: ['id'],
  right: ['amount']
})
</script>

<template>
  <B24Table
    v-model:column-pinning="columnPinning"
    :data="data"
    :columns="columns"
    class="flex-1"
  />
</template>
