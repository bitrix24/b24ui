<script setup lang="ts">
import theme from '#build/b24ui/kbd'
import { kbdKeysMap } from '@bitrix24/b24ui-nuxt/composables/useKbd'

const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const accents = Object.keys(theme.variants.accent) as Array<keyof typeof theme.variants.accent>

const attrs = reactive({
  size: [theme.defaultVariants.size],
  accent: [theme.defaultVariants.accent]
})

const kbdKeys = Object.keys(kbdKeysMap)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24Select v-model="attrs.accent" class="w-32" :items="accents" placeholder="Accent" multiple />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-80' }">
      <div class="flex flex-wrap items-center gap-3">
        <B24Kbd v-for="(kdbKey, index) in kbdKeys" :key="index" :value="kdbKey" v-bind="props" />
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <B24Kbd v-for="(kdbKey, index) in kbdKeys" :key="index" :value="kdbKey" class="style-filled" v-bind="props" />
      </div>
    </Matrix>
  </PlaygroundPage>
</template>
