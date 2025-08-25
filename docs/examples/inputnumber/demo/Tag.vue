<script setup lang="ts">
import type { InputProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  tagColor?: InputProps['tagColor']
  tag?: string
}

withDefaults(defineProps<ExampleProps>(), {
  tagColor: 'default',
  tag: 'info'
})
</script>

<template>
  <B24InputNumber
    :tag-color="tagColor"
    :tag="tag"
    placeholder="Enter a number"
  />
</template>
