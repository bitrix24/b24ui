<script setup lang="ts">
// import { createReusableTemplate, refDebounced } from '@vueuse/core'
import { createReusableTemplate } from '@vueuse/core'
import type { IUser } from '~/types'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
import FolderPlusIcon from '@bitrix24/b24icons-vue/outline/FolderPlusIcon'
import TagIcon from '@bitrix24/b24icons-vue/main/TagIcon'
import Share2Icon from '@bitrix24/b24icons-vue/main/Share2Icon'
import ShareIcon from '@bitrix24/b24icons-vue/button/ShareIcon'
import UserCompanyIcon from '@bitrix24/b24icons-vue/common-b24/UserCompanyIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import MoreLIcon from '@bitrix24/b24icons-vue/outline/MoreLIcon'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
const toast = useToast()

const open = ref(false)
const searchTerm = ref('')
// const searchTermDebounced = refDebounced(searchTerm, 200)
const selected = ref([])
const virtualize = ref(false)
const preserveGroupOrder = ref(false)

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  // params: { q: searchTermDebounced },
  transform: (data: IUser[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})

const loading = ref(false)

const groups = computed(() => [
  {
    id: 'users',
    label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
    items: users.value || []
  },
  {
    id: 'actions',
    items: [
      {
        label: 'Add new file',
        suffix: 'Create a new file in the current directory or workspace.',
        icon: FileUploadIcon,
        loading: loading.value,
        onSelect(e: Event) {
          e.preventDefault()

          toast.add({ title: 'New file added!' })

          loading.value = true

          setTimeout(() => {
            loading.value = false
          }, 2000)
        },
        kbds: ['meta', 'I']
      },
      {
        label: 'Add new folder',
        suffix: 'Create a new folder in the current directory or workspace.',
        icon: FolderPlusIcon,
        onSelect(e: Event) {
          e.preventDefault()

          toast.add({ title: 'New folder added!' })
        },
        kbds: ['meta', 'F']
      },
      {
        label: 'Add hashtag',
        suffix: 'Add a hashtag to the current item.',
        icon: TagIcon,
        onSelect(e: Event) {
          e.preventDefault()

          toast.add({ title: 'Hashtag added!' })
        },
        kbds: ['meta', 'H']
      },
      {
        label: 'Add label',
        suffix: 'Add a label to the current item.',
        icon: TagIcon,
        onSelect(e: Event) {
          e.preventDefault()

          toast.add({ title: 'Label added!' })
        },
        kbds: ['meta', 'L']
      },
      {
        label: 'More actions',
        description: 'More actions to perform on the current item.',
        icon: MoreLIcon,
        placeholder: 'Search actions...',
        children: [
          {
            label: 'Create new file',
            suffix: 'Create a new file in the current directory or workspace.',
            icon: FileUploadIcon,
            onSelect(e: Event) {
              e.preventDefault()

              toast.add({ title: 'New file added!' })
            }
          },
          {
            label: 'Create new folder',
            suffix: 'Create a new folder in the current directory or workspace.',
            icon: FolderPlusIcon,
            onSelect(e: Event) {
              e.preventDefault()

              toast.add({ title: 'New folder added!' })
            }
          },
          {
            label: 'Share',
            placeholder: 'Search share options...',
            icon: Share2Icon,
            children: [
              {
                label: 'Share with everyone',
                suffix: 'Share with everyone in the current directory or workspace.',
                icon: ShareIcon,
                onSelect(e: Event) {
                  e.preventDefault()

                  toast.add({ title: 'Shared with everyone!' })
                }
              },
              {
                label: 'Share with team',
                suffix: 'Share with the team in the current directory or workspace.',
                icon: UserCompanyIcon,
                onSelect(e: Event) {
                  e.preventDefault()

                  toast.add({ title: 'Shared with team!' })
                }
              }
            ]
          }
        ]
      }
    ]
  }
])

const labels = [
  {
    label: 'bug',
    chip: {
      color: 'air-primary-alert' as const
    }
  },
  {
    label: 'feature',
    chip: {
      color: 'air-primary-success' as const
    }
  },
  {
    label: 'enhancement',
    chip: {
      color: 'air-secondary' as const
    }
  }
]
const label = ref()

// function onSelect(item: typeof groups.value[number]['items'][number]) {
function onSelect(item: any) {
  console.log('Selected', item)
}

defineShortcuts({
  meta_k: () => open.value = !open.value,
  ...extractShortcuts(groups.value)
})
</script>

<template>
  <DefineTemplate>
    <B24CommandPalette
      v-model="selected"
      v-model:search-term="searchTerm"
      :loading="status === 'pending'"
      :groups="groups"
      :fuse="{
        fuseOptions: {
          includeMatches: true
        }
      }"
      multiple
      :preserve-group-order="preserveGroupOrder"
      class="sm:max-h-96"
      @update:model-value="onSelect"
    >
      <template #footer>
        <div class="flex items-center justify-between gap-2">
          <Bitrix24Icon class="size-5 text-(--b24ui-typography-label-color) ml-1" />
          <div class="flex items-center gap-1">
            <B24Button label="Open" size="sm">
              <template #trailing>
                <B24Kbd value="enter" size="sm" />
              </template>
            </B24Button>

            <B24Separator orientation="vertical" class="h-4" />

            <B24Button label="Actions" size="sm">
              <template #trailing>
                <B24Kbd value="meta" size="sm" />
                <B24Kbd value="k" size="sm" />
              </template>
            </B24Button>
          </div>
        </div>
      </template>
    </B24CommandPalette>
  </DefineTemplate>

  <PlaygroundPage>
    <template #controls>
      <B24Modal v-model:open="open" :b24ui="{ content: 'p-0 pt-0 pb-[0px]' }">
        <B24Button label="Open modal" />
        <template #content>
          <ReuseTemplate :close="true" @update:open="open = $event" />
        </template>
      </B24Modal>

      <B24Popover :content="{ side: 'right', align: 'start' }">
        <B24Button label="Select label (popover)" />

        <template #content>
          <B24CommandPalette v-model="label" placeholder="Search labels..." :groups="[{ id: 'labels', items: labels }]" :ui="{ input: '[&>input]:h-8 [&>input]:text-sm' }" />
        </template>
      </B24Popover>

      <B24Switch v-model="virtualize" label="Virtualize" />
      <B24Switch v-model="preserveGroupOrder" label="PreserveOrder" />
    </template>

    <B24Card class="w-full max-w-150 mx-auto" :b24ui="{ body: '!p-0' }">
      <B24CommandPalette
        v-if="virtualize"
        virtualize
        :fuse="{ resultLimit: 1000 }"
        placeholder="Search virtualized items..."
        :groups="[{ id: 'items', items: Array(1000).fill(0).map((_, i) => ({ label: `item-${i}`, value: i, icon: FileUploadIcon })) }]"
      />

      <ReuseTemplate v-else />
    </B24Card>
  </PlaygroundPage>
</template>
