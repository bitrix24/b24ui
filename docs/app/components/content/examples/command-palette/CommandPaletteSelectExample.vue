<script setup lang="ts">
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
import FolderPlusIcon from '@bitrix24/b24icons-vue/outline/FolderPlusIcon'
import TagIcon from '@bitrix24/b24icons-vue/outline/TagIcon'
import StageIcon from '@bitrix24/b24icons-vue/outline/StageIcon'

const toast = useToast()

const groups = ref([
  {
    id: 'users',
    label: 'Users',
    items: [
      {
        label: 'Assistant Name',
        suffix: 'assistant',
        to: 'https://github.com/bitrix24',
        target: '_blank',
        avatar: {
          src: '/b24ui/avatar/assistant.png'
        }
      },
      {
        label: 'Bitrix24',
        suffix: 'bitrix24',
        to: 'https://github.com/bitrix24',
        target: '_blank',
        avatar: {
          src: 'https://github.com/bitrix24.png'
        }
      },
      {
        label: 'Employee Name',
        suffix: 'employee',
        to: 'https://github.com/bitrix24',
        avatarSrc: '/b24ui/avatar/employee.png',
        target: '_blank',
        avatar: {
          src: '/b24ui/avatar/employee.png'
        }
      }
    ]
  },
  {
    id: 'actions',
    items: [
      {
        label: 'Add new file',
        suffix: 'Create a new file in the current directory or workspace.',
        icon: FileUploadIcon,
        kbds: [
          'meta',
          'I'
        ],
        onSelect() {
          toast.add({ title: 'Add new file' })
        }
      },
      {
        label: 'Add new folder',
        suffix: 'Create a new folder in the current directory or workspace.',
        icon: FolderPlusIcon,
        kbds: [
          'meta',
          'F'
        ],
        onSelect() {
          toast.add({ title: 'Add new folder' })
        }
      },
      {
        label: 'Add hashtag',
        suffix: 'Add a hashtag to the current item.',
        icon: TagIcon,
        kbds: [
          'meta',
          'H'
        ],
        onSelect() {
          toast.add({ title: 'Add hashtag' })
        }
      },
      {
        label: 'Add label',
        suffix: 'Add a label to the current item.',
        icon: StageIcon,
        kbds: [
          'meta',
          'L'
        ],
        onSelect() {
          toast.add({ title: 'Add label' })
        }
      }
    ]
  }
])

function onSelect(item: any) {
  console.log(item)
}
</script>

<template>
  <B24CommandPalette
    :groups="groups"
    class="flex-1 h-[320px]"
    @update:model-value="onSelect"
  />
</template>
