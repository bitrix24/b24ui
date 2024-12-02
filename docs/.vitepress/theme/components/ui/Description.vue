<script setup lang="ts">
import TailwindCssLink from '~/.vitepress/theme/components/ui/TailwindCssLink.vue'
import NuxtUiLink from '~/.vitepress/theme/components/ui/NuxtUiLink.vue'
import RadixVueLink from '~/.vitepress/theme/components/ui/RadixVueLink.vue'
import GitLink from '~/.vitepress/theme/components/ui/GitLink.vue'

const $props = defineProps<{
  tailwindcss?: string
  radixVue?: string
  radixVueTitle?: string
  nuxtUi?: string
  git?: string
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
    <div class="flex flex-col sm:flex-row gap-2">
      <GitLink v-if="$props.git" :to="$props.git" />
      <TailwindCssLink v-if="$props.tailwindcss" :to="$props.tailwindcss" />
      <RadixVueLink v-if="$props.radixVue" :to="$props.radixVue" :title="$props.radixVueTitle" />
      <NuxtUiLink v-if="$props.nuxtUi" :to="$props.nuxtUi" />
    </div>
  </div>
</template>
