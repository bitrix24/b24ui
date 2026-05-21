# Detail Panel (Info Sidebar)

Composes a Bitrix24-style entity detail side panel from standard components.
Use when building info sidebars that display entity metadata, settings, and content sections alongside a main view.

## When to use this pattern

- Chat channel / group info sidebar (members, sound settings, media, tasks)
- CRM record detail panel (contact info, activity, linked deals)
- Any "about this item" sidebar with togglable settings and grouped content sections

## Key decisions

| Need | Solution |
|---|---|
| Square channel/entity avatar | `B24Avatar` with `:b24ui="{ root: 'rounded-xl' }"` overrides `rounded-full` |
| Members row with overflow | `B24AvatarGroup :max="N"` — add one extra child to show the `+1` counter |
| Toggle + icon row (a11y) | `B24Switch label="..."` + `b24ui` override for icon-left layout |
| Numeric counter badge | `B24Badge square` on the right of an info row |
| Section empty state | `B24Empty color="air-tertiary" :b24ui="{ root: 'ring-0 rounded-none' }"` |
| Section dividers | `divide-y divide-default` on the `B24Card` body via `b24ui` prop |

## Full example

```vue
<script setup lang="ts">
import BellIcon from '@bitrix24/b24icons-vue/main/BellIcon'
import ClockIcon from '@bitrix24/b24icons-vue/outline/ClockIcon'
import UserGroupIcon from '@bitrix24/b24icons-vue/common-b24/UserGroupIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'
import TaskListIcon from '@bitrix24/b24icons-vue/outline/TaskListIcon'
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'
import PersonPlus2Icon from '@bitrix24/b24icons-vue/crm/PersonPlus2Icon'

const soundEnabled = ref(true)
const autoDeleteEnabled = ref(false)
</script>

<template>
  <!-- max-w-xs (320px) is typical for a collapsed detail sidebar -->
  <B24Card
    class="w-full max-w-xs overflow-hidden"
    :b24ui="{ body: 'p-0 flex flex-col gap-0 divide-y divide-default' }"
  >
    <!-- Header: square avatar + name + member group -->
    <div class="flex flex-col items-center gap-3 px-4 py-6 text-center">
      <B24Avatar
        src="/avatar/channel.png"
        alt="Sales Department"
        size="3xl"
        :b24ui="{ root: 'rounded-xl' }"
      />
      <div>
        <p class="font-semibold text-label">Sales Department</p>
        <p class="text-description text-sm">Channel</p>
      </div>

      <!-- :max="4" with 5 children intentionally shows the +1 overflow counter -->
      <div class="flex items-center gap-2">
        <B24AvatarGroup :max="4" size="xs">
          <B24Avatar src="/avatar/user1.png" alt="John Doe" />
          <B24Avatar src="/avatar/user2.png" alt="Jane Smith" />
          <B24Avatar src="/avatar/user3.png" alt="Bob Johnson" />
          <B24Avatar src="/avatar/user4.png" alt="Alice Brown" />
          <B24Avatar alt="Charlie Davis" />
        </B24AvatarGroup>
        <B24Button :icon="PersonPlus2Icon" label="Add" color="air-secondary-accent-2" size="xs" />
      </div>
    </div>

    <!-- Toggle rows: icon on left, B24Switch label prop provides a11y link -->
    <div class="py-1">
      <div class="flex items-center gap-3 px-4 py-2.5">
        <BellIcon class="size-5 shrink-0 text-description" />
        <B24Switch
          v-model="soundEnabled"
          label="Sound"
          :b24ui="{
            root: 'flex-1 flex-row-reverse justify-between items-center',
            wrapper: 'ms-0'
          }"
        />
      </div>
      <div class="px-4 py-2.5">
        <div class="flex items-center gap-3">
          <ClockIcon class="size-5 shrink-0 text-description" />
          <B24Switch
            v-model="autoDeleteEnabled"
            label="Auto-delete messages"
            :b24ui="{
              root: 'flex-1 flex-row-reverse justify-between items-center',
              wrapper: 'ms-0'
            }"
          />
        </div>
        <!-- invisible spacer (size-5 + gap-3) aligns description under the label -->
        <div class="flex gap-3">
          <span class="size-5 shrink-0" />
          <p class="text-xs text-dimmed mt-1">
            {{ autoDeleteEnabled ? 'Messages deleted after 7 days' : 'Disabled' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Info rows: icon + label + optional badge counter -->
    <div class="py-1">
      <div class="flex items-center gap-3 px-4 py-2.5">
        <UserGroupIcon class="size-5 shrink-0 text-description" />
        <span class="flex-1 text-sm text-label">Group chat</span>
      </div>
      <div class="flex items-center gap-3 px-4 py-2.5">
        <AiStarsIcon class="size-5 shrink-0 text-description" />
        <span class="flex-1 text-sm text-label">Favorites</span>
        <B24Badge label="0" color="air-secondary-accent" size="xs" square />
      </div>
      <div class="flex items-center gap-3 px-4 py-2.5">
        <LinkIcon class="size-5 shrink-0 text-description" />
        <span class="flex-1 text-sm text-label">Links from messages</span>
        <B24Badge label="18" color="air-secondary-accent" size="xs" square />
      </div>
    </div>

    <!-- Content sections: heading + optional action + B24Empty for empty state -->
    <div class="py-2">
      <h3 class="px-4 py-1 text-xs text-description font-semibold">Media & Files</h3>
      <B24Empty
        :icon="ImageIcon"
        title="No media or files"
        size="xs"
        color="air-tertiary"
        :b24ui="{ root: 'ring-0 rounded-none py-3' }"
      />
    </div>

    <div class="py-2">
      <div class="flex items-center justify-between px-4 py-1">
        <h3 class="text-xs text-description font-semibold">Tasks</h3>
        <B24Button :icon="PlusLIcon" label="Add" color="air-secondary-accent-2" size="xs" />
      </div>
      <B24Empty
        :icon="TaskListIcon"
        title="No tasks"
        size="xs"
        color="air-tertiary"
        :b24ui="{ root: 'ring-0 rounded-none py-3' }"
      />
    </div>

    <div class="py-2">
      <div class="flex items-center justify-between px-4 py-1">
        <h3 class="text-xs text-description font-semibold">Meetings</h3>
        <B24Button :icon="PlusLIcon" label="Add" color="air-secondary-accent-2" size="xs" />
      </div>
      <B24Empty
        :icon="CalendarIcon"
        title="No meetings"
        size="xs"
        color="air-tertiary"
        :b24ui="{ root: 'ring-0 rounded-none py-3' }"
      />
    </div>
  </B24Card>
</template>
```

## Toggle row layout explained

`B24Switch` with `label` prop creates a proper `<label for="...">` linked to the toggle.
The `b24ui` override reverses the flex order so the toggle appears on the right:

```vue
<B24Switch
  v-model="value"
  label="Sound"
  :b24ui="{
    root: 'flex-1 flex-row-reverse justify-between items-center',
    wrapper: 'ms-0'
  }"
/>
```

- `flex-row-reverse` — toggle goes right, label goes left
- `justify-between` — spreads toggle and label to opposite ends
- `wrapper: 'ms-0'` — removes the default `ms-2` start margin

## Sub-label alignment

To align a description line under the label (not under the icon), use an invisible spacer matching the icon width:

```vue
<div class="flex gap-3">
  <span class="size-5 shrink-0" /> <!-- matches icon size -->
  <p class="text-xs text-dimmed mt-1">Description text</p>
</div>
```
