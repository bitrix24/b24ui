<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import type { ContentNavigationItem } from '@nuxt/content'
import { mapContentNavigation } from '@bitrix24/b24ui-nuxt/utils/content'
import { withTrailingSlash } from 'ufo'

const route = useRoute()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const items = computed<NavigationMenuItem[]>(() => mapContentNavigation(navigation?.value.map(item => ({ ...item, children: undefined })) ?? [])?.map(item => ({
  ...item,
  to: withTrailingSlash(item.to as string),
  active: route.path.startsWith(item.to as string)
})) as NavigationMenuItem[])
</script>

<template>
  <B24Separator class="hidden lg:flex" />

  <B24Container class="hidden lg:flex items-center justify-between pt-2.5 px-0">
    <B24NavigationMenu
      :items="items"
      class="ps-2px"
    />

    <FrameworkTabs />
  </B24Container>
</template>
