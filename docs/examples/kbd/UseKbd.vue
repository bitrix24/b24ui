<script setup lang="ts">
import { ref } from 'vue'
import { kbdKeysMap } from '@bitrix24/b24ui-nuxt/composables/useKbd.js'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/UseKbd.vue'

const values = Object.keys(kbdKeysMap)

const value = ref('meta' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="value" class="w-full sm:w-1/4">
        <B24Select v-model="value" :items="values" class="w-full" />
      </B24FormField>
    </template>
    <Demo :value="value" />
  </ComponentShowExample>
</template>
