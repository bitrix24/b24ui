<script setup lang="ts">
import usePageMeta from './../composables/usePageMeta'

usePageMeta.setPageTitle('Bitrix24 UI - Playground')
</script>

<template>
  <div class="w-full">
    <div
      v-for="(group) in usePageMeta.groups"
      :key="group.id"
      class="mb-md"
    >
      <ProseH4 class="mb-sm">
        {{ group.label }}
      </ProseH4>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(266px,1fr))] gap-y-sm gap-x-sm">
        <template v-for="(item) in group.children" :key="item.id">
          <B24Link
            raw
            class="style-blurred-bg py-sm2 px-xs2 cursor-pointer rounded-(--ui-border-radius-md) flex flex-row gap-sm border-2 transition-shadow shadow hover:shadow-lg relative hover:border-primary"
            :to="item.to"
            :class="[
              item.description.includes('(-)') ? 'border-red-500/70' : (
                item.description.includes('(+)') ? 'border-green-500/70' : (
                  item.description.includes('(~)') ? 'border-ai-500/70' : 'border-base-master/10'
                )
              )
            ]"
          >
            <B24Avatar
              :icon="item.iconData"
              size="xl"
              :b24ui="item.iconClass"
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
