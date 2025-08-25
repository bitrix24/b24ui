<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Side.vue'
import { title, description, sideList, sideValue } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <div class="w-full sm:w-1/4">
        <B24FormField label="side">
          <B24Select v-model="sideValue" :items="sideList" class="w-full" />
        </B24FormField>
      </div>
    </template>
    <Demo :side="sideValue" :title="title" :description="description" />
  </ComponentShowExample>
</template>
