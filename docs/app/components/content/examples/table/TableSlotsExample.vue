<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import { useClipboard } from '@vueuse/core'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'

interface User {
  id: number
  name: string
  position: string
  email: string
  role: string
}

const toast = useToast()
const { copy } = useClipboard()

const data = ref<User[]>([
  {
    id: 1,
    name: 'Lindsay Walton',
    position: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member'
  },
  {
    id: 2,
    name: 'Courtney Henry',
    position: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin'
  },
  {
    id: 3,
    name: 'Tom Cook',
    position: 'Director of Product',
    email: 'tom.cook@example.com',
    role: 'Member'
  },
  {
    id: 4,
    name: 'Whitney Francis',
    position: 'Copywriter',
    email: 'whitney.francis@example.com',
    role: 'Admin'
  },
  {
    id: 5,
    name: 'Leonard Krasner',
    position: 'Senior Designer',
    email: 'leonard.krasner@example.com',
    role: 'Owner'
  },
  {
    id: 6,
    name: 'Floyd Miles',
    position: 'Principal Designer',
    email: 'floyd.miles@example.com',
    role: 'Member'
  }
])

const columns: TableColumn<User>[] = [
  {
    id: 'action',
    meta: {
      style: {
        td: {
          width: '20px',
          padding: '16px 4px'
        }
      }
    }
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'role',
    header: 'Role'
  }
]

function getDropdownActions(user: User): DropdownMenuItem[][] {
  return [
    [{
      label: 'Copy user Id',
      onSelect: () => {
        copy(user.id.toString())

        toast.add({
          title: 'Payment ID copied to clipboard!',
          color: 'air-primary-success',
          icon: CircleCheckIcon
        })
      }
    }],
    [{
      label: 'Edit'
    }, {
      label: 'Delete',
      color: 'air-primary-alert'
    }]
  ]
}
</script>

<template>
  <B24Table :data="data" :columns="columns" class="flex-1">
    <template #name-cell="{ row }">
      <div class="flex items-center gap-3">
        <B24Avatar :src="`https://i.pravatar.cc/120?img=${row.original.id}`" size="lg" :alt="`${row.original.name} avatar`" />
        <div>
          <p class="font-(--ui-font-weight-medium)">
            {{ row.original.name }}
          </p>
          <p>
            {{ row.original.position }}
          </p>
        </div>
      </div>
    </template>
    <template #action-cell="{ row }">
      <B24DropdownMenu :items="getDropdownActions(row.original)" arrow :content="{ align: 'center', side: 'right', sideOffset: -2 }">
        <B24Button color="air-tertiary-no-accent" size="sm" :icon="MenuIcon" aria-label="Actions" />
      </B24DropdownMenu>
    </template>
  </B24Table>
</template>
