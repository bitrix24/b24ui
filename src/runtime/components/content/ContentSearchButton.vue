<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/content/content-search-button'
import type { IconComponent } from '../../types/icons'
import type { ButtonProps, ButtonSlots } from '../Button.vue'
import type { KbdProps } from '../Kbd.vue'
import type { LinkPropsKeys } from '../Link.vue'
import type { TooltipProps } from '../Tooltip.vue'
import type { ComponentConfig } from '../../types/tv'

type ContentSearchButton = ComponentConfig<typeof theme, AppConfig, 'contentSearchButton'>

export interface ContentSearchButtonProps extends Omit<ButtonProps, LinkPropsKeys | 'icon' | 'label' | 'color'> {
  /**
   * The icon displayed in the button. Set to `false` to hide the icon.
   * @defaultValue icons.search
   * @IconComponent
   */
  icon?: IconComponent | false
  /**
   * The label displayed in the button.
   * @defaultValue t('contentSearchButton.label')
   */
  label?: string
  /**
   * The color of the button.
   * @defaultValue 'air-tertiary-no-accent'
   */
  color?: ButtonProps['color']
  /**
   * Whether the button is collapsed.
   * @defaultValue true
   */
  collapsed?: boolean
  /**
   * Display a tooltip on the button when is collapsed with the button label.
   * This has priority over the global `tooltip` prop.
   */
  tooltip?: boolean | TooltipProps
  /**
   * The keyboard keys to display in the button.
   * `{ accent: 'default' }`{lang="ts-type"}
   * @defaultValue ['meta', 'k']
   */
  kbds?: KbdProps['value'][] | KbdProps[]
  b24ui?: ContentSearchButton['slots'] & ButtonProps['b24ui']
  class?: any
}
</script>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { defu } from 'defu'
import { reactiveOmit, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { useForwardProps } from '../../composables/useForwardProps'
import { useContentSearch } from '../../composables/useContentSearch'
import { useLocale } from '../../composables/useLocale'
import { omit, transformUI } from '../../utils'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24Button from '../Button.vue'
import B24Kbd from '../Kbd.vue'
import B24Tooltip from '../Tooltip.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<ContentSearchButtonProps>(), {
  color: 'air-tertiary-no-accent',
  collapsed: true,
  tooltip: false,
  kbds: () => ['meta', 'k']
})
const slots = defineSlots<ButtonSlots>()

const props = useComponentProps('contentSearchButton', _props)

const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate()

const getProxySlots = () => omit(slots, ['trailing'])

const buttonProps = useForwardProps(reactiveOmit(props, 'icon', 'label', 'collapsed', 'tooltip', 'kbds', 'class', 'b24ui'))
const tooltipProps = toRef(() => defu(typeof props.tooltip === 'boolean' ? {} : props.tooltip, { delayDuration: 0, content: { side: 'right' } }) as TooltipProps)

const { t } = useLocale()
const { open } = useContentSearch()
const appConfig = useAppConfig() as ContentSearchButton['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.contentSearchButton || {}) })({
  collapsed: props.collapsed
}))
</script>

<template>
  <DefineButtonTemplate>
    <B24Button
      :icon="props.icon === false ? undefined : (props.icon ?? icons.search)"
      :label="props.label || t('contentSearchButton.label')"
      v-bind="{
        ...buttonProps,
        ...(props.collapsed ? {
          'aria-label': props.label || t('contentSearchButton.label')
        } : {
          color: 'air-secondary-no-accent'
        }),
        ...$attrs
      }"
      data-slot="base"
      :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
      :b24ui="transformUI(b24ui, props.b24ui)"
      @click="open = true"
    >
      <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>

      <template #trailing="{ b24ui: b24uiProxy }">
        <div data-slot="trailing" :class="b24ui.trailing({ class: props.b24ui?.trailing })">
          <slot name="trailing" :b24ui="b24uiProxy">
            <template v-if="props.kbds?.length">
              <B24Kbd
                v-for="(kbd, index) in props.kbds"
                :key="index"
                v-bind="typeof kbd === 'string' ? { value: kbd } : kbd"
              />
            </template>
          </slot>
        </div>
      </template>
    </B24Button>
  </DefineButtonTemplate>

  <B24Tooltip v-if="props.collapsed && props.tooltip" :text="props.label || t('contentSearchButton.label')" v-bind="tooltipProps">
    <ReuseButtonTemplate />
  </B24Tooltip>
  <ReuseButtonTemplate v-else />
</template>
