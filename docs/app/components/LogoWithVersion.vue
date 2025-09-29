<script setup lang="ts">
const config = useRuntimeConfig().public
</script>

<template>
  <div class="h-[58px] flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
    <div class="flex flex-row flex-nowrap items-center justify-start gap-[6px]">
      <NuxtLink
        to="/"
        class="flex items-end gap-2 font-(--ui-font-weight-bold) text-xl min-w-0 shrink-0"
        aria-label="Bitrix24 UI"
      >
        <Logo class="w-auto h-[24px] shrink-0" />
      </NuxtLink>

      <B24Badge
        :label="`v${config.version}`"
        color="air-primary-copilot"
      />
    </div>
  </div>
</template>
