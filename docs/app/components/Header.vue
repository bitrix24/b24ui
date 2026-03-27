<script setup lang="ts">
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const route = useRoute()
const { desktopLinks } = useHeader()
const config = useRuntimeConfig()

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
    :b24ui="{ container: 'px-3 lg:ps-2 h-auto', right: 'gap-1 sm:gap-3' }"
  >
    <template #left>
      <LogoWithVersion no-padding />
    </template>

    <B24NavigationMenu
      :items="desktopLinks"
      orientation="horizontal"
    />

    <template #right>
      <AssistantChat v-if="isAssistantEnabled" />
      <B24ContentSearchButton v-else />

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
