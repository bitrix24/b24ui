<script setup lang="ts">
import theme from '#build/b24ui/navigation-menu'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('NavigationMenu')

const colors = Object.keys(theme.variants.color)
const variants = Object.keys(theme.variants.variant)
const orientations = Object.keys(theme.variants.orientation)

const color = ref(theme.defaultVariants.color)
const variant = ref(theme.defaultVariants.variant)
const orientation = ref('horizontal' as const)

const items = ref([
  [
    {
      label: 'Links',
      type: 'label'
    },
    {
      label: 'Guide',
      // icon: 'i-lucide-book-open',
      children: [
        {
          label: 'Introduction',
          description: 'Fully styled and customizable components for Nuxt.'
          // icon: 'i-lucide-house'
        },
        {
          label: 'Installation',
          description: 'Learn how to install and configure Nuxt UI in your application.'
          // icon: 'i-lucide-cloud-download'
        },
        {
          label: 'Icons',
          // icon: 'i-lucide-smile',
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
        },
        {
          label: 'Colors',
          // icon: 'i-lucide-swatch-book',
          description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
        },
        {
          label: 'Theme',
          // icon: 'i-lucide-cog',
          description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
        }
      ]
    },
    {
      label: 'Composables',
      // icon: 'i-lucide-database',
      children: [
        {
          label: 'defineShortcuts',
          // icon: 'i-lucide-file-text',
          description: 'Define shortcuts for your application.',
          to: '/composables/define-shortcuts'
        },
        {
          label: 'useOverlay',
          // icon: 'i-lucide-file-text',
          description: 'Display a modal/slideover within your application.',
          to: '/composables/use-overlay'
        },
        {
          label: 'useToast',
          // icon: 'i-lucide-file-text',
          description: 'Display a toast within your application.',
          to: '/composables/use-toast'
        }
      ]
    },
    {
      label: 'Components',
      // icon: 'i-lucide-box',
      to: '/components',
      active: true,
      defaultOpen: true,
      children: [
        {
          label: 'Link',
          // icon: 'i-lucide-file-text',
          description: 'Use NuxtLink with superpowers.',
          to: '/components/link'
        },
        {
          label: 'Modal',
          // icon: 'i-lucide-file-text',
          description: 'Display a modal within your application.',
          to: '/components/modal'
        },
        {
          label: 'NavigationMenu',
          // icon: 'i-lucide-file-text',
          description: 'Display a list of links.',
          to: '/components/navigation-menu'
        },
        {
          label: 'Pagination',
          // icon: 'i-lucide-file-text',
          description: 'Display a list of pages.',
          to: '/components/pagination'
        },
        {
          label: 'Popover',
          // icon: 'i-lucide-file-text',
          description: 'Display a non-modal dialog that floats around a trigger element.',
          to: '/components/popover'
        },
        {
          label: 'Progress',
          // icon: 'i-lucide-file-text',
          description: 'Show a horizontal bar to indicate task progression.',
          to: '/components/progress'
        }
      ]
    }
  ],
  [
    {
      label: 'GitHub',
      // icon: 'i-simple-icons-github',
      badge: '14',
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank'
    },
    {
      label: 'Help',
      // icon: 'i-lucide-circle-help',
      disabled: true
    }
  ]
])
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="settings">
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-4">
        <B24RadioGroup v-model="variant" legend="Variant" :items="variants" />
        <B24RadioGroup v-model="orientation" legend="Orientation" :items="orientations" />
        <B24FormField label="Color" name="color">
          <B24Select v-model="color" :items="colors" class="w-full" />
        </B24FormField>
      </div>
    </ExampleCard>
    <ExampleCard title="NavigationMenu" class="md:col-span-3">
      <ExampleCardSubTitle title="demo" />
      <div class="mb-4 flex flex-row justify-center flex-wrap gap-2">
        <B24NavigationMenu
          :items="items"
          class="w-full data-[orientation=vertical]:w-[240px]"
          :color="color"
          :variant="variant"
          :orientation="orientation"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
