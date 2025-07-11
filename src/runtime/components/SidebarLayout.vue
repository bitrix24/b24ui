<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar-layout'
import type { ComponentConfig } from '../types/utils'

type SidebarLayout = ComponentConfig<typeof theme, AppConfig, 'sidebarLayout'>

export interface SidebarLayoutProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  useLightContent?: boolean
  class?: any
  b24ui?: Pick<SidebarLayout['slots'], 'root' | 'sidebar' | 'sidebarSlideoverContainer' | 'sidebarSlideover' | 'sidebarSlideoverBtnClose' | 'contentWrapper' | 'header' | 'headerMenuIcon' | 'headerPaddings' | 'headerWrapper' | 'container' | 'containerWrapper' | 'pageTopWrapper' | 'pageActionsWrapper' | 'containerWrapperInner' | 'pageBottomWrapper' | 'loadingWrapper' | 'loadingIcon'>
}

export interface SidebarLayoutSlots {
  /**
   * Left menu.
   * @param props
   * @param props.handleClick - Handler for navigation click events
   * @param props.isLoading - loading state
   */
  'sidebar'(props: { handleClick: () => void, isLoading: boolean }): any
  /**
   * Top menu.
   */
  'navbar'(props?: { isLoading: boolean }): any
  /**
   * Content above the page. Used for title, filter, etc.
   */
  'content-top': (props?: { isLoading: boolean }) => any
  /**
   * Content above the page. Use for show actions.
   */
  'content-actions': (props?: { isLoading: boolean }) => any
  /**
   * The page content.
   */
  'default'(props?: { isLoading: boolean }): any
  /**
   * Content below the page.
   */
  'content-bottom': (props?: { isLoading: boolean }) => any
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
import SpinnerIcon from '@bitrix24/b24icons-vue/specialized/SpinnerIcon'

const props = withDefaults(defineProps<SidebarLayoutProps>(), {
  as: 'div',
  useLightContent: true
})
const slots = defineSlots<SidebarLayoutSlots>()

const appConfig = useAppConfig() as SidebarLayout['AppConfig']

const route = useRoute()
const isUseSideBar = computed(() => !!slots.sidebar)
const openSidebarSlideover = ref(false)

const isLoading = ref(false)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebarLayout || {}) })({
  useSidebar: isUseSideBar.value,
  useLightContent: Boolean(props.useLightContent),
  loading: Boolean(isLoading.value)
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
    <template v-if="isUseSideBar">
      <div :class="b24ui.sidebar({ class: props.b24ui?.sidebar })">
        <B24Sidebar>
          <slot name="sidebar" :handle-click="handleNavigationClick" :is-loading="isLoading" />
        </B24Sidebar>
      </div>
    </template>

    <div :class="b24ui.contentWrapper({ class: props.b24ui?.contentWrapper })">
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
            :class="b24ui.sidebarSlideoverContainer({ class: props.b24ui?.sidebarSlideoverContainer })"
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

                  <slot name="sidebar" :handle-click="handleNavigationClick" :is-loading="isLoading" />
                </B24Sidebar>
              </div>
            </template>
          </B24Slideover>
        </div>
        <div :class="b24ui.headerWrapper({ class: props.b24ui?.headerWrapper })">
          <B24Navbar :class="b24ui.headerPaddings({ class: props.b24ui?.headerPaddings })">
            <slot name="navbar" :is-loading="isLoading" />
          </B24Navbar>
        </div>
      </header>

      <main :class="b24ui.container({ class: props.b24ui?.container })">
        <!-- isLoading -->
        <div
          v-if="isLoading"
          :class="b24ui.loadingWrapper({ class: props.b24ui?.loadingWrapper })"
        >
          <SpinnerIcon
            :class="b24ui.loadingIcon({ class: props.b24ui?.loadingIcon })"
            aria-hidden="true"
          />
        </div>

        <!-- Page Top -->
        <template v-if="!!slots['content-top']">
          <div :class="b24ui.pageTopWrapper({ class: props.b24ui?.pageTopWrapper })">
            <slot name="content-top" :is-loading="isLoading" />
          </div>
        </template>

        <!-- Page Actions -->
        <template v-if="!!slots['content-actions']">
          <div :class="b24ui.pageActionsWrapper({ class: props.b24ui?.pageActionsWrapper })">
            <slot name="content-actions" :is-loading="isLoading" />
          </div>
        </template>

        <!-- Page Content -->
        <template v-if="!!slots.default">
          <div :class="b24ui.containerWrapper({ class: props.b24ui?.containerWrapper })">
            <div :class="b24ui.containerWrapperInner({ class: props.b24ui?.containerWrapperInner })">
              <slot :is-loading="isLoading" />
            </div>
          </div>
        </template>
      </main>

      <!-- Page Bottom -->
      <template v-if="!!slots['content-bottom']">
        <div :class="b24ui.pageBottomWrapper({ class: props.b24ui?.pageBottomWrapper })">
          <slot name="content-bottom" :is-loading="isLoading" />
        </div>
      </template>
    </div>
  </Primitive>
</template>
