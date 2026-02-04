<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@bitrix24/b24ui-nuxt'

const B24Badge = resolveComponent('B24Badge')

type Payment = {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>(Array(1000).fill(0).map((_, i) => ({
  id: `4600-${i}`,
  date: '2024-03-11T15:30:00',
  status: 'paid',
  email: 'james.anderson@example.com',
  amount: 594
})))

const columns: TableColumn<Payment>[] = [
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
    header: 'Email'
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
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)
    }
  }
]
</script>

<template>
  <B24Table
    virtualize
    :data="data"
    :columns="columns"
    class="flex-1 h-[290px]"
  />
</template>
