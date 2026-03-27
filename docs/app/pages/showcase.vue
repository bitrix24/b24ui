<script setup lang="ts">
const { data: page } = await useAsyncData('showcase', () => queryCollection('showcase').first())
if (!page.value) {
  throw createError({ status: 404, statusText: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: '%s - Bitrix24 UI',
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - Bitrix24 UI`,
  ogDescription: page.value.description
})
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <B24Container class="py-24">
    <B24Card
      v-if="page"
      as="main"
      class="overflow-clip"
      :b24ui="{
        body: 'min-h-[300px] flex flex-col gap-5 items-center justify-between'
      }"
    >
      <B24Alert
        color="air-primary-warning"
        title="We are still updating this page"
        description="Some data may be missing here — we will complete it shortly."
      />
    </B24Card>
  </B24Container>
</template>
