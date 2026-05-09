# Overlays

Patterns for modals, slideovers, drawers, and command palettes.

## Confirmation dialog

```vue
<script setup lang="ts">
const isOpen = ref(false)

function confirmDelete() {
  // perform delete
  isOpen.value = false
}
</script>

<template>
  <B24Button label="Delete" color="air-primary-alert" @click="isOpen = true" />

  <B24Modal v-model:open="isOpen" title="Delete item" description="This action cannot be undone. Are you sure?" :b24ui="{ footer: 'justify-end' }">
    <template #footer="{ close }">
      <B24Button label="Delete" color="air-primary" @click="confirmDelete" />
      <B24Button label="Cancel" color="air-tertiary" @click="close" />
    </template>
  </B24Modal>
</template>
```

## Programmatic confirmation (useOverlay)

Reusable pattern — no template state needed at the call site.

```vue [components/ConfirmModal.vue]
<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()

const emit = defineEmits<{
  close: [confirmed: boolean]
}>()
</script>

<template>
  <B24Modal :close="{ onClick: () => emit('close', false) }" :title="title" :description="description">
    <template #footer>
      <B24Button label="Confirm" color="air-primary" @click="emit('close', true)" />
      <B24Button label="Cancel" color="air-tertiary" @click="emit('close', false)" />
    </template>
  </B24Modal>
</template>
```

```ts
// Usage anywhere
const overlay = useOverlay()
const confirm = overlay.create(ConfirmModal)

async function deleteItem(item) {
  const instance = confirm.open({
    title: 'Delete item',
    description: `Are you sure you want to delete "${item.name}"?`
  })

  if (await instance.result) {
    // user confirmed
  }
}
```

## Marketing / promo modal

Promo or upgrade modals (trial expiring, plan upsell) compose from existing components — **do not create a custom modal**. The pattern: hide the default header (`title=""`, `description=""`), disable the built-in close (`:close="false"`) and place a custom close icon inside the body, lay the body out as a responsive 2-column flex (pitch + actions on the left, feature card on the right). Skip `#footer` and put both action buttons inline in the left column. Decorative background is an explicit Tailwind gradient on `b24ui.body`.

```vue
<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/main/CircleCheckIcon'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'

const open = ref(false)

const benefits: NavigationMenuItem[] = [
  { label: 'Unlimited monitored lines', icon: CircleCheckIcon },
  { label: 'AI defect detection on camera streams', icon: CircleCheckIcon }
]
</script>

<template>
  <B24Modal
    v-model:open="open"
    title=""
    description=""
    :close="false"
    scrollable
    :b24ui="{
      content: 'sm:max-w-[788px] bg-[radial-gradient(110.42%_110.42%_at_-10.42%_31.25%,var(--ui-color-design-filled-boost-bg-gradient-1)_0%,var(--ui-color-design-filled-boost-bg-gradient-2)_58.65%,var(--ui-color-design-filled-boost-bg-gradient-3)_100%)]',
      body: 'relative p-6 md:p-8'
    }"
  >
    <B24Button label="Open marketing modal" color="air-secondary-accent" />

    <template #body>
      <B24ModalDialogClose>
        <B24Button
          color="air-tertiary-no-accent"
          size="md"
          :icon="CrossMIcon"
          aria-label="Close"
          class="absolute inset-e-3 [--ui-btn-height:24px]"
        />
      </B24ModalDialogClose>

      <div class="flex flex-col md:flex-row gap-6 min-h-full">
        <div class="flex-1 flex flex-col gap-3 text-white">
          <h2 class="text-2xl font-semibold leading-snug">
            Keep your factory floor moving — your Pro trial ends in 6 days
          </h2>
          <p class="text-white/85">
            Pro unlocks real-time OEE across every line, 90 days of historical
            analytics, AI defect detection on camera streams and predictive
            maintenance alerts. Teams on Pro ship 12% more units per shift on
            average.
          </p>
          <B24Link to="#" class="inline-flex text-white underline">Compare plans</B24Link>

          <div class="flex flex-wrap items-center gap-2 mt-auto pt-4">
            <B24Button
              label="Upgrade to Pro"
              color="air-primary"
              size="lg"
              :trailing-icon="ArrowRightLIcon"
            />
            <B24ModalDialogClose>
              <B24Button label="Remind me later" color="air-tertiary" />
            </B24ModalDialogClose>
          </div>
        </div>

        <div class="md:w-80 shrink-0">
          <B24Card
            variant="tinted-no-accent"
            :b24ui="{ header: 'flex items-center justify-between gap-2', body: 'space-y-4' }"
          >
            <template #header>
              <span class="font-semibold whitespace-nowrap">Production Insights · Pro</span>
              <B24Badge label="Recommended" color="air-primary" size="xs" class="shrink-0" />
            </template>

            <div>
              <div class="text-3xl font-semibold leading-none">+12%</div>
              <div class="text-sm text-description mt-1">average throughput uplift after upgrade</div>
            </div>

            <div class="space-y-1">
              <B24Progress :model-value="24" :max="30" color="air-primary" size="sm" />
              <div class="text-xs text-description">Trial used — 24 of 30 days</div>
            </div>

            <B24NavigationMenu
              orientation="vertical"
              :items="benefits"
              :b24ui="{ link: 'px-2 py-1.5', linkLeadingIcon: 'text-primary' }"
            />
          </B24Card>
        </div>
      </div>
    </template>
  </B24Modal>
</template>
```

