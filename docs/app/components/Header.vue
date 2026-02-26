<script setup lang="ts">
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import TelegramIcon from '@bitrix24/b24icons-vue/outline/TelegramIcon'

const { desktopLinks } = useHeader()
const config = useRuntimeConfig()

const isNeedChangeTarget = ref(false)
const tgLink = computed(() => {
  return (
    isNeedChangeTarget.value && (typeof window !== 'undefined' && window.navigator?.language.includes('ru'))
  )
    ? 'https://t.me/bitrix24apps'
    : 'https://t.me/b24_dev'
})

const b24DocsLink = computed(() => {
  return (
    isNeedChangeTarget.value && (typeof window !== 'undefined' && window.navigator?.language.includes('ru'))
  )
    ? 'https://apidocs.bitrix24.ru/'
    : 'https://apidocs.bitrix24.com/'
})

onMounted(() => {
  isNeedChangeTarget.value = true
})

const { isEnabled: isAssistantEnabled, shouldPushContent } = useAssistant()
</script>

<template>
  <B24DashboardNavbar
    class="bg-(--ui-color-design-outline-bg-alt) backdrop-blur-md"
    :b24ui="{ right: 'gap-1 sm:gap-3' }"
  >
    <template #left>
      <LogoWithVersion no-padding class="lg:hidden" />
      <B24NavigationMenu
        v-if="!shouldPushContent"
        class="hidden lg:inline-flex"
        :items="desktopLinks"
        orientation="horizontal"
      />
    </template>
    <template #right>
      <template v-if="isAssistantEnabled">
        <AssistantChat />
      </template>
      <B24ColorModeButton :content="{ align: 'end', side: 'bottom' }" />
      <div class="hidden sm:flex flex-nowrap flex-row items-center justify-end gap-3">
        <B24Button
          aria-label="Bitrix24 REST API"
          :icon="Bitrix24Icon"
          :to="b24DocsLink"
          target="_blank"
          size="sm"
        />
        <B24Button
          aria-label="Bitrix24 UI on Telegram"
          :icon="TelegramIcon"
          :to="tgLink"
          target="_blank"
          size="sm"
        />
        <B24Button
          aria-label="Bitrix24 UI on GitHub"
          :icon="GitHubIcon"
          :to="config.public.gitUrl"
          target="_blank"
          size="sm"
        />
      </div>
    </template>
  </B24DashboardNavbar>
</template>
