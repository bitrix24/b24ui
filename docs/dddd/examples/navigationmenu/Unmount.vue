<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Unmount.vue'

const isUnmountOnHide = ref(false)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="unmount-on-hide">
        <B24Switch v-model="isUnmountOnHide" />
      </B24FormField>
    </template>
    <div class="relative px-2 py-3 bg-white dark:bg-base-900 rounded w-full overflow-auto">
      <Demo
        :is-unmount-on-hide="isUnmountOnHide"
      />
    </div>
  </ComponentShowExample>
</template>
