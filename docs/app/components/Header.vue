<script lang="ts">
export interface HeaderProps {
  showLogoAllTime?: boolean
}
</script>

<script setup lang="ts">
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import TelegramIcon from '@bitrix24/b24icons-vue/outline/TelegramIcon'

const props = withDefaults(defineProps<HeaderProps>(), {
  showLogoAllTime: false
})

const { links } = useSearch()
</script>

<template>
  <B24NavbarSection
    class="inline-flex"
    :class="[
      props.showLogoAllTime ? 'pl-[3px]' : 'lg:hidden'
    ]"
  >
    <LogoWithVersion />
  </B24NavbarSection>
  <B24NavbarSection
    class="hidden lg:inline-flex"
    :class="[
      props.showLogoAllTime ? 'pl-[37px]' : ''
    ]"
  >
    <B24NavigationMenu
      :items="links"
      orientation="horizontal"
    />
  </B24NavbarSection>
  <B24NavbarSpacer />

  <B24NavbarSection>
    <B24Tooltip text="Search" :kbds="['meta', 'K']">
      <B24ContentSearchButton />
    </B24Tooltip>
    <FrameworkTabs />
    <div class="hidden sm:flex flex-nowrap flex-row items-center justify-end gap-[4px]">
      <B24Button
        aria-label="Bitrix24 REST API"
        :icon="Bitrix24Icon"
        to="https://apidocs.bitrix24.com/"
        target="_blank"
        size="sm"
      />
      <B24Button
        aria-label="Bitrix24 UI on Telegram"
        :icon="TelegramIcon"
        to="https://t.me/b24_dev"
        target="_blank"
        size="sm"
      />
      <B24Button
        aria-label="Bitrix24 UI on GitHub"
        :icon="GitHubIcon"
        to="https://github.com/bitrix24/b24ui"
        target="_blank"
        size="sm"
      />
    </div>
  </B24NavbarSection>
</template>
