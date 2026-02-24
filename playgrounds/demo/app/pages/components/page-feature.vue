<script setup lang="ts">
import theme from '#build/b24ui/page-feature'
import CopilotIcon from '@bitrix24/b24icons-vue/outline/CopilotIcon'

const orientations = Object.keys(theme.variants.orientation)

const orientation = ref('horizontal' as keyof typeof theme.variants.orientation)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="orientation" :items="orientations" />
    </template>

    <B24PageFeature
      title="Online workspace for the whole team"
      description="Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go."
      :icon="CopilotIcon"
      :orientation="orientation"
      to="https://www.bitrix24.com/tools/communications/"
      target="_blank"
    />
  </PlaygroundPage>
</template>
