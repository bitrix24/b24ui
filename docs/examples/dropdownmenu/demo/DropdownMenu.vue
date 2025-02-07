<script setup lang="ts">
import { ref } from 'vue'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'
import Settings2Icon from '@bitrix24/b24icons-vue/actions/Settings2Icon'
import Persons3Icon from '@bitrix24/b24icons-vue/main/Persons3Icon'
import PersonPlus2Icon from '@bitrix24/b24icons-vue/crm/PersonPlus2Icon'
import SendIcon from '@bitrix24/b24icons-vue/main/SendIcon'
import Link3Icon from '@bitrix24/b24icons-vue/main/Link3Icon'
import CirclePlusIcon from '@bitrix24/b24icons-vue/main/CirclePlusIcon'
import SlackIcon from '@bitrix24/b24icons-vue/social/SlackIcon'
import PlusInCircleIcon from '@bitrix24/b24icons-vue/actions/PlusInCircleIcon'
import PulseCircleIcon from '@bitrix24/b24icons-vue/main/PulseCircleIcon'
import ItemIcon from '@bitrix24/b24icons-vue/crm/ItemIcon'
import CrossCircle50Icon from '@bitrix24/b24icons-vue/actions/CrossCircle50Icon'
import CircleCheckThinIcon from '@bitrix24/b24icons-vue/main/CircleCheckThinIcon'
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import LoaderWaitIcon from '@bitrix24/b24icons-vue/animated/LoaderWaitIcon'

const toast = useToast()
const loading = ref(false)

const items = ref([
  [
    {
      label: 'My account',
      avatar: {
        src: '/b24ui/avatar/employee.png'
      },
      type: 'label' as const
    }
  ],
  [
    {
      label: 'Profile',
      icon: PersonIcon,
      slot: 'custom' as const,
      onSelect(e: Event) {
        e.preventDefault()
        toast.add({ title: 'Action', description: 'Profile clicked' })
      }
    },
    {
      label: 'Billing',
      icon: CreditDebitCardIcon,
      kbds: ['meta', 'b'],
      onSelect() {
        toast.add({ title: 'Action', description: 'Billing clicked' })
      }
    },
    {
      label: 'Settings',
      icon: Settings2Icon,
      kbds: ['?'],
      onSelect() {
        toast.add({ title: 'Action', description: 'Settings clicked' })
      }
    }
  ],
  [
    {
      label: 'Team',
      icon: Persons3Icon
    },
    {
      label: 'Invite users',
      icon: PersonPlus2Icon,
      children: [
        [
          {
            label: 'Invite by email',
            icon: SendIcon
          },
          {
            label: 'Invite by link',
            icon: Link3Icon,
            kbds: ['meta', 'i'],
            onSelect(e: Event) {
              e?.preventDefault()
              toast.add({ title: 'Action', description: 'Invite by link clicked' })
            }
          }
        ],
        [
          {
            label: 'More',
            icon: PlusInCircleIcon,
            children: [
              {
                label: 'Import from Bitrix24',
                icon: Bitrix24Icon,
                to: 'https://bitrix24.com',
                target: '_blank',
                onSelect(e: Event) {
                  e.preventDefault()
                  toast.add({ title: 'Action', description: 'Import from Bitrix24 clicked' })
                }
              },
              {
                label: 'Import from Slack',
                icon: SlackIcon,
                to: 'https://slack.com',
                target: '_blank',
                onSelect(e: Event) {
                  e.preventDefault()
                  toast.add({ title: 'Action', description: 'Import from Slack clicked' })
                }
              }
            ]
          }
        ]
      ]
    },
    {
      label: 'New team',
      icon: CirclePlusIcon,
      kbds: ['meta', 'n'],
      loading: loading.value,
      onSelect(e: Event) {
        e?.preventDefault()

        if (loading.value) {
          return
        }

        loading.value = true
        const toastItem = toast.add({
          icon: LoaderWaitIcon,
          title: 'Action loading',
          description: 'New team loading',
          color: 'warning'
        })
        setTimeout(() => {
          loading.value = false
          toast.update(toastItem.id, {
            icon: CircleCheckThinIcon,
            title: 'Action stop',
            description: 'New team loading stops',
            color: 'success'
          })
        }, 2000)
      }
    }
  ],
  [
    {
      label: 'GitHub',
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank',
      onSelect(e: Event) {
        e.preventDefault()
      }
    },
    {
      label: 'Support',
      icon: PulseCircleIcon,
      to: '/b24ui/components/button.html'
    },
    {
      label: 'API',
      icon: ItemIcon,
      disabled: true
    }
  ],
  [
    {
      label: 'Logout',
      icon: CrossCircle50Icon,
      kbds: ['shift', 'meta', 'q'],
      onSelect() {
        toast.add({ title: 'Action', description: 'Logout clicked' })
      }
    }
  ]
])
</script>

<template>
  <B24DropdownMenu
    :items="items"
  >
    <B24Button label="Open" color="link" depth="dark" :icon="MenuIcon" />

    <template #custom-trailing>
      <CircleCheckThinIcon class="shrink-0 size-5 text-ai-500" />
    </template>
  </B24DropdownMenu>
</template>
