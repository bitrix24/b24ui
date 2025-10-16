<script setup lang="ts">
const props = defineProps<{
  category: string
}>()

const { data: components } = await useAsyncData(`components-${props.category}`, () => {
  return queryCollection('docs')
    .where('path', 'LIKE', '/docs/components/%')
    .where('extension', '=', 'md')
    .where('category', '=', props.category)
    .select('path', 'title', 'description')
    .all()
})
</script>

<template>
  <B24PageGrid class="gap-5">
    <B24PageCard
      v-for="(component) in components"
      :key="component.path"
      :title="component.title"
      :description="component.description"
      :to="component.path"
      :b24ui="{
        root: 'overflow-hidden group ring-muted',
        header: 'mb-0',
        container: 'p-0 lg:p-0',
        body: 'p-4',
        title: 'text-[15px] font-medium',
        description: 'line-clamp-2 mt-0.5'
      }"
    />
  </B24PageGrid>
</template>
