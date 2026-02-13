<script setup lang="ts">
import { useFilter } from 'reka-ui'
import type { ContentNavigationItem } from '@nuxt/content'

const slots = defineSlots()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const route = useRoute()
const { contains } = useFilter({ sensitivity: 'base' })
const { navigationMenuByCategory } = useNavigation(navigation!)

const filteredNavigation = computed(() => {
  if (!cleanedSearchTerm.value) {
    return navigationMenuByCategory.value
  }
  return navigationMenuByCategory.value?.filter(item => contains(item.label ?? '', cleanedSearchTerm.value) || contains(item?.description ?? '', cleanedSearchTerm.value))
})

const searchTerm = ref('')
const isSearchActive = computed(() => route.path.startsWith('/docs/components'))
const navigationKey = computed(() => `${route.path}-${searchTerm.value ? 'filtered' : 'unfiltered'}`)
const cleanedSearchTerm = computed(() => {
  return searchTerm.value
    .replace(/^B24(?=[A-Z])/, '')
    .replace(/^b24-/, '')
})

watch(() => route.path, () => {
  if (!isSearchActive.value) {
    searchTerm.value = ''
  }
})

const input = useTemplateRef('input')

defineShortcuts({
  '/': {
    usingInput: false,
    handler: () => {
      input?.value?.inputRef?.focus()
    }
  }
})

const colorMode = useColorMode()
const isDark = computed(() => {
  return colorMode.value === 'dark'
})
const isMounted = ref(false)
const sidebarLayoutB24Ui = computed(() => {
  if (import.meta.server || !isMounted.value) {
    return { containerWrapper: '' }
  }
  return { containerWrapper: isDark.value ? 'dark' : 'light' }
})

onMounted(() => {
  isMounted.value = true
})

const { mobileLinks } = useHeader()
</script>

<template>
  <B24SidebarLayout
    :use-light-content="true"
    :b24ui="sidebarLayoutB24Ui"
  >
    <template #sidebar>
      <B24SidebarHeader>
        <LogoWithVersion />
        <FrameworkTabs />
        <div v-if="isSearchActive" class="ps-[20px] pe-xs rtl:ps-xs rtl:pe-[20px] pb-[12px]">
          <B24Input ref="input" v-model="searchTerm" placeholder="Filter..." class="group">
            <template #trailing>
              <B24Kbd value="/" dd-class="ring-(--ui-color-design-plain-na-content-secondary) bg-transparent text-muted" />
            </template>
          </B24Input>
        </div>
      </B24SidebarHeader>
      <B24SidebarBody
        :b24ui="{
          root: '[&>[data-component=section]+[data-component=section]]:mt-0'
        }"
      >
        <B24NavigationMenu
          class="lg:hidden"
          :items="mobileLinks"
          orientation="vertical"
        />
        <B24NavigationMenu
          :key="navigationKey"
          :items="filteredNavigation"
          orientation="vertical"
          :b24ui="{ linkLeadingBadge: '-top-[4px] left-auto -right-[50px]  bg-blue-500' }"
        />
      </B24SidebarBody>
      <B24SidebarFooter>
        <B24SidebarSection>
          <ExtLinks />
        </B24SidebarSection>
      </B24SidebarFooter>
    </template>
    <template #navbar>
      <Header />
    </template>

    <template v-if="slots['header']" #content-top>
      <slot name="header" />
    </template>
    <template v-if="slots['right']" #content-right>
      <slot name="right" />
    </template>

    <main>
      <slot />
    </main>

    <template #content-bottom>
      <Footer />
    </template>
  </B24SidebarLayout>
</template>
