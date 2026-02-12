<script lang="ts">
import type { CardProps } from '@bitrix24/b24ui-nuxt'

export type MatrixValue<V> = V extends readonly (infer U)[] ? U : V

export type MatrixAttrs = Record<string, readonly unknown[]>

/**
 * Matrix component props for generating combinations of attributes
 */
export interface MatrixProps<T extends MatrixAttrs> {
  /**
   * Object containing attribute keys and their possible values
   * Used to generate all possible combinations
   */
  attrs: T
  /**
   * Separator string used when joining attribute values in header
   * @defaultValue ' | '
   */
  headerSeparator?: string
  /**
   * B24UI props for the combination card
   */
  b24ui?: CardProps['b24ui']
}

export type MatrixSlotProps<T extends MatrixAttrs> = {
  [K in keyof T]?: MatrixValue<T[K]>
}
</script>

<script setup lang="ts" generic="T extends MatrixAttrs">
import { usePlaygroundCardStyles } from '../composables/usePlaygroundContext'

const { cardVariant, cardBorderClass } = usePlaygroundCardStyles()

const props = withDefaults(defineProps<MatrixProps<T>>(), {
  headerSeparator: ' | '
})

defineSlots<{
  default: (props?: MatrixSlotProps<T>) => any
  item: (props?: MatrixSlotProps<T>) => any
  header: (props?: MatrixSlotProps<T>) => any
}>()

const attrKeys = computed(() => Object.keys(props.attrs) as Array<keyof T>)

const combinations = computed(() => {
  const keys = attrKeys.value

  if (keys.length === 0) {
    return [{}] as Array<{ [K in keyof T]?: MatrixValue<T[K]> }>
  }

  const result: Array<{ [K in keyof T]?: MatrixValue<T[K]> }> = []

  function generateCombinations(index: number, current: { [K in keyof T]?: MatrixValue<T[K]> }) {
    if (index === keys.length) {
      result.push({ ...current })
      return
    }

    const key = keys[index]!
    const variants = props.attrs[key] as Array<MatrixValue<T[typeof key]>>

    if (variants.length === 0) {
      return
    }

    for (const value of variants) {
      generateCombinations(index + 1, { ...current, [key]: value } as any)
    }
  }

  generateCombinations(0, {})
  return result
})

const headers = computed(() => {
  return combinations.value.map((combination) => {
    return Object.values(combination).join(props.headerSeparator)
  })
})
</script>

<template>
  <template v-for="(combination, index) in combinations" :key="index">
    <slot name="item" v-bind="combination">
      <B24Card
        :variant="cardVariant"
        :b24ui="{
          ...props.b24ui,
          root: ['grow', cardBorderClass, props.b24ui?.root],
          body: ['flex flex-col items-start justify-start gap-4', props.b24ui?.body]
        }"
      >
        <template #header>
          <slot name="header" v-bind="combination">
            <ProseH5 class="mb-0">
              {{ headers[index] }}
            </ProseH5>
          </slot>
        </template>

        <slot v-bind="combination" />
      </B24Card>
    </slot>
  </template>
</template>
