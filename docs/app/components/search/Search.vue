<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { watchDebounced } from '@vueuse/core'

interface ContentSearchFile {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
}

defineProps<{
  files?: ContentSearchFile[]
  navigation?: ContentNavigationItem[]
}>()

const { links, groups, fullscreen, searchTerm } = useSearch()
const { track } = useAnalytics()

watchDebounced(searchTerm, (term) => {
  if (term) {
    track('Search Performed', { term })
  }
}, { debounce: 500 })
</script>

<template>
  <B24ContentSearch
    v-model:search-term="searchTerm"
    :links="links"
    :files="files"
    :groups="groups"
    :navigation="navigation"
    :fullscreen="fullscreen"
    :color-mode="false"
    :fuse="{ resultLimit: 115 }"
  />
</template>
