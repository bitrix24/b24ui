<script setup lang="ts">
import { resolveComponent } from 'vue'
import type { TableColumn } from '@bitrix24/b24ui-nuxt'
import { getGroupedRowModel } from '@tanstack/vue-table'
import type { GroupingOptions } from '@tanstack/vue-table'
import MinusLIcon from '@bitrix24/b24icons-vue/outline/MinusLIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'

const B24Badge = resolveComponent('B24Badge')

type Account = {
  id: string
  name: string
}

type PaymentStatus = 'paid' | 'failed' | 'refunded'

type Payment = {
  id: string
  date: string
  status: PaymentStatus
  email: string
  amount: number
  account: Account
}

const getColorByStatus = (status: PaymentStatus) => {
  return {
    paid: 'air-primary-success' as const,
    failed: 'air-primary-alert' as const,
    refunded: 'air-primary' as const
  }[status]
}

const data = ref<Payment[]>([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594,
    account: {
      id: '1',
      name: 'Account 1'
    }
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276,
    account: {
      id: '2',
      name: 'Account 2'
    }
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315,
    account: {
      id: '1',
      name: 'Account 1'
    }
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529,
    account: {
      id: '2',
      name: 'Account 2'
    }
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639,
    account: {
      id: '1',
      name: 'Account 1'
    }
  }
])

const columns: TableColumn<Payment>[] = [
  {
    id: 'title',
    header: 'Item'
  },
  {
    id: 'account_id',
    accessorKey: 'account.id'
  },
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) =>
      row.getIsGrouped()
        ? `${row.getValue('id')} records`
        : `#${row.getValue('id')}`,
    aggregationFn: 'count'
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
    },
    aggregationFn: 'max'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      class: {
        td: 'w-full'
      }
    },
    cell: ({ row }) =>
      row.getIsGrouped()
        ? `${row.getValue('email')} customers`
        : row.getValue('email'),
    aggregationFn: 'uniqueCount'
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
    },
    aggregationFn: 'sum'
  }
]

const grouping_options = ref<GroupingOptions>({
  groupedColumnMode: 'remove',
  getGroupedRowModel: getGroupedRowModel()
})
</script>

<template>
  <B24Table
    :data="data"
    :columns="columns"
    :grouping="['account_id', 'status']"
    :grouping-options="grouping_options"
    :b24ui="{
      root: 'min-w-full',
      td: 'empty:p-0' // helps with the colspaned row added for expand slot
    }"
  >
    <template #title-cell="{ row }">
      <div v-if="row.getIsGrouped()" class="flex items-center">
        <span
          class="inline-block"
          :style="{ width: `calc(${row.depth} * 1rem)` }"
        />

        <B24Button
          class="mr-2"
          size="xs"
          :icon="row.getIsExpanded() ? MinusLIcon : PlusLIcon"
          @click="row.toggleExpanded()"
        />
        <strong v-if="row.groupingColumnId === 'account_id'">{{
          row.original.account.name
        }}</strong>
        <B24Badge
          v-else-if="row.groupingColumnId === 'status'"
          :color="getColorByStatus(row.original.status)"
          class="capitalize"
        >
          {{ row.original.status }}
        </B24Badge>
      </div>
    </template>
  </B24Table>
</template>
