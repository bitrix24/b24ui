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
              <B24Button label="Remind me later" color="air-tertiary-accent" />
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
- **CTA is `air-primary`** (Bitrix24 is moving away from green CTAs).
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

## Info popover (entity summary)

Show an at-a-glance summary of a CRM entity (account, deal, contact, lead) when the user hovers or clicks its name — without navigating away. Assembled entirely from stock components: `B24Popover` + `B24Avatar` + `B24Button` + `B24Separator` + `B24DescriptionList` + `B24Link`. No custom CSS beyond the avatar accent color.

Use `mode="hover"` for read-only summaries (most common in lists/feeds), `mode="click"` when the popover contains links the user is expected to interact with.

```vue
<script setup lang="ts">
import UserGroupIcon from '@bitrix24/b24icons-vue/common-b24/UserGroupIcon'
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt'

const items = [
  { label: 'Account manager', description: 'Sample owner', slot: 'owner' as const },
  { label: 'Created', description: 'Oct 6, 2024 08:37' },
  { label: 'Segment', description: 'Enterprise' }
] satisfies DescriptionListItem[]
</script>

<template>
  <B24Popover mode="hover" :content="{ side: 'bottom', sideOffset: 8 }" :b24ui="{ content: 'p-0' }">
    <B24Link is-action>ACME Corp.</B24Link>

    <template #content>
      <div class="w-65 p-6 flex flex-col gap-4.5">
        <div class="flex items-center gap-3">
          <B24Avatar
            size="lg"
            :icon="UserGroupIcon"
            :b24ui="{
              root: 'bg-(--ui-color-design-filled-alert-bg)',
              icon: 'text-(--ui-color-design-filled-alert-content)'
            }"
          />
          <div class="min-w-0">
            <div class="text-label font-(--ui-font-weight-semi-bold) truncate">ACME Corp.</div>
            <div class="text-sm text-description truncate">12 contacts</div>
          </div>
        </div>

        <B24Button block size="sm" color="air-secondary-accent-2" label="Open account" />

        <B24Separator />

        <B24DescriptionList
          size="sm"
          :items="items"
          :b24ui="{
            container: 'mt-0 sm:grid-cols-1',
            labelWrapper: 'border-t-0 sm:border-t-0 py-0 sm:py-0',
            descriptionWrapper: 'sm:border-t-0 py-0 pb-2.5 sm:py-0 sm:pb-2.5 last:pb-0 sm:last:pb-0'
          }"
        >
          <template #description="{ item }">
            <B24Link v-if="item.slot === 'owner'">{{ item.description }}</B24Link>
            <template v-else>{{ item.description }}</template>
          </template>
        </B24DescriptionList>
      </div>
    </template>
  </B24Popover>
</template>
```

Notes on the layout:

- The popover's content padding is reset with `:b24ui="{ content: 'p-0' }"` so the inner `flex flex-col gap-4.5` (with `p-6`) controls spacing — keeps the example free of header-border overrides.
- The avatar is recolored through its `:b24ui` slot using design tokens (`--ui-color-design-filled-alert-*`) — swap to `success`, `warning`, or `copilot` tokens to match the entity type.
- The fixed `w-65` keeps the card compact at every breakpoint. Title and caption use `truncate` + `min-w-0` so long entity names don't break the layout.
- `B24DescriptionList` switches to a two-column grid at `sm:` by default and draws a top border before each item. Inside a narrow popover both behaviours hurt readability, so the layout is pinned to a single column and all `border-t` rules are zeroed out via the `b24ui` prop. The container's default `mt` is dropped (`mt-0`) since the parent `gap-4.5` already supplies the gap below the separator. Label wrappers (`<dt>`) lose all vertical padding (`py-0`), description wrappers (`<dd>`) get only `pb-2.5` — so a label sits flush against its value and each row contributes a single 2.5 unit of breathing room between items. The very last `<dd>` zeroes that padding back out (`last:pb-0 sm:last:pb-0`) so the popover doesn't carry a stray gap below the final value.
- The `#owner` slot would replace the whole `<dt>/<dd>` pair (and lose the "Account manager" label). Tagging the owner item with `slot: 'owner' as const` and overriding the global `#description` slot with a `v-if="item.slot === 'owner'"` keeps the default label rendering and only swaps the value for a `B24Link`. The `as const` + `satisfies DescriptionListItem[]` pattern is what lets `item.slot` narrow to the literal `'owner'` inside the template.

## Stats widget (KPI summary)

A compact dashboard widget summarising a few metrics with one highlighted KPI row at the bottom. Built from stock components only — `B24Card` (forced into the `edge-dark` context with a purple radial gradient on the root slot), `B24Button` (`air-secondary-accent`), `B24Tooltip` and a small CSS grid for the rows. The highlighted row reuses the global `.style-filled-boost` utility so the boost token set (bg gradient, stroke, content color) drives that row's surface.

