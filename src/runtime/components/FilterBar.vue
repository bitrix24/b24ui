<script lang="ts">
import type { VNode } from 'vue'
import type {
  FilterFieldConfig,
  FilterValue,
  FilterBarTag,
  FilterPreset,
  FilterLocale
} from '../types/filter'

export interface FilterBarProps {
  fields: FilterFieldConfig[]
  fieldMap: Map<string, FilterFieldConfig>
  activeFields: string[]
  values: FilterValue
  searchQuery: string
  activePreset: FilterPreset | null
  visibleTagsCount?: number
  searchDebounce?: number
  loading?: boolean
  disabled?: boolean
  locale: FilterLocale
  b24ui: any
  uiClasses?: any
}

export interface FilterBarEmits {
  (e: 'open'): void
  (e: 'apply'): void
  (e: 'reset'): void
  (e: 'update:searchQuery', value: string): void
  (e: 'update:activePresetId', value: string | null): void
  (e: 'remove-condition', fieldId: string): void
}

export interface FilterBarSlots {
  default?(): VNode[]
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import Search1Icon from '@bitrix24/b24icons-vue/main/Search1Icon'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import CrossLIcon from '@bitrix24/b24icons-vue/outline/CrossLIcon'
import { conditionLabel } from '../utils/filter-format'

const props = withDefaults(defineProps<FilterBarProps>(), {
  visibleTagsCount: 3,
  searchDebounce: 300
})
const emits = defineEmits<FilterBarEmits>()
defineSlots<FilterBarSlots>()

const localQuery = ref(props.searchQuery)

watch(() => props.searchQuery, (v) => {
  if (v !== localQuery.value) localQuery.value = v
})

const debouncedEmit = useDebounceFn((v: string) => {
  emits('update:searchQuery', v)
}, () => props.searchDebounce)

watch(localQuery, (v) => {
  debouncedEmit(v)
})

const tags = computed<FilterBarTag[]>(() => {
  const out: FilterBarTag[] = []
  if (props.activePreset) {
    out.push({ kind: 'preset', presetId: props.activePreset.id, label: props.activePreset.name })
  }
  const conditionEntries = Object.entries(props.values)
  const max = Math.max(0, props.visibleTagsCount)
  const visible = conditionEntries.slice(0, max)
  for (const [fieldId, cond] of visible) {
    const field = props.fieldMap.get(fieldId)
    if (!field) continue
    out.push({
      kind: 'condition',
      fieldId,
      condition: cond,
      label: conditionLabel(field, cond, props.locale)
    })
  }
  const hidden = Math.max(0, conditionEntries.length - max)
  if (hidden > 0) {
    out.push({ kind: 'counter', hiddenCount: hidden })
  }
  return out
})

const totalConditions = computed(() => Object.keys(props.values).length)

function onTagRemove(tag: FilterBarTag) {
  if (tag.kind === 'preset') {
    emits('update:activePresetId', null)
  } else if (tag.kind === 'condition') {
    emits('remove-condition', tag.fieldId)
  } else {
    emits('open')
  }
}

function onSearchEnter() {
  emits('apply')
}

function onBarClick(e: MouseEvent) {
  if (props.disabled) return
  if ((e.target as HTMLElement).closest('[data-filter-bar-interactive]')) return
  emits('open')
}

function onClearAll(e: MouseEvent) {
  e.stopPropagation()
  emits('reset')
  emits('update:activePresetId', null)
  emits('update:searchQuery', '')
  localQuery.value = ''
}
</script>

<template>
  <div
    data-slot="bar"
    :class="props.b24ui.bar({ class: [props.uiClasses?.bar] })"
    @click="onBarClick"
  >
    <div
      class="flex flex-wrap items-center gap-1.5 flex-1 min-w-0 px-2 py-1 rounded-(--ui-border-radius-xs) border border-(--ui-color-divider-vibrant-accent-more) min-h-[34px] cursor-text"
    >
      <button
        v-if="totalConditions > 0 || activePreset"
        type="button"
        data-filter-bar-interactive
        class="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-(--ui-color-accent-soft-element-red) text-white text-(length:--ui-font-size-3xs) font-(--ui-font-weight-medium)"
        :aria-label="props.locale.tooltips.clear"
        @click="onClearAll"
      >
        {{ totalConditions + (activePreset ? 1 : 0) }}
      </button>

