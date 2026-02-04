<script setup lang="ts">
import type { TableColumn } from '@bitrix24/b24ui-nuxt'
import type { TableMeta, Row } from '@tanstack/vue-table'

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

const columns: TableColumn<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      class: {
        th: 'text-center font-(--ui-font-weight-semi-bold)',
        td: 'text-center font-[family-name:var(--ui-font-family-system-mono)]'
      }
    }
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
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const colorMap = {
        paid: 'text-(--ui-color-accent-main-success)',
        failed: 'text-(--ui-color-accent-main-alert)',
        refunded: 'text-(--ui-color-accent-main-warning)'
      }
      return h('span', {
        class: `font-(--ui-font-weight-semi-bold) capitalize ${colorMap[status as keyof typeof colorMap]}`
      }, status)
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    }
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    meta: {
      class: {
        th: 'text-right font-(--ui-font-weight-bold) text-(--ui-color-accent-main-primary)',
        td: 'text-right font-[family-name:var(--ui-font-family-system-mono)]'
      }
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)
      return h('span', { class: 'font-(--ui-font-weight-semi-bold) text-(--ui-color-accent-main-success)' }, formatted)
    }
  }
]

const meta: TableMeta<Payment> = {
  class: {
    tr: (row: Row<Payment>) => {
      if (row.original.status === 'failed') {
        return 'bg-red-600/10'
      }
      if (row.original.status === 'refunded') {
        return 'bg-orange-600/10'
      }
      return ''
    }
  }
}
</script>

<template>
  <B24Table :data="data" :columns="columns" :meta="meta" class="flex-1" />
</template>
