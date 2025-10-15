<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const slots = defineSlots()
const route = useRoute()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { navigationMenuByCategory } = useNavigation(navigation!)

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
      </B24SidebarHeader>
      <B24SidebarBody>
        <B24NavigationMenu
          :key="route.path"
          :items="navigationMenuByCategory"
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
