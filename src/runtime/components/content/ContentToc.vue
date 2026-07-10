<script lang="ts">
import type { CollapsibleRootProps, CollapsibleRootEmits } from 'reka-ui'
import type { VNode } from 'vue'
import type { TocLink } from '@nuxt/content'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/content/content-toc'
import type { IconComponent } from '../../types/icons'
import type { ComponentConfig } from '../../types/tv'

type ContentToc = ComponentConfig<typeof theme, AppConfig, 'contentToc'>

export type ContentTocLink = TocLink & {
  class?: any
  b24ui?: Pick<ContentToc['slots'], 'item' | 'itemWithChildren' | 'link' | 'linkText'>
}

/**
 * @memo We not support: color, highlight, highlightColor, highlightVariant
 * @todo refactoring is necessary
 */
export interface ContentTocProps<T extends ContentTocLink = ContentTocLink> extends Pick<CollapsibleRootProps, 'defaultOpen' | 'open'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any
  /**
   * The icon displayed to collapse the content.
   * @defaultValue icons.chevronDown
   * @IconComponent
   */
  trailingIcon?: IconComponent
  /**
   * The title of the table of contents.
   * @defaultValue t('contentToc.title')
   */
  title?: string
  links?: T[]
  class?: any
  b24ui?: ContentToc['slots']
}

export type ContentTocEmits = CollapsibleRootEmits & {
  move: [id: string]
}

type SlotProps<T> = (props: { link: T }) => VNode[]

export interface ContentTocSlots<T extends ContentTocLink = ContentTocLink> {
  leading?(props: { open: boolean, b24ui: ContentToc['b24ui'] }): VNode[]
  default?(props: { open: boolean }): VNode[]
  trailing?(props: { open: boolean, b24ui: ContentToc['b24ui'] }): VNode[]
  content?(props: { links: T[] }): VNode[]
  link?: SlotProps<T>
  top?(props: { links?: T[] }): VNode[]
  bottom?(props: { links?: T[] }): VNode[]
}
</script>

<script setup lang="ts" generic="T extends ContentTocLink">
import { computed, onUnmounted, useTemplateRef, watch, nextTick } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from 'reka-ui'
import { reactivePick, createReusableTemplate } from '@vueuse/core'
import { useRouter, useAppConfig, useNuxtApp } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { useForwardProps } from '../../composables/useForwardProps'
import { useScrollspy } from '../../composables/useScrollspy'
import { useScrollShadow } from '../../composables/useScrollShadow'
import { useLocale } from '../../composables/useLocale'
import { usePrefix } from '../../composables/usePrefix'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<ContentTocProps<T>>(), {
  as: 'nav'
})
const emits = defineEmits<ContentTocEmits>()
const slots = defineSlots<ContentTocSlots<T>>()

const props = useComponentProps<ContentTocProps<T>>('contentToc', _props)

const rootProps = useForwardProps(reactivePick(props, 'as', 'open', 'defaultOpen'), emits)

const { t } = useLocale()
const router = useRouter()
const appConfig = useAppConfig() as ContentToc['AppConfig']
const prefix = usePrefix()
const { activeHeadings, updateHeadings } = useScrollspy()

const contentRef = useTemplateRef<HTMLElement>('contentRef')
const { style: scrollShadowStyle } = useScrollShadow(contentRef)

const [DefineListTemplate, ReuseListTemplate] = createReusableTemplate<{ links: T[], level: number }>({
  props: {
    links: Array,
    level: Number
  }
})
const [DefineTriggerTemplate, ReuseTriggerTemplate] = createReusableTemplate<{ open: boolean }>()

// @memo We not support: color, highlight, highlightVariant, highlightColor
// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.contentToc || {}) })({}))

function scrollToHeading(id: string) {
  const encodedId = encodeURIComponent(id)
  router.push(`#${encodedId}`)
  emits('move', id)
}

function flattenLinks(links: T[]): T[] {
  return links.flatMap(link => [link, ...(link.children ? flattenLinks(link.children as T[]) : [])])
}

// function flattenLinksWithLevel(links: T[], level = 0): { link: T, level: number }[] {
//   return links.flatMap(link => [
//     { link, level },
//     ...(link.children ? flattenLinksWithLevel(link.children as T[], level + 1) : [])
//   ])
// }

// const linkHeight = 1.75 // rem — text-sm line-height (1.25rem) + py-1 (0.5rem)

const activeIndex = computed(() => {
  if (!activeHeadings.value?.length) {
    return -1
  }

  return flattenLinks(props.links || []).findIndex(link => activeHeadings.value.includes(link.id))
})

