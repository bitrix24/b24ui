<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Content.vue'
import { contentAlignVariants, contentAlign, contentSideVariants, contentSide, contentSideOffset } from './../dictionary'
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <div class="w-full sm:w-1/4">
        <B24FormField label="content.align">
          <B24Select v-model="contentAlign" :items="contentAlignVariants" class="w-full" />
        </B24FormField>
      </div>
      <div class="w-full sm:w-1/4">
        <B24FormField label="content.side">
          <B24Select v-model="contentSide" :items="contentSideVariants" class="w-full" />
        </B24FormField>
      </div>
      <B24FormField label="content.sideOffset" class="w-28">
        <B24InputNumber v-model.number="contentSideOffset" :min="-100" size="md" />
      </B24FormField>
    </template>
    <div>
      <Demo
        :content-align="contentAlign"
        :content-side="contentSide"
        :content-side-offset="contentSideOffset"
      />
    </div>
  </ComponentShowExample>
</template>
