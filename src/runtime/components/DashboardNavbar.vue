<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/dashboard-navbar'
import type { DashboardContext } from '../utils/dashboard'
import type { IconComponent } from '../types/icons'
import type { ButtonProps } from './Button.vue'
import type { LinkPropsKeys } from './Link.vue'
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
  title?(props?: {}): VNode[]
  leading?(props: DashboardNavbarSlotsProps & { b24ui: DashboardNavbar['b24ui'] }): VNode[]
  trailing?(props: DashboardNavbarSlotsProps & { b24ui: DashboardNavbar['b24ui'] }): VNode[]
  left?(props: DashboardNavbarSlotsProps): VNode[]
  default?(props: DashboardNavbarSlotsProps): VNode[]
  right?(props: DashboardNavbarSlotsProps): VNode[]
  toggle?(props: DashboardNavbarSlotsProps & { b24ui: DashboardNavbar['b24ui'] }): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useDashboard } from '../utils/dashboard'
import { tv } from '../utils/tv'
import B24DashboardSidebarToggle from './DashboardSidebarToggle.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<DashboardNavbarProps>(), {
  toggle: true,
  toggleSide: 'left'
})
const slots = defineSlots<DashboardNavbarSlots>()

const props = useComponentProps('dashboardNavbar', _props)

const appConfig = useAppConfig() as DashboardNavbar['AppConfig']
const dashboardContext = useDashboard({})

const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.dashboardNavbar || {}) })())
</script>

<template>
  <DefineToggleTemplate>
    <slot name="toggle" v-bind="{ ...dashboardContext, b24ui }">
      <B24DashboardSidebarToggle
        v-if="props.toggle"
        v-bind="(typeof props.toggle === 'object' ? props.toggle : {})"
        :side="props.toggleSide"
        data-slot="toggle"
        :class="b24ui.toggle({ class: props.b24ui?.toggle, toggleSide: props.toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <Primitive :as="props.as" v-bind="$attrs" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div data-slot="left" :class="b24ui.left({ class: props.b24ui?.left })">
      <ReuseToggleTemplate v-if="props.toggleSide === 'left'" />

      <slot name="left" v-bind="dashboardContext">
        <slot name="leading" v-bind="{ ...dashboardContext, b24ui }">
          <Component
            :is="props.icon"
            v-if="props.icon"
            data-slot="icon"
            :class="b24ui.icon({ class: props.b24ui?.icon })"
          />
        </slot>

        <h1 data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </h1>

        <slot name="trailing" v-bind="{ ...dashboardContext, b24ui }" />
      </slot>
    </div>

    <div v-if="!!slots.default" data-slot="center" :class="b24ui.center({ class: props.b24ui?.center })">
      <slot v-bind="dashboardContext" />
    </div>

    <div data-slot="right" :class="b24ui.right({ class: props.b24ui?.right })">
      <slot name="right" v-bind="dashboardContext" />

      <ReuseToggleTemplate v-if="props.toggleSide === 'right'" />
    </div>
  </Primitive>
</template>