// Keep the active link centered within the (desktop) list when it changes.
// Scroll the container directly rather than `scrollIntoView` so only the list
// moves, never the page.
watch(activeIndex, (index) => {
  const container = contentRef.value
  if (index < 0 || !container) {
    return
  }

  nextTick(() => {
    const link = container.querySelectorAll<HTMLElement>('a[data-slot="link"]')[index]
    if (!link) {
      return
    }

    const containerRect = container.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    const linkOffset = (linkRect.top - containerRect.top) + container.scrollTop

    container.scrollTo({
      top: linkOffset - container.clientHeight / 2 + linkRect.height / 2,
      behavior: 'smooth'
    })
  })
})

const nuxtApp = useNuxtApp()

function refreshHeadings() {
  const flatLinks = flattenLinks(props.links || [])
  if (!flatLinks.length) {
    updateHeadings([])
    return
  }
  const selector = flatLinks.map(l => `#${CSS.escape(l.id)}`).join(', ')
  const headings = Array.from(document.querySelectorAll(selector))
  updateHeadings(headings)
}

const offLoadingEnd = nuxtApp.hooks.hook('page:loading:end', refreshHeadings)
const offTransitionFinish = nuxtApp.hooks.hook('page:transition:finish', refreshHeadings)

onUnmounted(() => {
  offLoadingEnd()
  offTransitionFinish()
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-template-shadow -->
  <DefineListTemplate v-slot="{ links, level }">
    <ul :class="level > 0 ? b24ui.listWithChildren({ class: props.b24ui?.listWithChildren }) : b24ui.list({ class: props.b24ui?.list })">
      <li v-for="(link, index) in links" :key="index" :class="link.children && link.children.length > 0 ? b24ui.itemWithChildren({ class: [props.b24ui?.itemWithChildren, link.b24ui?.itemWithChildren] }) : b24ui.item({ class: [props.b24ui?.item, link.b24ui?.item] })">
        <a
          :href="`#${link.id}`"
          data-slot="link"
          :class="b24ui.link({ class: [props.b24ui?.link, link.b24ui?.link, link.class], active: activeHeadings.includes(link.id) })"
          @click.prevent="scrollToHeading(link.id)"
        >
          <slot name="link" :link="link">
            <span data-slot="linkText" :class="b24ui.linkText({ class: [props.b24ui?.linkText, link.b24ui?.linkText] })">
              {{ link.text }}
            </span>
          </slot>
        </a>

        <ReuseListTemplate v-if="link.children?.length" :links="(link.children as T[])" :level="level + 1" />
      </li>
    </ul>
  </DefineListTemplate>

  <DefineTriggerTemplate v-slot="{ open }">
    <slot name="leading" :open="open" :b24ui="b24ui" />

    <span data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
      <slot :open="open">{{ props.title || t('contentToc.title') }}</slot>
    </span>

    <span data-slot="trailing" :class="b24ui.trailing({ class: props.b24ui?.trailing })">
      <slot name="trailing" :open="open" :b24ui="b24ui">
        <Component
          :is="props.trailingIcon || icons.chevronDown"
          data-slot="trailingIcon"
          :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
        />
      </slot>
    </span>
  </DefineTriggerTemplate>

  <CollapsibleRoot
    v-slot="{ open }"
    v-bind="{ ...rootProps, ...$attrs }"
    :default-open="props.defaultOpen"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <div data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <div v-if="!!slots.top" data-slot="top" :class="b24ui.top({ class: props.b24ui?.top })">
        <slot name="top" :links="props.links" />
      </div>

      <template v-if="props.links?.length">
        <CollapsibleTrigger data-slot="trigger" :class="b24ui.trigger({ class: [props.b24ui?.trigger, prefix('lg:hidden')] })">
          <ReuseTriggerTemplate :open="open" />
        </CollapsibleTrigger>

        <CollapsibleContent data-slot="content" :class="b24ui.content({ class: [props.b24ui?.content, prefix('lg:hidden')] })">
          <slot name="content" :links="props.links">
            <ReuseListTemplate :links="props.links" :level="0" />
          </slot>
        </CollapsibleContent>

        <p data-slot="trigger" :class="b24ui.trigger({ class: [props.b24ui?.trigger, prefix('hidden lg:flex')] })">
          <ReuseTriggerTemplate :open="open" />
        </p>

        <div ref="contentRef" data-slot="content" :class="b24ui.content({ class: [props.b24ui?.content, prefix('hidden lg:flex')] })" :style="scrollShadowStyle">
          <slot name="content" :links="props.links">
            <ReuseListTemplate :links="props.links" :level="0" />
          </slot>
        </div>
      </template>

      <div v-if="!!slots.bottom" data-slot="bottom" :class="b24ui.bottom({ class: props.b24ui?.bottom, body: !!slots.top || !!props.links?.length })">
        <slot name="bottom" :links="props.links" />
      </div>
    </div>
  </CollapsibleRoot>
</template>
