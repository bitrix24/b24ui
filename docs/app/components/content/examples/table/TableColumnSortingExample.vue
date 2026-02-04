<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@bitrix24/b24ui-nuxt'
import SortIcon from '@bitrix24/b24icons-vue/actions/SortIcon'
import ChevronTopLIcon from '@bitrix24/b24icons-vue/outline/ChevronTopLIcon'
import ChevronDownLIcon from '@bitrix24/b24icons-vue/outline/ChevronDownLIcon'

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
  id: '4600',
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
}, {
  id: '4599',
  date: '2024-03-11T10:10:00',
  status: 'failed',
  email: 'mia.white@example.com',
  amount: 276
}, {
  id: '4598',
  date: '2024-03-11T08:50:00',
  status: 'refunded',
  email: 'william.brown@example.com',
  amount: 315
}, {
  id: '4597',
  date: '2024-03-10T19:45:00',
  status: 'paid',
  email: 'emma.davis@example.com',
  amount: 529
}, {
  id: '4596',
  date: '2024-03-10T15:55:00',
  status: 'paid',
  email: 'ethan.harris@example.com',
  amount: 639
}])

const columns: TableColumn<Payment>[] = [{
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
  }
}, {
  accessorKey: 'amount',
  header: 'Amount',
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
  }
}]

const sorting = ref([{
  id: 'email',
  desc: false
}])
</script>

<template>
  <B24Table
    v-model:sorting="sorting"
    :data="data"
    :columns="columns"
    class="flex-1"
  />
</template>
