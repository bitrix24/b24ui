<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Rounded.vue'

const isRounded = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isRounded">
        <B24Switch v-model="isRounded" />
      </B24FormField>
    </template>
    <Demo :is-rounded="isRounded" />
  </ComponentShowExample>
</template>
