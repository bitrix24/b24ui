# Task Form Layout

Bitrix24-style task form composed from standard `b24ui` components only — single column, no custom CSS beyond component props.

## When to use

- Task or issue creation/editing screens in Bitrix24 apps
- Any form that combines a rich-text description, assignee fields, a date picker, and a wrap row of secondary actions
- Reference for composing `Editor`, `Card`, `Avatar`, `InputDate`, `Calendar`, `Popover`, and `Button` into a non-trivial form layout without custom CSS

## Component tree

```
div.flex.flex-col.gap-4.p-4.w-full
├── B24Input (xl, no-border — task title, semi-bold)
├── B24Card (b24ui.body='p-0') — editor
│   └── B24Editor (markdown, min-h-48 px-4 py-3)
│       └── slot: div.flex.items-center.gap-1 (toolbar row)
│           ├── B24Button (FileUploadIcon, ghost, sm — attach file)
│           ├── B24EditorToolbar (mention, bulletList, orderedList)
│           └── B24Button (GoToLIcon, ghost, sm, ml-auto — expand)
├── B24Card (b24ui.body='p-0') — responsible persons
│   └── div.divide-y
│       ├── row: Creator — B24Avatar + name
│       ├── row: Assignee — B24Avatar + name
│       └── row: Deadline — B24InputDate (sm, no-border, flex-1)
│           └── #trailing: B24Popover(:reference=inputsRef[3].$el)
│               ├── trigger: B24Button (CalendarIcon)
│               └── #content: B24Calendar (v-model=deadline)
├── B24Card — watchers
│   ├── #header: label + B24Button (PlusLIcon, xs — add watcher)
│   └── body: B24Avatar × n (air-secondary-* colors)
├── div.flex.flex-wrap.gap-2 — action buttons
│   └── B24Button × 17 (sm, active→air-secondary-accent-2, inactive→air-secondary-no-accent)
└── div.flex.gap-2.justify-end — footer
    ├── B24Button (Save, air-primary)
    └── B24Button (Cancel, air-tertiary)
```

## Full example

