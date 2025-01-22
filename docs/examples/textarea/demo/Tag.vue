<script setup lang="ts">
import type { TextareaProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  tagColor: TextareaProps['tagColor']
  tag?: string
}

withDefaults(defineProps<ExampleProps>(), {
  tagColor: 'default',
  tag: 'info'
})
</script>

<template>
  <B24Textarea
    :tag-color="tagColor"
    :tag="tag"
    placeholder="Enter a company description"
  />
</template>
