<script setup lang="ts">
import theme from '#build/b24ui/form-field'
import usePageMeta from './../../composables/usePageMeta'

usePageMeta.setPageTitle('FormField')

const isUseBg = ref(true)

const sizes = Object.keys(theme.variants.size)
const orientations = Object.keys(theme.variants.orientation)

const attrs = reactive({
  size: [theme.defaultVariants.size],
  orientation: [theme.defaultVariants.orientation]
})

const feedbacks = [
  { description: 'This is a description' },
  { error: 'This is an error' },
  { hint: 'This is a hint' },
  { help: 'This is a help' },
  { required: true }
]
</script>

<template>
  <B24PageGrid v-once class="lg:grid-cols-4 gap-5">
    <B24Card variant="outline">
      <template #header>
        <div class="flex flex-row items-center justify-between gap-2">
          <ProseH5 class="mb-0">
            Options
          </ProseH5>
          <B24Switch v-model="isUseBg" label="isUseBg" size="xs" />
        </div>
      </template>
      <div class="mb-4 flex flex-col gap-4">
        <B24Select v-model="attrs.size" :items="sizes" multiple />
        <B24Select v-model="attrs.orientation" :items="orientations" multiple />
      </div>
    </B24Card>

    <Matrix v-slot="props" :attrs="attrs">
      <B24Card :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'">
        <template #header>
          <ProseH5 class="mb-0">
            {{ [props?.size, props?.orientation].join(' ') }}
          </ProseH5>
        </template>

        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <template v-for="(feedback, index) in feedbacks" :key="index">
            <B24FormField label="Email" name="email" v-bind="{ ...feedback, ...props }" class="data-[orientation=horizontal]:w-full">
              <B24Input placeholder="john@lennon.com" />
            </B24FormField>
          </template>
        </div>
      </B24Card>
    </Matrix>
  </B24PageGrid>
</template>
