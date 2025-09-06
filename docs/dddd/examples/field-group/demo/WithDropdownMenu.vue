<script setup lang="ts">
import { ref } from 'vue'
import { dropdownMenuItems } from './../../dropdownmenu/dictionary'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'

const value = ref('pnpm add @bitrix24/b24ui-nuxt@next')
</script>

<template>
  <B24FieldGroup>
    <B24Input v-model="value" class="w-40" />
    <B24DropdownMenu :items="dropdownMenuItems" :content="{ align: 'end' }">
      <B24Button
        :icon="MoreMIcon"
      />
    </B24DropdownMenu>
  </B24FieldGroup>
</template>
