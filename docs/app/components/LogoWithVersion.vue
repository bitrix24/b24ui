<script lang="ts">
export interface LogoWithVersionProps {
  noPadding?: boolean
}
</script>

<script setup lang="ts">
const config = useRuntimeConfig().public

const props = withDefaults(defineProps<LogoWithVersionProps>(), {
  noPadding: false
})
</script>

<template>
  <div
    class="h-[58px] flex items-center relative my-0"
    :class="[
      props.noPadding ? 'ps-0 pe-xs rtl:ps-xs rtl:pe-0' : 'in-data-[dismissable-layer]:ps-[22px] lg:ps-[22px] pe-xs rtl:ps-xs rtl:lg:pe-[22px]'
    ]"
  >
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
        size="xs"
        class="mb-4"
      />
    </div>
  </div>
</template>
