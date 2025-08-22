<script setup lang="ts">
import theme from '#build/b24ui/button'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import DownloadDoubleIcon from '@bitrix24/b24icons-vue/actions/DownloadDoubleIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
import TrendDownIcon from '@bitrix24/b24icons-vue/outline/TrendDownIcon'

usePageMeta.setPageTitle('Button')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const depths = Object.keys(theme.variants.depth) as Array<keyof typeof theme.variants.depth>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const btnState_1 = ref(false)

function onClick() {
  return new Promise<void>(res => setTimeout(res, 1000))
}

const oldColors = computed(() => {
  return colors.filter((color) => {
    return !color.includes('air')
  })
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="Different cases" class="md:col-span-2">
      <ExampleCardSubTitle title="icon" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Button :icon="TaskIcon" loading-auto use-clock @click="onClick" />
        <B24Button rounded :icon="TaskIcon" loading-auto use-clock @click="onClick" />
        <B24Button :avatar="{ src: '/b24ui/demo/avatar/employee.png' }" loading-auto use-clock @click="onClick" />
      </div>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Button to="/">
          Link
        </B24Button>
        <B24Button label="Button" :icon="RocketIcon" loading-auto use-clock @click="onClick" />
        <B24Button rounded label="Button rounded" loading-auto use-clock @click="onClick" />
        <B24Button use-dropdown label="Button" loading-auto use-clock @click="onClick" />
        <B24Button
          use-dropdown
          label="Button"
          :icon="RocketIcon"
          loading-auto
          use-clock
          @click="onClick"
        />
        <B24Button
          use-dropdown
          label="Button"
          :avatar="{ src: '/b24ui/demo/avatar/assistant.png' }"
          loading-auto
          use-clock
          @click="onClick"
        />
      </div>

      <ExampleCardSubTitle title="case" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Button :normal-case="false" loading-auto use-clock @click="onClick">
          Button
        </B24Button>

        <B24Button :normal-case="false" class="font-thin" loading-auto use-clock @click="onClick">
          Button
        </B24Button>
      </div>

      <ExampleCardSubTitle title="disabled" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Button disabled loading-auto use-clock @click="onClick">
          Disabled Button
        </B24Button>

        <B24Button to="/" disabled>
          Disabled Link
        </B24Button>
      </div>

      <ExampleCardSubTitle title="block" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Button
          :icon="RocketIcon"
          label="Block Long Text"
          block
          use-dropdown
          loading-auto
          use-clock
          @click="onClick"
        />
      </div>

      <ExampleCardSubTitle title="tw-group" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Button
          :icon="DownloadDoubleIcon"
          label="Button"
          class="group"
          :b24ui="{ leadingIcon: 'group-hover:text-ai-500' }"
          loading-auto
          use-clock
          @click="onClick"
        />
      </div>

      <ExampleCardSubTitle title="chip" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Chip text="1" :trailing-icon="TrendDownIcon">
          <B24Button label="Button" loading-auto use-clock @click="onClick" />
        </B24Chip>
        <B24Chip>
          <B24Button label="Button" loading-auto use-clock @click="onClick" />
        </B24Chip>
        <B24Button label="Button" loading-auto use-clock @click="onClick">
          <template #trailing>
            <B24Chip standalone text="1" />
          </template>
        </B24Button>
      </div>
    </ExampleCard>

    <ExampleCard title="Active cases" class="md:col-span-2">
      <ExampleCardSubTitle title="click to change active state" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Button
          :b24ui="{ baseLine: 'justify-center w-[200px]' }"
          :active="btnState_1"
          :label="btnState_1 ? 'Active' : 'Inactive'"
          :icon="TaskIcon"
          active-color="air-primary-alert"
          loading-auto
          use-clock
          @click="async () => { await onClick(); btnState_1 = !btnState_1 }"
        />
        <B24Button
          :b24ui="{ baseLine: 'justify-center w-[200px]' }"
          :active="btnState_1"
          :label="btnState_1 ? 'Active' : 'Inactive'"
          :icon="TaskIcon"
          active-class="italic dd-some"
          inactive-class="tracking-widest"
          loading-auto
          use-clock
          @click="async () => { await onClick(); btnState_1 = !btnState_1 }"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>

  <ExampleGrid v-once class="mb-2">
    <template v-for="color in airColors" :key="color">
      <ExampleCard :title="[color as string].join(' ')" class="md:col-span-2">
        <ExampleCardSubTitle title="size" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Button
            v-for="size in sizes"
            :key="size"
            label="Button 1"
            :color="color"
            :size="size"
            loading-auto
            use-clock
            @click="onClick"
          />
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
      </ExampleCard>
    </template>
  </ExampleGrid>

  <B24Collapsible class="mb-2">
    <B24Button
      color="air-secondary-no-accent"
      label="Deprecate"
      use-dropdown
    />

    <template #content>
      <ExampleGrid v-once class="my-2">
        <template v-for="color in oldColors" :key="color">
          <template v-for="depth in depths" :key="depth">
            <ExampleCard :title="[color as string, depth as string].join(' ')" class="md:col-span-2">
              <ExampleCardSubTitle title="size" />
              <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
                <B24Button
                  v-for="size in sizes"
                  :key="size"
                  label="Button 1"
                  :color="color"
                  :depth="depth"
                  :size="size"
                  loading-auto
                  use-clock
                  @click="onClick"
                />
              </div>

              <ExampleCardSubTitle title="loading" />
              <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
                <B24Button
                  :color="color"
                  :depth="depth"
                  loading
                  use-wait
                >
                  Loading
                </B24Button>

                <B24Button
                  :color="color"
                  :depth="depth"
                  loading
                  use-clock
                >
                  Loading
                </B24Button>

                <B24Button
                  :color="color"
                  :depth="depth"
                  loading
                >
                  Loading
                </B24Button>

                <B24Button
                  :color="color"
                  :depth="depth"
                  loading-auto
                  use-clock
                  @click="onClick"
                >
                  Loading auto
                </B24Button>
              </div>
            </ExampleCard>
          </template>
        </template>
      </ExampleGrid>
    </template>
  </B24Collapsible>
</template>
