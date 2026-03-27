<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import type { ContentNavigationItem } from '@nuxt/content'
import { mapContentNavigation } from '@bitrix24/b24ui-nuxt/utils/content'

const route = useRoute()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const items = computed<NavigationMenuItem[]>(() => mapContentNavigation(navigation?.value.map(item => ({ ...item, children: undefined })) ?? [])?.map(item => ({
  ...item,
  active: route.path.startsWith(item.to as string)
})) as NavigationMenuItem[])
</script>

<template>
  <B24Separator class="hidden lg:flex" />

  <B24Container class="hidden lg:flex items-center justify-between pt-2.5 px-0">
    <B24NavigationMenu :items="items" variant="pill" highlight class="ps-2px" />

    <FrameworkTabs class="" />
  </B24Container>
</template>
