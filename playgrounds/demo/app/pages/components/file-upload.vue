<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/file-upload'
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'
import UploadIcon from '@bitrix24/b24icons-vue/outline/UploadIcon'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)
const variants = Object.keys(theme.variants.variant)
const layouts = Object.keys(theme.variants.layout)
const positions = Object.keys(theme.variants.position)

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  variant: theme.defaultVariants.variant,
  layout: 'grid' as keyof typeof theme.variants.layout,
  position: 'outside' as keyof typeof theme.variants.position,
  preview: true
})

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
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24Select v-model="attrs.color" class="w-44" :items="colors" placeholder="Color" multiple />
      <B24Select v-model="singleAttrs.variant" class="w-32" :items="variants" placeholder="Variant" />
      <B24Select v-model="singleAttrs.layout" class="w-32" :items="layouts" placeholder="Layout" />
      <B24Select v-model="singleAttrs.position" class="w-32" :items="positions" placeholder="Position" />
      <B24Switch v-model="singleAttrs.preview" label="Preview" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-80' }">
      <B24Form :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <B24FormField
          name="avatar"
          label="Avatar"
          description="JPG, GIF or PNG. 1MB Max."
          v-bind="props"
        >
          <B24FileUpload v-slot="{ open, removeFile }" v-model="state.avatar" accept="image/*" :preview="singleAttrs.preview">
            <div class="flex flex-wrap items-center gap-3">
              <B24Avatar size="lg" :src="state.avatar ? createObjectUrl(state.avatar) : undefined" :icon="ImageIcon" />

              <B24Button :label="state.avatar ? 'Change image' : 'Upload image'" color="air-selection" @click="open()" />
            </div>

            <p v-if="state.avatar" class="text-(length:--ui-font-size-xs) text-description mt-1.5">
              {{ state.avatar.name }}

              <B24Button
                label="Remove"
                color="air-primary-alert"
                size="sm"
                class="p-0"
                @click="removeFile()"
              />
            </p>
          </B24FileUpload>
        </B24FormField>

        <B24Button label="Submit" type="submit" />
      </B24Form>

      <B24FileUpload
        v-model="value"
        v-bind="{ ...props, ...singleAttrs }"
        label="Drop your image here"
        description="SVG, PNG, JPG or GIF (max. 2MB)"
        :class="singleAttrs.variant === 'area' ? 'w-full min-h-44' : ''"
      />

      <B24FileUpload
        v-model="valueMultiple"
        v-bind="{ ...props, ...singleAttrs }"
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
            @click="open()"
          />
        </template>

        <template v-if="singleAttrs.layout === 'grid' || singleAttrs.position === 'inside'" #files-top="{ open, files }">
          <div v-if="files?.length" class="mb-2 flex items-center justify-between">
            <p class="font-(--ui-font-weight-bold)">
              Files ({{ files?.length }})
            </p>

            <B24Button
              label="Add files"
              color="air-selection"
              class="-my-2"
              @click="open()"
            />
          </div>
        </template>

        <template v-if="singleAttrs.layout === 'list'" #files-bottom="{ removeFile, files }">
          <B24Button
            v-if="files?.length"
            label="Remove files"
            color="air-primary-alert"
            class="self-start"
            @click="removeFile(0)"
          />
        </template>
      </B24FileUpload>
    </Matrix>
  </PlaygroundPage>
</template>
