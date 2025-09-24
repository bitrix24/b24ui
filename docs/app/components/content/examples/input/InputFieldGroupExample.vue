<script setup lang="ts">
const value = ref('')
const domains = ['.com', '.dev', '.org']
const domain = ref(domains[0])
</script>

<template>
  <B24FieldGroup>
    <B24Input
      v-model="value"
      placeholder="bitrix24"
      :b24ui="{
        base: 'pl-[48px]',
        leading: 'pointer-events-none'
      }"
    >
      <template #leading>
        <p class="text-(length:--ui-font-size-xs)/(--ui-font-line-height-reset) text-(--b24ui-typography-label-color)">
          https://
        </p>
      </template>
    </B24Input>

    <B24SelectMenu
      v-model="domain"
      :items="domains"
      class="w-[85px]"
      :content="{ align: 'end', side: 'bottom', sideOffset: 4 }"
    />
  </B24FieldGroup>
</template>
