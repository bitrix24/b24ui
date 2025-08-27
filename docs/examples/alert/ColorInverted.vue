<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/ColorInverted.vue'
import { colorPrimaryList, colorPrimaryValue, title, description } from './dictionary'

const isInverted = ref(false)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isInverted">
        <B24Switch v-model="isInverted" />
      </B24FormField>
      <B24FormField label="colorPrimary" class="w-full sm:w-1/4">
        <B24Select
          v-model="colorPrimaryValue"
          :items="colorPrimaryList"
          name="color"
          class="w-full"
        />
      </B24FormField>
    </template>
    <Demo
      :is-inverted="isInverted"
      :color="colorPrimaryValue"
      :title="title"
      :description="description"
    />
  </ComponentShowExample>
</template>
