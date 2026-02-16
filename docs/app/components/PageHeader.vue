<script lang="ts">
/**
 * @todo move to src
 */
export interface PageHeaderProps {
  title?: string
  description?: string
}

export interface PageHeaderSlots {
  'title'(props?: {}): any
  'head-links'(props?: {}): any
  'description'(props?: {}): any
  'links'(props?: {}): any
  'default'(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<PageHeaderProps>()
const slots = defineSlots<PageHeaderSlots>()
</script>

<template>
  <div class="w-full flex flex-col gap-[20px] lg:mt-[22px]">
    <B24Card variant="outline-alt" class="backdrop-blur-md rounded-none lg:rounded-(--ui-border-radius-md) border-0 lg:border-1">
      <div class="flex flex-col items-start justify-between gap-[6px]">
        <div class="w-full flex flex-row items-center justify-between gap-[4px]">
          <div class="flex-1 max-w-[167px] sm:max-w-3/4">
            <ProseH1 v-if="props.title || !!slots.title" class="mb-0 truncate text-(--b24ui-typography-label-color) leading-(--ui-font-line-height-xs) font-(--ui-font-weight-light)">
              <slot name="title">
                {{ props.title }}
              </slot>
            </ProseH1>
          </div>
          <div v-if="slots['head-links']" class="flex-1 flex flex-wrap flex-row items-center justify-end gap-[12px]">
            <slot name="head-links" />
          </div>
        </div>
        <div v-if="slots['description']">
          <slot name="description" />
        </div>
        <div v-if="slots['links']" class="mt-[14px] flex flex-wrap flex-row items-center gap-[8px]">
          <slot name="links" />
        </div>
      </div>
    </B24Card>
  </div>
</template>
