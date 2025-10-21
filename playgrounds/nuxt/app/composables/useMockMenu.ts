import { computed, ref } from 'vue'
import type { NavigationMenuItem, DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
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
import KeyIcon from '@bitrix24/b24icons-vue/main/KeyIcon'
import ItemIcon from '@bitrix24/b24icons-vue/crm/ItemIcon'
import CrossCircle50Icon from '@bitrix24/b24icons-vue/actions/CrossCircle50Icon'
import CircleCheckThinIcon from '@bitrix24/b24icons-vue/main/CircleCheckThinIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import LoaderWaitIcon from '@bitrix24/b24icons-vue/animated/LoaderWaitIcon'

export function useMockMenu() {
  const toast = useToast()

  const action = ref('Action 1')
  const menuTop = computed<NavigationMenuItem[]>(() => {
    return [
      {
        label: 'Action 1',
        type: 'trigger' as NavigationMenuItem['type'],
        active: action.value === 'Action 1',
        onSelect() {
          action.value = 'Action 1'
        }
      },
      {
        label: 'Action 2',
        type: 'trigger' as NavigationMenuItem['type'],
        active: action.value === 'Action 2',
        onSelect() {
          action.value = 'Action 2'
        }
      },
      {
        label: 'Action 3',
        type: 'trigger' as NavigationMenuItem['type'],
        active: action.value === 'Action 3',
        onSelect() {
          action.value = 'Action 3'
        }
      }
    ]
  })

  const loading = ref(false)
  const dropdownMenuItems = computed<DropdownMenuItem[][]>(() => [
    [
      {
        label: 'My account',
        avatar: { src: '/avatar/employee.png' },
        type: 'label' as DropdownMenuItem['type']
      }
    ],
    [
      {
        label: 'Profile',
        description: 'View your profile',
        icon: PersonIcon,
        slot: 'custom' as DropdownMenuItem['type'],
        onSelect(e: Event) {
          e.preventDefault()
          toast.add({ title: 'Action', description: 'Profile clicked', icon: PersonIcon })
        }
      },
      {
        label: 'Billing',
        description: 'Manage billing',
        icon: CreditDebitCardIcon,
        kbds: ['shift', 'b'],
        onSelect() {
          toast.add({ title: 'Action', description: 'Billing clicked', icon: CreditDebitCardIcon })
        }
      },
      {
        label: 'Settings',
        icon: Settings2Icon,
        kbds: ['?'],
        onSelect() {
          toast.add({ title: 'Action', description: 'Settings clicked', icon: Settings2Icon })
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
              kbds: ['shift', 'i'],
              onSelect(e: Event) {
                e?.preventDefault()
                toast.add({ title: 'Action', description: 'Invite by link clicked', icon: Link3Icon })
              }
            }
          ],
          [
            {
              label: 'More',
              description: 'Import from more sources',
              icon: PlusInCircleIcon,
              children: [
                {
                  label: 'Import from Bitrix24',
                  icon: Bitrix24Icon,
                  to: 'https://bitrix24.com',
                  target: '_blank',
                  onSelect(e: Event) {
                    e.preventDefault()
                    toast.add({ title: 'Action', description: 'Import from Bitrix24 clicked', icon: Bitrix24Icon })
                  }
                },
                {
                  label: 'Import from Slack',
                  icon: SlackIcon,
                  to: 'https://slack.com',
                  target: '_blank',
                  onSelect(e: Event) {
                    e.preventDefault()
                    toast.add({ title: 'Action', description: 'Import from Slack clicked', icon: SlackIcon })
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
        kbds: ['shift', 'a'],
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
            color: 'air-primary-warning'
          })
          setTimeout(() => {
            loading.value = false
            toast.update(toastItem.id, {
              icon: CircleCheckThinIcon,
              title: 'Action stop',
              description: 'New team loading stops',
              color: 'air-primary-success'
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
        to: '/components/dropdown-menu'
      },
      {
        type: 'separator' as DropdownMenuItem['type']
      },
      {
        label: 'Keyboard Shortcuts',
        icon: KeyIcon
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
        kbds: ['shift', 'q'],
        onSelect() {
          toast.add({ title: 'Action', description: 'Logout clicked', icon: CrossCircle50Icon })
        }
      }
    ]
  ])

  return {
    action,
    menuTop,
    dropdownMenuItems
  }
}
