<script setup lang="ts">
import TelephonyHandset1Icon from '@bitrix24/b24icons-vue/main/TelephonyHandset1Icon'
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/main/FeedbackIcon'
import DocumentStreamIcon from '@bitrix24/b24icons-vue/main/DocumentStreamIcon'
import CartWithCursorIcon from '@bitrix24/b24icons-vue/main/CartWithCursorIcon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'
import PictureIcon from '@bitrix24/b24icons-vue/main/PictureIcon'

const items = [
  { value: 'callback', category: 'Customer communications', icon: TelephonyHandset1Icon, label: 'Callback', description: 'Capture the phone number and start a callback' },
  { value: 'contacts', category: 'Customer communications', icon: MailIcon, label: 'Contact details', description: 'Collect phone, email and client name' },
  { value: 'feedback', category: 'Customer communications', icon: FeedbackIcon, label: 'Feedback', description: 'Gather customer reviews' },
  { value: 'multi', category: 'Customer communications', icon: DocumentStreamIcon, label: 'Multi-page form', description: 'Split a long form across several pages' },
  { value: 'no-image', category: 'Sales', icon: CartWithCursorIcon, label: 'Products without images', description: 'Order a product without a picture' },
  { value: 'pay', category: 'Sales', icon: CreditDebitCardIcon, label: 'Products with payment', description: 'Pay for a product right from the form' },
  { value: 'small-img', category: 'Sales', icon: PictureIcon, label: 'Products with small photo', description: 'Order a product with a small thumbnail preview' }
]

const value = ref('contacts')
</script>

<template>
  <PlaygroundPage>
    <B24PageCardGroup v-model="value" :items="items" />
  </PlaygroundPage>
</template>
