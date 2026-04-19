<script setup lang="ts">
const { framework, setFramework, frameworks } = useFrameworks()

const value = ref<string | undefined>(undefined)

onMounted(() => {
  value.value = framework.value
})
watch(framework, () => {
  value.value = framework.value
})

function onFrameworkChange(newFramework: string) {
  setFramework(newFramework as 'nuxt' | 'vue', 'tabs')
}
</script>

<template>
  <div class="flex flex-row flex-nowrap items-center justify-start gap-[6px]">
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
