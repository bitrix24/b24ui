<script setup lang="ts">
import BtnSpinnerIcon from '@bitrix24/b24icons-vue/button-specialized/BtnSpinnerIcon'

useHead({
  htmlAttrs: {
    // 'dark' | 'light' | 'edge-dark' | 'edge-light'
    class: `edge-dark`
  }
})

const route = useRoute()

const slots = defineSlots()

const pageStore = usePageStore()
</script>

<template>
  <B24SidebarLayout
    :use-light-content="!pageStore.isLoading"
  >
    <template #sidebar>
      <B24SidebarHeader>
        <div class="h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
          <div class="flex flex-row flex-nowrap items-center justify-start gap-[6px]">
            <LogoWithVersion />
          </div>
        </div>
      </B24SidebarHeader>
      <B24SidebarBody>
        <B24NavigationMenu
          :key="route.path"
          :items="pageStore.navigationMenuByCategory.value"
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

    <div v-if="pageStore.isLoading">
      <div class="cursor-wait isolate absolute z-1000 inset-0 w-full flex flex-row flex-nowrap items-center justify-center h-[400px] min-h-[400px]">
        <BtnSpinnerIcon
          class="text-(--ui-color-design-plain-content-icon-secondary) size-[110px] animate-spin-slow"
          aria-hidden="true"
        />
      </div>
    </div>

    <template v-if="slots['header'] && !pageStore.isLoading" #content-top>
      <slot name="header" />
    </template>
    <template v-if="slots['right'] && !pageStore.isLoading" #content-right>
      <slot name="right" />
    </template>

    <div v-show="!pageStore.isLoading">
      <slot />
    </div>

    <template v-if="!pageStore.isLoading" #content-bottom>
      <Footer />
    </template>
  </B24SidebarLayout>
</template>
