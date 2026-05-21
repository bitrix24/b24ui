<script setup lang="ts">
import type { EditorToolbarItem, IconComponent } from '@bitrix24/b24ui-nuxt'
import { CalendarDate } from '@internationalized/date'
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

const title = ref('Design the new task form interface')
const description = ref('')
const deadline = shallowRef<CalendarDate | undefined>(new CalendarDate(2026, 6, 30))

const toolbarItems: EditorToolbarItem[][] = [[
  { kind: 'mention', icon: MentionIcon, tooltip: { text: 'Mention' } },
  { kind: 'bulletList', icon: BulletedListIcon, tooltip: { text: 'Bullet list' } },
  { kind: 'orderedList', icon: NumberedListIcon, tooltip: { text: 'Numbered list' } }
]]

const actionButtons: { label: string, icon: IconComponent }[] = [
  { label: 'Results', icon: CircleCheckIcon },
  { label: 'Files', icon: FileUploadIcon },
  { label: 'Checklists', icon: TaskListIcon },
  { label: 'Project', icon: FolderPlusIcon },
  { label: 'Co-executors', icon: UserGroupIcon },
  { label: 'Observers', icon: NotificationIcon },
  { label: 'Flow', icon: BusinesProcessStagesIcon },
  { label: 'Tags', icon: PinIcon },
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

    <div class="flex flex-col lg:flex-row gap-4 items-start">
      <div class="flex flex-col gap-4 flex-1 min-w-0">
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
                <B24Button :icon="Expand1Icon" color="air-tertiary" variant="ghost" size="sm" aria-label="Expand editor" />
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

      <div class="w-full lg:w-72 shrink-0 flex flex-col gap-4">
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
              <B24InputDate
                v-model="deadline"
                size="sm"
                no-border
                class="flex-1"
              />
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
      </div>
    </div>

    <div class="flex gap-2 justify-end">
      <B24Button label="Save" color="air-primary" />
      <B24Button label="Cancel" color="air-tertiary" />
    </div>
  </div>
</template>
