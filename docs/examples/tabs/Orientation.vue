<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/tabs'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Orientation.vue'

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
const chipValue = ref((chipItems.value[0]?.value))

function getChip(value: string) {
  return chipItems.value.find(item => item.value === value)?.chip
}

const variants = Object.keys(theme.variants.variant)
const variant = ref('pill' as const)

const orientations = Object.keys(theme.variants.orientation)
const orientation = ref('vertical' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="orientation" legend="orientations" :items="orientations" orientation="horizontal" />
      <B24RadioGroup v-model="variant" legend="variant" :items="variants" orientation="horizontal" />
      <B24FormField label="color" class="w-1/3">
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
    <Demo :color="chipValue" :variant="variant" :orientation="orientation" />
  </ComponentShowExample>
</template>
