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

## Stats widget (KPI summary)

A compact dashboard widget summarising a few metrics with one highlighted KPI row at the bottom. Built from stock components only — `B24Card` (with the `filled-copilot` variant for the purple accent), `B24Button`, `B24Tooltip` and a small CSS grid for the rows. No custom CSS beyond a couple of `bg-white/5` / `bg-white/15` overlays for row contrast over the filled card.

Use this whenever a dashboard panel needs to show "totals + a few comparison rows" without a full table or chart.

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
  <B24Card variant="filled-copilot" class="max-w-md" :b24ui="{ root: 'rounded-2xl' }">
    <template #header>
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <div class="text-(length:--ui-font-size-2xl)/[normal] font-(--ui-font-weight-semi-bold)">Repeat sales dynamics</div>
          <div class="text-(length:--ui-font-size-md) opacity-90">Total deals created: 10</div>
          <div class="text-(length:--ui-font-size-md) opacity-90">Today: 10 deals</div>
        </div>

        <B24Button rounded color="air-tertiary-no-accent" label="Last 30 days" :trailing-icon="RepeatIcon" />
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

      <div class="grid grid-cols-[1fr_auto_auto] gap-x-6 items-center px-3 py-3 rounded-xl bg-white/15 ring-1 ring-white/20">
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
        <B24Button color="air-tertiary-no-accent" :icon="SettingsIcon" label="Configure" />
        <B24Button color="air-tertiary-no-accent" :icon="FeedbackIcon" label="Feedback" />
      </div>
    </template>
  </B24Card>
</template>
```

Notes on the layout:

- The `filled-copilot` variant gives the purple accent surface — swap to `filled` / `filled-success` / `filled-warning` to match different KPI tones (revenue, growth, churn).
- `bg-white/5` and `bg-white/15` are translucent overlays over the filled card; they keep the rows readable across light/dark modes without inventing new tokens.
- The grid template `1fr_auto_auto` keeps the metric label flexible while the two numeric columns stay right-aligned and proportional.
- For more than ~4 rows, consider `B24Table` instead — this pattern is for compact summaries, not data lists.
- The pill button in the header is a regular `B24Button` with `rounded` and `air-tertiary-no-accent`; pair `:trailing-icon` with a domain-appropriate icon (`RepeatIcon`, `Calendar1Icon`, `BarChartIcon`).

