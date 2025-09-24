<script setup lang="ts">
import { vMaska } from 'maska/vue'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'
</script>

<template>
  <div class="flex flex-col gap-2">
    <B24Input v-maska="'#### #### #### ####'" placeholder="4242 4242 4242 4242" :icon="CreditDebitCardIcon" />

    <div class="flex items-center gap-2">
      <B24Input v-maska="'##/##'" placeholder="MM/YY" :icon="CalendarIcon" />
      <B24Input v-maska="'###'" placeholder="CVC" />
    </div>
  </div>
</template>
