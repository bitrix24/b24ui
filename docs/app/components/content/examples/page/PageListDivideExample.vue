<script setup lang="ts">
const users = ref([
  {
    name: 'Bitrix24',
    description: 'bitrix24',
    to: 'https://github.com/bitrix24',
    target: '_blank',
    avatar: {
      src: 'https://github.com/bitrix24.png',
      alt: 'bitrix24',
      loading: 'lazy' as const
    }
  },
  {
    name: 'Bitrix Tools',
    description: 'bitrix-tools',
    to: 'https://github.com/bitrix-tools',
    target: '_blank',
    avatar: {
      src: 'https://github.com/bitrix-tools.png',
      alt: 'bitrix-tools',
      loading: 'lazy' as const
    }
  },
  {
    name: 'Bitrix24',
    description: 'bitrix24',
    to: 'https://github.com/bitrix24',
    target: '_blank',
    avatar: {
      src: 'https://github.com/bitrix24.png',
      alt: 'bitrix24',
      loading: 'lazy' as const
    }
  },
  {
    name: 'Bitrix Tools',
    description: 'bitrix-tools',
    to: 'https://github.com/bitrix-tools',
    target: '_blank',
    avatar: {
      src: 'https://github.com/bitrix-tools.png',
      alt: 'bitrix-tools',
      loading: 'lazy' as const
    }
  }
])
</script>

<template>
  <B24PageList divide>
    <B24PageCard
      v-for="(user, index) in users"
      :key="index"
      variant="plain"
      :to="user.to"
      :target="user.target"
    >
      <template #body>
        <B24User :name="user.name" :description="user.description" :avatar="user.avatar" size="xl" />
      </template>
    </B24PageCard>
  </B24PageList>
</template>
