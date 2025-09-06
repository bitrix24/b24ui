<script setup lang="ts">
import { ref, computed } from 'vue'

const state = ref('b24')
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
    return state.value
  },
  set(tab) {
    state.value = tab
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
  <ProsePre>{{ state }}</ProsePre>
</template>
