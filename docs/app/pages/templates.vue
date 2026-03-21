<script setup lang="ts">
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'
import UploadIcon from '@bitrix24/b24icons-vue/outline/UploadIcon'

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
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <B24DashboardPanel
    id="home"
    :b24ui="{ body: 'md:pt-6 items-stretch justify-between scrollbar-transparent scrollbar-both-edges' }"
  >
    <template #header>
      <Header />
    </template>

    <template #body>
      <main v-if="page">
        <div
          class="relative px-[22px] lg:px-8 py-10 sm:py-16 lg:py-24 flex flex-col items-start sm:items-center justify-center gap-[20px]"
        >
          <h1 class="relative text-(--b24ui-typography-label-color) sm:text-center text-5xl sm:text-8xl font-bold mb-0">
            <MDC :value="page.hero.title" unwrap="p" cache-key="pro-templates-hero-title" />
          </h1>

          <div class="sm:text-center sm:text-4xl mb-2 last:mb-0 text-pretty text-(length:--ui-font-size-xl) leading-(--ui-font-line-height-lg) text-(--b24ui-typography-label-color)">
            <MDC :value="page.hero.description" unwrap="p" cache-key="pro-templates-hero-description" />
          </div>

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
          class="lg:border-t-2 border-(--ui-color-divider-accent)"
          :class="`${template.framework}-only`"
          :b24ui="{
            title: 'lg:text-4xl',
            wrapper: 'lg:py-16 lg:min-h-[481px] flex flex-col justify-center order-last lg:pr-16',
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
              :items="[...template.open_links]"
              :b24ui="{ content: 'w-[110px]', viewport: 'min-w-[110px] w-[110px]' }"
              :modal="false"
              class="group"
            >
              <B24Button
                use-dropdown
                label="Open on"
                :icon="DeveloperResourcesIcon"
                :b24ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
              />
            </B24DropdownMenu>

            <B24DropdownMenu
              :items="[
                ...template.deploy_links,
                { label: 'Other', to: 'https://nuxt.com/deploy', target: '_blank' }
              ]"
              :b24ui="{ content: 'w-[110px]', viewport: 'min-w-[110px] w-[110px]' }"
              :modal="false"
              class="group"
            >
              <B24Button
                use-dropdown
                label="Deploy to"
                :icon="UploadIcon"
                :b24ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
              />
            </B24DropdownMenu>
          </template>

          <template #description>
            <MDC :value="template.description" unwrap="p" :cache-key="`pro-templates-${index}-description`" />
          </template>

          <div class="h-full flex items-center">
            <Motion
              class="flex-1"
              :initial="{ opacity: 0, transform: 'translateY(10px)' }"
              :while-in-view="{ opacity: 1, transform: 'translateY(0px)' }"
              :in-view-options="{ once: true }"
              :transition="{ duration: 0.5, delay: 0.2 }"
            >
              <B24ColorModeImage
                :light="`/assets/templates/${template.framework}/${template.title.toLowerCase()}-light.png`"
                :dark="`/assets/templates/${template.framework}/${template.title.toLowerCase()}-dark.png`"
                class="w-full h-auto border border-(--ui-color-divider-accent) rounded-sm"
                :alt="`Template ${template.title} screenshot`"
                width="654"
                height="368"
                loading="lazy"
              />
            </Motion>
          </div>
        </B24PageSection>
      </main>
      <Footer />
    </template>
  </B24DashboardPanel>
</template>
