<script setup lang="ts">
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import TelegramIcon from '@bitrix24/b24icons-vue/outline/TelegramIcon'
</script>

<template>
  <B24NavbarSection class="inline-flex lg:hidden">
    <LogoWithVersion />
  </B24NavbarSection>
  <B24NavbarSpacer />

  <B24NavbarSection>
    <!-- @todo fix this -->
    <!-- B24Tooltip text="Search" :kbds="['meta', 'K']">
      <B24ContentSearchButton />
    </B24Tooltip -->

    <div class="flex flex-nowrap flex-row items-center justify-end gap-[4px]">
      <B24Button
        class="hidden sm:inline-flex"
        aria-label="Bitrix24 REST API"
        :icon="Bitrix24Icon"
        to="https://apidocs.bitrix24.com/"
        target="_blank"
        size="sm"
      />
      <B24Button
        class="hidden sm:inline-flex"
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
