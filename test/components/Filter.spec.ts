import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, ref, h, nextTick } from 'vue'
import Filter from '../../src/runtime/components/Filter.vue'
import { renderEach } from '../component-render'
import type {
  FilterFieldConfig,
  FilterValue,
  FilterPreset
} from '../../src/runtime/types/filter'

const sampleFields: FilterFieldConfig[] = [
  { id: 'name', label: 'Название', type: 'string', group: 'main' },
  { id: 'amount', label: 'Сумма', type: 'number', group: 'main' },
  {
    id: 'closeDate',
    label: 'Дата завершения',
    type: 'date',
    group: 'main'
  },
  {
    id: 'stageGroup',
    label: 'Группа стадий',
    type: 'multiselect',
    group: 'crm',
    options: [
      { value: 'in-progress', label: 'Сделка в работе' },
      { value: 'won', label: 'Сделка заключена' }
    ]
  }
]

const samplePreset: FilterPreset = {
  id: 'deals-in-progress',
  name: 'Сделки в работе',
  fields: ['name', 'amount'],
  values: { amount: { operator: 'gt', value: 1000 } },
  system: true,
  pinned: false
}

describe('Filter', () => {
  renderEach(Filter, [
    // Props
    ['without fields', { props: { fields: [] } }],
    ['with fields', { props: { fields: sampleFields } }],
    [
      'with activeFields and values',
      {
        props: {
          fields: sampleFields,
          activeFields: ['amount', 'closeDate'],
          modelValue: {
            amount: { operator: 'gt', value: 1000 }
          } as FilterValue
        }
      }
    ],
    [
      'with active preset',
      {
        props: {
          fields: sampleFields,
          presets: [samplePreset],
          activePresetId: 'deals-in-progress',
          activeFields: ['name', 'amount']
        }
      }
    ],
    ['with searchQuery', { props: { fields: sampleFields, searchQuery: 'привет' } }],
    ['with loading', { props: { fields: sampleFields, loading: true } }],
    ['with disabled', { props: { fields: sampleFields, disabled: true } }],
    ['with class', { props: { fields: sampleFields, class: 'custom-filter' } }]
  ])

  it('emits apply with current values, query, and presetId', async () => {
    const Host = defineComponent({
      components: { Filter },
      setup() {
        const value = ref<FilterValue>({ amount: { operator: 'gt', value: 1000 } })
        const activeFields = ref<string[]>(['amount'])
        const activePresetId = ref<string | null>(null)
        const searchQuery = ref('test')
        return { value, activeFields, activePresetId, searchQuery }
      },
      render() {
        return h(Filter as any, {
          'fields': sampleFields,
          'modelValue': this.value,
          'onUpdate:modelValue': (v: FilterValue) => (this.value = v),
          'activeFields': this.activeFields,
          'onUpdate:activeFields': (v: string[]) => (this.activeFields = v),
          'activePresetId': this.activePresetId,
          'onUpdate:activePresetId': (v: string | null) => (this.activePresetId = v),
          'searchQuery': this.searchQuery,
          'onUpdate:searchQuery': (v: string) => (this.searchQuery = v),
          'ref': 'filter'
        })
      }
    })

    const wrapper = await mountSuspended(Host)
    const filter = wrapper.findComponent(Filter as any)
    expect(filter.exists()).toBe(true)
    ;(filter.vm as any).apply()
    await nextTick()
    const emitted = filter.emitted('apply') as any[][]
    expect(emitted?.[0]?.[0]).toEqual({
      values: { amount: { operator: 'gt', value: 1000 } },
      query: 'test',
      presetId: null
    })
  })

  it('reset clears modelValue but keeps activeFields', async () => {
    const value = ref<FilterValue>({ amount: { operator: 'eq', value: 100 } })
    const activeFields = ref<string[]>(['amount', 'name'])
    const Host = defineComponent({
      components: { Filter },
      setup() {
        return { value, activeFields }
      },
      render() {
        return h(Filter as any, {
          'fields': sampleFields,
          'modelValue': value.value,
          'onUpdate:modelValue': (v: FilterValue) => (value.value = v),
          'activeFields': activeFields.value,
          'onUpdate:activeFields': (v: string[]) => (activeFields.value = v),
          'ref': 'filter'
        })
      }
    })

    const wrapper = await mountSuspended(Host)
    const filter = wrapper.findComponent(Filter as any)
    ;(filter.vm as any).reset()
    await nextTick()
    expect(value.value).toEqual({})
    expect(activeFields.value).toEqual(['amount', 'name'])
  })

  it('filters out activeFields ids that do not exist in fields', async () => {
    const Host = defineComponent({
      components: { Filter },
      render() {
        return h(Filter as any, {
          'fields': sampleFields,
          'activeFields': ['name', 'ghost-id', 'amount'],
          'modelValue': {
            'name': { operator: 'eq', value: 'foo' },
            'ghost-id': { operator: 'eq', value: 'x' },
            'amount': { operator: 'gt', value: 1 }
          },
          'onUpdate:activeFields': () => {},
          'onUpdate:modelValue': () => {}
        })
      }
    })

    const wrapper = await mountSuspended(Host)
    const filter = wrapper.findComponent(Filter as any)
    ;(filter.vm as any).apply()
    await nextTick()
    const emitted = filter.emitted('apply') as any[][]
    // Unknown field ids in modelValue are dropped from the apply payload.
    expect(Object.keys(emitted?.[0]?.[0]?.values ?? {}).sort()).toEqual(['amount', 'name'])
  })

  it('drops conditions with unknown operators', async () => {
    const Host = defineComponent({
      components: { Filter },
      render() {
        return h(Filter as any, {
          'fields': sampleFields,
          'activeFields': ['amount'],
          'modelValue': {
            amount: { operator: 'bogus' as any, value: 1 }
          },
          'onUpdate:modelValue': () => {},
          'ref': 'filter'
        })
      }
    })

    const wrapper = await mountSuspended(Host)
    const filter = wrapper.findComponent(Filter as any)
    ;(filter.vm as any).apply()
    await nextTick()
    const emitted = filter.emitted('apply') as any[][]
    expect(emitted?.[0]?.[0]?.values).toEqual({})
  })

  it('auto-applies the pinned preset on first mount', async () => {
    const pinned: FilterPreset = {
      id: 'pinned-one',
      name: 'Закреплённый',
      fields: ['name'],
      values: {} as FilterValue,
      pinned: true
    }
    const Host = defineComponent({
      components: { Filter },
      setup() {
        const value = ref<FilterValue>({})
        const active = ref<string[]>([])
        const presetId = ref<string | null>(null)
        return { value, active, presetId }
      },
      render() {
        return h(Filter as any, {
          'fields': sampleFields,
          'presets': [pinned],
          'modelValue': this.value,
          'onUpdate:modelValue': (v: FilterValue) => (this.value = v),
          'activeFields': this.active,
          'onUpdate:activeFields': (v: string[]) => (this.active = v),
          'activePresetId': this.presetId,
          'onUpdate:activePresetId': (v: string | null) => (this.presetId = v)
        })
      }
    })

    const wrapper = await mountSuspended(Host)
    await nextTick()
    await nextTick()
    const vm: any = wrapper.vm
    expect(vm.presetId).toBe('pinned-one')
  })

  it('exposes imperative applyPreset / open / close via defineExpose', async () => {
    const Host = defineComponent({
      components: { Filter },
      render() {
        return h(Filter as any, {
          fields: sampleFields,
          presets: [samplePreset]
        })
      }
    })

    const wrapper = await mountSuspended(Host)
    const filter = wrapper.findComponent(Filter as any)
    const vm = filter.vm as any
    expect(typeof vm.applyPreset).toBe('function')
    expect(typeof vm.apply).toBe('function')
    expect(typeof vm.reset).toBe('function')
    expect(typeof vm.openPanel).toBe('function')
    expect(typeof vm.closePanel).toBe('function')
  })
})
