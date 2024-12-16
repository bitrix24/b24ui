<script setup lang="ts">
import theme from '#build/b24ui/button'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import DownloadDoubleIcon from '@bitrix24/b24icons-vue/actions/DownloadDoubleIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'

usePageMeta.setPageTitle('Button')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const depths = Object.keys(theme.variants.depth) as Array<keyof typeof theme.variants.depth>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

function onClick() {
  return new Promise<void>(res => setTimeout(res, 4000))
}
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <template v-for="color in colors" :key="color">
      <ExampleCard :title="color as string" class="md:col-span-2">
        <template v-for="size in sizes" :key="size">
          <ExampleCardSubTitle :title="size as string" />
          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              to="/"
              :color="color"
              :depth="depth"
              :size="size"
            >
              Link Long Text
            </B24Button>
          </div>

          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              label="Button"
              :color="color"
              :depth="depth"
              :size="size"
            />
          </div>
          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              label="Button Long Text"
              :color="color"
              :depth="depth"
              :size="size"
              rounded
            />
          </div>

          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              label="Button"
              :icon="RocketIcon"
              :color="color"
              :depth="depth"
              :size="size"
            />
          </div>

          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              label="Button"
              :avatar="{ src: '/avatar/employee.png' }"
              :color="color"
              :depth="depth"
              :size="size"
            />
          </div>

          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              label="Button"
              :color="color"
              :depth="depth"
              :size="size"
              use-dropdown
            />
          </div>

          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              label="Button"
              :icon="RocketIcon"
              :color="color"
              :depth="depth"
              :size="size"
              use-dropdown
            />
          </div>

          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              label="Button"
              :avatar="{ src: '/avatar/assistant.png' }"
              :color="color"
              :depth="depth"
              :size="size"
              use-dropdown
            />
          </div>
        </template>
        <ExampleCardSubTitle title="normal case" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Button
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :depth="depth"
            normal-case
          >
            Button
          </B24Button>
        </div>
        <ExampleCardSubTitle title="change class" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Button
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :depth="depth"
            class="font-thin"
          >
            Button
          </B24Button>
        </div>
        <ExampleCardSubTitle title="disabled" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Button
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :depth="depth"
            disabled
          >
            Disabled Button
          </B24Button>
        </div>
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Button
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :depth="depth"
            to="/"
            disabled
          >
            Disabled Link
          </B24Button>
        </div>
        <ExampleCardSubTitle title="loading" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Button
            :color="color"
            loading
            use-wait
          >
            Loading
          </B24Button>

          <B24Button
            :color="color"
            loading
            use-clock
          >
            Loading
          </B24Button>

          <B24Button
            :color="color"
            loading
          >
            Loading
          </B24Button>

          <B24Button
            :color="color"
            loading-auto
            use-clock
            @click="onClick"
          >
            Loading auto
          </B24Button>
        </div>
        <ExampleCardSubTitle title="block" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Button
            :color="color"
            :icon="RocketIcon"
            label="Block Long Text"
            block
            use-dropdown
            class="max-w-[160px]"
          />
        </div>
        <ExampleCardSubTitle title="tw-group" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Button
            :color="color"
            :icon="DownloadDoubleIcon"
            label="Button"
            class="group"
            :b24ui="{ leadingIcon: 'group-hover:animate-pulse' }"
          />
        </div>
        <ExampleCardSubTitle title="chip" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Chip text="+1">
            <B24Button
              :color="color"
              label="Button"
            />
          </B24Chip>
          <B24Chip>
            <B24Button
              :color="color"
              label="Button"
            />
          </B24Chip>
          <B24Button
            :color="color"
            label="Button"
          >
            <template #trailing>
              <B24Chip standalone text="+1" />
            </template>
          </B24Button>
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="icon">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <template v-for="color in colors" :key="color">
          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              :icon="TaskIcon"
              :color="color"
              :depth="depth"
              :size="size"
            />
          </div>
        </template>
      </template>
    </ExampleCard>
    <ExampleCard title="rounded icon">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <template v-for="color in colors" :key="color">
          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              :icon="TaskIcon"
              :color="color"
              :depth="depth"
              :size="size"
              rounded
            />
          </div>
        </template>
      </template>
    </ExampleCard>
    <ExampleCard title="avatar">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <template v-for="color in colors" :key="color">
          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              :avatar="{ src: '/avatar/employee.png' }"
              :color="color"
              :depth="depth"
              :size="size"
            />
          </div>
        </template>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
