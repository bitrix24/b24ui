<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { ContentSearchFile } from '@bitrix24/b24ui-nuxt'
import { useFilter } from 'reka-ui'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const files = inject<ContentSearchFile[]>('files')

const route = useRoute()
const { contains } = useFilter({ sensitivity: 'base' })
const { isEnabled: isAssistantEnabled, panelWidth: assistantPanelWidth, shouldPushContent } = useAssistant()

const open = ref(false)

// region Navigation ////
const { navigationByFramework, navigationMenuByCategory } = useNavigation(navigation!)
const { mobileLinks } = useHeader()
const filteredNavigation = computed(() => {
  if (!cleanedSearchTerm.value) {
    return navigationMenuByCategory.value
  }
  return navigationMenuByCategory.value?.filter(item => contains(item.label ?? '', cleanedSearchTerm.value) || contains(item?.description ?? '', cleanedSearchTerm.value))
})
// endregion ////

// region ColorMode ////
const colorMode = useColorMode()

function toggleMode() {
  colorMode.preference = !(colorMode.value === 'dark') ? 'dark' : 'light'
}
// endregion ////

// region Search ////
const searchTerm = ref('')
const isSearchActive = computed(() => route.path.startsWith('/docs/components'))
const isPanelCollapsed = ref(isSearchActive.value)
const navigationKey = computed(() => `${route.path}-${searchTerm.value ? 'filtered' : 'unfiltered'}`)
const cleanedSearchTerm = computed(() => {
  return searchTerm.value
    .replace(/^B24(?=[A-Z])/, '')
    .replace(/^b24-/, '')
})

watch(() => route.path, () => {
  if (!isSearchActive.value) {
    searchTerm.value = ''
    isPanelCollapsed.value = false
  }
})

const input = useTemplateRef('input')
// endregion ////

// region Shortcuts ////
defineShortcuts({
  'shift_D': () => {
    toggleMode()
  },
  '/': {
    usingInput: false,
    handler: () => {
      input?.value?.inputRef?.focus()
    }
  }
})
// endregion ////
</script>

<template>
  <template v-if="route.path.startsWith('/examples')">
    <slot />
  </template>
  <template v-else-if="route.path.startsWith('/showcase')">
    <slot />
  </template>
  <template v-else-if="route.path.startsWith('/templates')">
    <slot />
  </template>
  <B24DashboardGroup
    v-else
    class="transition-[margin-right] duration-200 ease-linear will-change-[margin-right]"
    :class="[route.path.startsWith('/docs/') && 'root']"
    :style="{ marginRight: shouldPushContent ? `${assistantPanelWidth}px` : '0' }"
  >
    <B24DashboardSidebar
      id="default"
      v-model:open="open"
      v-model:collapsed="isPanelCollapsed"
      mode="drawer"
      :collapsible="false"
      resizable
      class="bg-(--ui-color-design-outline-bg-alt) backdrop-blur-md"
      :b24ui="{ footer: 'border-t border-(--ui-color-divider-default)' }"
    >
      <template #header>
        <LogoWithVersion no-padding />
      </template>

      <template #default="{ collapsed }">
        <FrameworkTabs v-if="!collapsed " />
        <div v-if="!collapsed && isSearchActive" class="ps-[20px] pe-xs rtl:ps-xs rtl:pe-[20px] pb-[12px]">
          <B24Input ref="input" v-model="searchTerm" placeholder="Filter..." class="group">
            <template #trailing>
              <B24Kbd value="/" dd-class="ring-(--ui-color-design-plain-na-content-secondary) bg-transparent text-muted" />
            </template>
          </B24Input>
        </div>
        <B24ContentSearchButton
          v-else
          :collapsed="collapsed"
          class="ms-4"
        />

        <B24NavigationMenu
          :collapsed="collapsed"
          :items="mobileLinks"
          orientation="vertical"
          tooltip
          popover
          :class="[route.path === '/' ? '' : 'lg:hidden']"
        />

        <B24NavigationMenu
          :key="navigationKey"
          :collapsed="collapsed"
          :items="filteredNavigation"
          orientation="vertical"
          tooltip
          popover
          :b24ui="{ linkLeadingBadge: 'mt-auto -top-[4px] left-auto -right-[50px]  bg-blue-500' }"
        />
      </template>

      <template #footer="{ collapsed }">
        <ExtLinks v-show="!collapsed" />
      </template>
    </B24DashboardSidebar>

    <slot />

    <ClientOnly>
      <LazySearch :files="files" :navigation="navigationByFramework" />
      <template v-if="isAssistantEnabled">
        <LazyAssistantPanel />
        <LazyAssistantFloatingInput />
      </template>
    </ClientOnly>
  </B24DashboardGroup>
</template>
