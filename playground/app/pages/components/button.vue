<script setup lang="ts">
import { upperFirst } from 'scule'
import theme from '#build/b24ui/button'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import ChevronDownIcon from '@bitrix24/b24icons-vue/actions/ChevronDownIcon'
import DownloadDoubleIcon from '@bitrix24/b24icons-vue/actions/DownloadDoubleIcon'

usePageMeta.setPageTitle('Button')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const depths = Object.keys(theme.variants.depth) as Array<keyof typeof theme.variants.depth>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

function onClick() {
  return new Promise<void>(res => setTimeout(res, 5000))
}
</script>

<template>
  <ExampleGrid custom-grid-cols class="mb-2 grid-cols-[repeat(auto-fill,minmax(460px,1fr))]">
    <template v-for="color in colors" :key="color">
      <ExampleCard :title="color as string">
        <template v-for="size in sizes" :key="size">
          <ExampleCardSubTitle :title="size as string" />
          <div class="mb-4 flex items-center justify-start gap-4">
            <B24Button
              v-for="depth in depths"
              :key="depth"
              label="Button"
              :color="color"
              :depth="depth"
              :size="size"
            />
          </div>
        </template>
        <ExampleCardSubTitle title="normal case" />
        <div class="mb-4 flex items-center justify-start gap-4">
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
        <div class="mb-4 flex items-center justify-start gap-4">
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
        <ExampleCardSubTitle title="tag link" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :depth="depth"
            to="/"
          >
            Link
          </B24Button>
        </div>
        <ExampleCardSubTitle title="disabled" />
        <div class="mb-4 flex items-center justify-start gap-4">
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
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :depth="depth"
            to="#"
            disabled
          >
            Disabled Link
          </B24Button>
        </div>
        <ExampleCardSubTitle title="loading" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :depth="depth"
            loading
          >
            Loading
          </B24Button>
        </div>
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :depth="depth"
            loading-auto
            @click="onClick"
          >
            Loading auto
          </B24Button>
        </div>
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :depth="depth"
            loading
            trailing
          >
            Loading trailing
          </B24Button>
        </div>
        <ExampleCardSubTitle title="block" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :depth="depth"
            :icon="RocketIcon"
            :trailing-icon="ChevronDownIcon"
            label="Block"
            block
          />
        </div>
        <ExampleCardSubTitle title="group" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :depth="depth"
            :icon="DownloadDoubleIcon"
            label="Button"
            class="group"
            :b24ui="{ leadingIcon: 'group-hover:animate-pulse' }"
          />
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>
  <!--ExampleGrid custom-grid-cols class="mb-2 grid-cols-[repeat(auto-fill,minmax(800px,1fr))]">
    <ExampleCard title="label & icon">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :label="upperFirst(color as string)"
            :icon="RocketIcon"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="label & avatar">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :label="upperFirst(color as string)"
            :avatar="{ src: 'https://github.com/IgorShevchik.png' }"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="icon">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :icon="RocketIcon"
            :label="upperFirst(color as string)"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="avatar">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :avatar="{ src: 'https://github.com/IgorShevchik.png' }"
            :label="upperFirst(color as string)"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="square icon">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :icon="RocketIcon"
            label="Square"
            square
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="square avatar">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :avatar="{ src: 'https://github.com/IgorShevchik.png' }"
            label="Square"
            square
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="no label & icon">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :icon="RocketIcon"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="no label & avatar">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center justify-start gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :avatar="{ src: 'https://github.com/IgorShevchik.png' }"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid-->
</template>
