<script lang="ts">
import type { VNode } from 'vue'
import type { FilterPreset, FilterLocale } from '../types/filter'

export interface FilterPresetsProps {
  presets: FilterPreset[]
  activePresetId: string | null
  allowSavePresets?: boolean
  allowEditPresets?: boolean
  allowReorderPresets?: boolean
  loading?: boolean
  disabled?: boolean
  locale: FilterLocale
  b24ui: any
  uiClasses?: any
  isMobile?: boolean
}

export type FilterPresetsEmits = {
  'apply-preset': [id: string]
  'save-preset': [name: string]
  'update-preset': [id: string, patch: Partial<FilterPreset>]
  'delete-preset': [id: string]
}

export interface FilterPresetsSlots {
  'preset-actions'?(props: { preset: FilterPreset }): VNode[]
}
</script>

<script setup lang="ts">
import { computed, ref, nextTick, useTemplateRef } from 'vue'
import PinIcon from '@bitrix24/b24icons-vue/outline/PinIcon'
import MoreVerticalLIcon from '@bitrix24/b24icons-vue/outline/MoreVerticalLIcon'
import PlusIcon from '@bitrix24/b24icons-vue/solid/PlusIcon'
import B24Input from './Input.vue'
import B24Button from './Button.vue'
import B24DropdownMenu from './DropdownMenu.vue'
import FilterSortableList from './FilterSortableList.vue'

const props = defineProps<FilterPresetsProps>()
const emits = defineEmits<FilterPresetsEmits>()
defineSlots<FilterPresetsSlots>()

const isSaving = ref(false)
const isRenaming = ref<string | null>(null)
const draftName = ref('')
const draftInputRef = useTemplateRef<{ inputRef: HTMLInputElement } | HTMLInputElement>('draftInputRef')

const presetItems = computed(() => props.presets)

function onPick(preset: FilterPreset) {
  if (isRenaming.value === preset.id) return
  emits('apply-preset', preset.id)
}

function menuItemsFor(preset: FilterPreset) {
  const groups: any[] = []
  if (props.allowEditPresets && !preset.system) {
    groups.push([
      {
        label: preset.pinned ? props.locale.actions.unpin : props.locale.actions.pin,
        icon: PinIcon as any,
        onSelect: () => emits('update-preset', preset.id, { pinned: !preset.pinned })
      },
      {
        label: props.locale.actions.rename,
        onSelect: () => {
          isRenaming.value = preset.id
          draftName.value = preset.name
          nextTick(() => focusDraft())
        }
      }
    ])
    groups.push([{
      label: props.locale.actions.delete,
      color: 'air-primary-alert' as any,
      onSelect: () => emits('delete-preset', preset.id)
    }])
  } else if (preset.system && props.allowEditPresets) {
    groups.push([
      {
        label: preset.pinned ? props.locale.actions.unpin : props.locale.actions.pin,
        icon: PinIcon as any,
        onSelect: () => emits('update-preset', preset.id, { pinned: !preset.pinned })
      }
    ])
  }
  return groups
}

function focusDraft() {
  const ref = draftInputRef.value as any
  if (!ref) return
  const el = (ref?.inputRef ?? ref) as HTMLInputElement | undefined
  el?.focus?.()
  el?.select?.()
}

function startSaving() {
  isSaving.value = true
  draftName.value = ''
  nextTick(() => focusDraft())
}

function commitSave() {
  const name = draftName.value.trim()
  if (!name) {
    isSaving.value = false
    return
  }
  emits('save-preset', name)
  isSaving.value = false
  draftName.value = ''
}

function cancelSave() {
  isSaving.value = false
  draftName.value = ''
}

function commitRename() {
  if (!isRenaming.value) return
  const name = draftName.value.trim()
  if (!name) {
    isRenaming.value = null
    return
  }
  emits('update-preset', isRenaming.value, { name })
  isRenaming.value = null
}

function cancelRename() {
  isRenaming.value = null
}

