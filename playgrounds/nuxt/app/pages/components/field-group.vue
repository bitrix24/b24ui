<script setup lang="ts">
import theme from '#build/b24ui/button'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('FieldGroup')

const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
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

// const oldColors = computed(() => {
//   return colors.filter((color) => {
//     return !color.includes('air')
//   })
// })

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base" class="md:col-span-2">
      <ExampleCardSubTitle title="single" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24FieldGroup>
          <B24Button
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
        </B24FieldGroup>

        <B24FieldGroup>
          <B24Input name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
        </B24FieldGroup>

        <B24FieldGroup>
          <B24Select class="w-40" :items="items" name="some_value" placeholder="Choose a value&hellip;" aria-label="Choose a value" />
        </B24FieldGroup>

        <B24FieldGroup>
          <B24Badge color="default" label="https://" />
        </B24FieldGroup>
      </div>

      <template v-for="color in airColors" :key="color">
        <ExampleCardSubTitle :title="color" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24FieldGroup>
            <B24Button
              rounded
              :color="color"
              loading-auto
              use-clock
              @click="onClick"
            >
              Button
            </B24Button>
            <B24Button rounded :color="color" use-dropdown />
          </B24FieldGroup>
        </div>
      </template>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24FieldGroup>
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
        </B24FieldGroup>
      </div>

      <ExampleCardSubTitle title="size & no-split" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24FieldGroup size="sm" no-split>
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
        </B24FieldGroup>
      </div>

      <ExampleCardSubTitle title="vertical" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24FieldGroup orientation="vertical">
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
        </B24FieldGroup>
      </div>
    </ExampleCard>
  </ExampleGrid>
  <B24Separator accent="accent" class="my-4" label="Input" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="Some cases" class="mb-4 md:col-span-4">
      <ExampleCardSubTitle title="orientation" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24FieldGroup orientation="vertical">
          <B24Button
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
          <B24Input name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
        </B24FieldGroup>

        <B24FieldGroup orientation="vertical" size="sm" no-split>
          <B24InputNumber class="w-40" placeholder="some number" />
          <B24Button
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
        </B24FieldGroup>

        <B24FieldGroup no-split>
          <B24Badge color="air-primary" inverted label="https://" />
          <B24Input name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
          <B24Button
            color="air-primary"
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
        </B24FieldGroup>

        <B24FieldGroup no-split>
          <B24Button
            color="air-primary-alert"
            loading-auto
            use-clock
            @click="onClick"
          >
            Button
          </B24Button>
          <B24Input name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
        </B24FieldGroup>
      </div>

      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24FieldGroup :size="size" no-split>
            <B24Input class="w-40" name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
            <B24Button
              loading-auto
              use-clock
              @click="onClick"
            >
              Button
            </B24Button>
          </B24FieldGroup>

          <B24FieldGroup :size="size" no-split>
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
          </B24FieldGroup>

          <B24FieldGroup :size="size" no-split>
            <B24Badge color="air-tertiary" label="https://" />
            <B24Input class="w-40" type="url" placeholder="www.example.com" />
          </B24FieldGroup>

          <B24FieldGroup :size="size" no-split>
            <B24Badge color="air-tertiary" label="https://" />
            <B24Input class="w-40" type="url" placeholder="www.example.com" />
            <B24Button
              color="air-primary-copilot"
              loading-auto
              use-clock
              label="Button"
              @click="onClick"
            />
          </B24FieldGroup>

          <B24FieldGroup :size="size" no-split>
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
          </B24FieldGroup>

          <B24FieldGroup :size="size" no-split>
            <B24InputNumber class="w-40" placeholder="Some number" />
            <B24Button
              loading-auto
              use-clock
              @click="onClick"
            >
              Button
            </B24Button>
          </B24FieldGroup>
        </div>
      </template>

      <ExampleCardSubTitle title="not-use-group" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Select class="w-40" :items="items" name="some_value" placeholder="Choose a value&hellip;" aria-label="Choose a value" />
        <B24Select class="w-40" :items="items" name="some_value" placeholder="Choose a value&hellip;" aria-label="Choose a value" />
        <B24Select class="w-40" :items="items" name="some_value" placeholder="Choose a value&hellip;" aria-label="Choose a value" />
      </div>

      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input class="w-40" name="search" placeholder="Insert value&hellip;" aria-label="Search" />
        <B24Input class="w-40" name="search" placeholder="Insert value&hellip;" aria-label="Search" />
        <B24Input class="w-40" name="search" placeholder="Insert value&hellip;" aria-label="Search" />
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
