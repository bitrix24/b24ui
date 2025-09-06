<script setup lang="ts">
import { ref } from 'vue'
import type { InputNumberProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  orientation?: InputNumberProps['orientation']
}

withDefaults(defineProps<ExampleProps>(), {
  orientation: 'horizontal' as const
})

const value = ref(24)
</script>

<template>
  <B24InputNumber
    v-model="value"
    :orientation="orientation"
  />
</template>
