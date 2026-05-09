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
      <div class="w-[280px] sm:w-xs p-md flex flex-col gap-md">
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
            <div class="font-(--ui-font-weight-semi-bold) truncate">ACME Corp.</div>
            <div class="text-sm text-(--ui-color-design-plain-a-content) truncate">12 contacts</div>
          </div>
        </div>

        <B24Button block color="air-secondary-no-accent" label="Open account" />

        <B24Separator />

        <B24DescriptionList
          size="sm"
          :items="items"
          :b24ui="{
            container: 'mt-0 sm:grid-cols-1',
            labelWrapper: 'border-t-0 sm:border-t-0 sm:py-0 sm:pt-3 first:pt-0 sm:first:pt-0',
            descriptionWrapper: 'sm:border-t-0 sm:py-0 sm:pt-1 sm:pb-3'
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

- The popover's content padding is reset with `:b24ui="{ content: 'p-0' }"` so the inner `flex flex-col gap-md` controls spacing — keeps the example free of header-border overrides.
- The avatar is recolored through its `:b24ui` slot using design tokens (`--ui-color-design-filled-alert-*`) — swap to `success`, `warning`, or `copilot` tokens to match the entity type.
- The fixed `w-[280px] sm:w-xs` keeps the card readable on mobile and a bit wider on `sm+`. Title and caption use `truncate` + `min-w-0` so long entity names don't break the layout.
- `B24DescriptionList` switches to a two-column grid at `sm:` by default and draws a top border before each item. Inside a narrow popover both behaviours hurt readability, so the layout is pinned to a single column and all `border-t` rules are zeroed out via the `b24ui` prop. The label/description paddings are also rolled back to mirror the mobile rhythm so a label and its value stay close together. The container's default `mt` and the first row's `pt` are zeroed (`mt-0`, `first:pt-0 sm:first:pt-0`) because the surrounding `flex flex-col gap-md` already supplies the spacing — without that the first label sits noticeably lower than the separator above it.
- The `#owner` slot would replace the whole `<dt>/<dd>` pair (and lose the "Account manager" label). Tagging the owner item with `slot: 'owner' as const` and overriding the global `#description` slot with a `v-if="item.slot === 'owner'"` keeps the default label rendering and only swaps the value for a `B24Link`. The `as const` + `satisfies DescriptionListItem[]` pattern is what lets `item.slot` narrow to the literal `'owner'` inside the template.

