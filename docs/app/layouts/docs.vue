<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const slots = defineSlots()
const route = useRoute()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { navigationMenuByCategory, contains, searchTerm } = useDocs(navigation!)
const input = useTemplateRef('input')

const isActiveSearch = computed(() => route.path.startsWith('/docs/components'))

const filteredNavigation = computed(() => {
  if (!searchTerm.value) {
    return navigationMenuByCategory.value
  }

  return navigationMenuByCategory.value.filter(child => contains(child.label as string, searchTerm.value) || contains((child?.description || '') as string, searchTerm.value))
})

watch(() => route.path, () => {
  if (!isActiveSearch.value) {
    searchTerm.value = ''
  }
})

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
        <div v-if="isActiveSearch" class="ps-[20px] pe-xs rtl:ps-xs rtl:pe-[20px] pb-[12px]">
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
          :key="route.path"
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

    <slot />

    <template #content-bottom>
      <Footer />
    </template>
  </B24SidebarLayout>
</template>
