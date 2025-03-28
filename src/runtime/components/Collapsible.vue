<script lang="ts">
import type { CollapsibleRootProps, CollapsibleRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/collapsible'
import { tv } from '../utils/tv'

const appConfigCollapsible = _appConfig as AppConfig & { b24ui: { collapsible: Partial<typeof theme> } }

const collapsible = tv({ extend: tv(theme), ...(appConfigCollapsible.b24ui?.collapsible || {}) })

export interface CollapsibleProps extends Pick<CollapsibleRootProps, 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof collapsible.slots>
}

export interface CollapsibleEmits extends CollapsibleRootEmits {}

export interface CollapsibleSlots {
  default(props: { open: boolean }): any
  content(props?: {}): any
}
</script>

<script setup lang="ts">
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'

const props = withDefaults(defineProps<CollapsibleProps>(), {
  unmountOnHide: true
})
const emits = defineEmits<CollapsibleEmits>()
const slots = defineSlots<CollapsibleSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'disabled', 'unmountOnHide'), emits)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = collapsible()
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="rootProps" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <CollapsibleTrigger v-if="!!slots.default" as-child>
      <slot :open="open" />
    </CollapsibleTrigger>

    <CollapsibleContent :class="b24ui.content({ class: props.b24ui?.content })">
      <slot name="content" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
