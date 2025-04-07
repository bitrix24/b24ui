<script setup lang="ts">
import type { AvatarProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  size?: AvatarProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'xl' as const
})
</script>

<template>
  <B24Avatar
    src="/b24ui/avatar/employee.png"
    alt="Employee Name"
    :size="size"
  />
</template>
