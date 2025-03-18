<script lang="ts">
// import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/sidebar-layout'
import { tv } from '../utils/tv'

const appConfigSidebarLayout = _appConfig as AppConfig & { b24ui: { sidebarLayout: Partial<typeof theme> } }

const sidebarLayout = tv({ extend: tv(theme), ...(appConfigSidebarLayout.b24ui?.sidebarLayout || {}) })

// type SidebarLayoutVariants = VariantProps<typeof sidebarLayout>

export interface SidebarLayoutProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  useSidebar?: boolean
  useLightContent?: boolean
  class?: any
  b24ui?: Partial<typeof sidebarLayout.slots>
}

export interface SidebarLayoutSlots {
  /**
   * Menu for all screen sizes.
   */
  sidebar(props?: {}): any
  /**
   * Menu for mobile screen sizes.
   */
  navbar(props?: {}): any
  /**
   * The page content.
   */
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import B24Slideover from './Slideover.vue'
import B24Sidebar from './Sidebar.vue'
import B24ModalDialogClose from './ModalDialogClose.vue'
import B24Navbar from './Navbar.vue'
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'
import Cross50Icon from '@bitrix24/b24icons-vue/actions/Cross50Icon'

const props = withDefaults(defineProps<SidebarLayoutProps>(), {
  as: 'div',
  useLightContent: true
})
const slots = defineSlots<SidebarLayoutSlots>()

const isUseSideBar = computed(() => !!slots.sidebar)

const b24ui = computed(() => sidebarLayout({
  useSidebar: isUseSideBar.value,
  useLightContent: Boolean(props.useLightContent)
}))
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <template v-if="isUseSideBar">
      <div :class="b24ui.sidebar({ class: props.b24ui?.sidebar })">
        <B24Sidebar>
          <slot name="sidebar" />
        </B24Sidebar>
      </div>
    </template>

    <header :class="b24ui.header({ class: props.b24ui?.header })">
      <div :class="b24ui.headerPaddings({ class: props.b24ui?.headerPaddings })">
        <B24Slideover
          title="Navigation"
          description="Content navigation"
          side="left"
          :b24ui="{ content: b24ui.sidebarSlideoverContainer({ class: props.b24ui?.sidebarSlideoverContainer }) }"
        >
          <!-- @todo: lang -->
          <B24Button
            aria-label="Open navigation"
            color="link"
            size="sm"
            :icon="MenuIcon"
          />

          <template #content>
            <div :class="b24ui.sidebarSlideover({ class: props.b24ui?.sidebarSlideover })">
              <B24Sidebar>
                <div :class="b24ui.sidebarSlideoverBtnClose({ class: props.b24ui?.sidebarSlideoverBtnClose })">
                  <!-- @todo: lang -->
                  <B24ModalDialogClose>
                    <B24Button
                      color="link"
                      size="lg"
                      :icon="Cross50Icon"
                      aria-label="Close navigation"
                    />
                  </B24ModalDialogClose>
                </div>

                <slot name="sidebar" />
              </B24Sidebar>
            </div>
          </template>
        </B24Slideover>
      </div>
      <div :class="b24ui.headerWrapper({ class: props.b24ui?.headerWrapper })">
        <B24Navbar :class="b24ui.headerPaddings({ class: props.b24ui?.headerPaddings })">
          <slot name="navbar" />
        </B24Navbar>
      </div>
    </header>

    <!-- Page Content -->
    <template v-if="!!slots.default">
      <main :class="b24ui.container({ class: props.b24ui?.container })">
        <div :class="b24ui.containerWrapper({ class: props.b24ui?.containerWrapper })">
          <div :class="b24ui.containerWrapperInner({ class: props.b24ui?.containerWrapperInner })">
            <slot />
          </div>
        </div>
      </main>
    </template>
  </Primitive>
</template>
