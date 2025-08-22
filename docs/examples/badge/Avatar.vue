<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/badge'
import type { BadgeProps } from '@bitrix24/b24ui-nuxt/types/index.ts'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Avatar.vue'

const chipItems = ref([
  {
    label: 'default',
    value: 'default',
    chip: {
      color: 'default' as const
    }
  },
  {
    label: 'danger',
    value: 'danger',
    chip: {
      color: 'danger' as const
    }
  },
  {
    label: 'success',
    value: 'success',
    chip: {
      color: 'success' as const
    }
  },
  {
    label: 'warning',
    value: 'warning',
    chip: {
      color: 'warning' as const
    }
  },
  {
    label: 'primary',
    value: 'primary',
    chip: {
      color: 'primary' as const
    }
  },
  {
    label: 'secondary',
    value: 'secondary',
    chip: {
      color: 'secondary' as const
    }
  },
  {
    label: 'collab',
    value: 'collab',
    chip: {
      color: 'collab' as const
    }
  },
  {
    label: 'ai',
    value: 'ai',
    chip: {
      color: 'ai' as const
    }
  }
])
const chipValue = ref<BadgeProps['color']>((chipItems.value[2]?.value) as BadgeProps['color'])

function getChip(value: string) {
  return chipItems.value.find(item => item.value === value)?.chip
}

const label = ref('Badge')

const sizes = Object.keys(theme.variants.size)
const size = ref('lg' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="size" class="w-full sm:w-1/4">
        <B24Select v-model="size" :items="sizes" class="w-full" />
      </B24FormField>
      <B24FormField label="color" class="w-full sm:w-1/4">
        <B24Select
          v-model="chipValue"
          :items="chipItems"
          name="color"
          class="w-full"
        >
          <template #leading="{ modelValue, b24ui }">
            <B24Chip
              v-if="modelValue"
              v-bind="getChip(modelValue as string)"
              inset
              standalone
              :size="b24ui.itemLeadingChipSize()"
              :class="b24ui.itemLeadingChip()"
            />
          </template>
        </B24Select>
      </B24FormField>
      <B24FormField label="label" class="w-full sm:w-1/4">
        <B24Input v-model="label" />
      </B24FormField>
    </template>
    <div class="flex flex-row items-center justify-between gap-5">
      <Demo :label="label" :color="chipValue" :size="size" />
    </div>
  </ComponentShowExample>
</template>
