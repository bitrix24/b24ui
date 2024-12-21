<script setup lang="ts">
import usePageMeta from './../composables/usePageMeta'

usePageMeta.setPageTitle('Playground')
</script>

<template>
  <div class="w-full">
    <div
      v-for="(group) in usePageMeta.groups"
      :key="group.id"
      class="mb-md"
    >
      <div class="mb-sm font-b24-secondary text-h4 font-light leading-8 text-base-900 dark:text-base-200">
        {{ group.label }}
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(266px,1fr))] gap-y-sm gap-x-xs">
        <B24Link
          v-for="(item) in group.items"
          :key="item.id"
          class="bg-white dark:bg-white/10 py-sm2 px-xs2 cursor-pointer rounded-md flex flex-row gap-sm border-2 transition-shadow shadow hover:shadow-lg relative border-white dark:border-white/10 hover:border-primary"
          :to="`/${group.id}/${item.id}`"
        >
          <B24Avatar
            :icon="item.icon"
            size="2xl"
            :b24ui="item.iconClass"
          />
          <div class="max-w-11/12">
            <div class="font-b24-secondary text-black dark:text-base-150 text-h6 leading-4 mb-xs font-semibold line-clamp-2">
              {{ item.label }}
            </div>
            <div
              class="font-b24-primary text-sm text-base-500 line-clamp-2"
              :title="item.description"
            >
              <div>{{ item.description }}</div>
            </div>
          </div>
        </B24Link>
      </div>
    </div>
  </div>
</template>
