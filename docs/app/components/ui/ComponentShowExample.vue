<script setup lang="ts">
const $props = withDefaults(defineProps<{
  light?: boolean
}>(), {
  light: false
})

export interface ExampleSlots {
  default(props?: {}): any
  actions(props?: {}): any
}
// 0.09 / 0.18
const slots = defineSlots<ExampleSlots>()
</script>

<template>
  <div data-example class="flex flex-col flex-nowrap justify-center items-center gap-5">
    <div
      v-if="slots['actions']"
      class="isolate w-full flex flex-wrap flex-col sm:flex-row justify-start items-start p-4 gap-4 rounded bg-tertiary/70 dark:bg-tertiary/5"
    >
      <slot name="actions" />
    </div>
    <div class="w-full relative rounded-lg overflow-hidden bg-tertiary/10 dark:bg-tertiary/5">
      <div
        style="background-position: 10px 10px"
        class="
          absolute inset-0
          bg-grid-example
          dark:bg-grid-example
        "
        :class="[
          $props.light
            ? [
              '[mask-image:linear-gradient(0deg,rgba(255,255,255,0.09),rgba(255,255,255,0.18))]',
              'dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.09),rgba(255,255,255,0.18))]'
            ].join(' ')
            : [
              '[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]',
              'dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]'
            ].join(' ')
        ]"
      />
      <div class="isolate relative p-4 min-h-40 w-full h-full flex flex-col flex-nowrap justify-center items-center gap-4">
        <slot />
      </div>
      <div
        class="
          pointer-events-none
          absolute rounded-lg inset-0
          border
          border-black/5 dark:border-white/5
        "
      />
    </div>
  </div>
</template>
