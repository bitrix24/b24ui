<script setup lang="ts">
import { useRoute, useRouter } from '#imports'
import { upperName } from '../utils'
import ChevronLeftLIcon from '@bitrix24/b24icons-vue/outline/ChevronLeftLIcon'
import ChevronRightLIcon from '@bitrix24/b24icons-vue/outline/ChevronRightLIcon'
import GoToLIcon from '@bitrix24/b24icons-vue/outline/GoToLIcon'

const route = useRoute()
const router = useRouter()

defineProps<{
  to?: string
}>()

const name = computed(() => route.path.split('/').pop() as string)
const title = computed(() => upperName(name.value))

const components = inject<{ to: string, label: string }[]>('components')

const index = computed(() => components?.findIndex(component => component.to === route.path) ?? -1)

function navigate(index: number) {
  router.push(components?.[index]?.to as string)
}

defineShortcuts({
  j: () => navigate(index.value + 1),
  k: () => navigate(index.value - 1)
})
</script>

<template>
  <B24DashboardNavbar
    :title="title"
    :b24ui="{
      left: 'shrink-0',
      right: 'shrink overflow-x-auto py-2'
    }"
    class="absolute top-0 inset-x-0 z-5 bg-(--ui-color-bg-content-primary)"
  >
    <template #toggle>
      <B24DashboardSidebarToggle size="sm" class="ring-(--ui-color-divider-default)" />
      <B24DashboardSidebarCollapse size="sm" class="ring-(--ui-color-divider-default)" />
    </template>

    <template #leading>
      <B24FieldGroup size="sm">
        <B24Button
          :icon="ChevronLeftLIcon"
          color="air-secondary-accent"
          :disabled="index === 0"
          class="ring-(--ui-color-divider-default)"
          aria-label="Previous component"
          @click="navigate(index - 1)"
        />
        <B24Button
          :icon="ChevronRightLIcon"
          :disabled="index === (components?.length ?? 0) - 1"
          class="ring-(--ui-color-divider-default)"
          aria-label="Next component"
          @click="navigate(index + 1)"
        />
      </B24FieldGroup>
    </template>

    <template #trailing>
      <B24Button
        color="air-tertiary"
        :icon="GoToLIcon"
        :to="to || `https://bitrix24.github.io/b24ui/docs/components/${name}/`"
        target="_blank"
        size="xs"
        aria-label="Open component in docs"
      />
      <slot name="trailing" />
    </template>

    <template #right>
      <slot />
    </template>
  </B24DashboardNavbar>
</template>
