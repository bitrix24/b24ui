<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  activeColor?: ButtonProps['color']
}

withDefaults(defineProps<ExampleProps>(), {
  activeColor: 'air-primary' as ButtonProps['activeColor']
})
</script>

<template>
  <B24Button
    :active="true"
    :active-color="activeColor"
    color="air-primary"
  >
    Active
  </B24Button>

  <B24Button
    :active="false"
    :active-color="activeColor"
    color="air-primary"
  >
    Inactive
  </B24Button>
</template>
