<script lang="ts">
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
/**
 * @todo move to src
 */
const props = withDefaults(defineProps<PageHeaderProps>(), {
  title: 'horizontal' as const
})
const slots = defineSlots<PageHeaderSlots>()
</script>

<template>
  <div class="w-full flex flex-col gap-[20px] lg:mt-[22px]">
    <div class="lg:rounded-(--ui-border-radius-md) style-blurred-bg bg-(--ui-color-design-outline-bg) p-[24px] lg:px-[22px] lg:py-[15px] flex flex-col items-start justify-between gap-[14px]">
      <div class="w-full flex flex-row items-center justify-between gap-[20px]">
        <div class="flex-1 flex flex-row items-center justify-end gap-[12px]">
          <div class="flex-1">
            <ProseH1 class="mb-0 text-(--b24ui-typography-label-color) leading-[29px] font-(--ui-font-weight-light)">
              {{ props.title }}
            </ProseH1>
          </div>
        </div>
        <div v-if="slots['head-links']" class="flex-1 flex flex-row items-center justify-end gap-[12px]">
          <slot name="head-links" />
        </div>
      </div>
      <div v-if="slots['description']">
        <slot name="description" />
      </div>
      <div v-if="slots['links']" class="mt-[14px] flex flex-row items-center justify-between gap-[8px]">
        <slot name="links" />
      </div>
    </div>
  </div>
</template>
