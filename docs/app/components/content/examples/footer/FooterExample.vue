<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

const items: NavigationMenuItem[] = [
  {
    label: 'REST API',
    to: 'https://apidocs.bitrix24.com',
    target: '_blank'
  },
  {
    label: 'Releases',
    to: 'https://github.com/bitrix24/b24ui/releases',
    target: '_blank'
  }
]
</script>

<template>
  <B24Footer>
    <template #left>
      <ProseP small accent="less">
        Copyright © {{ new Date().getFullYear() }}
      </ProseP>
    </template>

    <B24NavigationMenu :items="items" variant="link" />

    <template #right>
      <B24Button
        color="air-selection"
        :icon="Bitrix24Icon"
        to="https://apidocs.bitrix24.com"
        target="_blank"
        aria-label="Bitrix24 REST API"
      />
      <B24Button
        :icon="GitHubIcon"
        to="https://github.com/bitrix24/b24ui"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </B24Footer>
</template>
