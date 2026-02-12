<script setup lang="ts">
import TrashcanIcon from '@bitrix24/b24icons-vue/solid/TrashcanIcon'

const toast = useToast()

function showToast() {
  toast.add({
    title: h('span', {}, [
      'Item ',
      h('span', { class: 'text-(--ui-color-accent-main-primary) font-bold' }, '#15'),
      ' deleted'
    ]),
    description: h('span', {}, [
      'You have successfully deleted the item from your ',
      h('span', { class: 'font-bold' }, 'account'),
      '.'
    ]),
    icon: TrashcanIcon
  })
}
</script>

<template>
  <B24Button label="Show toast" @click="showToast" />
</template>
