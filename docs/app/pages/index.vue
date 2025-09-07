<script setup lang="ts">
import { joinURL } from 'ufo'

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
  ogImage: joinURL(url, '/og-image.png')
})
</script>

<template>
  <B24Main v-if="page">
    <B24PageHero
      orientation="horizontal"
      :b24ui="{
        container: 'pb-0 sm:pb-0 lg:py-0',
        title: 'lg:mt-16',
        links: 'lg:mb-16',
        description: 'text-balance'
      }"
    >
      <template #title>
        The Intuitive <br> <span class="text-primary">Bitrix24 UI Library</span>
      </template>
      <template #description>
        {{ page.hero.description }}
      </template>
    </B24PageHero>

    <B24Separator />

    <PromoV1 />
  </B24Main>
</template>
