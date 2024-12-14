<script setup lang="ts">
/**
 * @todo remove class from B24Button
 */
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import theme from '#build/b24ui/avatar'
import IncertImageIcon from '@bitrix24/b24icons-vue/editor/IncertImageIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'

usePageMeta.setPageTitle('Avatar')

const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="Size" class="col-span-2">
      <ExampleCardSubTitle title="text" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Avatar
          v-for="size in sizes"
          :key="size"
          :text="size as string"
          :size="size"
        />
      </div>
      <ExampleCardSubTitle title="src" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Avatar
          v-for="size in sizes"
          :key="size"
          src="https://github.com/IgorShevchik.png"
          text="Shevchik Igor"
          :size="size"
        />
      </div>
      <ExampleCardSubTitle title="icon" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Avatar
          v-for="size in sizes"
          :key="size"
          :icon="IncertImageIcon"
          :size="size"
        />
      </div>
      <ExampleCardSubTitle title="alt" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Avatar
          v-for="size in sizes"
          :key="size"
          text="B24"
          :size="size"
        />
      </div>
    </ExampleCard>
    <ExampleCard title="Avatar Group" class="col-span-2">
      <ExampleCardSubTitle title="max:2" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24AvatarGroup v-for="size in sizes" :key="size" :size="size" :max="2">
          <B24Avatar src="https://github.com/bitrix24.png" text="B24" />
          <B24Avatar src="https://github.com/serg-vostrikov-bitrix.png" alt="Serg Vostrikov" />
          <B24Avatar src="https://github.com/IgorShevchik.png" alt="Shevchik Igor" />
        </B24AvatarGroup>
      </div>
      <ExampleCardSubTitle title="max:4" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24AvatarGroup v-for="size in sizes" :key="size" :size="size" :max="4" :b24ui="{ base: 'ring-green-550 dark:ring-green-700' }">
          <B24Avatar src="https://github.com/bitrix24.png" alt="John Doe" :size="size" />
          <B24Avatar src="https://github.com/serg-vostrikov-bitrix.png" alt="Serg Vostrikov" :size="size" />
          <B24Chip inset :size="size === '3xl' ? 'sm' : '3xs'">
            <B24Avatar src="https://github.com/IgorShevchik.png" alt="Shevchik Igor" :size="size" />
          </B24Chip>
        </B24AvatarGroup>
      </div>
      <ExampleCardSubTitle title="bg && ring" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24AvatarGroup v-for="size in sizes" :key="size" :size="size" :max="4" :b24ui="{ base: 'bg-white ring-base-150' }">
          <B24Avatar :icon="PersonIcon" alt="Person" :b24ui="{ icon: 'text-base-150' }" />
          <B24Avatar :icon="PersonIcon" alt="Person" :b24ui="{ icon: 'text-base-150' }" />
          <B24Avatar :icon="PersonIcon" alt="Person" :b24ui="{ icon: 'text-base-150' }" />
        </B24AvatarGroup>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
