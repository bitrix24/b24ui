<script setup lang="ts">
import usePageMeta from '~/composables/usePageMeta'

useHead({
  title: 'Bitrix24 UI - Demo'
})
</script>

<template>
  <div class="w-full max-lg:px-3">
    <div
      v-for="(group) in usePageMeta.groups"
      :key="group.id"
      class="mb-md"
    >
      <div class="mb-sm font-b24-secondary text-h4 font-light leading-8 text-base-900 dark:text-base-200">
        {{ group.label }}
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(266px,1fr))] gap-y-sm gap-x-sm">
        <template v-for="(item) in group.children" :key="item.id">
          <B24Tooltip :disabled="item.description.length < 43" :text="item.description" :content="{ side: 'top' }" arrow>
            <B24Link
              raw
              class="bg-white dark:bg-white/10 py-sm2 px-xs2 cursor-pointer rounded-md flex flex-row gap-sm border-2 transition-shadow shadow hover:shadow-lg relative border-base-master/10 dark:border-base-100/20 hover:border-primary"
              :to="item.to"
            >
              <B24Avatar
                :icon="item.iconData"
                size="xl"
                :b24ui="item.iconClass"
              />
              <div class="max-w-11/12">
                <div class="font-b24-secondary text-black dark:text-base-150 text-h6 leading-4 mb-xs font-semibold line-clamp-2">
                  {{ item.label }}
                </div>
                <div class="font-b24-primary text-sm text-base-500 line-clamp-2">
                  <div>{{ item.description }}</div>
                </div>
              </div>
            </B24Link>
          </B24Tooltip>
        </template>
      </div>
    </div>
  </div>
</template>