      <template
        v-for="(tag, i) in tags"
        :key="i"
      >
        <span
          v-if="tag.kind === 'preset'"
          data-filter-bar-interactive
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-(--ui-border-radius-xs) bg-(--ui-color-design-tinted-bg-alt) text-(--ui-color-design-tinted-content) text-(length:--ui-font-size-xs)"
        >
          <span class="truncate max-w-[140px]">{{ tag.label }}</span>
          <button
            type="button"
            class="shrink-0 text-(--b24ui-icon-color-secondary) hover:text-(--b24ui-icon-color-secondary-hover) cursor-pointer"
            :aria-label="`${props.locale.actions.delete} ${tag.label}`"
            @click.stop="onTagRemove(tag)"
          >
            <CrossLIcon class="size-3" />
          </button>
        </span>

        <span
          v-else-if="tag.kind === 'condition'"
          data-filter-bar-interactive
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-(--ui-border-radius-xs) bg-(--ui-color-design-tinted-bg) text-(--ui-color-base-1) text-(length:--ui-font-size-xs)"
        >
          <span class="truncate max-w-[180px]">{{ tag.label }}</span>
          <button
            type="button"
            class="shrink-0 text-(--b24ui-icon-color-secondary) hover:text-(--b24ui-icon-color-secondary-hover) cursor-pointer"
            :aria-label="`${props.locale.actions.delete} ${tag.label}`"
            @click.stop="onTagRemove(tag)"
          >
            <CrossLIcon class="size-3" />
          </button>
        </span>

        <button
          v-else
          type="button"
          data-filter-bar-interactive
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-(--ui-border-radius-xs) bg-(--ui-color-design-tinted-bg) text-(--ui-color-base-1) text-(length:--ui-font-size-xs) cursor-pointer"
          @click.stop="onTagRemove(tag)"
        >
          +{{ tag.hiddenCount }}
        </button>
      </template>

      <input
        v-model="localQuery"
        data-filter-bar-interactive
        type="text"
        :placeholder="props.locale.placeholders.search"
        :disabled="props.disabled"
        class="flex-1 min-w-[120px] border-0 bg-transparent text-(length:--ui-font-size-sm) text-(--ui-color-base-1) placeholder:text-(--ui-color-design-plain-na-content-secondary) focus:outline-none focus:ring-0"
        :aria-label="props.locale.tooltips.search"
        @keydown.enter.prevent="onSearchEnter"
      >

      <div
        data-filter-bar-interactive
        class="flex items-center gap-1 shrink-0"
        @click.stop
      >
        <button
          type="button"
          class="inline-flex items-center justify-center size-7 text-(--b24ui-icon-color-secondary) hover:text-(--b24ui-icon-color-secondary-hover) cursor-pointer"
          :aria-label="props.locale.tooltips.search"
          @click="onSearchEnter"
        >
          <Search1Icon class="size-4" />
        </button>
        <button
          v-if="totalConditions > 0 || activePreset || localQuery"
          type="button"
          class="inline-flex items-center justify-center size-7 text-(--b24ui-icon-color-secondary) hover:text-(--b24ui-icon-color-secondary-hover) cursor-pointer"
          :aria-label="props.locale.tooltips.clear"
          @click="onClearAll"
        >
          <CrossLIcon class="size-4" />
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center size-7 text-(--b24ui-icon-color-secondary) hover:text-(--b24ui-icon-color-secondary-hover) cursor-pointer"
          :aria-label="props.locale.tooltips.settings"
          @click="emits('open')"
        >
          <SettingsIcon class="size-4" />
        </button>
      </div>
    </div>
  </div>
</template>
