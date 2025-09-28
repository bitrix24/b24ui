<script setup lang="ts">
// import { useRoute, useRouter } from '#imports'
// import { upperName } from '../utils'
//
// const route = useRoute()
// const router = useRouter()
//
// defineProps<{
//   to?: string
// }>()
//
// const name = computed(() => route.path.split('/').pop() as string)
// const title = computed(() => upperName(name.value))
//
// const components = inject<{ to: string, label: string }[]>('components')
//
// const index = computed(() => components?.findIndex(component => component.to === route.path) ?? -1)
//
// function navigate(index: number) {
//   router.push(components?.[index]?.to as string)
// }
//
// defineShortcuts({
//   j: () => navigate(index.value + 1),
//   k: () => navigate(index.value - 1)
// })
</script>

<template>
  <div class="dd-absolute dd-top-0 dd-inset-x-0 dd-z-5 dd-bg-default">
    <slot />
  </div>
</template>
