<script setup lang="ts">
import theme from '#build/b24ui/page-card-group'
import pageCardTheme from '#build/b24ui/page-card'
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

const single = ref('contacts')
const many = ref<string[]>(['contacts', 'pay'])

const columns = Object.keys(theme.variants.columns)
const variants = Object.keys(pageCardTheme.variants.variant)
const colors = Object.keys(pageCardTheme.variants.highlightColor)

const attrs = reactive({
  variant: 'outline' as keyof typeof pageCardTheme.variants.variant,
  highlightColor: 'air-primary-success' as keyof typeof pageCardTheme.variants.highlightColor,
  columns: '3' as keyof typeof theme.variants.columns,
  multiple: false
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.variant" class="w-44" :items="variants" placeholder="Variant" size="xs" />
      <B24Select v-model="attrs.highlightColor" class="w-44" :items="colors" placeholder="Highlight color" size="xs" />
      <B24Select v-model="attrs.columns" class="w-24" :items="columns" placeholder="Columns" size="xs" />
      <B24Switch v-model="attrs.multiple" label="Multiple" size="xs" />
    </template>

    <B24PageCardGroup
      v-if="!attrs.multiple"
      v-model="single"
      :items="items"
      :variant="attrs.variant"
      :highlight-color="attrs.highlightColor"
      :columns="attrs.columns"
    />
    <B24PageCardGroup
      v-else
      v-model="many"
      multiple
      :items="items"
      :variant="attrs.variant"
      :highlight-color="attrs.highlightColor"
      :columns="attrs.columns"
    />
  </PlaygroundPage>
</template>
