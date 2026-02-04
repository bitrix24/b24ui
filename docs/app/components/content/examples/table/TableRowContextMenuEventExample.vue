<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { ContextMenuItem, TableColumn, TableRow } from '@bitrix24/b24ui-nuxt'
import { useClipboard } from '@vueuse/core'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'

const B24Badge = resolveComponent('B24Badge')
const B24Checkbox = resolveComponent('B24Checkbox')

const toast = useToast()
const { copy } = useClipboard()

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

const items = ref<ContextMenuItem[]>([])

function getRowItems(row: TableRow<Payment>) {
  return [{
    type: 'label' as const,
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
    type: 'separator' as const
  }, {
    label: 'View customer'
  }, {
    label: 'View payment details'
  }]
}

function onContextmenu(_e: Event, row: TableRow<Payment>) {
  items.value = getRowItems(row)
}
</script>

<template>
  <B24ContextMenu :items="items">
    <B24Table
      :data="data"
      :columns="columns"
      class="flex-1"
      @contextmenu="onContextmenu"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
    </B24Table>
  </B24ContextMenu>
</template>
