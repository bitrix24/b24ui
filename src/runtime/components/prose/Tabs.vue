<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { TabsItem } from '../Tabs.vue'
import theme from '#build/b24ui/prose/tabs'
import type { TabsProps } from '../../types'
import type { ComponentConfig } from '../../types/tv'

type ProseTabs = ComponentConfig<typeof theme, AppConfig, 'tabs', 'b24ui.prose'>

export interface ProseTabsProps {
  /**
   * The default tab to select.
   * @example '1'
   */
  defaultValue?: string
  /**
   * Sync the selected tab with a local storage key.
   */
  sync?: string
  /**
   * The hash to scroll to when the tab is selected.
   */
  hash?: string
  class?: any
  b24ui?: ProseTabs['slots'] & TabsProps['b24ui']
}

export interface ProseTabsSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed, watch, onMounted, ref, onBeforeUpdate } from 'vue'
import { useState, useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { transformUI } from '../../utils'
import { tv } from '../../utils/tv'
import B24Tabs from '../Tabs.vue'

const props = withDefaults(defineProps<ProseTabsProps>(), {
  defaultValue: '0'
})
const slots = defineSlots<ProseTabsSlots>()

const model = defineModel<string>()

const appConfig = useAppConfig() as ProseTabs['AppConfig']
const uiProp = useComponentUI('prose.tabs', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.tabs || {}) }))

const rerenderCount = ref(1)

const items = computed<(TabsItem & {
  index: number
  label: string
  icon: string
  component: any
})[]>(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  rerenderCount.value
  return slots.default?.()?.flatMap(transformSlot).filter(Boolean) || []
})

function transformSlot(slot: any, index: number) {
  if (typeof slot.type === 'symbol') {
    return slot.children?.map(transformSlot)
  }

  return {
    index,
    label: slot.props?.label || `${index}`,
    description: slot.props?.description,
    icon: slot.props?.icon,
    component: slot
  }
}

onMounted(() => {
  if (props.sync) {
    const syncKey = `tabs-${props.sync}`
    const syncValue = useState<string>(syncKey, () => localStorage.getItem(syncKey) as string)

    watch(syncValue, () => {
      if (!syncValue.value) return

      model.value = syncValue.value
    }, { immediate: true })

    watch(model, () => {
      if (!model.value) return

      syncValue.value = model.value
      localStorage.setItem(syncKey, model.value)
    })
  }
})

async function onUpdateModelValue() {
  if (props.hash) {
    const hash = props.hash.startsWith('#') ? props.hash : `#${props.hash}`
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView()
    }, 200)
  }
}

onBeforeUpdate(() => rerenderCount.value++)
</script>

<template>
  <B24Tabs
    v-model="model"
    color="primary"
    variant="link"
    :items="items"
    :class="props.class"
    :unmount-on-hide="false"
    :b24ui="transformUI(b24ui(), uiProp)"
    @update:model-value="onUpdateModelValue"
  >
    <template #content="{ item }">
      <component :is="item.component" />
    </template>
  </B24Tabs>
</template>
