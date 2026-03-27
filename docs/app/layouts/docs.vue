<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { useFilter } from 'reka-ui'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const route = useRoute()
const { contains } = useFilter({ sensitivity: 'base' })

// region Navigation ////
const { navigationMenuByCategory } = useNavigation(navigation!)
const { mobileLinks } = useHeader()
const filteredNavigation = computed(() => {
  if (!cleanedSearchTerm.value) {
    return navigationMenuByCategory.value
  }
  return navigationMenuByCategory.value?.filter(item => contains(item.label ?? '', cleanedSearchTerm.value) || contains(item?.description ?? '', cleanedSearchTerm.value))
})
// endregion ////

// region Search ////
const searchTerm = ref('')
const isSearchActive = computed(() => route.path.startsWith('/docs/components'))
const isPanelCollapsed = ref(false)
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
  <B24Main>
    <B24Container class="px-0">
      <B24Page class="lg:gap-4">
        <template #left>
          <B24PageAside class="scrollbar-thin scrollbar-transparent border-(--ui-color-divider-accent) border-e-1">
            <div v-if="isSearchActive" class="py-3">
              <B24Input ref="input" v-model="searchTerm" placeholder="Filter..." class="group">
                <template #trailing>
                  <B24Kbd value="/" />
                </template>
              </B24Input>
            </div>

            <B24NavigationMenu
              :items="mobileLinks"
              orientation="vertical"
              tooltip
              popover
              :class="[(route.path === '/' || route.path.startsWith('/templates')) ? '' : 'lg:hidden']"
            />

            <B24NavigationMenu
              :key="navigationKey"
              :items="filteredNavigation"
              orientation="vertical"
              tooltip
              popover
              :b24ui="{ linkLeadingBadge: 'mt-auto -top-[4px] left-auto -right-[50px] bg-blue-500' }"
            />

            <template #footer>
              <ExtLinks />
            </template>
          </B24PageAside>
        </template>

        <slot />
      </B24Page>
    </B24Container>
  </B24Main>
</template>
