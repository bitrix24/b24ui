<script setup lang="ts">
import usePageMeta from './../composables/usePageMeta'

usePageMeta.setPageTitle('Bitrix24 UI - Playground')
</script>

<template>
  <div class="w-full flex flex-col items-center justify-between gap-[24px]">
    <div
      v-for="(group) in usePageMeta.groups"
      :key="group.id"
      class="w-full"
    >
      <ProseH4 class="mb-sm">
        {{ group.label }}
      </ProseH4>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(266px,1fr))] gap-y-sm gap-x-sm">
        <template v-for="(item) in group.children" :key="item.id">
          <B24Link
            raw
            :class="[
              'relative group',
              'style-blurred-bg',
              'bg-(--ui-color-design-outline-bg)',
              'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-outline-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]',
              'border-(length:--ui-design-outline-stroke-weight)',
              'border-(--ui-color-design-outline-stroke)',
              'hover:border-[color-mix(in_srgb,_var(--ui-color-design-outline-stroke)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]',
              'py-sm2 px-xs2',
              'cursor-pointer',
              'rounded-(--ui-border-radius-md)',
              'flex flex-row gap-sm'
            ]"
            :to="item.to"
          >
            <B24Avatar
              :icon="item.iconData"
              size="xl"
              :b24ui="{
                ...item.iconClass,
                root: [
                  'bg-(--ui-color-design-outline-bg)',
                  'group-hover:bg-[color-mix(in_srgb,_var(--ui-color-design-selection-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]',
                  'ring-(length:--ui-design-outline-stroke-weight)',
                  'ring-(--ui-color-design-outline-stroke)',
                  'group-hover:ring-[color-mix(in_srgb,_var(--ui-color-design-selection-stroke)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
                ].join(' ')
              }"
            />
            <div class="max-w-11/12">
              <ProseH6 class="text-(--b24ui-typography-label-color) font-(--ui-font-weight-bold) mb-1 line-clamp-2">
                {{ item.label }}
              </ProseH6>
              <ProseP small accent="less" class="line-clamp-2">
                {{ item.description }}
              </ProseP>
            </div>
          </B24Link>
        </template>
      </div>
    </div>
  </div>
</template>
