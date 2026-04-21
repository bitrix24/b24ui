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

