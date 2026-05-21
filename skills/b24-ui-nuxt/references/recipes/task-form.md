# Task Form Layout

Responsive Bitrix24-style task form composed from standard `b24ui` components only.

## When to use

- Task or issue creation/editing screens in Bitrix24 apps
- Any form that combines a rich-text description, assignee fields, a date picker, and a wrap row of secondary actions
- Reference for composing `Editor`, `Card`, `Avatar`, `InputDate`, and `Button` into a non-trivial form layout without custom CSS

## Component tree

```
div.flex.flex-col.gap-4
├── B24Input (xl — task title)
└── div.flex.flex-col.lg:flex-row.gap-4.items-start
    ├── div.flex-1 (left column)
    │   ├── B24Card (b24ui.body='p-0')
    │   │   └── B24Editor (markdown, min-h-48)
    │   │       └── slot: div.flex.items-center (toolbar row)
    │   │           ├── B24Button (attachment icon)
    │   │           ├── B24EditorToolbar (mention, bulletList, orderedList)
    │   │           └── B24Button (expand icon, ml-auto)
    │   └── div.flex.flex-wrap.gap-2 (17 action buttons)
    │       └── B24Button × 17 (air-tertiary, sm, icon + label)
    └── div.lg:w-72.shrink-0 (right column)
        ├── B24Card (b24ui.body='p-0') — responsible persons
        │   └── div.divide-y
        │       ├── row: Постановщик — B24Avatar + name
        │       ├── row: Исполнитель — B24Avatar + name
        │       └── row: Крайний срок — B24InputDate (sm)
        └── B24Card — watchers
            ├── #header: label + B24Button (plus, xs)
            └── body: B24Avatar × n (air-secondary-* colors)
```

## Full example

```vue [components/TaskFormWidget.vue]
<script setup lang="ts">
import type { EditorToolbarItem } from '@bitrix24/b24ui-nuxt'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import MentionIcon from '@bitrix24/b24icons-vue/outline/MentionIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'
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
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'
import ClockIcon from '@bitrix24/b24icons-vue/outline/ClockIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'

const title = ref('Разработать новый интерфейс формы задачи')
const description = ref('')
const deadline = ref<Date | null>(null)

const toolbarItems = computed<EditorToolbarItem[][]>(() => [[
  { kind: 'mention' as const, icon: MentionIcon, tooltip: { text: 'Упомянуть' } },
  { kind: 'bulletList' as const, icon: BulletedListIcon, tooltip: { text: 'Маркированный список' } },
  { kind: 'orderedList' as const, icon: NumberedListIcon, tooltip: { text: 'Нумерованный список' } }
]])

const actionButtons = [
  { label: 'Результаты', icon: CircleCheckIcon },
  { label: 'Файлы', icon: FileUploadIcon },
  { label: 'Чеклисты', icon: TaskListIcon },
  { label: 'Проект', icon: FolderPlusIcon },
  { label: 'Соисполнители', icon: UserGroupIcon },
  { label: 'Наблюдатели', icon: NotificationIcon },
  { label: 'Поток', icon: BusinesProcessStagesIcon },
  { label: 'Теги', icon: PinIcon },
  { label: 'Напоминания', icon: BellIcon },
  { label: 'CRM-объекты', icon: ItemIcon },
  { label: 'Родительская задача', icon: ArrowTopLIcon },
  { label: 'Подзадачи', icon: ArrowDownLIcon },
  { label: 'Связанные задачи', icon: LinkIcon },
  { label: 'Гантт', icon: LayersIcon },
  { label: 'Планирование', icon: CalendarIcon },
  { label: 'Учёт времени', icon: ClockIcon },
  { label: 'Свои поля', icon: SettingsIcon }
]

const emit = defineEmits<{ save: [], cancel: [] }>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <B24Input v-model="title" placeholder="Название задачи" size="xl" />

    <div class="flex flex-col lg:flex-row gap-4 items-start">
      <!-- Left: editor + action buttons -->
      <div class="flex flex-col gap-4 flex-1 min-w-0">
        <B24Card :b24ui="{ body: 'p-0' }">
          <B24Editor
            v-slot="{ editor }"
            v-model="description"
            content-type="markdown"
            placeholder="Добавьте описание задачи..."
            :b24ui="{ base: 'min-h-48 px-4 py-3' }"
          >
            <div class="flex items-center gap-1 px-2 py-1.5 border-b border-(--ui-color-divider-default)">
              <B24Button :icon="FileUploadIcon" color="air-tertiary" variant="ghost" size="sm" />
              <B24EditorToolbar :editor="editor" :items="toolbarItems" />
              <div class="ml-auto">
                <B24Button :icon="Expand1Icon" color="air-tertiary" variant="ghost" size="sm" />
              </div>
            </div>
          </B24Editor>
        </B24Card>

        <div class="flex flex-wrap gap-2">
          <B24Button
            v-for="btn in actionButtons"
            :key="btn.label"
            :icon="btn.icon"
            :label="btn.label"
            color="air-tertiary"
            size="sm"
          />
        </div>
      </div>

      <!-- Right: responsible persons + watchers -->
      <div class="w-full lg:w-72 shrink-0 flex flex-col gap-4">
        <B24Card :b24ui="{ body: 'p-0' }">
          <div class="divide-y divide-(--ui-color-divider-default)">
            <div class="flex items-center gap-3 px-5 py-3">
              <span class="text-description text-sm w-28 shrink-0">Постановщик</span>
              <div class="flex items-center gap-2 min-w-0">
                <B24Avatar :icon="PersonIcon" color="air-secondary-accent-2" size="xs" />
                <span class="text-sm truncate">Игорь Шевчик</span>
              </div>
            </div>
            <div class="flex items-center gap-3 px-5 py-3">
              <span class="text-description text-sm w-28 shrink-0">Исполнитель</span>
              <div class="flex items-center gap-2 min-w-0">
                <B24Avatar :icon="PersonIcon" color="air-secondary-alert" size="xs" />
                <span class="text-sm truncate">Не назначен</span>
              </div>
            </div>
            <div class="flex items-center gap-3 px-5 py-3">
              <span class="text-description text-sm w-28 shrink-0">Крайний срок</span>
              <B24InputDate
                v-model="deadline"
                placeholder="Установить срок"
                size="sm"
                class="flex-1"
              />
            </div>
          </div>
        </B24Card>

        <B24Card>
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-sm font-(--ui-font-weight-medium)">Наблюдатели</span>
              <B24Button :icon="PlusLIcon" color="air-tertiary" variant="ghost" size="xs" />
            </div>
          </template>
          <div class="flex flex-wrap gap-2">
            <B24Avatar :icon="PersonIcon" color="air-secondary-accent-2" size="xs" />
            <B24Avatar :icon="PersonIcon" color="air-secondary-alert" size="xs" />
            <B24Avatar :icon="PersonIcon" color="air-secondary" size="xs" />
          </div>
        </B24Card>
      </div>
    </div>

    <div class="flex gap-2 justify-end">
      <B24Button label="Сохранить" color="air-primary" @click="emit('save')" />
      <B24Button label="Отмена" color="air-tertiary" @click="emit('cancel')" />
    </div>
  </div>
</template>
```

