<script setup lang="ts">
import { ref } from 'vue'
import type { BadgeProps } from '@bitrix24/b24ui-nuxt'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Color.vue'

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
const chipValue = ref<BadgeProps['color']>((chipItems.value[0]?.value) as BadgeProps['color'])

function getChip(value: string) {
  return chipItems.value.find(item => item.value === value)?.chip
}

const label = ref('Badge')
const isFill = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="use-fill">
        <B24Switch v-model="isFill" />
      </B24FormField>
      <B24FormField label="color" class="w-full sm:w-44">
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
      <B24FormField label="label" class="w-full sm:w-44">
        <B24Input v-model="label" />
      </B24FormField>
    </template>
    <Demo :label="label" :color="chipValue" :is-fill="isFill" />
  </ComponentShowExample>
</template>
