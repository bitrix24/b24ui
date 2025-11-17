<script lang="ts">
import type { CollapsibleRootProps, CollapsibleRootEmits } from 'reka-ui'
import type { TocLink } from '@nuxt/content'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/content/content-toc'
import type { IconComponent } from '../../types'
import type { ComponentConfig } from '../../types/tv'

type ContentToc = ComponentConfig<typeof theme, AppConfig, 'contentToc'>

export type ContentTocLink = TocLink & {
  class?: any
  b24ui?: Pick<ContentToc['slots'], 'item' | 'itemWithChildren' | 'link' | 'linkText'>
}

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

type SlotProps<T> = (props: { link: T }) => any

export interface ContentTocSlots<T extends ContentTocLink = ContentTocLink> {
  leading(props: { open: boolean, b24ui: ContentToc['b24ui'] }): any
  default(props: { open: boolean }): any
  trailing(props: { open: boolean, b24ui: ContentToc['b24ui'] }): any
  content(props: { links: T[] }): any
  link: SlotProps<T>
  top(props: { links?: T[] }): any
  bottom(props: { links?: T[] }): any
}
</script>

<script setup lang="ts" generic="T extends ContentTocLink">
import { computed } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent, useForwardPropsEmits } from 'reka-ui'
import { reactivePick, createReusableTemplate } from '@vueuse/core'
import { useRouter, useAppConfig, useNuxtApp } from '#imports'
import { useScrollspy } from '../../composables/useScrollspy'
import { useLocale } from '../../composables/useLocale'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ContentTocProps<T>>(), {
  as: 'nav'
})
const emits = defineEmits<ContentTocEmits>()
const slots = defineSlots<ContentTocSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'open', 'defaultOpen'), emits)

const { t } = useLocale()
const router = useRouter()
const appConfig = useAppConfig() as ContentToc['AppConfig']
const { activeHeadings, updateHeadings } = useScrollspy()

const [DefineListTemplate, ReuseListTemplate] = createReusableTemplate<{ links: T[], level: number }>({
  props: {
    links: Array,
    level: Number
  }
})
const [DefineTriggerTemplate, ReuseTriggerTemplate] = createReusableTemplate<{ open: boolean }>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.contentToc || {}) })({}))

function scrollToHeading(id: string) {
  const encodedId = encodeURIComponent(id)
  router.push(`#${encodedId}`)
  emits('move', id)
}

const nuxtApp = useNuxtApp()

nuxtApp.hooks.hook('page:loading:end', () => {
  const headings = Array.from(document.querySelectorAll('h2, h3'))
  updateHeadings(headings)
})
nuxtApp.hooks.hook('page:transition:finish', () => {
  const headings = Array.from(document.querySelectorAll('h2, h3'))
  updateHeadings(headings)
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
      <slot :open="open">{{ title || t('contentToc.title') }}</slot>
    </span>

    <span data-slot="trailing" :class="b24ui.trailing({ class: props.b24ui?.trailing })">
      <slot name="trailing" :open="open" :b24ui="b24ui">
        <Component
          :is="trailingIcon || icons.chevronDown"
          data-slot="trailingIcon"
          :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
        />
      </slot>
    </span>
  </DefineTriggerTemplate>

  <CollapsibleRoot
    v-slot="{ open }"
    v-bind="{ ...rootProps, ...$attrs }"
    :default-open="defaultOpen"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <div data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <div v-if="!!slots.top" data-slot="top" :class="b24ui.top({ class: props.b24ui?.top })">
        <slot name="top" :links="links" />
      </div>

      <template v-if="links?.length">
        <CollapsibleTrigger data-slot="trigger" :class="b24ui.trigger({ class: 'lg:hidden' })">
          <ReuseTriggerTemplate :open="open" />
        </CollapsibleTrigger>

        <CollapsibleContent data-slot="content" :class="b24ui.content({ class: [props.b24ui?.content, 'lg:hidden'] })">
          <slot name="content" :links="links">
            <ReuseListTemplate :links="links" :level="0" />
          </slot>
        </CollapsibleContent>

        <p data-slot="trigger" :class="b24ui.trigger({ class: 'hidden lg:flex' })">
          <ReuseTriggerTemplate :open="open" />
        </p>

        <div data-slot="content" :class="b24ui.content({ class: [props.b24ui?.content, 'hidden lg:flex'] })">
          <slot name="content" :links="links">
            <ReuseListTemplate :links="links" :level="0" />
          </slot>
        </div>
      </template>

      <div v-if="!!slots.bottom" data-slot="bottom" :class="b24ui.bottom({ class: props.b24ui?.bottom, body: !!slots.top || !!links?.length })">
        <slot name="bottom" :links="links" />
      </div>
    </div>
  </CollapsibleRoot>
</template>
