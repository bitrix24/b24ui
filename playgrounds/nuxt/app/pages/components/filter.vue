<script setup lang="ts">
import type { FilterFieldConfig, FilterValue, FilterPreset } from '@bitrix24/b24ui-nuxt'

const fields: FilterFieldConfig[] = [
  { id: 'name', label: 'Название', type: 'string', group: 'main', groupLabel: 'Основные' },
  { id: 'amount', label: 'Сумма', type: 'number', group: 'main', groupLabel: 'Основные' },
  {
    id: 'closeDate',
    label: 'Дата завершения',
    type: 'date',
    group: 'main',
    groupLabel: 'Основные'
  },
  {
    id: 'stageGroup',
    label: 'Группа стадий',
    type: 'multiselect',
    group: 'crm',
    groupLabel: 'CRM',
    options: [
      { value: 'in-progress', label: 'Сделка в работе' },
      { value: 'won', label: 'Сделка заключена' },
      { value: 'lost', label: 'Сделка провалена' }
    ]
  },
  {
    id: 'source',
    label: 'Источник',
    type: 'select',
    group: 'crm',
    groupLabel: 'CRM',
    options: [
      { value: 'call', label: 'Звонок' },
      { value: 'email', label: 'Email' },
      { value: 'web', label: 'Web' }
    ]
  },
  { id: 'isVip', label: 'VIP', type: 'boolean', group: 'extra', groupLabel: 'Дополнительные' },
  {
    id: 'responsible',
    label: 'Ответственный',
    type: 'custom',
    customMeta: { kind: 'user' },
    group: 'extra',
    groupLabel: 'Дополнительные'
  }
]

const value = ref<FilterValue>({
  amount: { operator: 'gt', value: 1000 }
})
const activeFields = ref<string[]>(['name', 'amount', 'closeDate', 'stageGroup'])
const search = ref('')
const activePresetId = ref<string | null>(null)

const presets = ref<FilterPreset[]>([
  {
    id: 'in-progress',
    name: 'СДЕЛКИ В РАБОТЕ',
    fields: ['name', 'amount', 'closeDate', 'stageGroup'],
    values: { stageGroup: { operator: 'in', value: ['in-progress'] } },
    system: true,
    pinned: true
  },
  {
    id: 'my-deals',
    name: 'МОИ СДЕЛКИ',
    fields: ['name', 'amount'],
    values: {},
    system: true
  },
  {
    id: 'closed',
    name: 'ЗАКРЫТЫЕ СДЕЛКИ',
    fields: ['name', 'amount', 'closeDate'],
    values: { stageGroup: { operator: 'in', value: ['won', 'lost'] } },
    system: true
  }
])

const loading = ref(false)
const visibleTagsCount = ref(3)
const allowSavePresets = ref(true)
const allowReorderFields = ref(true)

function onApply(payload: { values: FilterValue, query: string, presetId: string | null }) {
  loading.value = true
  console.log('apply', payload)
  setTimeout(() => {
    loading.value = false
  }, 500)
}

function onPresetSave(payload: { name: string, preset: Omit<FilterPreset, 'id'> }) {
  presets.value.push({ id: `user-${Date.now()}`, ...payload.preset })
}
function onPresetUpdate(payload: { id: string, patch: Partial<FilterPreset> }) {
  const i = presets.value.findIndex(p => p.id === payload.id)
  if (i !== -1) presets.value[i] = { ...presets.value[i]!, ...payload.patch }
}
function onPresetDelete(id: string) {
  presets.value = presets.value.filter(p => p.id !== id)
}
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Switch v-model="loading" size="xs" label="Loading" />
      <B24Switch v-model="allowSavePresets" size="xs" label="Allow save presets" />
      <B24Switch v-model="allowReorderFields" size="xs" label="Allow reorder fields" />
      <B24Select
        v-model="visibleTagsCount"
        size="xs"
        class="w-32"
        :items="[1, 2, 3, 4, 5]"
        placeholder="Visible tags"
      />
    </template>

    <div class="p-4 max-w-[1100px]">
      <B24Filter
        v-model="value"
        v-model:active-fields="activeFields"
        v-model:active-preset-id="activePresetId"
        v-model:search-query="search"
        :fields="fields"
        :presets="presets"
        :default-fields="['name', 'amount', 'closeDate', 'stageGroup']"
        :visible-tags-count="visibleTagsCount"
        :loading="loading"
        :allow-save-presets="allowSavePresets"
        :allow-reorder-fields="allowReorderFields"
        @apply="onApply"
        @preset-save="onPresetSave"
        @preset-update="onPresetUpdate"
        @preset-delete="onPresetDelete"
      >
        <template #field-user="{ condition, update }">
          <B24SelectMenu
            :model-value="(condition?.operator === 'in' ? condition.value : []) as string[]"
            :items="['Алиса', 'Боб', 'Чарли']"
            multiple
            placeholder="Выберите сотрудника"
            class="w-full"
            @update:model-value="(v: any) => update(v.length ? { operator: 'in', value: v } : null)"
          />
        </template>
      </B24Filter>

      <div class="mt-6 grid grid-cols-3 gap-3 text-xs">
        <div>
          <div class="font-semibold mb-1">
            modelValue
          </div>
          <pre class="bg-elevated p-2 rounded">{{ value }}</pre>
        </div>
        <div>
          <div class="font-semibold mb-1">
            activeFields
          </div>
          <pre class="bg-elevated p-2 rounded">{{ activeFields }}</pre>
        </div>
        <div>
          <div class="font-semibold mb-1">
            searchQuery
          </div>
          <pre class="bg-elevated p-2 rounded">{{ search }}</pre>
        </div>
      </div>
    </div>
  </PlaygroundPage>
</template>
