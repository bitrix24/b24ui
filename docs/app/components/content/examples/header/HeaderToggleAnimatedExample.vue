<script setup lang="ts">
import type { VariantType } from 'motion-v'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import { motion } from 'motion-v'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Docs',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs/getting-started')
  },
  {
    label: 'Components',
    to: '/docs/components',
    active: route.path.startsWith('/docs/components')
  },
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
])

const variants: { [k: string]: VariantType | ((custom: unknown) => VariantType) } = {
  normal: {
    rotate: 0,
    y: 0,
    opacity: 1
  },
  close: (custom: unknown) => {
    const c = custom as number
    return {
      rotate: c === 1 ? 45 : c === 3 ? -45 : 0,
      y: c === 1 ? 6 : c === 3 ? -6 : 0,
      opacity: c === 2 ? 0 : 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  }
}
</script>

<template>
  <B24Header>
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

    <template #toggle="{ open, toggle, b24ui }">
      <B24Button
        size="sm"
        square
        :class="b24ui.toggle({ toggleSide: 'right' })"
        @click="toggle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <motion.line
            x1="4"
            y1="6"
            x2="20"
            y2="6"
            :variants="variants"
            :animate="open ? 'close' : 'normal'"
            :custom="1"
            class="outline-none"
          />
          <motion.line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            :variants="variants"
            :animate="open ? 'close' : 'normal'"
            :custom="2"
            class="outline-none"
          />
          <motion.line
            x1="4"
            y1="18"
            x2="20"
            y2="18"
            :variants="variants"
            :animate="open ? 'close' : 'normal'"
            :custom="3"
            class="outline-none"
          />
        </svg>
      </B24Button>
    </template>

    <template #body>
      <B24NavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </B24Header>
</template>
