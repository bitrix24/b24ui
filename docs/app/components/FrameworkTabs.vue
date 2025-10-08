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
  <B24RadioGroup
    v-model="framework"
    :items="frameworks"
    orientation="horizontal"
    color="air-primary-copilot"
    variant="table"
    indicator="hidden"
    size="md"
  />
</template>
