<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import { mapContentNavigation } from '@bitrix24/b24ui-nuxt/utils/content'

const props = defineProps<{
  links: NavigationMenuItem[]
}>()

const route = useRoute()
const config = useRuntimeConfig().public

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const desktopLinks = computed(() => props.links.map(({ icon, ...link }) => link))
const mobileLinks = computed(() => [
  ...props.links.map(link => ({ ...link, defaultOpen: link.children && route.path.startsWith(link.to as string) })),
  {
    label: 'Open on GitHub',
    to: 'https://github.com/nuxt/ui',
    icon: 'i-simple-icons-github',
    target: '_blank'
  }
])

const items = computed(() => {
  return [
    { label: `v${config.version}`, active: true, color: 'primary' as const, checked: true, type: 'checkbox' as const },
  ]
})

const docsNavigation = computed(() => mapContentNavigation(navigation?.value.map(item => ({ ...item, children: undefined })) ?? [])?.map(item => ({
  ...item,
  active: route.path.startsWith(item.to as string)
})))

const logoElement = ref()
const { copy } = useClipboard()
const toast = useToast()

const copyLogo = () => {
  if (logoElement.value) {
    copy(logoElement.value.$el.outerHTML)
    toast.add({
      title: 'Nuxt logo copied as SVG',
      description: 'You can now paste it into your project',
      icon: 'i-lucide-circle-check',
      color: 'success'
    })
  }
}

const logoContextMenuItems = [
  [{
    label: 'Copy logo as SVG',
    icon: 'i-simple-icons-nuxtdotjs',
    onSelect() {
      copyLogo()
    }
  }],
  [{
    label: 'Browse design kit',
    icon: 'i-lucide-shapes',
    to: 'https://nuxt.com/design-kit',
    target: '_blank'
  }]
]
</script>

<template>
  <B24Header :ui="{ left: 'min-w-0' }" class="flex flex-col">
    <template #left>
      <B24ContextMenu :items="logoContextMenuItems">
        <NuxtLink to="/" class="flex items-end gap-2 font-bold text-xl text-highlighted min-w-0 focus-visible:outline-primary shrink-0" aria-label="Nuxt UI">
          <Logo ref="logoElement" class="w-auto h-6 shrink-0" />
        </NuxtLink>
      </B24ContextMenu>

      <B24DropdownMenu
        v-slot="{ open }"
        :modal="false"
        :items="items"
        :content="{ align: 'start' }"
        :ui="{ content: 'min-w-fit' }"
        size="xs"
      >
        <B24Button
          :label="`v${config.version}`"
          trailing-icon="i-lucide-chevron-down"
          size="xs"
          class="-mb-[6px] font-semibold rounded-full truncate"
          :class="[open && 'bg-primary/15 ']"
          :b24ui="{
            trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' ')
          }"
        />
      </B24DropdownMenu>
    </template>

    <B24NavigationMenu :items="desktopLinks" variant="link" />

    <template #right>
      <B24Tooltip text="Search" :kbds="['meta', 'K']">
        <B24ContentSearchButton />
      </B24Tooltip>

      <B24Tooltip text="Open on GitHub" class="hidden lg:flex">
        <B24Button
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </B24Tooltip>
    </template>

    <template #body>
      <B24NavigationMenu orientation="vertical" :items="mobileLinks" class="-mx-2.5" />

      <B24Separator type="dashed" class="mt-4 mb-6" />

      <div class="flex flex-col gap-2 w-[calc(100%+1.25rem)] mb-5.5 -mx-2.5">
        <FrameworkSelect />
      </div>

      <B24ContentNavigation :navigation="navigation" highlight :ui="{ linkTrailingBadge: 'font-semibold uppercase' }" />
    </template>

    <template v-if="route.path.startsWith('/docs/')" #bottom>
      <B24Separator class="hidden lg:flex" />

      <B24Container class="hidden lg:flex items-center justify-between">
        <B24NavigationMenu :items="docsNavigation" variant="pill" highlight class="-mx-2.5 -mb-px" />

        <FrameworkSelect class="w-40" />
      </B24Container>
    </template>
  </B24Header>
</template>
