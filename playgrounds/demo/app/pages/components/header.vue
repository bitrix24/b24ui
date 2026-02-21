<script setup lang="ts">
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-b24/Bitrix24Icon'
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'

const items = [
  {
    label: 'Docs',
    icon: PlayLIcon
  },
  {
    label: 'Components',
    icon: DeveloperResourcesIcon,
    active: true
  },
  {
    label: 'REST API',
    icon: Bitrix24Icon,
    to: 'https://apidocs.bitrix24.com',
    target: '_blank'
  },
  {
    label: 'Releases',
    icon: GitHubIcon,
    to: 'https://github.com/bitrix24/b24ui/releases',
    target: '_blank'
  }
]
</script>

<template>
  <PlaygroundPage>
    <Navbar />

    <B24Header class="w-full">
      <template #title>
        <Logo class="h-6 w-auto" />
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
  </PlaygroundPage>
</template>
