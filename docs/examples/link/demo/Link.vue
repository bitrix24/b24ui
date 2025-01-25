<script setup lang="ts">
export interface ExampleProps {
  asTag?: string
}

withDefaults(defineProps<ExampleProps>(), {
  asTag: 'button'
})
</script>

<template>
  <B24Link :as="asTag" to="/b24ui/components/link.html#tag">
    Link
  </B24Link>
  <B24Link :as="asTag">
    Link
  </B24Link>
</template>
