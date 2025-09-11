<script setup lang="ts">
const { framework, frameworks } = useFrameworks()

const value = ref<string | undefined>(undefined)

onMounted(() => {
  value.value = framework.value
})
watch(framework, () => {
  value.value = framework.value
})
</script>

<template>
  <B24Tabs
    v-model="value"
    :items="frameworks"
    :content="false"
    :b24ui="{
      indicator: '',
      trigger: 'px-1 data-[state=active]:text-highlighted w-full'
    }"
    size="xs"
    @update:model-value="(framework = $event as string)"
  />
</template>
