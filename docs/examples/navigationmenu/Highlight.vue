<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/navigation-menu'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Highlight.vue'

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

const orientations = Object.keys(theme.variants.orientation)
const orientation = ref('horizontal' as const)

const isHighlight = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isHighlight">
        <B24Switch v-model="isHighlight" />
      </B24FormField>
      <B24FormField label="highlightColor" class="w-full sm:w-1/4">
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
      <B24RadioGroup v-model="orientation" legend="orientations" :items="orientations" orientation="horizontal" />
    </template>
    <div class="relative px-2 py-3 bg-white dark:bg-base-900 rounded w-full overflow-auto">
      <Demo
        :orientation="orientation"
        :highlight-color="chipValue"
        :is-highlight="isHighlight"
      />
    </div>
  </ComponentShowExample>
</template>
