<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/stacked-layout'
import type { ComponentConfig } from '../types/utils'

type StackedLayout = ComponentConfig<typeof theme, AppConfig, 'stackedLayout'>

export interface StackedLayoutProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  useLightContent?: boolean
  class?: any
  b24ui?: StackedLayout['slots']
}

export interface StackedLayoutSlots {
  /**
   * Menu for mobile screen sizes.
   * @param props
   * @param props.handleClick - Handler for navigation click events
   */
  'sidebar'(props: { handleClick: () => void }): any
  /**
   * Menu for desktop screen sizes.
   */
  'navbar'(props?: {}): any
  /**
   * The page content.
   */
  'default'(props?: {}): any
  'content-top': (props?: {}) => any
  'content-bottom': (props?: {}) => any
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'
import B24Slideover from './Slideover.vue'
import B24Sidebar from './Sidebar.vue'
import B24ModalDialogClose from './ModalDialogClose.vue'
import B24Navbar from './Navbar.vue'
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'
import Cross50Icon from '@bitrix24/b24icons-vue/actions/Cross50Icon'

const props = withDefaults(defineProps<StackedLayoutProps>(), {
  as: 'div',
  useLightContent: true
})
const slots = defineSlots<StackedLayoutSlots>()

const appConfig = useAppConfig() as StackedLayout['AppConfig']

const route = useRoute()
const isUseSideBar = computed(() => !!slots.sidebar)
const openSidebarSlideover = ref(false)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.stackedLayout || {}) })({
  useSidebar: isUseSideBar.value,
  useLightContent: Boolean(props.useLightContent)
}))

const closeModal = () => {
  if (openSidebarSlideover.value) {
    openSidebarSlideover.value = false
  }
}

const stopWatcher = watch(
  () => route.path,
  () => closeModal(),
  { immediate: true }
)

onUnmounted(() => {
  stopWatcher()
})

const handleNavigationClick = () => {
  closeModal()
}
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <header :class="b24ui.header({ class: props.b24ui?.header })">
      <div
        v-if="isUseSideBar"
        :class="b24ui.headerMenuIcon({ class: props.b24ui?.headerMenuIcon })"
      >
        <!-- @todo: lang -->
        <B24Slideover
          v-model:open="openSidebarSlideover"
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
            :class="b24ui.headerPaddings({ class: props.b24ui?.headerPaddings })"
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

                <slot name="sidebar" :handle-click="handleNavigationClick" />
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
    <slot name="content-top" />

    <template v-if="!!slots.default">
      <main :class="b24ui.container({ class: props.b24ui?.container })">
        <div :class="b24ui.containerWrapper({ class: props.b24ui?.containerWrapper })">
          <div :class="b24ui.containerWrapperInner({ class: props.b24ui?.containerWrapperInner })">
            <slot />
          </div>
        </div>
      </main>
    </template>

    <slot name="content-bottom" />
  </Primitive>
</template>
