<script setup lang="ts">
import type { PageLink } from '@bitrix24/b24ui-nuxt'
import DocumentSignIcon from '@bitrix24/b24icons-vue/main/DocumentSignIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const links = computed<PageLink[]>(() => [{
  label: 'Edit this page',
  icon: DocumentSignIcon,
  to: `https://github.com/bitrix24/b24ui/blob/main/docs/content/docs/2.components/page-links.md`,
  target: '_blank'
}, {
  label: 'Star on GitHub',
  icon: AiStarsIcon,
  to: 'https://github.com/bitrix24/b24ui',
  target: '_blank'
}, {
  label: 'Releases',
  icon: RocketIcon,
  to: 'https://github.com/bitrix24/b24ui/releases'
}])
</script>

<template>
  <PlaygroundPage>
    <B24PageLinks title="Community" :links="links" />
  </PlaygroundPage>
</template>
