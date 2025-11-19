<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/dashboard-search-button'
import type { ButtonProps, ButtonSlots, IconComponent, KbdProps, TooltipProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type DashboardSearchButton = ComponentConfig<typeof theme, AppConfig, 'dashboardSearchButton'>

export interface DashboardSearchButtonProps extends Omit<ButtonProps, 'icon' | 'label' | 'color'> {
  /**
   * The icon displayed in the button.
   * @defaultValue icons.search
   * @IconComponent
   */
  icon?: IconComponent
  /**
   * The label displayed in the button.
   * @defaultValue t('dashboardSearchButton.label')
   */
  label?: string
  /**
   * The color of the button.
   * @defaultValue 'air-tertiary-no-accent'
   */
  color?: ButtonProps['color']
  /**
   * Whether the button is collapsed.
   * @defaultValue false
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
  b24ui?: DashboardSearchButton['slots'] & ButtonProps['b24ui']
  class?: any
}
</script>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useForwardProps } from 'reka-ui'
import { defu } from 'defu'
import { reactiveOmit, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { useDashboard } from '../utils/dashboard'
import { omit, transformUI } from '../utils'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'
import B24Kbd from './Kbd.vue'
import B24Tooltip from './Tooltip.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DashboardSearchButtonProps>(), {
  color: 'air-tertiary-no-accent',
  collapsed: false,
  tooltip: false,
  kbds: () => ['meta', 'k']
})
const slots = defineSlots<ButtonSlots>()

const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate()

const getProxySlots = () => omit(slots, ['trailing'])

const buttonProps = useForwardProps(reactiveOmit(props, 'icon', 'label', 'collapsed', 'tooltip', 'kbds', 'class', 'b24ui'))
const tooltipProps = toRef(() => defu(typeof props.tooltip === 'boolean' ? {} : props.tooltip, { delayDuration: 0, content: { side: 'right' } }) as TooltipProps)

const { t } = useLocale()
const appConfig = useAppConfig() as DashboardSearchButton['AppConfig']
const { toggleSearch } = useDashboard({ toggleSearch: () => {} })

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.dashboardSearchButton || {}) })({
  collapsed: props.collapsed
}))
</script>

<template>
  <DefineButtonTemplate>
    <B24Button
      :icon="icon || icons.search"
      :label="label || t('dashboardSearchButton.label')"
      v-bind="{
        ...buttonProps,
        ...(collapsed ? {
          'aria-label': label || t('dashboardSearchButton.label')
        } : {
          color: 'air-secondary-no-accent'
        }),
        ...$attrs
      }"
      data-slot="base"
      :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
      :b24ui="transformUI(b24ui, props.b24ui)"
      @click="toggleSearch"
    >
      <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>

      <template #trailing="{ b24ui: b24uiProxy }">
        <div data-slot="trailing" :class="b24ui.trailing({ class: props.b24ui?.trailing })">
          <slot name="trailing" :b24ui="b24uiProxy">
            <template v-if="kbds?.length">
              <B24Kbd
                v-for="(kbd, index) in kbds"
                :key="index"
                v-bind="typeof kbd === 'string' ? { value: kbd } : kbd"
              />
            </template>
          </slot>
        </div>
      </template>
    </B24Button>
  </DefineButtonTemplate>

  <B24Tooltip v-if="collapsed && tooltip" :text="label || t('dashboardSearchButton.label')" v-bind="tooltipProps">
    <ReuseButtonTemplate />
  </B24Tooltip>
  <ReuseButtonTemplate v-else />
</template>
