<script setup lang="ts">
const value = ref('')
const domains = ['.com', '.dev', '.org']
const domain = ref(domains[0])
</script>

<template>
  <B24ButtonGroup>
    <B24Input
      v-model="value"
      placeholder="nuxt"
      :ui="{
        base: 'pl-[57px]',
        leading: 'pointer-events-none'
      }"
    >
      <template #leading>
        <p class="text-sm text-base-500">
          https://
        </p>
      </template>
    </B24Input>

    <B24SelectMenu v-model="domain" :items="domains" />
  </B24ButtonGroup>
</template>
