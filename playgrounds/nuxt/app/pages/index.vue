<script setup lang="ts">
import usePageMeta from './../composables/usePageMeta'

usePageMeta.setPageTitle('Bitrix24 UI - Playground')
</script>

<template>
  <template
    v-for="(group) in usePageMeta.groups"
    :key="group.id"
  >
    <ProseH4 class="mb-sm">
      {{ group.label }}
    </ProseH4>
    <B24PageGrid class="gap-5 mb-4 mt-3">
      <B24PageCard
        v-for="(component) in group.children"
        :key="component.id"
        :to="component.to"
        :title="component.label"
        :description="component.description"
        :icon="component.iconData"
        reverse
        :b24ui="{
          root: '',
          header: 'mb-0',
          title: 'text-[15px] font-medium',
          description: 'line-clamp-2 mt-1'
        }"
      />
    </B24PageGrid>
  </template>
</template>
