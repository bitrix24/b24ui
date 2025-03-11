<script setup lang="ts">
import type { ToastProps } from '@bitrix24/b24ui-nuxt'
import Refresh9Icon from '@bitrix24/b24icons-vue/crm/Refresh9Icon'

export interface ExampleProps {
  orientation?: ToastProps['orientation']
  title?: string
  description?: string
}

const props = withDefaults(defineProps<ExampleProps>(), {
  orientation: 'horizontal' as const,
  title: 'Some title',
  description: 'Some description'
})

const toast = useToast()

function showToast() {
  toast.add({
    ...props,
    avatar: {
      src: '/b24ui/avatar/employee.png'
    },
    actions: [{
      icon: Refresh9Icon,
      label: 'Retry',
      color: 'primary',
      onClick: (e) => {
        e?.stopPropagation()
      }
    }]
  })
}
</script>

<template>
  <B24Button label="Show toast" color="primary" @click="showToast" />
</template>
