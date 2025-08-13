<script setup lang="ts">
/**
 * @todo add Popover
 */
import theme from '#build/b24ui/button'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('ButtonGroup')

const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const depths = Object.keys(theme.variants.depth) as Array<keyof typeof theme.variants.depth>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const knowledgeBase = ['Select', 'Create']
const smartScripts = ['Scripts', 'Create script', 'Install from Bitrix24.Market']

const items = [
  [{ label: 'Knowledge base', type: 'label' }, ...knowledgeBase],
  [{ label: 'Smart scripts', type: 'label' }, ...smartScripts]
]

function onClick() {
  return new Promise<void>(res => setTimeout(res, 3000))
}
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base" class="md:col-span-2">
      <ExampleCardSubTitle title="single" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24ButtonGroup>
          <B24Button
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
        </B24ButtonGroup>

        <B24ButtonGroup>
          <B24Input name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
        </B24ButtonGroup>

        <B24ButtonGroup>
          <B24Select class="w-40" :items="items" name="some_value" placeholder="Choose a value&hellip;" aria-label="Choose a value" />
        </B24ButtonGroup>

        <B24ButtonGroup>
          <B24Badge color="default" use-fill label="https://" />
        </B24ButtonGroup>
      </div>

      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <template v-for="depth in depths" :key="depth">
            <B24ButtonGroup>
              <B24Button
                :color="color"
                :depth="depth"
                :class="color === 'link' && depth !== 'dark' ? 'ps-4 pe-4' : ''"
                loading-auto
                use-clock
                @click="onClick"
              >
                Button
              </B24Button>
              <B24Button :color="color" :depth="depth" use-dropdown />
            </B24ButtonGroup>
          </template>
          <B24ButtonGroup>
            <B24Button
              rounded
              :color="color"
              :class="color === 'link' ? 'ps-4 pe-4' : ''"
              loading-auto
              use-clock
              @click="onClick"
            >
              Button
            </B24Button>
            <B24Button rounded :color="color" use-dropdown />
          </B24ButtonGroup>
        </div>
      </template>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24ButtonGroup>
          <B24Button
            label="Button"
            loading-auto
            use-clock
            @click="onClick"
          />
          <B24Button
            label="Button"
            loading-auto
            use-clock
            @click="onClick"
          />
          <B24Button
            label="Button"
            loading-auto
            use-clock
            @click="onClick"
          />
          <B24Button use-dropdown />
        </B24ButtonGroup>
      </div>

      <ExampleCardSubTitle title="size & no-split" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24ButtonGroup size="sm" no-split>
          <B24Button
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
          <B24Button
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
          <B24Button
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
        </B24ButtonGroup>
      </div>

      <ExampleCardSubTitle title="vertical" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24ButtonGroup orientation="vertical">
          <B24Button
            color="air-primary-success"
            label="Button"
            loading-auto
            use-clock
            @click="onClick"
          />
          <B24Button
            color="air-primary-success"
            label="Button"
            loading
            use-wait
          />
          <B24Button
            color="air-primary-success"
            label="Button"
            loading-auto
            use-clock
            @click="onClick"
          />
        </B24ButtonGroup>
      </div>
    </ExampleCard>
    <ExampleCard title="input" class="mb-4 md:col-span-4">
      <ExampleCardSubTitle title="orientation" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24ButtonGroup orientation="vertical">
          <B24Button
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
          <B24Input name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
        </B24ButtonGroup>

        <B24ButtonGroup orientation="vertical" size="sm" no-split>
          <B24InputNumber class="w-40" placeholder="some number" />
          <B24Button
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
        </B24ButtonGroup>

        <B24ButtonGroup no-split>
          <B24Badge color="default" use-fill label="https://" />
          <B24Input name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
          <B24Button
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
        </B24ButtonGroup>

        <B24ButtonGroup no-split>
          <B24Button
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
          <B24Input name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
        </B24ButtonGroup>
      </div>

      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24ButtonGroup :size="size" no-split>
            <B24Input class="w-40" name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
            <B24Button
              loading-auto
              use-clock
              @click="onClick"
            >
              Button
            </B24Button>
          </B24ButtonGroup>

          <B24ButtonGroup :size="size" no-split>
            <B24Select
              class="w-40"
              :items="items"
              name="some_value"
              placeholder="Choose a value&hellip;"
              aria-label="Choose a value"
            />
            <B24Button
              color="air-primary"
              loading-auto
              use-clock
              @click="onClick"
            >
              Button
            </B24Button>
          </B24ButtonGroup>

          <B24ButtonGroup :size="size" no-split>
            <B24Badge color="default" use-fill label="https://" />
            <B24Input class="w-40" type="url" placeholder="www.example.com" />
          </B24ButtonGroup>

          <B24ButtonGroup :size="size" no-split>
            <B24Badge color="default" use-fill label="https://" />
            <B24Input class="w-40" type="url" placeholder="www.example.com" />
            <B24Button
              color="air-primary-copilot"
              loading-auto
              use-clock
              label="Button"
              @click="onClick"
            />
          </B24ButtonGroup>

          <B24ButtonGroup :size="size" no-split>
            <B24SelectMenu
              class="w-40"
              :items="items"
              name="some_value"
              placeholder="Choose a value&hellip;"
              aria-label="Choose a value"
            />
            <B24Button
              color="air-primary-copilot"
              loading-auto
              use-clock
              @click="onClick"
            >
              Button
            </B24Button>
          </B24ButtonGroup>

          <B24ButtonGroup :size="size" no-split>
            <B24InputNumber class="w-40" placeholder="some number" />
            <B24Button
              loading-auto
              use-clock
              @click="onClick"
            >
              Button
            </B24Button>
          </B24ButtonGroup>
        </div>
      </template>

      <ExampleCardSubTitle title="not-use-group" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Select class="w-40" :items="items" name="some_value" placeholder="Choose a value&hellip;" aria-label="Choose a value" />
        <B24Select class="w-40" :items="items" name="some_value" placeholder="Choose a value&hellip;" aria-label="Choose a value" />
        <B24Select class="w-40" :items="items" name="some_value" placeholder="Choose a value&hellip;" aria-label="Choose a value" />
      </div>

      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input class="w-40" name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
        <B24Input class="w-40" name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
        <B24Input class="w-40" name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
      </div>

      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Button
          color="air-primary"
          loading-auto
          use-clock
          @click="onClick"
        >
          Button
        </B24Button>
        <B24Button
          color="air-primary"
          loading-auto
          use-clock
          @click="onClick"
        >
          Button
        </B24Button>
        <B24Button
          color="air-primary"
          loading-auto
          use-clock
          @click="onClick"
        >
          Button
        </B24Button>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
