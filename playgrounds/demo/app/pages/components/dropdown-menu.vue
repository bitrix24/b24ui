<script setup lang="ts">
import { computed, onMounted } from 'vue'
import theme from '#build/b24ui/dropdown-menu'
import { useMockMenu } from './../../composables/useMockMenu'
import More9Cubes1Icon from '@bitrix24/b24icons-vue/actions/More9Cubes1Icon'
import CircleCheckThinIcon from '@bitrix24/b24icons-vue/main/CircleCheckThinIcon'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'

const { dropdownMenuItems } = useMockMenu()

const itemsWithColor = computed(() => Object.keys(theme.variants.color).map(color => ({
  color: (color as keyof typeof theme.variants.color),
  description: color.includes('air-') ? `Some color: ${color}` : undefined,
  icon: More9Cubes1Icon,
  label: color
})))

onMounted(() => {
  defineShortcuts(extractShortcuts(dropdownMenuItems.value))
})
</script>

<template>
  <PlaygroundPage>
    <div class="relative w-full min-h-[360px] flex items-center justify-center">
      <canvas ref="myCanvas" class="z-0 absolute inset-0 size-full" />
      <div
        class="text-center backdrop-blur-sm bg-(--ui-color-design-outline-na-bg) border border-(--ui-color-design-outline-na-stroke) text-(--ui-color-design-outline-na-content) max-w-[550px] px-[60px] py-5xl rounded-[24px] flex flex-col items-center justify-center gap-xs2"
      >
        <B24Avatar
          :icon="HamburgerMenuIcon"
          alt="DropdownMenu"
          size="3xl"
          :b24ui="{
            root: 'bg-transparent ring-2 ring-(--ui-color-design-outline-na-content-icon)',
            icon: 'size-[74px] text-(--ui-color-design-outline-na-content-icon)'
          }"
        />
        <ProseH2 class="leading-[29px] mb-0">
          DropdownMenu
        </ProseH2>
        <ProseP accent="less">
          A contextual menu for actions triggered by clicking an element
        </ProseP>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-[15px]">
          <B24DropdownMenu
            :items="itemsWithColor"
            arrow
            :content="{ side: 'bottom', align: 'center' }"
          >
            <B24Button label="Color" color="air-primary" :icon="HamburgerMenuIcon" />
          </B24DropdownMenu>

          <B24DropdownMenu
            :items="dropdownMenuItems"
            arrow
            :content="{ side: 'bottom', align: 'center' }"
          >
            <B24Button color="air-secondary-accent" :icon="MoreMIcon" />

            <template #custom-trailing>
              <CircleCheckThinIcon class="shrink-0 size-lg text-(--ui-color-copilot-accent-primary)" />
            </template>
          </B24DropdownMenu>
        </div>
      </div>
    </div>
  </PlaygroundPage>
</template>
