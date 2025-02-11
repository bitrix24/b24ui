<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import { tv } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import type { RouterLinkProps, RouteLocationRaw } from 'vue-router'
import theme from '#build/b24ui/link'

interface NuxtLinkProps extends Omit<RouterLinkProps, 'to'> {
  /**
   * Route Location the link should navigate to when clicked on.
   */
  to?: RouteLocationRaw // need to manually type to avoid breaking typedPages
  /**
   * An alias for `to`. If used with `to`, `href` will be ignored
   */
  href?: NuxtLinkProps['to']
  /**
   * Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases
   */
  external?: boolean
  /**
   * Where to display the linked URL, as the name for a browsing context.
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null
  /**
   * A rel attribute value to apply on the link. Defaults to "noopener noreferrer" for external links.
   */
  rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | null
  /**
   * If set to true, no rel attribute will be added to the link
   */
  noRel?: boolean
  /**
   * A class to apply to links that have been prefetched.
   */
  prefetchedClass?: string
  /**
   * When enabled will prefetch middleware, layouts and payloads of links in the viewport.
   */
  prefetch?: boolean
  /**
   * Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility.
   */
  prefetchOn?: 'visibility' | 'interaction' | Partial<{
    visibility: boolean
    interaction: boolean
  }>
  /**
   * Escape hatch to disable `prefetch` attribute.
   */
  noPrefetch?: boolean
}

const appConfigLink = _appConfig as AppConfig & { b24ui: { link: Partial<typeof theme> } }

const link = tv({ extend: tv(theme), ...(appConfigLink.b24ui?.link || {}) })

export interface LinkProps extends NuxtLinkProps {
  /**
   * The element or component this component should render as when not a link.
   * @defaultValue 'button'
   */
  as?: any
  /**
   * The type of the button when not a link.
   * @defaultValue 'button'
   */
  type?: ButtonHTMLAttributes['type']
  disabled?: boolean
  /** Force the link to be active independent of the current route. */
  active?: boolean
  /** Will only be active if the current route is an exact match. */
  exact?: boolean
  /** Will only be active if the current route query is an exact match. */
  exactQuery?: boolean
  /** Will only be active if the current route hash is an exact match. */
  exactHash?: boolean
  /** The class to apply when the link is inactive. */
  inactiveClass?: string
  custom?: boolean
  /** When `true`, uses special underlined styling. */
  isAction?: boolean
  /** When `true`, only styles from `class`, `activeClass`, and `inactiveClass` will be applied. */
  raw?: boolean
  class?: any
}

export interface LinkSlots {
  default(props: { active: boolean }): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { isEqual } from 'ohash'
import { useForwardProps } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { hasProtocol } from 'ufo'
import { useRoute } from '#imports'
import { RouterLink } from 'vue-router'
import B24LinkBase from './../../components/LinkBase.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'button',
  type: 'button',
  active: undefined,
  isAction: false,
  activeClass: '',
  inactiveClass: ''
})
defineSlots<LinkSlots>()

const route = useRoute()
const routerLinkProps = useForwardProps(reactiveOmit(props, 'as', 'type', 'disabled', 'active', 'exact', 'exactQuery', 'exactHash', 'activeClass', 'inactiveClass', 'to', 'raw', 'class'))

const ui = computed(() => tv({
  extend: link,
  variants: {
    active: {
      true: props.activeClass,
      false: props.inactiveClass
    }
  }
}))

const isExternal = computed(() => typeof props.to === 'string' && hasProtocol(props.to, { acceptRelative: true }))

function isLinkActive({ route: linkRoute, isActive, isExactActive }: any) {
  if (props.active !== undefined) {
    return props.active
  }

  if (!props.to) {
    return false
  }

  if (props.exactQuery && !isEqual(linkRoute.query, route.query)) {
    return false
  }
  if (props.exactHash && linkRoute.hash !== route.hash) {
    return false
  }

  if (props.exact && isExactActive) {
    return true
  }

  if (!props.exact && isActive) {
    return true
  }

  return false
}

function resolveLinkClass({ route, isActive, isExactActive }: any) {
  const active = isLinkActive({ route, isActive, isExactActive })

  if (props.raw) {
    return [props.class, active ? props.activeClass : props.inactiveClass]
  }

  return ui.value({
    class: props.class,
    active,
    disabled: props.disabled,
    isAction: Boolean(props.isAction)
  })
}
</script>

<template>
  <RouterLink v-slot="{ href, navigate, route: linkRoute, isActive, isExactActive }" v-bind="routerLinkProps" :to="to || '#'" custom>
    <template v-if="custom">
      <slot
        v-bind="{
          ...$attrs,
          as,
          type,
          disabled,
          target: props.target ? props.target : undefined,
          href: to ? (isExternal ? to as string : href) : undefined,
          navigate,
          active: isLinkActive({ route: linkRoute, isActive, isExactActive })
        }"
      />
    </template>
    <B24LinkBase
      v-else
      v-bind="{
        ...$attrs,
        as,
        type,
        disabled,
        href: to ? (isExternal ? to as string : href) : undefined,
        navigate
      }"
      :class="resolveLinkClass({ route: linkRoute, isActive: isActive, isExactActive: isExactActive })"
    >
      <slot :active="isLinkActive({ route: linkRoute, isActive, isExactActive })" />
    </B24LinkBase>
  </RouterLink>
</template>
