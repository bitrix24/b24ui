<template>
  <B24Collapsible class="flex flex-col gap-2 w-48">
    <B24Button
      class="group"
      label="Open"
      block
      use-dropdown
      :b24ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
    />

    <template #content>
      <Placeholder class="h-48" />
    </template>
  </B24Collapsible>
</template>
