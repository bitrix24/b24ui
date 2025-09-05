<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/tv'
import theme from '#build/b24ui/prose/img'

type ProseImg = ComponentConfig<typeof theme, AppConfig, 'img', 'b24ui.prose'>

export interface ProseImgProps {
  src: string
  alt: string
  width?: string | number
  height?: string | number
  /**
   * Zoom image on click
   * @defaultValue true
   */
  zoom?: boolean
  class?: any
  b24ui?: ProseImg['slots']
}
</script>

<script setup lang="ts">
import { ref, computed, useId } from 'vue'
// import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
import { DialogRoot, DialogPortal, DialogTrigger } from 'reka-ui'
import { AnimatePresence, Motion } from 'motion-v'
import { useEventListener, createReusableTemplate } from '@vueuse/core'
// @memo useRuntimeConfig not support under vue
import { useAppConfig } from '#imports'
import ImageComponent from '#build/b24ui-image-component'
import { tv } from '../../utils/tv'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ProseImgProps>(), {
  zoom: true
})

const appConfig = useAppConfig() as ProseImg['AppConfig']

const [DefineImageTemplate, ReuseImageTemplate] = createReusableTemplate()

const open = ref(false)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.img || {}) })({
  zoom: props.zoom,
  open: open.value
}))

const refinedSrc = computed(() => {
  // if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
  //   const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
  //   if (_base !== '/' && !props.src.startsWith(_base)) {
  //     return joinURL(_base, props.src)
  //   }
  // }
  return props.src
})

const layoutId = computed(() => `${refinedSrc.value}::${useId()}`)

if (props.zoom) {
  useEventListener(window, 'scroll', () => {
    open.value = false
  })
}
</script>

<template>
  <DefineImageTemplate>
    <component
      :is="ImageComponent"
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      v-bind="$attrs"
      :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
    />
  </DefineImageTemplate>

  <DialogRoot
    v-if="zoom"
    v-slot="{ close }"
    v-model:open="open"
    :modal="false"
  >
    <DialogTrigger as-child>
      <Motion :layout-id="layoutId" as-child :transition="{ type: 'spring', bounce: 0.2, duration: 0.4 }">
        <ReuseImageTemplate />
      </Motion>
    </DialogTrigger>

    <DialogPortal>
      <AnimatePresence>
        <Motion
          v-if="open"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :class="b24ui.overlay({ class: [props.b24ui?.overlay] })"
        />

        <div
          v-if="open"
          :class="b24ui.content({ class: [props.b24ui?.content] })"
          @click="close"
        >
          <Motion as-child :layout-id="layoutId" :transition="{ type: 'spring', bounce: 0.2, duration: 0.4 }">
            <ReuseImageTemplate />
          </Motion>
        </div>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>

  <ReuseImageTemplate v-else />
</template>
