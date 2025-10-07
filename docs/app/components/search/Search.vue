<script setup lang="ts">
import type { UIMessage } from 'ai'
import type { ContentNavigationItem } from '@nuxt/content'
// import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'

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

const chat = ref(false)
const fullscreen = ref(false)
const searchTerm = ref('')
const messages = ref<UIMessage[]>([])

const { frameworks } = useFrameworks()
const { links } = useSearch()

const groups = computed(() => [
  // {
  //   id: 'ai',
  //   label: 'Assistant',
  //   ignoreFilter: true,
  //   items: [{
  //     label: 'Ask Bitrix24 AI',
  //     icon: RobotIcon,
  //     ui: {
  //       itemLeadingIcon: 'group-data-highlighted:not-group-data-disabled:text-(--ui-color-accent-main-primary)'
  //     },
  //     onSelect: (e: any) => {
  //       e.preventDefault()
  //
  //       messages.value = searchTerm.value
  //         ? [{
  //             id: '1',
  //             role: 'user',
  //             parts: [{ type: 'text', text: searchTerm.value }]
  //           }]
  //         : []
  //
  //       chat.value = true
  //     }
  //   }]
  // },
  {
    id: 'framework',
    label: 'Framework',
    items: frameworks.value
  }
])

function onClose() {
  chat.value = false
  fullscreen.value = false
}
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
  >
    <template v-if="chat" #content>
      <SearchChat v-model:messages="messages" v-model:fullscreen="fullscreen" @close="onClose" />
    </template>
  </B24ContentSearch>
</template>
