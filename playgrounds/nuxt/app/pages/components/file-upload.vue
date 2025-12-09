<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/file-upload'
import usePageMeta from './../../composables/usePageMeta'
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'
import UploadIcon from '@bitrix24/b24icons-vue/outline/UploadIcon'

usePageMeta.setPageTitle('FileUpload')

const isUseBg = ref(true)

const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const variants = Object.keys(theme.variants.variant) as Array<keyof typeof theme.variants.variant>
const layouts = Object.keys(theme.variants.layout) as Array<keyof typeof theme.variants.layout>
const positions = Object.keys(theme.variants.position) as Array<keyof typeof theme.variants.position>

const color = ref<keyof typeof theme.variants.color>('air-primary')
const size = ref<keyof typeof theme.variants.size>('md')
const variant = ref<keyof typeof theme.variants.variant>('area')
const layout = ref<keyof typeof theme.variants.layout>('grid')
const position = ref<keyof typeof theme.variants.position>('outside')
const preview = ref(true)

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const MIN_DIMENSIONS = { width: 200, height: 200 }
const MAX_DIMENSIONS = { width: 4096, height: 4096 }
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const schema = z.object({
  avatar: z
    .instanceof(File, {
      message: 'Please select an image file.'
    })
    .refine(file => file.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`
    })
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Please upload a valid image file (JPEG, PNG, or WebP).'
    })
    .refine(
      file =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const img = new Image()
            img.onload = () => {
              const meetsDimensions
                = img.width >= MIN_DIMENSIONS.width
                  && img.height >= MIN_DIMENSIONS.height
                  && img.width <= MAX_DIMENSIONS.width
                  && img.height <= MAX_DIMENSIONS.height
              resolve(meetsDimensions)
            }
            img.src = e.target?.result as string
          }
          reader.readAsDataURL(file)
        }),
      {
        message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`
      }
    )
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  avatar: undefined
})

const value = ref<File | null>(null)
const valueMultiple = ref<File[]>([])

function createObjectUrl(file: File): string {
  return URL.createObjectURL(file)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}
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
        <B24Select v-model="color" :items="colors" />
        <B24Select v-model="size" :items="sizes" />
        <B24Select v-model="variant" :items="variants" />
        <B24Select v-model="layout" :items="layouts" />
        <B24Select v-model="position" :items="positions" />
        <B24Switch v-model="preview" label="preview" size="xs" />
      </div>
    </B24Card>

    <B24Card :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'" class="md:col-span-1">
      <template #header>
        <ProseH5 class="mb-0">
          ver1
        </ProseH5>
      </template>

      <div class="flex flex-col items-center gap-8">
        <B24Form :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <B24FormField
            name="avatar"
            label="Avatar"
            description="JPG, GIF or PNG. 1MB Max."
            :color="color"
            :size="size"
          >
            <B24FileUpload v-slot="{ open, removeFile }" v-model="state.avatar" accept="image/*" :preview="preview">
              <div class="flex flex-wrap items-center gap-3">
                <B24Avatar size="lg" :src="state.avatar ? createObjectUrl(state.avatar) : undefined" :icon="ImageIcon" />

                <B24Button :label="state.avatar ? 'Change image' : 'Upload image'" color="air-selection" @click="open()" />
              </div>

              <p v-if="state.avatar" class="text-(length:--ui-font-size-xs) text-(--b24ui-typography-description-color) mt-1.5">
                {{ state.avatar.name }}

                <B24Button
                  label="Remove"
                  color="air-primary-alert"
                  size="xs"
                  class="p-0"
                  @click="removeFile()"
                />
              </p>
            </B24FileUpload>
          </B24FormField>

          <B24Button label="Submit" type="submit" />
        </B24Form>
      </div>
    </B24Card>

    <B24Card :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'" class="md:col-span-2">
      <template #header>
        <ProseH5 class="mb-0">
          ver2
        </ProseH5>
      </template>

      <div class="flex flex-col items-center gap-8">
        <B24FileUpload
          v-model="value"
          :color="color"
          :size="size"
          :variant="variant"
          :layout="layout"
          :position="position"
          :preview="preview"
          label="Drop your image here"
          description="SVG, PNG, JPG or GIF (max. 2MB)"
          :class="variant === 'area' ? 'w-full min-h-44' : ''"
        />
      </div>
    </B24Card>

    <B24Card :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'" class="md:col-span-4">
      <template #header>
        <ProseH5 class="mb-0">
          ver3
        </ProseH5>
      </template>

      <div class="flex flex-col items-center gap-8">
        <B24FileUpload
          v-model="valueMultiple"
          :color="color"
          :size="size"
          :variant="variant"
          :layout="layout"
          :position="position"
          :preview="preview"
          :icon="ImageIcon"
          label="Drop your images here"
          description="SVG, PNG, JPG or GIF (max. 2MB)"
          multiple
          :interactive="false"
          class="w-full min-h-44"
        >
          <template #actions="{ open }">
            <B24Button
              label="Select images"
              :icon="UploadIcon"
              color="air-selection"
              :size="size"
              @click="open()"
            />
          </template>

          <template v-if="layout === 'grid' || position === 'inside'" #files-top="{ open, files }">
            <div v-if="files?.length" class="mb-2 flex items-center justify-between">
              <p class="font-(--ui-font-weight-bold)">
                Files ({{ files?.length }})
              </p>

              <B24Button
                label="Add files"
                color="air-selection"
                :size="size"
                class="-my-2"
                @click="open()"
              />
            </div>
          </template>

          <template v-if="layout === 'list'" #files-bottom="{ removeFile, files }">
            <B24Button
              v-if="files?.length"
              label="Remove files"
              color="air-primary-alert"
              class="self-start"
              :size="size"
              @click="removeFile(0)"
            />
          </template>
        </B24FileUpload>
      </div>
    </B24Card>
  </B24PageGrid>
</template>
