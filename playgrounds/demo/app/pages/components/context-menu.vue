<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'

usePageMeta.setPageTitle('ContextMenu')

const loading = ref(false)
const isUseBg = ref(true)

const items = computed(() => [
  [{
    label: 'My account',
    type: 'label' as const,
    avatar: {
      src: 'https://github.com/benjamincanac.png'
    }
  }],
  [{
    label: 'Appearance',
    children: [{
      label: 'System'
      // icon: 'i-lucide-monitor'
    }, {
      label: 'Light'
      //  icon: 'i-lucide-sun'
    }, {
      label: 'Dark'
      // icon: 'i-lucide-moon'
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
  <ExampleGrid v-once>
    <ExampleCard title="matrix" :use-bg="isUseBg" class="sm:col-span-2">
      <B24ContextMenu :items="items">
        <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-(length:--ui-font-size-sm) aspect-video w-full">
          Right click here
        </div>
      </B24ContextMenu>
    </ExampleCard>
  </ExampleGrid>
</template>
