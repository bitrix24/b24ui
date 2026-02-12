<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'

usePageMeta.setPageTitle('Skeleton')

const isUseBg = ref(true)
</script>

<template>
  <B24PageGrid v-once class="lg:grid-cols-4 gap-5">
    <B24Card variant="outline">
      <template #header>
        <div class="flex flex-row items-center justify-between gap-2">
          <ProseH5 class="mb-0">
            Options
          </ProseH5>
          <B24Switch v-model="isUseBg" label="isUseBg" size="xs" />
        </div>
      </template>
    </B24Card>

    <B24Card :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'" class="md:col-span-1">
      <template #header>
        <ProseH5 class="mb-0">
          simple
        </ProseH5>
      </template>

      <div class="mb-8 w-full flex items-center gap-4">
        <B24Skeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
          <B24Skeleton class="h-4 w-[150px]" />
          <B24Skeleton class="h-4 w-[100px]" />
        </div>
      </div>
    </B24Card>

    <B24Card :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'" class="md:col-span-1">
      <template #header>
        <ProseH5 class="mb-0">
          rtl & accent
        </ProseH5>
      </template>

      <div class="mb-4 w-full flex items-center justify-end gap-4">
        <div class="space-y-2 flex flex-col items-end">
          <B24Skeleton accent="accent" class="h-4 w-[150px]" />
          <B24Skeleton accent="accent" class="h-4 w-[100px]" />
        </div>
        <B24Skeleton accent="accent" class="h-12 w-12 rounded-full" />
      </div>
    </B24Card>

    <B24Card :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'" class="md:col-span-1">
      <template #header>
        <ProseH5 class="mb-0">
          less
        </ProseH5>
      </template>

      <div class="mb-8 w-full flex items-center gap-4">
        <B24Skeleton accent="less" class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
          <B24Skeleton accent="less" class="h-4 w-[150px]" />
          <B24Skeleton accent="less" class="h-4 w-[100px]" />
        </div>
      </div>
    </B24Card>
  </B24PageGrid>
</template>
