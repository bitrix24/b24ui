<script setup lang="ts">
import SyncCircleIcon from '@bitrix24/b24icons-vue/main/SyncCircleIcon'
import SunIcon from '@bitrix24/b24icons-vue/outline/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/outline/MoonIcon'

const loading = ref(false)

const items = computed(() => [
  [{
    label: 'My account',
    type: 'label' as const,
    avatar: {
      src: 'https://github.com/bitrix24.png'
    }
  }],
  [{
    label: 'Appearance',
    description: 'Change the appearance of the app',
    children: [{
      label: 'System',
      icon: SyncCircleIcon
    }, {
      label: 'Light',
      icon: SunIcon
    }, {
      label: 'Dark',
      icon: MoonIcon
    }]
  }],
  [{
    label: 'Show Sidebar',
    kbds: ['meta', 'S'],
    onSelect() {
      console.log('Show Sidebar clicked')
    }
  }, {
    label: 'Show Toolbar',
    kbds: ['shift', 'meta', 'D'],
    onSelect() {
      console.log('Show Toolbar clicked')
    }
  }, {
    label: 'Collapse Pinned Tabs',
    disabled: true
  }], [{
    label: 'Refresh the Page',
    loading: loading.value,
    onSelect(e: Event) {
      e.preventDefault()

      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 2000)
    }
  }, {
    label: 'Clear Cookies and Refresh',
    color: 'air-primary-warning'
  }, {
    label: 'Clear Cache and Refresh',
    color: 'air-primary-alert'
  }, {
    type: 'separator' as const
  }, {
    label: 'Developer',
    children: [[{
      label: 'View Source',
      description: 'View the source code of the app',
      kbds: ['option', 'meta', 'U'],
      onSelect() {
        console.log('View Source clicked')
      }
    }, {
      label: 'Developer Tools',
      kbds: ['option', 'meta', 'I'],
      onSelect() {
        console.log('Developer Tools clicked')
      }
    }], [{
      label: 'Inspect Elements',
      kbds: ['option', 'meta', 'C'],
      onSelect() {
        console.log('Inspect Elements clicked')
      }
    }], [{
      label: 'JavaScript Console',
      kbds: ['option', 'meta', 'J'],
      onSelect() {
        console.log('JavaScript Console clicked')
      }
    }]]
  }]
])

defineShortcuts(extractShortcuts(items.value))
</script>

<template>
  <PlaygroundPage>
    <B24ContextMenu :items="items" class="mx-auto">
      <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-(length:--ui-font-size-sm) bg-(--ui-color-bg-content-primary) aspect-video w-full max-w-[520px]">
        Right click here
      </div>
    </B24ContextMenu>
  </PlaygroundPage>
</template>
