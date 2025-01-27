<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/button'
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Loading.vue'

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
  },
  {
    label: 'link',
    value: 'link',
    chip: {
      color: 'link' as const
    }
  }
])
const chipValue = ref<ButtonProps['color']>((chipItems.value[0]?.value) as ButtonProps['color'])

function getChip(value: string) {
  return chipItems.value.find(item => item.value === value)?.chip
}

const depths = Object.keys(theme.variants.depth)
const depth = ref('normal' as const)

const sizes = Object.keys(theme.variants.size)
const size = ref('md' as const)

const label = ref('Button')

const isLoading = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="label" class="w-full sm:w-44">
        <B24Input v-model="label" />
      </B24FormField>
      <div class="w-full sm:w-44">
        <B24FormField label="size">
          <B24Select v-model="size" :items="sizes" />
        </B24FormField>
      </div>
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
      <B24RadioGroup v-model="depth" legend="depth" :items="depths" orientation="horizontal" />
      <B24FormField label="isLoading">
        <B24Switch v-model="isLoading" />
      </B24FormField>
    </template>
    <div class="flex flex-row items-center justify-between gap-5">
      <Demo
        :label="label"
        :depth="depth"
        :color="chipValue"
        :size="size"
        :is-loading="isLoading"
      />
    </div>
  </ComponentShowExample>
</template>
