<script setup lang="ts">
import { ref } from 'vue'

const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('Access permissions')

function onClick() {
  return new Promise<void>(res => setTimeout(res, 3000))
}
</script>

<template>
  <div class="w-full">
    <B24ButtonGroup
      no-split
    >
      <B24Input name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
      <B24Button
        label="Button"
        color="link"
        depth="dark"
        loading-auto
        use-clock
        @click="onClick"
      />
    </B24ButtonGroup>
  </div>
  <div class="w-full">
    <B24ButtonGroup
      class="w-2/3"
      no-split
    >
      <B24Select v-model="value" :items="items" />
      <B24Button
        label="Button"
        color="link"
        depth="dark"
        loading-auto
        use-clock
        @click="onClick"
      />
    </B24ButtonGroup>
  </div>
</template>