## Page wrapper

```vue [pages/examples/task-form.vue]
<template>
  <PlaygroundPage>
    <TaskFormWidget class="w-full max-w-5xl mx-auto p-4 lg:p-6" />
  </PlaygroundPage>
</template>
```

## Navigation entry

Add to `useNavigation.ts` in your playground:

```typescript
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'

const examples = [
  'task-form'
].map(example => ({
  label: upperName(example.split('/').pop() as string),
  icon: TaskIcon,
  to: `/examples/${example}`
}))

// In groups computed:
{ id: 'examples', label: 'Examples', items: examples }
```

## Key patterns

### Editor with custom toolbar row

Place a `div` as the first child of `B24Editor`'s default slot to render a persistent toolbar above the content area. The slot renders before `EditorContent` in the component tree, so the toolbar naturally sits on top.

```vue
<B24Editor v-slot="{ editor }" v-model="content">
  <div class="flex items-center gap-1 px-2 py-1.5 border-b border-(--ui-color-divider-default)">
    <!-- Custom action buttons (not TipTap-aware) -->
    <B24Button :icon="FileUploadIcon" color="air-tertiary" variant="ghost" size="sm" />
    <!-- TipTap-connected toolbar items -->
    <B24EditorToolbar :editor="editor" :items="toolbarItems" />
    <!-- Right-side controls -->
    <div class="ml-auto">
      <B24Button :icon="Expand1Icon" color="air-tertiary" variant="ghost" size="sm" />
    </div>
  </div>
</B24Editor>
```

### Zero-padding card with divided rows

Use `b24ui.body = 'p-0'` to remove the card's default padding, then control spacing per-row. This lets dividers extend edge-to-edge while each row manages its own horizontal/vertical padding.

```vue
<B24Card :b24ui="{ body: 'p-0' }">
  <div class="divide-y divide-(--ui-color-divider-default)">
    <div class="flex items-center gap-3 px-5 py-3">...</div>
    <div class="flex items-center gap-3 px-5 py-3">...</div>
  </div>
</B24Card>
```

### Responsive two-column layout

`flex-col` on mobile, `flex-row` on `lg+`. The left column grows (`flex-1 min-w-0`) and the right column is fixed-width (`lg:w-72 shrink-0`).

```vue
<div class="flex flex-col lg:flex-row gap-4 items-start">
  <div class="flex-1 min-w-0">...</div>
  <div class="lg:w-72 shrink-0">...</div>
</div>
```

### Wrapping action buttons

A `flex flex-wrap gap-2` container wraps `B24Button` items automatically at any screen width. Each button uses `color="air-tertiary"` and `size="sm"` to keep visual weight low.

```vue
<div class="flex flex-wrap gap-2">
  <B24Button
    v-for="btn in actionButtons"
    :key="btn.label"
    :icon="btn.icon"
    :label="btn.label"
    color="air-tertiary"
    size="sm"
  />
</div>
```

## Common mistakes

- Using `sticky top-0` on `B24EditorToolbar` — unnecessary here since the form editor is not full-height; just let the toolbar sit as a normal flow element inside the card
- Giving `B24Card` a custom header via both `title` prop and `#header` slot at the same time — use only one; prefer `#header` when you need flex layout in the header
- Forgetting `min-w-0` on the flex-1 left column — without it, long words in the editor won't wrap and will overflow the layout on narrow screens
