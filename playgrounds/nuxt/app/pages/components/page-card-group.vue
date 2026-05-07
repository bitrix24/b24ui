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

// Click example: emits the change event with the native event payload.
const lastChangedAt = ref<string | null>(null)
const changeCount = ref(0)
const clickValue = ref('contacts')
function onChange(event: Event) {
  changeCount.value++
  lastChangedAt.value = new Date().toLocaleTimeString()
  console.log('[PageCardGroup] change', { value: clickValue.value, event })
}

const sizes = Object.keys(theme.variants.size)
const columns = Object.keys(theme.variants.columns)
const variants = Object.keys(pageCardTheme.variants.variant)
const colors = Object.keys(pageCardTheme.variants.highlightColor)

const attrs = reactive({
  size: 'md' as keyof typeof theme.variants.size,
  variant: 'outline' as keyof typeof pageCardTheme.variants.variant,
  color: 'air-primary-success' as keyof typeof pageCardTheme.variants.highlightColor,
  columns: '3' as keyof typeof theme.variants.columns,
  multiple: false
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.size" class="w-24" :items="sizes" placeholder="Size" size="xs" />
      <B24Select v-model="attrs.variant" class="w-44" :items="variants" placeholder="Variant" size="xs" />
      <B24Select v-model="attrs.color" class="w-44" :items="colors" placeholder="Color" size="xs" />
      <B24Select v-model="attrs.columns" class="w-24" :items="columns" placeholder="Columns" size="xs" />
      <B24Switch v-model="attrs.multiple" label="Multiple" size="xs" />
    </template>

    <B24PageCardGroup
      v-if="!attrs.multiple"
      v-model="single"
      :items="items"
      :size="attrs.size"
      :variant="attrs.variant"
      :color="attrs.color"
      :columns="attrs.columns"
    />
    <B24PageCardGroup
      v-else
      v-model="many"
      multiple
      :items="items"
      :size="attrs.size"
      :variant="attrs.variant"
      :color="attrs.color"
      :columns="attrs.columns"
    />

    <hr class="my-8 border-(--ui-color-design-outline-stroke)">

    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-3 text-(length:--ui-font-size-sm)/[normal]">
        <span class="font-(--ui-font-weight-semi-bold)">Click / change example</span>
        <B24Badge color="air-secondary-accent" size="xs">
          changes: {{ changeCount }}
        </B24Badge>
        <span v-if="lastChangedAt" class="text-(--ui-color-design-outline-content-secondary)">last at {{ lastChangedAt }}</span>
        <span class="text-(--ui-color-design-outline-content-secondary)">value: {{ clickValue }}</span>
      </div>

      <B24PageCardGroup
        v-model="clickValue"
        :items="items.slice(0, 3)"
        columns="3"
        category-key=""
        @change="onChange"
      />
    </div>
  </PlaygroundPage>
</template>
