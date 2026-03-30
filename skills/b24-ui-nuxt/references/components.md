# Components

125+ Vue components powered by Tailwind CSS and Reka UI. For any component's theme slots, read the generated theme file (Nuxt: `.nuxt/b24ui/<component>.ts`, Vue: `node_modules/.b24ui-nuxt/b24ui/<component>.ts`).

## Layout

Core structural components for organizing your application's layout.

| Component | Purpose |
|---|---|
| `B24App` | **Required** root wrapper for toasts, tooltips, overlays |
| `B24Header` | Responsive header with mobile menu (`#title`, `#default`, `#right`, `#body`) |
| `B24Footer` | Footer (`#left`, `#default`, `#right`, `#top`, `#bottom`) |
| `B24FooterColumns` | Multi-column footer with link groups |
| `B24Main` | Main content area (respects `--b24ui-header-height`) |
| `B24Container` | Centered max-width container (`--b24ui-container-width`) |

## Element

Essential UI building blocks.

| Component | Key props |
|---|---|
| `B24Button` | `label`, `icon`, `color`, `size`, `loading`, `disabled`, `to` |
| `B24Badge` | `label`, `color`, `size` |
| `B24Avatar` | `src`, `alt`, `icon`, `text`, `size` |
| `B24AvatarGroup` | `max`, `size` — wraps multiple `B24Avatar` |
| `B24Icon` | `name`, `size` |
| `B24Card` | `variant` — slots: `#header`, `#default`, `#footer` |
| `B24Alert` | `title`, `description`, `icon`, `color`, `close` |
| `B24Banner` | `title`, `icon`, `close` — sticky top banner |
| `B24Chip` | `color`, `size`, `position` — notification dot on children |
| `B24Kbd` | `value` — keyboard key display |
| `B24Separator` | `label`, `icon`, `orientation`, `type` |
| `B24Skeleton` | `class` — loading placeholder |
| `B24Progress` | `value`, `max`, `color`, `size` |
| `B24Calendar` | `v-model`, `range` (boolean), `multiple` (boolean) |
| `B24Collapsible` | `v-model:open` — animated expand/collapse |
| `B24FieldGroup` | Groups form inputs horizontally/vertically |

## Form

Comprehensive form components for user input.

| Component | Key props |
|---|---|
| `B24Input` | `v-model`, `type`, `placeholder`, `icon`, `loading` |
| `B24Textarea` | `v-model`, `rows`, `autoresize`, `maxrows` |
| `B24Select` | `v-model`, `items` (flat `T[]` or grouped `T[][]`), `placeholder` |
| `B24SelectMenu` | `v-model`, `items` (flat `T[]` or grouped `T[][]`), `searchable`, `multiple` |
| `B24InputMenu` | `v-model`, `items` (flat `T[]` or grouped `T[][]`), `searchable` — autocomplete |
| `B24InputNumber` | `v-model`, `min`, `max`, `step` |
| `B24InputDate` | `v-model`, `range` (boolean for range selection), `locale` |
| `B24InputTime` | `v-model`, `hour-cycle` (12/24), `granularity` |
| `B24InputTags` | `v-model`, `max`, `placeholder` |
| `B24PinInput` | `v-model`, `length`, `type`, `mask` |
| `B24Checkbox` | `v-model`, `label`, `description` |
| `B24CheckboxGroup` | `v-model`, `items`, `orientation` |
| `B24RadioGroup` | `v-model`, `items`, `orientation` |
| `B24Switch` | `v-model`, `label`, `checked-icon`, `unchecked-icon` |
| `B24Range` | `v-model`, `min`, `max`, `step` |
| `B24ColorPicker` | `v-model`, `format` (hex/rgb/hsl/cmyk/lab), `size` |
| `B24FileUpload` | `v-model`, `accept`, `multiple`, `variant` (area/button) |
| `B24Form` | `schema`, `state`, `@submit` — validation wrapper |
| `B24FormField` | `name`, `label`, `description`, `hint`, `required` |

### Form validation

Uses Standard Schema — works with Zod, Valibot, Yup, or Joi.

```vue
<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters')
})

type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({ email: '', password: '' })
const form = ref()

async function onSubmit() {
  await form.value.validate()
}
</script>

<template>
  <B24Form ref="form" :schema="schema" :state="state" @submit="onSubmit">
    <B24FormField name="email" label="Email" required>
      <B24Input v-model="state.email" type="email" />
    </B24FormField>

    <B24FormField name="password" label="Password" required>
      <B24Input v-model="state.password" type="password" />
    </B24FormField>

    <B24Button color="air-primary" type="submit">Submit</B24Button>
  </B24Form>
</template>
```