```vue [components/TaskFormWidget.vue]
<script setup lang="ts">
import type { EditorToolbarItem, IconComponent } from '@bitrix24/b24ui-nuxt'
import { CalendarDate } from '@internationalized/date'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
import GoToLIcon from '@bitrix24/b24icons-vue/outline/GoToLIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import MentionIcon from '@bitrix24/b24icons-vue/outline/MentionIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import TaskListIcon from '@bitrix24/b24icons-vue/outline/TaskListIcon'
import FolderPlusIcon from '@bitrix24/b24icons-vue/outline/FolderPlusIcon'
import UserGroupIcon from '@bitrix24/b24icons-vue/common-b24/UserGroupIcon'
import NotificationIcon from '@bitrix24/b24icons-vue/outline/NotificationIcon'
import BusinesProcessStagesIcon from '@bitrix24/b24icons-vue/outline/BusinesProcessStagesIcon'
import PinIcon from '@bitrix24/b24icons-vue/outline/PinIcon'
import BellIcon from '@bitrix24/b24icons-vue/main/BellIcon'
import ItemIcon from '@bitrix24/b24icons-vue/crm/ItemIcon'
import ArrowTopLIcon from '@bitrix24/b24icons-vue/outline/ArrowTopLIcon'
import ArrowDownLIcon from '@bitrix24/b24icons-vue/outline/ArrowDownLIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import LayersIcon from '@bitrix24/b24icons-vue/outline/LayersIcon'
import ClockIcon from '@bitrix24/b24icons-vue/outline/ClockIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'

const title = ref('Design the new task form interface')
const description = ref('')
// B24InputDate uses @internationalized/date values (DateValue), not a native Date
const deadline = shallowRef<CalendarDate | undefined>(new CalendarDate(2026, 6, 30))
const deadlineInput = useTemplateRef('deadlineInput')

// Static list — no reactive deps, so a plain const (not computed)
const toolbarItems: EditorToolbarItem[][] = [[
  { kind: 'mention', icon: MentionIcon, tooltip: { text: 'Mention' } },
  { kind: 'bulletList', icon: BulletedListIcon, tooltip: { text: 'Bullet list' } },
  { kind: 'orderedList', icon: NumberedListIcon, tooltip: { text: 'Numbered list' } }
]]

// active flag drives button color: air-secondary-accent-2 vs air-secondary-no-accent
const actionButtons: { label: string, icon: IconComponent, active?: boolean }[] = [
  { label: 'Results', icon: CircleCheckIcon, active: true },
  { label: 'Files', icon: FileUploadIcon, active: true },
  { label: 'Checklists', icon: TaskListIcon },
  { label: 'Project', icon: FolderPlusIcon },
  { label: 'Co-executors', icon: UserGroupIcon },
  { label: 'Observers', icon: NotificationIcon },
  { label: 'Flow', icon: BusinesProcessStagesIcon },
  { label: 'Tags', icon: PinIcon, active: true },
  { label: 'Reminders', icon: BellIcon },
  { label: 'CRM elements', icon: ItemIcon },
  { label: 'Parent task', icon: ArrowTopLIcon },
  { label: 'Subtasks', icon: ArrowDownLIcon },
  { label: 'Linked tasks', icon: LinkIcon },
  { label: 'Gantt', icon: LayersIcon },
  { label: 'Timeline planning', icon: CalendarIcon },
  { label: 'Time tracking', icon: ClockIcon },
  { label: 'Custom fields', icon: SettingsIcon }
]
</script>

<template>
  <div class="flex flex-col gap-4 p-4 w-full">
    <B24Input
      v-model="title"
      placeholder="Task name"
      size="xl"
      no-border
      :b24ui="{ base: 'font-(--ui-font-weight-semi-bold)' }"
    />

    <B24Card :b24ui="{ body: 'p-0' }">
      <B24Editor
        v-slot="{ editor }"
        v-model="description"
        content-type="markdown"
        placeholder="Add a task description..."
        :b24ui="{ base: 'min-h-48 px-4 py-3' }"
      >
        <div class="flex items-center gap-1 px-2 py-1.5 border-b border-(--ui-color-divider-default)">
          <B24Button :icon="FileUploadIcon" color="air-tertiary" variant="ghost" size="sm" aria-label="Attach file" />
          <B24EditorToolbar :editor="editor" :items="toolbarItems" />
          <div class="ml-auto">
            <B24Button :icon="GoToLIcon" color="air-tertiary" variant="ghost" size="sm" aria-label="Expand editor" />
          </div>
        </div>
      </B24Editor>
    </B24Card>

    <B24Card :b24ui="{ body: 'p-0' }">
      <div class="divide-y divide-(--ui-color-divider-default)">
        <div class="flex items-center gap-3 px-5 py-3">
          <span class="text-description text-sm w-28 shrink-0">Creator</span>
          <div class="flex items-center gap-2 min-w-0">
            <B24Avatar :icon="PersonIcon" color="air-secondary-accent-2" size="xs" />
            <span class="text-sm truncate">Jane Cooper</span>
          </div>
        </div>
        <div class="flex items-center gap-3 px-5 py-3">
          <span class="text-description text-sm w-28 shrink-0">Assignee</span>
          <div class="flex items-center gap-2 min-w-0">
            <B24Avatar :icon="PersonIcon" color="air-secondary-alert" size="xs" />
            <span class="text-sm truncate">Unassigned</span>
          </div>
        </div>
        <div class="flex items-center gap-3 px-5 py-3">
          <span class="text-description text-sm w-28 shrink-0">Deadline</span>
          <B24InputDate ref="deadlineInput" v-model="deadline" size="sm" no-border class="flex-1">
            <template #trailing>
              <B24Popover :reference="deadlineInput?.inputsRef[3]?.$el">
                <B24Button
                  color="air-tertiary-no-accent"
                  size="sm"
                  :icon="CalendarIcon"
                  aria-label="Pick a date"
                  class="px-0"
                />
                <template #content>
                  <B24Calendar v-model="deadline" class="p-2" />
                </template>
              </B24Popover>
            </template>
          </B24InputDate>
        </div>
      </div>
    </B24Card>

    <B24Card>
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-sm font-(--ui-font-weight-medium)">Watchers</span>
          <B24Button :icon="PlusLIcon" color="air-tertiary" variant="ghost" size="xs" aria-label="Add watcher" />
        </div>
      </template>
      <div class="flex flex-wrap gap-2">
        <B24Avatar :icon="PersonIcon" color="air-secondary-accent-2" size="xs" />
        <B24Avatar :icon="PersonIcon" color="air-secondary-alert" size="xs" />
        <B24Avatar :icon="PersonIcon" color="air-secondary" size="xs" />
      </div>
    </B24Card>

    <div class="flex flex-wrap gap-2">
      <B24Button
        v-for="btn in actionButtons"
        :key="btn.label"
        :icon="btn.icon"
        :label="btn.label"
        :color="btn.active ? 'air-secondary-accent-2' : 'air-secondary-no-accent'"
        :aria-pressed="btn.active ? 'true' : 'false'"
        size="sm"
      />
    </div>

    <div class="flex gap-2 justify-end">
      <B24Button label="Save" color="air-primary" />
      <B24Button label="Cancel" color="air-tertiary" />
    </div>
  </div>
</template>
```

