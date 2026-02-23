<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Docs',
    to: '/docs/getting-started',
    icon: PlayLIcon,
    active: route.path.startsWith('/docs/getting-started')
  },
  {
    label: 'Components',
    to: '/docs/components',
    icon: DeveloperResourcesIcon,
    active: route.path.startsWith('/docs/components')
  },
  {
    label: 'REST API',
    to: 'https://apidocs.bitrix24.com',
    icon: Bitrix24Icon,
    target: '_blank'
  },
  {
    label: 'Releases',
    to: 'https://github.com/bitrix24/b24ui/releases',
    icon: GitHubIcon,
    target: '_blank'
  }
])
</script>

<template>
  <B24Header toggle-side="right">
    <template #title>
      <Logo class="h-6 w-auto text-(--b24ui-typography-label-color)" />
    </template>

    <B24NavigationMenu :items="items" />

    <template #right>
      <B24ColorModeButton />

      <B24Tooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <B24Button
          to="https://github.com/bitrix24/b24ui"
          target="_blank"
          :icon="GitHubIcon"
          aria-label="GitHub"
        />
      </B24Tooltip>
    </template>

    <template #body>
      <B24NavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </B24Header>
</template>
