<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import MailIcon from '@bitrix24/b24icons-vue/outline/MailIcon'
import PaymentIcon from '@bitrix24/b24icons-vue/outline/PaymentIcon'
import CirclePlusIcon from '@bitrix24/b24icons-vue/outline/CirclePlusIcon'
import PulseCircleIcon from '@bitrix24/b24icons-vue/main/PulseCircleIcon'
import CollabIcon from '@bitrix24/b24icons-vue/outline/CollabIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import ThreePersonsIcon from '@bitrix24/b24icons-vue/outline/ThreePersonsIcon'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import ContrastIcon from '@bitrix24/b24icons-vue/outline/ContrastIcon'
import SunIcon from '@bitrix24/b24icons-vue/outline/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/outline/MoonIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import LogOutIcon from '@bitrix24/b24icons-vue/outline/LogOutIcon'
import CloseChatIcon from '@bitrix24/b24icons-vue/outline/CloseChatIcon'

const open = ref(true)

const colorMode = useColorMode()

const teams = ref([
  {
    label: 'Assistant Name',
    avatar: {
      src: '/b24ui/avatar/assistant.png',
      alt: 'assistant',
      loading: 'lazy' as const
    }
  },
  {
    label: 'Bitrix24',
    avatar: {
      src: 'https://github.com/bitrix24.png',
      alt: 'bitrix24',
      loading: 'lazy' as const
    }
  },
  {
    label: 'Employee Name',
    avatar: {
      src: '/b24ui/avatar/employee.png',
      alt: 'employee',
      loading: 'lazy' as const
    }
  }
])
const selectedTeam = ref(teams.value[0])
const selectedTeamFormatted = computed(() => {
  return open.value
    ? selectedTeam.value
    : {
        avatar: selectedTeam.value!.avatar
      }
})

const teamsItems = computed<DropdownMenuItem[][]>(() => {
  return [
    teams.value.map((team, index) => ({
      ...team,
      kbds: ['meta', String(index + 1)],
      onSelect() {
        selectedTeam.value = team
      }
    })),
    [
      { label: 'Create team', icon: CirclePlusIcon }
    ]
  ]
})

function getItems(state: 'collapsed' | 'expanded') {
  return [
    {
      label: 'Inbox',
      icon: MailIcon,
      badge: '4'
    },
    {
      label: 'Issues',
      icon: CollabIcon
    },
    {
      label: 'Actions',
      icon: PulseCircleIcon
    },
    {
      label: 'Settings',
      icon: SettingsIcon,
      defaultOpen: true,
      children: state === 'expanded'
        ? [
            {
              label: 'General',
              icon: HomeIcon
            },
            {
              label: 'Team',
              icon: ThreePersonsIcon
            },
            {
              label: 'Billing',
              icon: PaymentIcon
            }
          ]
        : []
    }
  ] satisfies NavigationMenuItem[]
}

const user = ref({
  name: 'Bitrix24',
  avatar: {
    src: 'https://github.com/bitrix24.png',
    alt: 'bitrix24'
  }
})

const userItems = computed<DropdownMenuItem[][]>(() => (
  [
    [
      {
        label: 'Profile',
        icon: UserIcon
      },
      {
        label: 'Billing',
        icon: PaymentIcon
      },
      {
        label: 'Settings',
        icon: SettingsIcon,
        to: '/templates/'
      }
    ],
    [
      {
        label: 'Appearance',
        icon: ContrastIcon,
        children: [
          {
            label: 'Light',
            icon: SunIcon,
            type: 'checkbox',
            checked: colorMode.value === 'light',
            onUpdateChecked(checked: boolean) {
              if (checked) {
                colorMode.preference = 'light'
              }
            },
            onSelect(e: Event) {
              e.preventDefault()
            }
          },
          {
            label: 'Dark',
            icon: MoonIcon,
            type: 'checkbox',
            checked: colorMode.value === 'dark',
            onUpdateChecked(checked: boolean) {
              if (checked) {
                colorMode.preference = 'dark'
              }
            },
            onSelect(e: Event) {
              e.preventDefault()
            }
          }
        ]
      }
    ],
    [
      {
        label: 'GitHub',
        icon: GitHubIcon,
        to: 'https://github.com/bitrix24/b24ui',
        target: '_blank'
      },
      {
        label: 'Log out',
        icon: LogOutIcon
      }
    ]
  ]
))

defineShortcuts(extractShortcuts(teamsItems.value))
</script>

<template>
  <div class="flex flex-1">
    <B24Sidebar
      v-model:open="open"
      collapsible="icon"
      rail
      :b24ui="{
        container: 'h-full',
        inner: 'bg-elevated/25 divide-transparent',
        body: 'py-0'
      }"
    >
      <template #header>
        <B24DropdownMenu
          :items="teamsItems"
          :content="{ align: 'start', collisionPadding: 12 }"
          :b24ui="{ content: 'w-[270px]', viewport: 'w-[270px] max-h-[62vh]' }"
        >
          <B24Button
            v-bind="selectedTeamFormatted"
            :use-dropdown="open"
            color="air-tertiary"
            class="w-full data-[state=open]:bg-(--ui-btn-background-hover) overflow-hidden"
            :b24ui="{ trailingIcon: 'text-dimmed ms-auto', label: 'flex-1' }"
          />
        </B24DropdownMenu>
      </template>

      <template #default="{ state }">
        <B24NavigationMenu
          :key="state"
          :items="getItems(state)"
          orientation="vertical"
          :b24ui="{ link: 'p-1.5 overflow-hidden' }"
        />
      </template>

      <template #footer>
        <B24DropdownMenu
          :items="userItems"
          :content="{ align: 'start', side: 'top', sideOffset: 4, collisionPadding: 12 }"
          :b24ui="{ content: 'w-[200px]', viewport: 'w-[200px] max-h-[62vh]' }"
        >
          <B24Button
            v-bind="user"
            :label="open ? user?.name : undefined"
            :use-dropdown="open"
            color="air-tertiary"
            class="w-full data-[state=open]:bg-(--ui-btn-background-hover) overflow-hidden"
            :b24ui="{ trailingIcon: 'text-dimmed ms-auto', label: 'flex-1' }"
          />
        </B24DropdownMenu>
      </template>
    </B24Sidebar>

    <div class="flex-1 flex flex-col">
      <div class="h-(--b24ui-header-height) shrink-0 flex items-center px-4 border-b border-default">
        <B24Button
          :icon="CloseChatIcon"
          aria-label="Toggle sidebar"
          size="md"
          color="air-tertiary"
          @click="open = !open"
        />
      </div>

      <div class="flex-1 p-4">
        <Placeholder class="size-full" />
      </div>
    </div>
  </div>
</template>
