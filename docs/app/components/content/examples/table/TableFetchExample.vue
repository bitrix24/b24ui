<script setup lang="ts">
import type { TableColumn } from '@bitrix24/b24ui-nuxt'

const B24Avatar = resolveComponent('B24Avatar')

type User = {
  id: number
  name: string
  username: string
  email: string
  avatar: { src: string }
  company: { name: string }
}

const { data, status } = await useFetch<User[]>('https://jsonplaceholder.typicode.com/users', {
  key: 'table-users',
  transform: (data) => {
    return data?.map(user => ({
      ...user,
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}`, alt: `${user.name} avatar` }
    })) || []
  },
  lazy: true
})

const columns: TableColumn<User>[] = [{
  accessorKey: 'id',
  header: 'ID'
}, {
  accessorKey: 'name',
  header: 'Name',
  cell: ({ row }) => {
    return h('div', { class: 'flex items-center gap-3' }, [
      h(B24Avatar, {
        ...row.original.avatar,
        size: 'lg'
      }),
      h('div', undefined, [
        h('p', { class: 'font-(--ui-font-weight-medium) text-(--b24ui-typography-legend-color)' }, row.original.name),
        h('p', { class: '' }, `@${row.original.username}`)
      ])
    ])
  }
}, {
  accessorKey: 'email',
  header: 'Email'
}, {
  accessorKey: 'company',
  header: 'Company',
  cell: ({ row }) => row.original.company.name
}]
</script>

<template>
  <B24Table :data="data" :columns="columns" :loading="status === 'pending'" class="flex-1" />
</template>