With Valibot:

```vue
<script setup lang="ts">
import * as v from 'valibot'

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Min 8 characters'))
})
</script>
```

### File upload

```vue
<script setup>
import UploadIcon from '@bitrix24/b24icons-vue/outline/UploadIcon'

const files = ref<File[]>([])
</script>

<template>
  <B24FileUpload v-model="files" accept="image/*" multiple>
    <template #actions="{ open }">
      <B24Button label="Upload" :icon="UploadIcon" @click="open()" />
    </template>
  </B24FileUpload>
</template>
```

## Data

Components for displaying and organizing data.

| Component | Key props |
|---|---|
| `B24Table` | `data`, `columns`, `loading`, `sticky` |
| `B24Accordion` | `items`, `type` (single/multiple), `collapsible` |
| `B24Timeline` | `items` — vertical timeline |
| `B24User` | `name`, `description`, `avatar` — user display |
| `B24Empty` | `icon`, `title`, `description` — empty state |
| `B24ScrollArea` | Custom scrollbar wrapper |

## Navigation

Components for user navigation and wayfinding.

| Component | Key props |
|---|---|
| `B24NavigationMenu` | `items` (flat `T[]` or grouped `T[][]`), `orientation` (horizontal/vertical) |
| `B24Breadcrumb` | `items` |
| `B24Tabs` | `items` |
| `B24Stepper` | `items`, `orientation`, `color` |
| `B24Pagination` | `v-model`, `total`, `items-per-page` |
| `B24Link` | `to`, `active`, `inactive` — styled NuxtLink |
| `B24CommandPalette` | `v-model:open`, `groups` (`{ id, label, items }[]`), `placeholder` |

## Overlay

Floating UI elements that appear above the main content. **All require `<B24App>` wrapper.**

| Component | Key props |
|---|---|
| `B24Modal` | `v-model:open`, `title`, `description`, `fullscreen`, `scrollable` |
| `B24Slideover` | `v-model:open`, `title`, `side` (left/right/top/bottom) |
| `B24Drawer` | `v-model:open`, `title`, `handle` |
| `B24Popover` | `arrow`, `content: { side, align }`, `openDelay`, `closeDelay` |
| `B24Tooltip` | `text`, `content: { side }`, `delayDuration` |
| `B24DropdownMenu` | `items` (flat `T[]` or grouped `T[][]` with separators, supports nested `children`) |
| `B24ContextMenu` | `items` (flat `T[]` or grouped `T[][]`) — right-click menu |
| `B24Toast` | Used via `B24seToast()` composable |

### Modal

```vue
<B24Modal v-model:open="isOpen" title="Edit" description="Edit your profile">
  <template #body>Content</template>
  <template #footer>
    <B24Button
      size="lg"
      color="air-primary"
      label="Save"
      loading-auto
      @click="save"
    />
    <B24Button
      size="sm"
      color="air-tertiary"
      label="Cancel"
      :normal-case="false"
      @click="isOpen = false"
    />
  </template>
</B24Modal>
```

Slots: `#content`, `#header`, `#body`, `#footer`

### Slideover

```vue
<B24Slideover v-model:open="isOpen" title="Settings" side="right">
  <template #body>Content</template>
</B24Slideover>
```

### Drawer

```vue
<B24Drawer v-model:open="isOpen" title="Options" handle>
  <template #body>Content</template>
</B24Drawer>
```

### DropdownMenu

Items accept a flat array or a nested array (each sub-array is rendered as a group separated by dividers):

```vue
<script setup lang="ts">
import MoreLIcon from '@bitrix24/b24icons-vue/outline/MoreLIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
</script>

<template>
  <!-- Flat array -->
  <B24DropdownMenu
    :items="[
      { label: 'Edit', icon: PersonIcon, onSelect: () => edit() },
      { type: 'separator' },
      { label: 'Delete', icon: TrashcanIcon, color: 'air-primary-alert' }
    ]"
    :content="{ side: 'bottom', align: 'end' }"
  >
    <B24Button :icon="MoreLIcon" color="air-secondary-accent" />
  </B24DropdownMenu>
</template>
```

```vue
<script setup lang="ts">
import MoreLIcon from '@bitrix24/b24icons-vue/outline/MoreLIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import CopyIcon from '@bitrix24/b24icons-vue/outline/CopyIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
</script>

<template>
  <!-- Nested array (groups with automatic separators) -->
  <B24DropdownMenu
    :items="[
      [{ label: 'Edit', icon: PersonIcon, onSelect: () => edit() }, { label: 'Duplicate', icon: CopyIcon }],
      [{ label: 'Delete', icon: TrashcanIcon, color: 'air-primary-alert' }]
    ]"
    :content="{ side: 'bottom', align: 'end' }"
  >
    <B24Button :icon="MoreLIcon" color="air-secondary-accent" />
  </B24DropdownMenu>
</template>
```

