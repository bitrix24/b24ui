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
  <div class="inline-flex lg:hidden">
    <B24DropdownMenu
      :items="frameworks"
      :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
      class="w-[100px]"
      size="sm"
    >
      <B24Button
        color="air-secondary-accent"
        use-dropdown
        class="w-[60px]"
        size="sm"
        :label="value"
      />
    </B24DropdownMenu>
  </div>
  <B24FieldGroup
    class="hidden lg:inline-flex"
    size="sm"
    no-split
  >
    <B24Badge
      label="framework:"
      color="air-tertiary"
      size="sm"
    />
    <B24DropdownMenu
      :items="frameworks"
      :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
      class="w-[100px]"
    >
      <B24Button
        use-dropdown
        class="w-[60px]"
        :label="value"
      />
    </B24DropdownMenu>
  </B24FieldGroup>
</template>
