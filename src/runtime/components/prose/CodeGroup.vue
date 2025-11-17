<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/tv'
import type { IconComponent } from '../../types'
import theme from '#build/b24ui/prose/code-group'

type ProseCodeGroup = ComponentConfig<typeof theme, AppConfig, 'codeGroup', 'b24ui.prose'>

export interface ProseCodeGroupProps {
  /**
   * The default tab to select.
   * @example '1'
   */
  defaultValue?: string
  /**
   * Sync the selected tab with a local storage key.
   */
  sync?: string
  class?: any
  b24ui?: ProseCodeGroup['slots']
}

export interface ProseCodeGroupSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed, watch, onMounted, ref, onBeforeUpdate } from 'vue'
import { TabsRoot, TabsList, TabsIndicator, TabsTrigger, TabsContent } from 'reka-ui'
import { useState, useAppConfig } from '#imports'
import { tv } from '../../utils/tv'
import B24CodeIcon from './CodeIcon.vue'

const props = withDefaults(defineProps<ProseCodeGroupProps>(), {
  defaultValue: '0'
})
const slots = defineSlots<ProseCodeGroupSlots>()

const model = defineModel<string>()

const appConfig = useAppConfig() as ProseCodeGroup['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.codeGroup || {}) })())

const rerenderCount = ref(1)

const items = computed<{
  index: number
  label: string
  icon: IconComponent
  component: any
}[]>(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  rerenderCount.value
  return slots.default?.()?.flatMap(transformSlot).filter(Boolean) || []
})

function transformSlot(slot: any, index: number) {
  if (typeof slot.type === 'symbol') {
    return slot.children?.map(transformSlot)
  }

  return {
    label: slot.props?.filename || slot.props?.label || `${index}`,
    icon: slot.props?.icon,
    component: slot
  }
}

onMounted(() => {
  if (props.sync) {
    const syncKey = `code-group-${props.sync}`
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

onBeforeUpdate(() => rerenderCount.value++)
</script>

<template>
  <TabsRoot v-model="model" :default-value="defaultValue" :unmount-on-hide="false" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <TabsList data-slot="list" :class="b24ui.list({ class: props.b24ui?.list })">
      <TabsIndicator data-slot="indicator" :class="b24ui.indicator({ class: props.b24ui?.indicator })" />

      <TabsTrigger v-for="(item, index) of items" :key="index" :value="String(index)" data-slot="trigger" :class="b24ui.trigger({ class: props.b24ui?.trigger })">
        <B24CodeIcon :icon="item.icon" :filename="item.label" data-slot="triggerIcon" :class="b24ui.triggerIcon({ class: props.b24ui?.triggerIcon })" />

        <span data-slot="triggerLabel" :class="b24ui.triggerLabel({ class: props.b24ui?.triggerLabel })">{{ item.label }}</span>
      </TabsTrigger>
    </TabsList>

    <TabsContent v-for="(item, index) of items" :key="index" :value="String(index)" as-child>
      <component :is="item.component" hide-header tabindex="-1" />
    </TabsContent>
  </TabsRoot>
</template>
