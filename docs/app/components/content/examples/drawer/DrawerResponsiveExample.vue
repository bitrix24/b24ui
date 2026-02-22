<script lang="ts" setup>
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'

const [DefineFormTemplate, ReuseFormTemplate] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')

const open = ref(false)

const state = reactive({
  email: undefined
})

const title = 'Edit profile'
const description = 'Make changes to your profile here. Click save when you\'re done.'
</script>

<template>
  <DefineFormTemplate>
    <B24Form :state="state" class="space-y-4">
      <B24FormField label="Email" name="email" required>
        <B24Input v-model="state.email" placeholder="shadcn@example.com" required />
      </B24FormField>

      <B24Button label="Save changes" color="air-primary-success" type="submit" />
    </B24Form>
  </DefineFormTemplate>

  <B24Modal v-if="isDesktop" v-model:open="open" :title="title" :description="description">
    <B24Button label="Edit profile" />

    <template #body>
      <ReuseFormTemplate />
    </template>
  </B24Modal>

  <B24Drawer v-else v-model:open="open" :title="title" :description="description">
    <B24Button label="Edit profile" />

    <template #body>
      <ReuseFormTemplate />
    </template>
  </B24Drawer>
</template>
