<script setup lang="ts">
/**
 * @todo add B24AvatarGroup
 * @todo remove class from B24Button
 * @todo remove class from B24Avatar
 */
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import theme from '#build/b24ui/avatar'
import IncertImageIcon from '@bitrix24/b24icons-vue/editor/IncertImageIcon'

usePageMeta.setPageTitle('Avatar')

const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
</script>

<template>
  <ExampleGrid>
    <ExampleCard title="Size" class="col-span-2">
      <ExampleCardSubTitle title="text" />
      <div class="flex items-center justify-start gap-4">
        <B24Avatar
          v-for="size in sizes"
          :key="size"
          :text="size as string"
          :size="size"
        />
      </div>
      <ExampleCardSubTitle title="src" />
      <div class="flex items-center justify-start gap-4">
        <B24Avatar
          v-for="size in sizes"
          :key="size"
          src="https://github.com/bitrix24.png"
          text="B24"
          :size="size"
        />
      </div>
      <ExampleCardSubTitle title="icon" />
      <div class="flex items-center justify-start gap-4">
        <B24Avatar
          v-for="size in sizes"
          :key="size"
          :icon="IncertImageIcon"
          :size="size"
        />
      </div>
      <ExampleCardSubTitle title="alt" />
      <div class="flex items-center justify-start gap-4">
        <B24Avatar
          v-for="size in sizes"
          :key="size"
          text="B24"
          :size="size"
        />
      </div>
    </ExampleCard>
    <ExampleCard title="Avatar Group" class="col-span-4">
      <ExampleCardSubTitle title="max:2" />
      <div class="flex items-center justify-start gap-4">
        <B24AvatarGroup v-for="size in sizes" :key="size" :size="size" :max="2">
          <B24Chip inset text="1">
            <B24Avatar src="https://github.com/bitrix24.png" text="B24" />
          </B24Chip>
          <B24Avatar src="https://github.com/serg-vostrikov-bitrix.png" alt="Serg Vostrikov" />
          <B24Avatar src="https://github.com/IgorShevchik.png" alt="Shevchik Igor" />
        </B24AvatarGroup>
      </div>
      <ExampleCardSubTitle title="max:4" />
      <div class="flex items-center justify-start gap-4">
        <B24AvatarGroup v-for="size in sizes" :key="size" :size="size" :max="4">
          <B24Avatar src="https://github.com/bitrix24.png" alt="John Doe" />
          <B24Avatar src="https://github.com/serg-vostrikov-bitrix.png" alt="Serg Vostrikov" />
          <B24Avatar src="https://github.com/IgorShevchik.png" alt="Shevchik Igor" />
        </B24AvatarGroup>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
