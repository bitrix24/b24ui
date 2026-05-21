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
  <PlaygroundPage :b24ui="{ body: 'items-start justify-center' }">
    <B24Card
      class="w-full max-w-xs overflow-hidden"
      :b24ui="{ body: 'p-0 flex flex-col gap-0 divide-y divide-default' }"
    >
      <!-- Channel header -->
      <div class="flex flex-col items-center gap-3 px-4 py-6 text-center">
        <B24Avatar
          src="/b24ui/demo/avatar/employee.png"
          alt="Sales Department"
          size="3xl"
          :b24ui="{ root: 'rounded-xl' }"
        />
        <div>
          <p class="font-semibold text-label">
            Sales Department
          </p>
          <p class="text-description text-sm">
            Channel
          </p>
        </div>

        <!-- :max="4" with 5 children intentionally shows the +1 overflow counter -->
        <div class="flex items-center gap-2">
          <B24AvatarGroup :max="4" size="xs">
            <B24Avatar src="/b24ui/demo/avatar/employee.png" alt="John Doe" />
            <B24Avatar src="/b24ui/demo/avatar/assistant.png" alt="Jane Smith" />
            <B24Avatar src="/b24ui/demo/avatar/employee.png" alt="Bob Johnson" />
            <B24Avatar src="/b24ui/demo/avatar/assistant.png" alt="Alice Brown" />
            <B24Avatar alt="Charlie Davis" />
          </B24AvatarGroup>
          <B24Button
            :icon="PersonPlus2Icon"
            label="Add"
            color="air-secondary-accent-2"
            size="xs"
          />
        </div>
      </div>

      <!-- Toggle rows: icon outside, B24Switch label prop links toggle to text for a11y -->
      <div class="py-1">
        <div class="flex items-center gap-3 px-4 py-2.5">
          <BellIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
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
            <ClockIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
            <B24Switch
              v-model="autoDeleteEnabled"
              label="Auto-delete messages"
              :b24ui="{
                root: 'flex-1 flex-row-reverse justify-between items-center',
                wrapper: 'ms-0'
              }"
            />
          </div>
          <!-- spacer (size-5 + gap-3) aligns description under the label -->
          <div class="flex gap-3">
            <span class="size-5 shrink-0" />
            <p class="text-xs text-dimmed mt-1">
              {{ autoDeleteEnabled ? 'Messages deleted after 7 days' : 'Disabled' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Info rows -->
      <div class="py-1">
        <div class="flex items-center gap-3 px-4 py-2.5">
          <UserGroupIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
          <span class="flex-1 text-sm text-label">Group chat</span>
        </div>
        <div class="flex items-center gap-3 px-4 py-2.5">
          <AiStarsIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
          <span class="flex-1 text-sm text-label">Favorites</span>
          <B24Badge :label="0" color="air-secondary-accent" size="xs" square />
        </div>
        <div class="flex items-center gap-3 px-4 py-2.5">
          <LinkIcon class="size-5 shrink-0 text-description" aria-hidden="true" />
          <span class="flex-1 text-sm text-label">Links from messages</span>
          <B24Badge :label="18" color="air-secondary-accent" size="xs" square />
        </div>
      </div>

      <!-- Media & Files section -->
      <div class="py-2">
        <h3 class="px-4 py-1 text-xs text-description font-semibold">
          Media & Files
        </h3>
        <B24Empty
          :icon="ImageIcon"
          title="No media or files"
          size="xs"
          color="air-tertiary"
          :b24ui="{ root: 'ring-0 rounded-none py-3' }"
        />
      </div>

      <!-- Tasks section -->
      <div class="py-2">
        <div class="flex items-center justify-between px-4 py-1">
          <h3 class="text-xs text-description font-semibold">
            Tasks
          </h3>
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

      <!-- Meetings section -->
      <div class="py-2">
        <div class="flex items-center justify-between px-4 py-1">
          <h3 class="text-xs text-description font-semibold">
            Meetings
          </h3>
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
  </PlaygroundPage>
</template>
