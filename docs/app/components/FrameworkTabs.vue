<script setup lang="ts">
const { framework, frameworks } = useFrameworks()
const { track } = useAnalytics()

const value = ref<string | undefined>(undefined)

onMounted(() => {
  value.value = framework.value
})
watch(framework, () => {
  value.value = framework.value
})

function onFrameworkChange(newFramework: string) {
  framework.value = newFramework
  track('Framework Tab Switched', { framework: newFramework })
}
</script>

<template>
  <div class="ps-[20px] pe-xs rtl:ps-xs rtl:pe-[20px] pb-[12px] flex flex-row flex-nowrap items-center justify-start gap-[6px]">
    <B24RadioGroup
      v-model="framework"
      :items="frameworks"
      orientation="horizontal"
      color="air-primary-copilot"
      variant="table"
      indicator="hidden"
      size="xs"
      @update:model-value="onFrameworkChange($event as string)"
    />
  </div>
</template>