Drop it inside any popover (`B24Popover` content), a modal (`B24Modal` body — strip the modal chrome with `:b24ui="{ content: 'sm:max-w-md bg-transparent shadow-none border-0', body: 'p-0' }"` and `:close="false"`), or render it inline on a dashboard panel — the widget is self-contained.

```vue
<script setup lang="ts">
import RepeatIcon from '@bitrix24/b24icons-vue/outline/RepeatIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'

const rows = [
  { label: 'Active deals', count: 10, amount: '$46,500' },
  { label: 'Won deals', count: 1, amount: '$10,000' }
]

const highlight = {
  label: 'Conversion',
  count: '10%',
  amount: '17.7%',
  info: 'Today vs. last 30 days'
}
</script>

<template>
  <B24Card
    variant="filled-copilot"
    class="max-w-md"
    :b24ui="{
      root: 'edge-dark rounded-2xl bg-[radial-gradient(110.42%_110.42%_at_-10.42%_31.25%,var(--ui-color-copilot-bg-content-3)_0%,var(--ui-color-copilot-bg-content-2)_58.65%,var(--ui-color-copilot-bg-content-1)_100%)]'
    }"
  >
    <template #header>
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <div class="text-(length:--ui-font-size-2xl)/[normal] font-(--ui-font-weight-semi-bold)">Repeat sales dynamics</div>
          <div class="text-(length:--ui-font-size-md) opacity-90">Total deals created: 10</div>
          <div class="text-(length:--ui-font-size-md) opacity-90">Today: 10 deals</div>
        </div>

        <B24Button rounded color="air-secondary-accent" label="Last 30 days" :trailing-icon="RepeatIcon" />
      </div>
    </template>

    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-[1fr_auto_auto] gap-x-6 px-3 py-1 text-(length:--ui-font-size-sm) opacity-80">
        <span />
        <span class="text-right min-w-20">Count</span>
        <span class="text-right min-w-24">Amount</span>
      </div>

      <div
        v-for="row in rows"
        :key="row.label"
        class="grid grid-cols-[1fr_auto_auto] gap-x-6 items-center px-3 py-3 rounded-xl bg-white/5"
      >
        <span class="font-(--ui-font-weight-medium)">{{ row.label }}</span>
        <span class="text-right min-w-20">{{ row.count }}</span>
        <span class="text-right min-w-24">{{ row.amount }}</span>
      </div>

      <div class="style-filled-boost grid grid-cols-[1fr_auto_auto] gap-x-6 items-center px-3 py-3 rounded-xl text-(--ui-color-design-filled-boost-content)">
        <span class="font-(--ui-font-weight-medium) inline-flex items-center gap-1">
          {{ highlight.label }}
          <B24Tooltip :text="highlight.info">
            <Info1Icon class="size-4 opacity-80" />
          </B24Tooltip>
        </span>
        <span class="text-right min-w-20">{{ highlight.count }}</span>
        <span class="text-right min-w-24 font-(--ui-font-weight-semi-bold)">{{ highlight.amount }}</span>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <B24Button color="air-secondary-accent" :icon="SettingsIcon" label="Configure" />
        <B24Button color="air-secondary-accent" :icon="FeedbackIcon" label="Feedback" />
      </div>
    </template>
  </B24Card>
</template>
```

Notes on the layout:

- The card is pinned to `edge-dark` on the root slot so the `--ui-color-copilot-bg-content-*` tokens always resolve to the dark-theme purples, even when the surrounding page renders in light mode. Without `edge-dark`, those tokens are not defined and the gradient falls back to `unset`.
- The radial gradient on `b24ui.root` uses the same `110.42% 110.42% at -10.42% 31.25%` geometry as the boost gradient elsewhere in the design system, only with the purple `copilot-bg-content-{3,2,1}` stops (light → dark from top-left outward). Swap the stops for `--ui-color-design-filled-warning-bg-gradient-*` or another sibling trio to recolor the surface without changing the geometry.
- The highlighted KPI row uses the global `.style-filled-boost` utility from `008_ui_global.css`. The class wires up the boost background gradient (orange → pink → purple), the boost stroke and the boost content (text/icon) CSS vars. Apply `text-(--ui-color-design-filled-boost-content)` explicitly so the row's text picks up the boost content colour (the `.style-filled-boost` class only declares the var, it doesn't apply `color`).
- The non-highlighted rows sit on `bg-white/5` — a translucent overlay over the gradient. It keeps the rows readable without inventing new tokens.
- The grid template `1fr_auto_auto` keeps the metric label flexible while the two numeric columns stay right-aligned and proportional. For more than ~4 rows, consider `B24Table` instead — this pattern is for compact summaries, not data lists.
- The pill button in the header and the two footer buttons all use `color="air-secondary-accent"` for a consistent translucent action surface on the purple background. The pill picks up its rounded silhouette from `rounded`; pair `:trailing-icon` with a domain-appropriate icon (`RepeatIcon`, `Calendar1Icon`, `BarChartIcon`).