Rules:
- **CTA is `air-primary`** (Bitrix24 is moving away from green CTAs); pair it with `air-tertiary` for the dismiss action — on the saturated boost gradient `air-tertiary` reads better than `air-tertiary-no-accent`.
- **Put the gradient on `b24ui.content`, not `b24ui.body`** — when `scrollable: true` the contentWrapper drops `overflow-hidden`, so a body-level bg overflows the rounded corners. The `content` slot owns the rounded radius (`rounded-[calc(var(--ui-border-radius-2xl)+2px)]`), so its own background-image gets clipped naturally — corners stay rounded.
- **Reuse the brand boost gradient tokens** for the bg — `--ui-color-design-filled-boost-bg-gradient-{1,2,3}` (the same radial gradient the `air-boost` Button paints). The CSS variables are defined identically in light and dark themes, so a single `bg-[radial-gradient(...)]` covers both modes — no `dark:` variant needed. Don't fall back to generic Tailwind palette colors here; promo surfaces should look intentionally branded.
- **Disable the default close icon** with `:close="false"` and place a custom `CrossMIcon` button absolutely inside the body. Match the standard close size with `size="md"` + `[--ui-btn-height:24px]` (the same CSS variable Modal's theme sets on its built-in close).
- **Width**: extend the modal slightly (`sm:max-w-[788px]`) so the 2-column layout breathes; the right card sits at `md:w-80` so the heading row never wraps.
- **Pin the action row to the bottom**: make the left column a `flex flex-col` and give the buttons row `mt-auto`. Combined with `md:flex-row` on the parent (which stretches both columns to equal height), this aligns the CTA with the bottom edge of the right card.
- **Action buttons live in `#body`, not `#footer`** — keeps the CTA next to the pitch text, with `Upgrade to Pro` first and the close-bound `Remind me later` to its right.
- **Add `scrollable`** so long pitches/feature lists don't overflow the viewport on small screens. Note: `scrollable` is incompatible with `modal: false` (it relies on the overlay scroll container).
- **Reuse `B24NavigationMenu` (vertical) for benefit lists** — keep the list short (≈ 2 items); the right card is a teaser, not a feature matrix.
- **Don't put the heading in `title`** — promo headings are large and free-form; keeping them inside `#body` lets you control typography. Add `whitespace-nowrap` on the right card's header title (and `shrink-0` on the badge) so "Pro" never wraps.
- **Force white text** on the left column (`text-white` on the wrapper, `text-white/85` for the description, plus `text-white underline` on the link) — the boost gradient is bright enough that the default semantic text tokens become invisible.

## Form in a slideover

```vue
<script setup lang="ts">
import * as z from 'zod'

const isOpen = ref(false)

const schema = z.object({
  name: z.string().min(1),
  email: z.email()
})

type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({})

function onSave() {
  // save user
  isOpen.value = false
}
</script>

<template>
  <B24Button label="Add user" @click="isOpen = true" />

  <B24Slideover v-model:open="isOpen" title="Add user" description="Fill in the details below.">
    <template #body>
      <B24Form id="user-form" :schema="schema" :state="state" class="space-y-4" @submit="onSave">
        <B24FormField name="name" label="Name">
          <B24Input v-model="state.name" />
        </B24FormField>
        <B24FormField name="email" label="Email">
          <B24Input v-model="state.email" type="email" />
        </B24FormField>
      </B24Form>
    </template>

    <template #footer="{ close }">
      <B24Button type="submit" form="user-form" label="Save" size="lg" color="air-primary" />
      <B24Button label="Cancel" color="air-tertiary" @click="close" size="sm" color="air-tertiary" :normal-case="false" />
    </template>
  </B24Slideover>
</template>
```

## Command palette

```vue
<script setup lang="ts">
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import FolderPlusIcon from '@bitrix24/b24icons-vue/outline/FolderPlusIcon'
import DocumentPlusIcon from '@bitrix24/b24icons-vue/main/DocumentPlusIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'

const isOpen = ref(false)

defineShortcuts({
  meta_k: () => { isOpen.value = true }
})

const groups = [{
  id: 'actions',
  label: 'Actions',
  items: [
    { label: 'New file', icon: DocumentPlusIcon, kbds: ['meta', 'n'], onSelect: () => newFile() },
    { label: 'New folder', icon: FolderPlusIcon, onSelect: () => newFolder() }
  ]
}, {
  id: 'navigation',
  label: 'Navigation',
  items: [
    { label: 'Dashboard', icon:HomeIcon, to: '/dashboard' },
    { label: 'Settings', icon: SettingsIcon, to: '/settings' }
  ]
}]
</script>

<template>
  <B24Button label="Search..." :icon="SearchIcon" color="air-tertiary" @click="isOpen = true" />

  <B24CommandPalette v-model:open="isOpen" :groups="groups" placeholder="Type a command or search..." />
</template>
```

## Drawer (bottom sheet)

```vue
<script setup lang="ts">
import ShareIcon from '@bitrix24/b24icons-vue/outline/ShareIcon'
import DownloadIcon from '@bitrix24/b24icons-vue/outline/DownloadIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'

const isOpen = ref(false)
</script>

<template>
  <B24Button label="Options" @click="isOpen = true" />

  <B24Drawer v-model:open="isOpen" title="Options">
    <template #body>
      <div class="space-y-2 p-4">
        <B24Button label="Share" :icon="ShareIcon" block color="air-tertiary" />
        <B24Button label="Export" :icon="DownloadIcon" block color="air-tertiary" />
        <B24Separator />
        <B24Button label="Delete" :icon="TrashcanIcon" block color="air-primary-alert" />
      </div>
    </template>
  </B24Drawer>
</template>
```

