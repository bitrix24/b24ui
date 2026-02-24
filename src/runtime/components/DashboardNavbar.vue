<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/dashboard-navbar'
import type { DashboardContext } from '../utils/dashboard'
import type { ButtonProps, IconComponent, LinkPropsKeys } from '../types'
import type { ComponentConfig } from '../types/tv'

type DashboardNavbar = ComponentConfig<typeof theme, AppConfig, 'dashboardNavbar'>

export interface DashboardNavbarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The icon displayed next to the title.
   * @IconComponent
   */
  icon?: IconComponent
  title?: string
  /**
   * Customize the toggle button to open the sidebar.
   * `{ color: 'air-tertiary', size: 'md' }`{lang="ts-type"}
   * @defaultValue true
   */
  toggle?: boolean | Omit<ButtonProps, LinkPropsKeys>
  /**
   * The side to render the toggle button on.
   * @defaultValue 'left'
   */
  toggleSide?: 'left' | 'right'
  class?: any
  b24ui?: DashboardNavbar['slots']
}

type DashboardNavbarSlotsProps = Omit<DashboardContext, 'storage' | 'storageKey' | 'persistent' | 'unit'>

export interface DashboardNavbarSlots {
  title(props?: {}): any
  leading(props: DashboardNavbarSlotsProps & { b24ui: DashboardNavbar['b24ui'] }): any
  trailing(props: DashboardNavbarSlotsProps & { b24ui: DashboardNavbar['b24ui'] }): any
  left(props: DashboardNavbarSlotsProps): any
  default(props: DashboardNavbarSlotsProps): any
  right(props: DashboardNavbarSlotsProps): any
  toggle(props: DashboardNavbarSlotsProps & { b24ui: DashboardNavbar['b24ui'] }): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useDashboard } from '../utils/dashboard'
import { tv } from '../utils/tv'
import B24DashboardSidebarToggle from './DashboardSidebarToggle.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DashboardNavbarProps>(), {
  toggle: true,
  toggleSide: 'left'
})
const slots = defineSlots<DashboardNavbarSlots>()

const appConfig = useAppConfig() as DashboardNavbar['AppConfig']
const uiProp = useComponentUI('dashboardNavbar', props)
const dashboardContext = useDashboard({})

const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.dashboardNavbar || {}) })())
</script>

<template>
  <DefineToggleTemplate>
    <slot name="toggle" v-bind="{ ...dashboardContext, b24ui }">
      <B24DashboardSidebarToggle
        v-if="toggle"
        v-bind="(typeof toggle === 'object' ? toggle : {})"
        :side="toggleSide"
        data-slot="toggle"
        :class="b24ui.toggle({ class: uiProp?.toggle, toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <Primitive :as="as" v-bind="$attrs" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <div data-slot="left" :class="b24ui.left({ class: uiProp?.left })">
      <ReuseToggleTemplate v-if="toggleSide === 'left'" />

      <slot name="left" v-bind="dashboardContext">
        <slot name="leading" v-bind="{ ...dashboardContext, b24ui }">
          <Component
            :is="icon"
            v-if="icon"
            data-slot="icon"
            :class="b24ui.icon({ class: uiProp?.icon })"
          />
        </slot>

        <h1 data-slot="title" :class="b24ui.title({ class: uiProp?.title })">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <slot name="trailing" v-bind="{ ...dashboardContext, b24ui }" />
      </slot>
    </div>

    <div v-if="!!slots.default" data-slot="center" :class="b24ui.center({ class: uiProp?.center })">
      <slot v-bind="dashboardContext" />
    </div>

    <div data-slot="right" :class="b24ui.right({ class: uiProp?.right })">
      <slot name="right" v-bind="dashboardContext" />

      <ReuseToggleTemplate v-if="toggleSide === 'right'" />
    </div>
  </Primitive>
</template>
