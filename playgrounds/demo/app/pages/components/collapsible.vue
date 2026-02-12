<script setup lang="ts">
const open = ref(true)
const disabled = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Switch v-model="disabled" label="Disabled" />
    </template>

    <B24Collapsible
      v-model:open="open"
      class="flex flex-col gap-2 w-48 mx-auto"
      :disabled="disabled"
    >
      <B24Button
        color="air-primary-copilot"
        class="group"
        label="Open"
        use-dropdown
        block
        :b24ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
        }"
      />

      <template #content>
        <Placeholder class="h-48" />
      </template>
    </B24Collapsible>
  </PlaygroundPage>
</template>
