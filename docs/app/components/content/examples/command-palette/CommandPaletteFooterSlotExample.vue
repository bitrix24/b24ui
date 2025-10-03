<script setup lang="ts">
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import VueIcon from '@bitrix24/b24icons-vue/file-type/VueIcon'
import MarkdownIcon from '@bitrix24/b24icons-vue/file-type/MarkdownIcon'
import NodeIcon from '@bitrix24/b24icons-vue/file-type/NodeIcon'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
import FolderPlusIcon from '@bitrix24/b24icons-vue/outline/FolderPlusIcon'
import CrmSearchIcon from '@bitrix24/b24icons-vue/crm/CrmSearchIcon'
import SettingsLIcon from '@bitrix24/b24icons-vue/outline/SettingsLIcon'

const groups = [
  {
    id: 'actions',
    items: [
      {
        label: 'Add new file',
        suffix: 'Create a new file in the current directory',
        icon: FileUploadIcon,
        kbds: ['meta', 'I']
      },
      {
        label: 'Add new folder',
        suffix: 'Create a new folder in the current directory',
        icon: FolderPlusIcon,
        kbds: ['meta', 'F']
      },
      {
        label: 'Search files',
        suffix: 'Search across all files in the project',
        icon: CrmSearchIcon,
        kbds: ['meta', 'P']
      },
      {
        label: 'Settings',
        suffix: 'Open application settings',
        icon: SettingsLIcon,
        kbds: ['meta', ',']
      }
    ]
  },
  {
    id: 'recent',
    label: 'Recent',
    items: [
      {
        label: 'project.vue',
        suffix: 'components/',
        icon: VueIcon
      },
      {
        label: 'readme.md',
        suffix: 'docs/',
        icon: MarkdownIcon
      },
      {
        label: 'package.json',
        suffix: 'root/',
        icon: NodeIcon
      }
    ]
  }
]
</script>

<template>
  <B24CommandPalette :groups="groups" class="flex-1 h-80">
    <template #footer>
      <div class="flex items-center justify-between gap-2">
        <Bitrix24Icon class="size-5 text-(--b24ui-typography-label-color) ml-1" />
        <div class="flex items-center gap-1">
          <B24Button label="Open Command" size="sm">
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
</template>
