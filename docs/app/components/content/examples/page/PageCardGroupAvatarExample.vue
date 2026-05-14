<script setup lang="ts">
import TelephonyHandset1Icon from '@bitrix24/b24icons-vue/main/TelephonyHandset1Icon'
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/main/FeedbackIcon'
import type { PageCardGroupItem } from '@bitrix24/b24ui-nuxt'

const items: PageCardGroupItem[] = [
  {
    value: 'callback',
    avatar: { color: 'air-primary-success', icon: TelephonyHandset1Icon },
    label: 'Callback',
    description: 'Capture the phone number and start a callback'
  },
  {
    value: 'contacts',
    avatar: { color: 'air-primary-copilot', icon: MailIcon },
    label: 'Contact details',
    description: 'Collect phone, email and client name'
  },
  {
    value: 'feedback',
    avatar: { color: 'air-primary-warning', icon: FeedbackIcon },
    label: 'Feedback',
    description: 'Gather customer reviews'
  }
]

const value = ref('contacts')
</script>

<template>
  <B24PageCardGroup
    v-model="value"
    :items="items"
    color="air-primary-copilot"
    columns="3"
    category-key=""
  />
</template>
