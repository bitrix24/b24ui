<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Unmount.vue'

const isUnmountOnHide = ref(false)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isUnmountOnHide">
        <B24Switch v-model="isUnmountOnHide" />
      </B24FormField>
    </template>
    <Demo :unmount-on-hide="isUnmountOnHide" />
  </ComponentShowExample>
</template>
