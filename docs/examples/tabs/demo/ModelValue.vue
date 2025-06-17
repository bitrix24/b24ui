<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const items = [
  {
    label: 'My Bitrix24',
    value: 'b24'
  },
  {
    label: 'Start page',
    value: 'page'
  }
]

const active = computed({
  get() {
    return (route.query.tab as string) || 'b24'
  },
  set(tab) {
    // Hash is specified here to prevent the page from scrolling to the top
    router.push({
      path: '/components/tabs',
      query: { tab },
      hash: '#control-active-item'
    })
  }
})
</script>

<template>
  <B24Tabs
    v-model="active"
    :content="false"
    :items="items"
    class="w-full"
  />
</template>
