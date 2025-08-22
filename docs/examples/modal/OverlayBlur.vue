<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/OverlayBlur.vue'
import { title, description, overlayBlurList, overlayBlurValue } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <div class="w-full sm:w-1/4">
        <B24FormField label="overlayBlur">
          <B24Select v-model="overlayBlurValue" :items="overlayBlurList" class="w-full" />
        </B24FormField>
      </div>
    </template>
    <Demo :overlay-blur="overlayBlurValue" :title="title" :description="description" />
  </ComponentShowExample>
</template>