### Toast

```ts
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'

const toast = useToast()

toast.add({
  title: 'Success',
  description: 'Changes saved',
  color: 'air-primary-success',
  icon: CircleCheckIcon,
  duration: 5000,
  actions: [{ label: 'Undo', onClick: () => undo() }]
})
```

### Programmatic overlays

```ts
const overlay = useOverlay()

// create() returns a reusable instance
const confirmDialog = overlay.create(ConfirmDialog)

// open() returns an object with .result (a Promise)
const { result } = confirmDialog.open({
  title: 'Delete?',
  message: 'This cannot be undone.'
})

if (await result) {
  // User confirmed
}

// Inside the overlay component, emit close with a value:
// emit('close', true) or emit('close', false)
```

### CommandPalette

```vue
<script setup>
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'

const groups = [{
  id: 'actions',
  label: 'Actions',
  items: [
    { label: 'New file', icon: PlusLIcon, onSelect: () => {} },
    { label: 'Settings', to: '/settings' }
  ]
}]

defineShortcuts({ meta_k: () => { isOpen.value = true } })
</script>

<B24CommandPalette v-model:open="isOpen" :groups="groups" placeholder="Search..." />
```

## Page

Pre-built sections for marketing and content pages.

| Component | Purpose |
|---|---|
| `B24Page` | Multi-column grid (`#left`, `#default`, `#right`) |
| `B24PageAside` | Sticky sidebar wrapper (visible from `lg`) |
| `B24PageSection` | Content section with headline, features grid |
| `B24PageHeader` | Page title and description |
| `B24PageBody` | Main content area with prose styling |
| `B24PageFeature` | Individual feature item |
| `B24PageGrid` | Grid layout for cards |
| `B24PageColumns` | Multi-column layout |
| `B24PageCard` | Content card for grids |
| `B24PageLinks` | Related resource links |
| `B24PageList` | List items |

## Dashboard

Specialized components for admin interfaces with resizable panels and sidebars.

| Component | Purpose |
|---|---|
| `B24DashboardGroup` | Root wrapper — manages sidebar state |
| `B24DashboardSidebar` | Resizable/collapsible sidebar (`#header`, `#default`, `#footer`) |
| `B24DashboardPanel` | Content panel (`#header`, `#body`, `#footer`) |
| `B24DashboardNavbar` | Panel navbar (`#left`, `#default`, `#right`) |
| `B24DashboardToolbar` | Toolbar for filters/actions |
| `B24DashboardSearch` | Command palette for dashboards |
| `B24DashboardSearchButton` | Search trigger button |
| `B24DashboardSidebarToggle` | Mobile sidebar toggle |
| `B24DashboardSidebarCollapse` | Desktop collapse button |
| `B24DashboardResizeHandle` | Custom resize handle |

## Chat

Components for conversational AI interfaces, powered by [Vercel AI SDK](https://ai-sdk.dev/).

| Component | Purpose |
|---|---|
| `B24ChatMessages` | Scrollable message list with auto-scroll |
| `B24ChatMessage` | Individual message display |
| `B24ChatPrompt` | Enhanced textarea for prompts |
| `B24ChatPromptSubmit` | Submit button with status handling |
| `B24ChatPalette` | Chat layout for overlays |

## Editor

Rich text editor powered by [TipTap](https://tiptap.dev/).

| Component | Purpose |
|---|---|
| `B24Editor` | Editor (`v-model`, `content-type`: json/html/markdown) |
| `B24EditorToolbar` | Toolbar (`layout`: fixed/bubble/floating) |
| `B24EditorDragHandle` | Block drag-and-drop |
| `B24EditorSuggestionMenu` | Slash command menu |
| `B24EditorMentionMenu` | @ mention menu |
| `B24EditorEmojiMenu` | Emoji picker |

## Content

Components integrating with `@nuxt/content`.

| Component | Purpose |
|---|---|
| `B24ContentToc` | Table of contents |
| `B24ContentSurround` | Prev/next links |
| `B24ContentSearch` | Search command palette |
| `B24ContentSearchButton` | Search trigger button |

## Color Mode

| Component | Purpose |
|---|---|
| `B24ColorModeButton` | Toggle light/dark button |
| `B24ColorModeSwitch` | Toggle light/dark switch |
| `B24ColorModeSelect` | Dropdown selector |
| `B24ColorModeAvatar` | Avatar with different src per mode |
| `B24ColorModeImage` | Image with different src per mode |