const sortableValue = computed({
  get: () => presetItems.value,
  set: (value: FilterPreset[]) => {
    value.forEach((p, idx) => {
      if ((p.order ?? 0) !== idx) {
        emits('update-preset', p.id, { order: idx })
      }
    })
  }
})
</script>

<template>
  <div
    data-slot="presets"
    :class="props.b24ui.presets({ class: [props.uiClasses?.presets] })"
  >
    <div :class="props.b24ui.presetsHeader({ class: [props.uiClasses?.presetsHeader] })">
      {{ props.locale.placeholders.presetName || 'Фильтры' }}
    </div>

    <div
      v-if="presetItems.length === 0 && !isSaving"
      class="px-2 py-2 text-(length:--ui-font-size-xs) text-(--ui-color-design-plain-na-content-secondary)"
    >
      {{ props.locale.empty.presets }}
    </div>

    <FilterSortableList
      v-model="sortableValue"
      :disabled="!props.allowReorderPresets || props.disabled"
      :as="'div'"
      :class="props.b24ui.presetsList({ class: [props.uiClasses?.presetsList] })"
    >
      <template #default="{ item }">
        <div
          :key="item.id"
          :class="[
            props.b24ui.presetItem({ class: [props.uiClasses?.presetItem] }),
            item.id === props.activePresetId ? props.b24ui.presetItemActive({ class: [props.uiClasses?.presetItemActive] }) : ''
          ]"
          @click="onPick(item)"
        >
          <button
            v-if="props.allowReorderPresets && !item.system"
            type="button"
            data-drag-handle
            class="shrink-0 size-3 opacity-0 group-hover:opacity-50 cursor-grab text-(--b24ui-icon-color-secondary)"
            :aria-label="props.locale.tooltips.dragField"
            @click.stop
          >
            ☰
          </button>

          <PinIcon
            v-if="item.pinned"
            :class="props.b24ui.presetPinIcon({ class: [props.uiClasses?.presetPinIcon] })"
          />

          <template v-if="isRenaming === item.id">
            <B24Input
              ref="draftInputRef"
              v-model="draftName"
              size="sm"
              class="flex-1"
              @keydown.enter.prevent="commitRename"
              @keydown.escape.prevent="cancelRename"
              @blur="commitRename"
              @click.stop
            />
          </template>
          <template v-else>
            <span :class="props.b24ui.presetItemLabel({ class: [props.uiClasses?.presetItemLabel] })">
              {{ item.name }}
            </span>

            <B24DropdownMenu
              v-if="props.allowEditPresets && (menuItemsFor(item).length > 0 || $slots['preset-actions'])"
              :items="menuItemsFor(item)"
              :class="props.b24ui.presetActions({ class: [props.uiClasses?.presetActions] })"
            >
              <button
                type="button"
                class="inline-flex items-center justify-center size-5 text-(--b24ui-icon-color-secondary) hover:text-(--b24ui-icon-color-secondary-hover) cursor-pointer"
                :aria-label="props.locale.tooltips.settings"
                @click.stop
              >
                <MoreVerticalLIcon class="size-3.5" />
              </button>
            </B24DropdownMenu>
          </template>
        </div>
      </template>
    </FilterSortableList>

    <div
      v-if="isSaving"
      class="px-2 py-1.5"
    >
      <B24Input
        ref="draftInputRef"
        v-model="draftName"
        size="sm"
        :placeholder="props.locale.placeholders.presetName"
        @keydown.enter.prevent="commitSave"
        @keydown.escape.prevent="cancelSave"
        @blur="commitSave"
      />
    </div>

    <div
      v-if="props.allowSavePresets"
      :class="props.b24ui.presetsFooter({ class: [props.uiClasses?.presetsFooter] })"
    >
      <B24Button
        variant="link"
        type="button"
        :icon="PlusIcon as any"
        :disabled="props.disabled || isSaving"
        @click="startSaving"
      >
        {{ props.locale.actions.saveFilter }}
      </B24Button>
    </div>
  </div>
</template>
