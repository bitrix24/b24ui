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
  <div class="w-full flex flex-col gap-5">
    <B24Card
      variant="outline-alt"
      class="backdrop-blur-md rounded-none lg:rounded-(--ui-border-radius-md) border-0 lg:border-1"
      :b24ui="{ body: 'p-3' }"
    >
      <div class="flex flex-col items-start justify-between gap-1.5">
        <div class="flex flex-row flex-wrap items-center justify-between gap-2 w-full pb-2">
          <div class="w-full md:flex-1 min-w-0">
            <ProseH1 v-if="props.title || !!slots.title" class="mb-0 truncate text-(--b24ui-typography-label-color) leading-(--ui-font-line-height-xs) font-(--ui-font-weight-light)">
              <slot name="title">
                {{ props.title }}
              </slot>
            </ProseH1>
          </div>
          <div class="flex flex-row flex-wrap gap-2 shrink-0">
            <slot name="head-links" />
          </div>
        </div>
        <div v-if="slots['description']">
          <slot name="description" />
        </div>
        <div v-if="slots['links']" class="mt-3.5 flex flex-wrap flex-row items-center gap-2">
          <slot name="links" />
        </div>
      </div>
    </B24Card>
  </div>
</template>
