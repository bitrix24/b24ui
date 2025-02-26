<script setup lang="ts">
import TailwindCssLink from './TailwindCssLink.vue'
import NuxtUiLink from './NuxtUiLink.vue'
import RekaUiLink from './RekaUiLink.vue'
import GitLink from './GitLink.vue'
import DemoLink from './DemoLink.vue'

const $props = defineProps<{
  tailwindcss?: string
  rekaUi?: string
  rekaUiTitle?: string
  nuxtUi?: string
  git?: string
  gitCustom?: string
  gitCustomTitle?: string
  demo?: string
}>()
</script>

<template>
  <div
    class="
      mt-2 text-2xl
      flex gap-4 flex-col md:flex-row items-start md:items-end justify-between
    "
  >
    <div>
      <slot />
    </div>
    <div class="flex flex-row flex-wrap gap-2">
      <TailwindCssLink v-if="$props.tailwindcss" :to="$props.tailwindcss" />
      <RekaUiLink v-if="$props.rekaUi" :to="$props.rekaUi" :title="$props.rekaUiTitle" />
      <NuxtUiLink v-if="$props.nuxtUi" :to="$props.nuxtUi" />
      <GitLink v-if="$props.gitCustom" :to="$props.gitCustom" :title="$props.gitCustomTitle" />
      <GitLink v-if="$props.git" :to="$props.git" />
      <DemoLink v-if="$props.demo" :to="$props.demo" />
    </div>
  </div>
</template>
