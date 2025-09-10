<script setup lang="ts">
import { joinURL } from 'ufo'

useHead({
  bodyAttrs: {
    // 'dark' | 'light' | 'edge-dark' | 'edge-light'
    class: `edge-dark`
  }
})

const { data: page } = await useAsyncData('index', () => queryCollection('index').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { url } = useSiteConfig()

useSeoMeta({
  titleTemplate: `%s - Bitrix24 UI`,
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - Bitrix24 UI`,
  ogDescription: page.value.description,
  // @todo fix this
  ogImage: joinURL(url, '/b24ui/og-image.png')
})

const links = useSearchLinks()
</script>

<template>
  <B24SidebarLayout
    :use-light-content="false"
  >
    <template #sidebar>
      <B24SidebarHeader>
        <div class="h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
          <div class="flex flex-row flex-nowrap items-center justify-start gap-[6px]">
            <LogoWithVersion />
          </div>
        </div>
      </B24SidebarHeader>
      <B24SidebarBody>
        <B24NavigationMenu
          :items="links"
          orientation="vertical"
        />
      </B24SidebarBody>
      <B24SidebarFooter>
        <B24SidebarSection>
          <ExtLinks />
        </B24SidebarSection>
      </B24SidebarFooter>
    </template>
    <template #navbar>
      <Header />
    </template>

    <div v-if="page" class="mt-[22px] light bg-(--ui-color-design-outline-na-bg) h-[calc(100vh-150px)] p-[12px] rounded-[24px] flex flex-col items-center justify-center md:flex-row md:justify-center gap-[24px]">
      <div class="flex-0 w-full max-w-[200px] flex flex-col gap-[12px]">
        <ProseH1 class="mb-0 leading-(--ui-font-line-height-3xs)">
          <span class="text-primary">@bitrix24/b24ui</span> <br>Bitrix24 UI-Kit
        </ProseH1>
        <ProseP>
          {{ page.hero.description }}
        </ProseP>
      </div>
      <div class="flex-0 md:flex-1 w-full max-w-[400px]">
        <PromoV1 />
      </div>
    </div>

    <template #content-bottom>
      <Footer />
    </template>
  </B24SidebarLayout>
</template>