## Key patterns

### Editor with custom toolbar row

Place a `div` as the first child of `B24Editor`'s default slot to render a persistent toolbar above the content area. The slot renders before `EditorContent` in the component tree, so the toolbar naturally sits on top. Mix TipTap-aware items (`B24EditorToolbar`) with plain `B24Button` controls (attachment, expand) that are not editor commands.

```vue
<B24Editor v-slot="{ editor }" v-model="content">
  <div class="flex items-center gap-1 px-2 py-1.5 border-b border-(--ui-color-divider-default)">
    <B24Button :icon="FileUploadIcon" color="air-tertiary" variant="ghost" size="sm" aria-label="Attach file" />
    <B24EditorToolbar :editor="editor" :items="toolbarItems" />
    <div class="ml-auto">
      <B24Button :icon="GoToLIcon" color="air-tertiary" variant="ghost" size="sm" aria-label="Expand editor" />
    </div>
  </div>
</B24Editor>
```

### Zero-padding card with divided rows

Use `b24ui.body = 'p-0'` to remove the card's default padding, then control spacing per-row. Dividers extend edge-to-edge while each row manages its own padding.

```vue
<B24Card :b24ui="{ body: 'p-0' }">
  <div class="divide-y divide-(--ui-color-divider-default)">
    <div class="flex items-center gap-3 px-5 py-3">...</div>
    <div class="flex items-center gap-3 px-5 py-3">...</div>
  </div>
</B24Card>
```

### Borderless fields inside cards

`B24Input` and `B24InputDate` both accept a `no-border` prop. Use it for the task title (a clean heading without a box) and for fields embedded inside a `p-0` card so they don't fight the card chrome.

```vue
<B24Input v-model="title" size="xl" no-border />
<B24InputDate v-model="deadline" size="sm" no-border class="flex-1" />
```

### Date picker with dropdown calendar

Attach a `B24Calendar` in the `#trailing` slot of `B24InputDate` inside a `B24Popover`. Both share the same `v-model`. The popover anchors to the last input segment via `inputsRef[3]?.$el` (established pattern, matches `FormExampleEditSection`).

```vue
<B24InputDate ref="deadlineInput" v-model="deadline" size="sm" no-border>
  <template #trailing>
    <B24Popover :reference="deadlineInput?.inputsRef[3]?.$el">
      <B24Button color="air-tertiary-no-accent" size="sm" :icon="CalendarIcon" aria-label="Pick a date" class="px-0" />
      <template #content>
        <B24Calendar v-model="deadline" class="p-2" />
      </template>
    </B24Popover>
  </template>
</B24InputDate>
```

### Active/inactive action buttons

Add an `active?: boolean` flag to each item. Drive the `color` prop dynamically. Add `aria-pressed` so screen readers can distinguish active items from inactive ones.

```vue
<B24Button
  v-for="btn in actionButtons"
  :key="btn.label"
  :icon="btn.icon"
  :label="btn.label"
  :color="btn.active ? 'air-secondary-accent-2' : 'air-secondary-no-accent'"
  :aria-pressed="btn.active ? 'true' : 'false'"
  size="sm"
/>
```

### Wrapping action buttons

A `flex flex-wrap gap-2` container wraps `B24Button` items automatically at any screen width. Type the data array with `IconComponent` so the icon prop is checked at compile time.

```vue
<div class="flex flex-wrap gap-2">
  <B24Button
    v-for="btn in actionButtons"
    :key="btn.label"
    :icon="btn.icon"
    :label="btn.label"
    :color="btn.active ? 'air-secondary-accent-2' : 'air-secondary-no-accent'"
    size="sm"
  />
</div>
```

## Common mistakes

- Declaring a static toolbar array as `computed` — it has no reactive dependencies, so a plain `const toolbarItems: EditorToolbarItem[][]` is correct and cheaper
- Passing a native `Date` to `B24InputDate` — the component uses `@internationalized/date` values (`CalendarDate`/`DateValue`), not native `Date`. Use `shallowRef<CalendarDate | undefined>`
- Omitting `useTemplateRef` for the deadline input — `B24Popover` needs `:reference` to anchor correctly; without it the popover may appear in an unexpected position
- Giving `B24Card` a header via both the `title` prop and the `#header` slot at the same time — use only one; prefer `#header` when you need flex layout in the header
- Forgetting `aria-pressed` on toggle-style action buttons — without it screen readers cannot distinguish active from inactive state
