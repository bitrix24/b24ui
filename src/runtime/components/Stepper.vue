<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { StepperRootProps, StepperRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/stepper'
import type { IconComponent } from '../types'
import type { DynamicSlots } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Stepper = ComponentConfig<typeof theme, AppConfig, 'stepper'>

export interface StepperItem {
  slot?: string
  value?: string | number
  title?: string
  description?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  content?: string
  disabled?: boolean
  class?: any
  b24ui?: Pick<Stepper['slots'], 'item' | 'container' | 'trigger' | 'indicator' | 'icon' | 'separator' | 'wrapper' | 'title' | 'description'>
  [key: string]: any
}

export interface StepperProps<T extends StepperItem = StepperItem> extends Pick<StepperRootProps, 'linear'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  items: T[]
  /**
   * @defaultValue 'md'
   */
  size?: Stepper['variants']['size']
  /**
   * @defaultValue 'air-primary'
   */
  color?: Stepper['variants']['color']
  /**
   * The orientation of the stepper.
   * @defaultValue 'horizontal'
   */
  orientation?: Stepper['variants']['orientation']
  /**
   * The value of the step that should be active when initially rendered. Use when you do not need to control the state of the steps.
   */
  defaultValue?: string | number
  disabled?: boolean
  class?: any
  b24ui?: Stepper['slots']
}

export type StepperEmits<T extends StepperItem = StepperItem> = Omit<StepperRootEmits, 'update:modelValue'> & {
  next: [value: T]
  prev: [value: T]
}

type SlotProps<T extends StepperItem> = (props: { item: T }) => any

export type StepperSlots<T extends StepperItem = StepperItem> = {
  indicator(props: { item: T, b24ui: Stepper['b24ui'] }): any
  title: SlotProps<T>
  description: SlotProps<T>
  content: SlotProps<T>
} & DynamicSlots<T>

</script>

<script setup lang="ts" generic="T extends StepperItem">
import { computed } from 'vue'
import { StepperRoot, StepperItem, StepperTrigger, StepperIndicator, StepperSeparator, StepperTitle, StepperDescription, useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<StepperProps<T>>(), {
  orientation: 'horizontal',
  linear: true
})
const emits = defineEmits<StepperEmits<T>>()
const slots = defineSlots<StepperSlots<T>>()

const modelValue = defineModel<string | number>()

const appConfig = useAppConfig() as Stepper['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'as', 'orientation', 'linear'))

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.stepper || {}) })({
  orientation: props.orientation,
  size: props.size,
  color: props.color
}))

const currentStepIndex = computed({
  get() {
    const value = modelValue.value ?? props.defaultValue

    return ((typeof value === 'string')
      ? props.items.findIndex(item => item.value === value)
      : value) ?? 0
  },
  set(value: number) {
    modelValue.value = props.items?.[value]?.value ?? value
  }
})

const currentStep = computed(() => props.items?.[currentStepIndex.value])
const hasNext = computed(() => currentStepIndex.value < props.items?.length - 1)
const hasPrev = computed(() => currentStepIndex.value > 0)

defineExpose({
  next() {
    if (hasNext.value) {
      currentStepIndex.value += 1
      emits('next', currentStep.value as T)
    }
  },
  prev() {
    if (hasPrev.value) {
      currentStepIndex.value -= 1
      emits('prev', currentStep.value as T)
    }
  },
  hasNext,
  hasPrev
})
</script>

<template>
  <StepperRoot v-bind="rootProps" v-model="currentStepIndex" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
      <StepperItem
        v-for="(item, count) in items"
        :key="item.value ?? count"
        :step="count"
        :disabled="item.disabled || props.disabled"
        data-slot="item"
        :class="b24ui.item({ class: [props.b24ui?.item, item.b24ui?.item, item.class] })"
      >
        <div data-slot="container" :class="b24ui.container({ class: [props.b24ui?.container, item.b24ui?.container] })">
          <StepperTrigger data-slot="trigger" :class="b24ui.trigger({ class: [props.b24ui?.trigger, item.b24ui?.trigger] })">
            <StepperIndicator data-slot="indicator" :class="b24ui.indicator({ class: [props.b24ui?.indicator, item.b24ui?.indicator] })">
              <slot name="indicator" :item="item" :b24ui="b24ui">
                <Component
                  :is="item.icon"
                  v-if="item.icon"
                  data-slot="icon"
                  :class="b24ui.icon({ class: [props.b24ui?.icon, item.b24ui?.icon] })"
                />
                <template v-else>
                  {{ count + 1 }}
                </template>
              </slot>
            </StepperIndicator>
          </StepperTrigger>

          <StepperSeparator
            v-if="count < items.length - 1"
            data-slot="separator"
            :class="b24ui.separator({ class: [props.b24ui?.separator, item.b24ui?.separator] })"
          />
        </div>

        <div data-slot="wrapper" :class="b24ui.wrapper({ class: [props.b24ui?.wrapper, item.b24ui?.wrapper] })">
          <StepperTitle as="div" data-slot="title" :class="b24ui.title({ class: [props.b24ui?.title, item.b24ui?.title] })">
            <slot name="title" :item="item">
              {{ item.title }}
            </slot>
          </StepperTitle>
          <StepperDescription as="div" data-slot="description" :class="b24ui.description({ class: [props.b24ui?.description, item.b24ui?.description] })">
            <slot name="description" :item="item">
              {{ item.description }}
            </slot>
          </StepperDescription>
        </div>
      </StepperItem>
    </div>

    <div v-if="currentStep?.content || !!slots.content || currentStep?.slot" data-slot="content" :class="b24ui.content({ class: props.b24ui?.content })">
      <slot
        :name="((currentStep?.slot || 'content') as keyof StepperSlots<T>)"
        :item="(currentStep as Extract<T, { slot: string }>)"
      >
        {{ currentStep?.content }}
      </slot>
    </div>
  </StepperRoot>
</template>
