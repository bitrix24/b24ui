<script setup lang="ts">
import type { AvatarProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  alt?: string
  size?: AvatarProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  alt: 'Employee Name',
  size: 'xl' as const
})
</script>

<template>
  <B24Avatar
    :alt="alt"
    :size="size"
  />
</template>
