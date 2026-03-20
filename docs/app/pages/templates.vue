<script setup lang="ts">
// import { useColorMode } from '#imports'
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'

const { data: page } = await useAsyncData('templates', () => queryCollection('templates').first())
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

// defineOgImageComponent('Docs')
// const colorMode = useColorMode()
// const isDark = computed(() => {
//   return colorMode.value === 'dark'
// })
const isMounted = ref(false)
// const cardColorContext = computed(() => {
//   if (import.meta.server || !isMounted.value) {
//     return 'edge-dark'
//   }
//   return isDark.value ? 'dark' : 'edge-dark'
// })

onMounted(() => {
  isMounted.value = true
})
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <main v-if="page">
    <div
      class="px-[22px] lg:px-8 py-[96px] sm:py-[128px] lg:py-[160px] flex flex-col items-start sm:items-center justify-center gap-[20px]"
      dd-class="relative py-10 sm:py-16 lg:py-24"
    >
      <ProseH1 class="sm:text-center text-5xl sm:text-8xl font-bold mb-0">
        <MDC :value="page.hero.title" unwrap="p" cache-key="pro-templates-hero-title" />
      </ProseH1>

      <ProseP class="sm:text-center sm:text-4xl">
        <MDC :value="page.hero.description" unwrap="p" cache-key="pro-templates-hero-description" />
      </ProseP>

      <div class="mt-2 flex flex-wrap items-start sm:items-center gap-4">
        <FrameworkTabs size="md" class="w-48" />
      </div>
    </div>

    <B24PageSection
      v-for="(template, index) in page.items"
      :key="index"
      :title="template.title"
      :features="template.features"
      orientation="horizontal"
      class="lg:border-t border-default"
      :class="`${template.framework}-only`"
      :b24ui="{
        title: 'lg:text-4xl',
        wrapper: 'lg:py-16 lg:min-h-[481px] flex flex-col justify-center lg:border-r border-default order-last lg:pr-16',
        container: 'lg:py-0',
        links: 'gap-x-3'
      }"
    >
      <template #links>
        <B24Button
          v-for="link of template.links"
          :key="link.label"
          color="air-secondary-accent-2"
          :icon="PlayLIcon"
          v-bind="link"
        />

        <B24DropdownMenu
          :items="template.open_links"
          :b24ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-auto' }"
          :modal="false"
          class="group"
        >
          <B24Button
            color="i-air-secondary-accent"
            use-dropdown
            label="Open on"
            :b24ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
          />
        </B24DropdownMenu>

        <B24DropdownMenu
          :items="[
            ...template.deploy_links,
            { label: 'Other', ddIcon: 'i-lucide-globe', to: 'https://nuxt.com/deploy', target: '_blank' }
          ]"
          :b24ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-auto' }"
          :modal="false"
          class="group"
        >
          <B24Button
            color="air-secondary-accent"
            dd-icon="i-lucide-cloud"
            use-dropdown
            label="Deploy to"
            :b24ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
          />
        </B24DropdownMenu>
      </template>

      <template #description>
        <MDC :value="template.description" unwrap="p" :cache-key="`pro-templates-${index}-description`" />
      </template>

      <div class="lg:border-x border-default h-full flex items-center lg:bg-muted/20">
        <Motion class="flex-1" :initial="{ opacity: 0, transform: 'translateY(10px)' }" :while-in-view="{ opacity: 1, transform: 'translateY(0px)' }" :in-view-options="{ once: true }" :transition="{ duration: 0.5, delay: 0.2 }">
          <B24ColorModeImage
            :light="`/assets/templates/${template.framework}/${template.title.toLowerCase()}-light.png`"
            :dark="`/assets/templates/${template.framework}/${template.title.toLowerCase()}-dark.png`"
            class="w-full h-auto border lg:border-y lg:border-x-0 border-default rounded-sm lg:rounded-none"
            :alt="`Template ${template.title} screenshot`"
            width="654"
            height="368"
            loading="lazy"
          />
        </Motion>
      </div>
    </B24PageSection>
  </main>
</template>
