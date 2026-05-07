<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/tv'
import theme from '#build/b24ui/prose/field'

type ProseField = ComponentConfig<typeof theme, AppConfig, 'field', 'b24ui.prose'>

export interface ProseFieldProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The name of the field.
   */
  name?: string
  /**
   * Expected type of the field's value
   */
  type?: string
  /**
   * Description of the field
   */
  description?: string
  /**
   * Indicate whether the field is required
   */
  required?: boolean
  class?: any
  b24ui?: ProseField['slots']
}

export interface ProseFieldSlots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'

const _props = defineProps<ProseFieldProps>()
const slots = defineSlots<ProseFieldSlots>()

const props = useComponentProps('prose.field', _props)

const appConfig = useAppConfig() as ProseField['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.field || {}) })())
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <span v-if="props.name" data-slot="name" :class="b24ui.name({ class: props.b24ui?.name })">
        {{ props.name }}
      </span>

      <div v-if="props.type || props.required" data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
        <span v-if="props.type" data-slot="type" :class="b24ui.type({ class: props.b24ui?.type })">
          {{ props.type }}
        </span>

        <span v-if="props.required" data-slot="required" :class="b24ui.required({ class: props.b24ui?.required })">
          required
        </span>
      </div>
    </div>

    <div v-if="!!slots.default || props.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
      <slot mdc-unwrap="p">
        {{ props.description }}
      </slot>
    </div>
  </Primitive>
</template>
