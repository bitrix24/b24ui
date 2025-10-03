<script setup lang="ts">
import CirclePlusIcon from '@bitrix24/b24icons-vue/outline/CirclePlusIcon'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
import FolderPlusIcon from '@bitrix24/b24icons-vue/outline/FolderPlusIcon'
import AddProductIcon from '@bitrix24/b24icons-vue/outline/AddProductIcon'
import ShareIcon from '@bitrix24/b24icons-vue/button/ShareIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import MailSendIcon from '@bitrix24/b24icons-vue/outline/MailSendIcon'
import Share2Icon from '@bitrix24/b24icons-vue/main/Share2Icon'
import TwitterIcon from '@bitrix24/b24icons-vue/common-service/TwitterIcon'
import TelegramIcon from '@bitrix24/b24icons-vue/social/TelegramIcon'
import SettingsLIcon from '@bitrix24/b24icons-vue/outline/SettingsLIcon'
import Filter1Icon from '@bitrix24/b24icons-vue/main/Filter1Icon'
import PaletteIcon from '@bitrix24/b24icons-vue/outline/PaletteIcon'
import ShieldIcon from '@bitrix24/b24icons-vue/outline/ShieldIcon'

const toast = useToast()

const groups = [{
  id: 'actions',
  label: 'Actions',
  items: [
    {
      label: 'Create new',
      icon: CirclePlusIcon,
      children: [
        {
          label: 'New file',
          icon: FileUploadIcon,
          suffix: 'Create a new file in the current directory',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'New file created!' })
          },
          kbds: ['meta', 'I']
        },
        {
          label: 'New folder',
          icon: FolderPlusIcon,
          suffix: 'Create a new folder in the current directory',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'New folder created!' })
          },
          kbds: ['meta', 'F']
        },
        {
          label: 'New project',
          icon: AddProductIcon,
          suffix: 'Create a new project from a template',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'New project created!' })
          },
          kbds: ['meta', 'P']
        }
      ]
    },
    {
      label: 'Share',
      icon: ShareIcon,
      children: [
        {
          label: 'Copy link',
          icon: LinkIcon,
          suffix: 'Copy a link to the current item',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Link copied to clipboard!' })
          },
          kbds: ['meta', 'L']
        },
        {
          label: 'Share via email',
          icon: MailSendIcon,
          suffix: 'Share the current item via email',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Share via email dialog opened!' })
          }
        },
        {
          label: 'Share on social',
          icon: Share2Icon,
          suffix: 'Share the current item on social media',
          children: [
            {
              label: 'Twitter',
              icon: TwitterIcon,
              onSelect(e: Event) {
                e.preventDefault()
                toast.add({ title: 'Shared on Twitter!' })
              }
            },
            {
              label: 'Telegram',
              icon: TelegramIcon,
              onSelect(e: Event) {
                e.preventDefault()
                toast.add({ title: 'Shared on Telegram!' })
              }
            }
          ]
        }
      ]
    },
    {
      label: 'Settings',
      icon: SettingsLIcon,
      children: [
        {
          label: 'General',
          icon: Filter1Icon,
          suffix: 'Configure general settings',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'General settings opened!' })
          }
        },
        {
          label: 'Appearance',
          icon: PaletteIcon,
          suffix: 'Customize the appearance',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Appearance settings opened!' })
          }
        },
        {
          label: 'Security',
          icon: ShieldIcon,
          suffix: 'Manage security settings',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Security settings opened!' })
          }
        }
      ]
    }
  ]
}]
</script>

<template>
  <B24CommandPalette :groups="groups" class="flex-1" />
</template>
