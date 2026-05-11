<script setup lang="ts">
import theme from '#build/b24ui/page-card-group'
import pageCardTheme from '#build/b24ui/page-card'
import avatarTheme from '#build/b24ui/avatar'
import TelephonyHandset1Icon from '@bitrix24/b24icons-vue/main/TelephonyHandset1Icon'
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/main/FeedbackIcon'
import DocumentStreamIcon from '@bitrix24/b24icons-vue/main/DocumentStreamIcon'
import CartWithCursorIcon from '@bitrix24/b24icons-vue/main/CartWithCursorIcon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'
import PictureIcon from '@bitrix24/b24icons-vue/main/PictureIcon'
import type { PageCardGroupItem, AvatarProps } from '@bitrix24/b24ui-nuxt'

type AvatarColor = keyof typeof avatarTheme.variants.color

// Per-item accent palette used when `Per-item palette` is on.
const accentPalette: AvatarColor[] = [
  'air-primary-success',
  'air-primary-copilot',
  'air-primary-warning',
  'air-primary-alert',
  'air-secondary-accent-1',
  'air-secondary-accent-2',
  'air-tertiary-accent'
]

const baseItems = [
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
const avatarColors = Object.keys(avatarTheme.variants.color) as AvatarColor[]

const attrs = reactive({
  size: 'md' as keyof typeof theme.variants.size,
  variant: 'outline' as keyof typeof pageCardTheme.variants.variant,
  color: 'air-primary-success' as keyof typeof pageCardTheme.variants.highlightColor,
  columns: '3' as keyof typeof theme.variants.columns,
  multiple: false,
  // Avatar mode: when off, items keep top-level `icon` (plain icon, no circle).
  // When on, the icon is moved into `avatar.icon` so PageCard renders B24Avatar.
  avatarMode: true,
  // Per-item palette: when on, each item gets its own `avatar.color` from the palette.
  // When off, items expose `avatar.icon` only — the group `:avatar.color` drives them.
  itemPalette: false,
  // Group-level umbrella avatar color forwarded to `:avatar`. Per-item `avatar.color`
  // wins on merge, so this is visible only when `itemPalette` is off.
  avatarColor: 'air-secondary-accent-1' as AvatarColor | undefined
})

const items = computed<PageCardGroupItem[]>(() => {
  if (!attrs.avatarMode) return baseItems as PageCardGroupItem[]

  return baseItems.map((item, idx) => {
    const { icon, ...rest } = item
    const avatar: Partial<AvatarProps> = { icon }
    if (attrs.itemPalette) {
      avatar.color = accentPalette[idx % accentPalette.length]
    }
    return { ...rest, avatar } as PageCardGroupItem
  })
})

const groupAvatar = computed<Partial<AvatarProps> | undefined>(() =>
  attrs.avatarColor ? { color: attrs.avatarColor } : undefined
)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.size" class="w-24" :items="sizes" placeholder="Size" size="xs" />
      <B24Select v-model="attrs.variant" class="w-44" :items="variants" placeholder="Variant" size="xs" />
      <B24Select v-model="attrs.color" class="w-44" :items="colors" placeholder="Color" size="xs" />
      <B24Select v-model="attrs.columns" class="w-24" :items="columns" placeholder="Columns" size="xs" />
      <B24Switch v-model="attrs.multiple" label="Multiple" size="xs" />
      <B24Switch v-model="attrs.avatarMode" label="Avatar mode" size="xs" />
      <B24Switch v-model="attrs.itemPalette" label="Item palette" size="xs" :disabled="!attrs.avatarMode" />
      <B24Select
        v-model="attrs.avatarColor"
        class="w-52"
        :items="avatarColors"
        placeholder="Group avatar color"
        size="xs"
        :disabled="!attrs.avatarMode || attrs.itemPalette"
      />
    </template>

    <B24PageCardGroup
      v-if="!attrs.multiple"
      v-model="single"
      :items="items"
      :size="attrs.size"
      :variant="attrs.variant"
      :color="attrs.color"
      :columns="attrs.columns"
      :avatar="groupAvatar"
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
      :avatar="groupAvatar"
    />

    <hr class="my-8 border-(--ui-color-design-outline-stroke)">

    <div class="flex flex-col gap-4">
      <h3 class="font-(--ui-font-weight-semi-bold) text-(length:--ui-font-size-lg)/[normal]">
        Per-item palette — each item brings its own avatar color
      </h3>
      <p class="text-(--ui-color-design-outline-content-secondary) text-(length:--ui-font-size-sm)/[normal]">
        Items expose <code>avatar: {{ '{ color, icon }' }}</code> — per-item <code>color</code> wins over the group <code>:avatar.color</code>.
      </p>
      <B24PageCardGroup
        v-model="single"
        :items="baseItems.map((it, idx) => ({ ...it, icon: undefined, avatar: { icon: it.icon, color: accentPalette[idx % accentPalette.length] } }))"
        :size="attrs.size"
        :variant="attrs.variant"
        :color="attrs.color"
        :columns="attrs.columns"
        category-key=""
      />
    </div>

    <hr class="my-8 border-(--ui-color-design-outline-stroke)">

    <div class="flex flex-col gap-4">
      <h3 class="font-(--ui-font-weight-semi-bold) text-(length:--ui-font-size-lg)/[normal]">
        Group avatar color — uniform branding via <code>:avatar</code>
      </h3>
      <p class="text-(--ui-color-design-outline-content-secondary) text-(length:--ui-font-size-sm)/[normal]">
        Items expose only <code>avatar: {{ '{ icon }' }}</code> — color comes from the group prop.
      </p>
      <B24PageCardGroup
        v-model="single"
        :items="baseItems.map(it => ({ ...it, icon: undefined, avatar: { icon: it.icon } }))"
        :size="attrs.size"
        :variant="attrs.variant"
        :color="attrs.color"
        :columns="attrs.columns"
        :avatar="{ color: 'air-primary-copilot' }"
        category-key=""
      />
    </div>

    <hr class="my-8 border-(--ui-color-design-outline-stroke)">

    <div class="flex flex-col gap-4">
      <h3 class="font-(--ui-font-weight-semi-bold) text-(length:--ui-font-size-lg)/[normal]">
        Plain icon — no circle
      </h3>
      <p class="text-(--ui-color-design-outline-content-secondary) text-(length:--ui-font-size-sm)/[normal]">
        Items use top-level <code>icon</code>. <code>icon</code> wins over <code>avatar</code>, so the leading visual is a flat icon (size scales with the group <code>size</code> prop).
      </p>
      <B24PageCardGroup
        v-model="single"
        :items="baseItems"
        :size="attrs.size"
        :variant="attrs.variant"
        :color="attrs.color"
        :columns="attrs.columns"
        category-key=""
      />
    </div>

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
