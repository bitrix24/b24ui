<script setup lang="ts">
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'

const route = useRoute()
const { desktopLinks } = useHeader()
const config = useRuntimeConfig()

// @memo @memo this for NUXT.UI.docs
const { open } = useChat()
const { isEnabled: isAssistantEnabled } = useAssistant()

// region ColorMode ////
const colorMode = useColorMode()

function toggleMode() {
  colorMode.preference = !(colorMode.value === 'dark') ? 'dark' : 'light'
}
// endregion ////

// region Shortcuts ////
defineShortcuts({
  shift_D: () => {
    toggleMode()
  }
})
// endregion ////
</script>

<template>
  <B24Header
    mode="modal"
    class="bg-(--ui-color-accent-soft-element-violet)/40 dark:bg-(--ui-color-copilot-bg-content-3)/40 backdrop-blur-md"
    :b24ui="{ container: 'lg:ps-10.5 h-auto', right: 'gap-1 sm:gap-3' }"
  >
    <template #left>
      <LogoWithVersion no-padding />
    </template>

    <B24NavigationMenu
      :items="desktopLinks"
      orientation="horizontal"
    />

    <template #right>
      <!-- @memo @memo this for NUXT.UI.docs -->
      <B24Tooltip text="Ask AI for help">
        <B24Button
          v-if="isAssistantEnabled"
          color="air-selection"
          :icon="AiStarsIcon"
          aria-label="Ask AI for help"
          @click="open = !open"
        />
      </B24Tooltip>
      <!-- @memo this for docus -->
      <!-- AssistantChat v-if="isAssistantEnabled" / -->
      <B24ContentSearchButton />

      <B24ColorModeButton />

      <div class="hidden sm:flex flex-nowrap flex-row items-center justify-end gap-3">
        <B24Button
          aria-label="Bitrix24 UI on GitHub"
          :icon="GitHubIcon"
          :to="config.public.gitUrl"
          target="_blank"
          size="sm"
          :b24ui="{ baseLine: '[--ui-btn-icon-size:16px]' }"
        />
      </div>
    </template>
    <template #body>
      <HeaderBody />
    </template>

    <template v-if="route.path.startsWith('/docs/')" #bottom>
      <HeaderBottom />
    </template>
  </B24Header>
</template>
