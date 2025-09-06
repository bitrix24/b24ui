<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/progress'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Animation.vue'

const animations = Object.keys(theme.variants.animation)

const animation = ref('loading' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="animation" class="w-full sm:w-1/4">
        <B24Select v-model="animation" :items="animations" class="w-full" />
      </B24FormField>
    </template>
    <Demo :animation="animation" />
  </ComponentShowExample>
</template>
