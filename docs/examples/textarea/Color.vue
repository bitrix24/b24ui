<script setup lang="ts">
import { ref } from 'vue'
import type { TextareaProps } from '@bitrix24/b24ui-nuxt'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Color.vue'

const isHighlight = ref(true)

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
const chipValue = ref<TextareaProps['color']>((chipItems.value[0]?.value) as TextareaProps['color'])

function getChip(value: string) {
  return chipItems.value.find(item => item.value === value)?.chip
}
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isHighlight">
        <B24Switch v-model="isHighlight" size="xs" />
      </B24FormField>
      <B24FormField label="color" class="w-1/2" aria-label="Select color for toast">
        <B24Select
          v-model="chipValue"
          :items="chipItems"
          name="color"
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
    </template>
    <Demo :color="chipValue" :is-highlight="isHighlight" />
  </ComponentShowExample>
</template>
