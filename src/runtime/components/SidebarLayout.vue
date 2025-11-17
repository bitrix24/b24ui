<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar-layout'
import type { UseLoadingProps } from '../composables/useLoading'
import type { ComponentConfig } from '../types/tv'

type SidebarLayout = ComponentConfig<typeof theme, AppConfig, 'sidebarLayout'>
export interface SidebarLayoutProps extends Pick<UseLoadingProps, 'id'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The content is placed on a light background.
   * @defaultValue 'true'
   */
  useLightContent?: boolean
  /**
   * Set inner mode. Use in slider, modal and etc
   * @defaultValue 'false'
   */
  isInner?: boolean
  /**
   * Off scrollbar control of the content area in inner mode.
   * @defaultValue 'false'
   */
  offContentScrollbar?: boolean
  class?: any
  b24ui?: SidebarLayout['slots']
}

export interface SidebarLayoutSlots {
  /**
   * Left sidebar.
   * @param props
   * @param props.handleClick - Handler for navigation click events
   * @param props.isLoading - loading state
   * @param props.b24ui - b24ui
   */
  'sidebar'(props: { handleClick: () => void, isLoading: boolean, b24ui: SidebarLayout['b24ui'] }): any
  /** Top menu. */
  'navbar'(props: { handleClick: () => void, isLoading: boolean, b24ui: SidebarLayout['b24ui'] }): any
  /** Content above the page. Used for title, filter, etc. */
  'content-top': (props: { isLoading: boolean, b24ui: SidebarLayout['b24ui'] }) => any
  /** Content above the page. Use for show actions. */
  'content-actions': (props: { isLoading: boolean, b24ui: SidebarLayout['b24ui'] }) => any
  /** The page content. */
  'default'(props: { isLoading: boolean, b24ui: SidebarLayout['b24ui'] }): any
  /** Right sidebar. */
  'content-right': (props: { isLoading: boolean, b24ui: SidebarLayout['b24ui'] }) => any
  /** Content below the page. */
  'content-bottom': (props: { isLoading: boolean, b24ui: SidebarLayout['b24ui'] }) => any
  /** Loading state. */
  'loading': (props: { isLoading: boolean, b24ui: SidebarLayout['b24ui'] }) => any
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue' // useId, toRef
import { useRoute } from 'vue-router'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports' // useRuntimeHook
// import { useLoading } from '../composables/useLoading'
import { useLocale } from '../composables/useLocale'
// import { useDashboard } from '../utils/dashboard'
import { tv } from '../utils/tv'
import B24Button from './Button.vue'
import B24Slideover from './Slideover.vue'
import B24Sidebar from './Sidebar.vue'
import B24ModalDialogClose from './ModalDialogClose.vue'
import B24Navbar from './Navbar.vue'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'
import Cross50Icon from '@bitrix24/b24icons-vue/actions/Cross50Icon'
import BtnSpinnerIcon from '@bitrix24/b24icons-vue/button-specialized/BtnSpinnerIcon'

const props = withDefaults(defineProps<SidebarLayoutProps>(), {
  as: 'div',
  useLightContent: true,
  isInner: false,
  offContentScrollbar: false
})
const slots = defineSlots<SidebarLayoutSlots>()

// const loading = defineModel<boolean>('loading', { default: false })

const { t } = useLocale()
const appConfig = useAppConfig() as SidebarLayout['AppConfig']

// const dashboardContext = useDashboard({
//   storageKey: 'dashboard',
//   sidebarOpen: ref(false),
//   isLoading: ref(false)
// })
//
// const id = `${dashboardContext.storageKey}-${dashboardContext.contextId}-sidebar-layout-${props.id || useId()}`
//
// const { elLayout, isLoading } = useLoading(
//   id,
//   toRef(() => ({ ...dashboardContext, ...props })),
//   { loading }
// )
//
// useRuntimeHook('dashboard:content:load', (value: boolean, contextId?: string) => {
//   if (contextId !== dashboardContext.contextId) {
//     return
//   }
//   isLoading.value = value
// })
//
// watch(isLoading, () => dashboardContext.isLoading!.value = isLoading.value, { immediate: true })

const route = useRoute()
const isUseSideBar = computed(() => !!slots.sidebar)
const isUseNavbar = computed(() => !!slots.navbar)
const isUseRightBar = computed(() => !!slots['content-right'])
const openSidebarSlideover = ref(false)
const isLoading = ref(false)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebarLayout || {}) })({
  useSidebar: isUseSideBar.value,
  useNavbar: isUseNavbar.value,
  useRightBar: isUseRightBar.value,
  useLightContent: Boolean(props.useLightContent),
  loading: Boolean(isLoading.value),
  inner: Boolean(props.isInner),
  offContentScrollbar: Boolean(props.offContentScrollbar)
}))

const closeModal = () => {
  if (openSidebarSlideover.value) {
    openSidebarSlideover.value = false
  }
}

const stopWatcher = watch(
  () => route?.path,
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
  <Primitive
    ref="elLayout"
    v-bind="$attrs"
    data-state="isLoading ? 'loading' : 'show'"
    :as="as"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <!-- isLoading -->
    <slot name="loading" :is-loading="isLoading" :b24ui="b24ui">
      <B24Slideover
        v-model:open="isLoading"
        :close="false"
        :dismissible="false"
        :transition="false"
        side="top"
        overlay-blur="off"
      >
        <template #content>
          <div data-slot="loadingWrapper" :class="b24ui.loadingWrapper({ class: props.b24ui?.loadingWrapper })">
            <BtnSpinnerIcon
              data-slot="loadingIcon"
              :class="b24ui.loadingIcon({ class: props.b24ui?.loadingIcon })"
              aria-hidden="true"
            />
          </div>
        </template>
      </B24Slideover>
    </slot>
    <template v-if="isUseSideBar">
      <div data-slot="sidebar" :class="b24ui.sidebar({ class: props.b24ui?.sidebar })">
        <B24Sidebar>
          <slot name="sidebar" :handle-click="handleNavigationClick" :is-loading="isLoading" :b24ui="b24ui" />
        </B24Sidebar>
      </div>
    </template>

    <div data-slot="contentWrapper" :class="b24ui.contentWrapper({ class: props.b24ui?.contentWrapper })">
      <header
        v-if="isUseNavbar"
        data-slot="header"
        :class="b24ui.header({ class: props.b24ui?.header })"
      >
        <div
          v-if="isUseSideBar"
          data-slot="headerMenuIcon"
          :class="b24ui.headerMenuIcon({ class: props.b24ui?.headerMenuIcon })"
        >
          <B24Slideover
            v-model:open="openSidebarSlideover"
            :title="t('sidebarLayout.slideoverTitle')"
            :description="t('sidebarLayout.slideoverDescription')"
            side="left"
            :b24ui="{
              content: b24ui.sidebarSlideoverContainer({ class: props.b24ui?.sidebarSlideoverContainer })
            }"
          >
            <B24Button
              color="air-tertiary"
              size="md"
              :icon="HamburgerMenuIcon"
              :aria-label="t('sidebarLayout.open')"
            />

            <template #content>
              <div data-slot="sidebarSlideover" :class="b24ui.sidebarSlideover({ class: props.b24ui?.sidebarSlideover })">
                <B24Sidebar>
                  <div data-slot="sidebarSlideoverBtnClose" :class="b24ui.sidebarSlideoverBtnClose({ class: props.b24ui?.sidebarSlideoverBtnClose })">
                    <B24ModalDialogClose>
                      <B24Button
                        color="air-tertiary"
                        size="lg"
                        :icon="Cross50Icon"
                        :aria-label="t('sidebarLayout.close')"
                      />
                    </B24ModalDialogClose>
                  </div>

                  <slot name="sidebar" :handle-click="handleNavigationClick" :is-loading="isLoading" :b24ui="b24ui" />
                </B24Sidebar>
              </div>
            </template>
          </B24Slideover>
        </div>
        <div data-slot="headerWrapper" :class="b24ui.headerWrapper({ class: props.b24ui?.headerWrapper })">
          <B24Navbar>
            <slot name="navbar" :handle-click="handleNavigationClick" :is-loading="isLoading" :b24ui="b24ui" />
          </B24Navbar>
        </div>
      </header>

      <div data-slot="pageWrapper" :class="b24ui.pageWrapper({ class: props.b24ui?.pageWrapper })">
        <template v-if="!!slots['content-top'] || !!slots['content-actions'] || !!slots['default']">
          <main data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
            <template v-if="!!slots['content-top']">
              <!-- Page Top -->
              <div data-slot="pageTopWrapper" :class="b24ui.pageTopWrapper({ class: props.b24ui?.pageTopWrapper })">
                <slot name="content-top" :is-loading="isLoading" :b24ui="b24ui" />
              </div>
            </template>

            <template v-if="!!slots['content-actions']">
              <!-- Page Actions -->
              <div data-slot="pageActionsWrapper" :class="b24ui.pageActionsWrapper({ class: props.b24ui?.pageActionsWrapper })">
                <slot name="content-actions" :is-loading="isLoading" :b24ui="b24ui" />
              </div>
            </template>

            <template v-if="!!slots['default']">
              <!-- Page Content -->
              <div
                :data-content="props.useLightContent ? 'use-light' : 'not-set'"
                data-slot="containerWrapper"
                :class="b24ui.containerWrapper({ class: props.b24ui?.containerWrapper })"
              >
                <div data-slot="containerWrapperInner" :class="b24ui.containerWrapperInner({ class: props.b24ui?.containerWrapperInner })">
                  <slot :is-loading="isLoading" :b24ui="b24ui" />
                </div>
              </div>
            </template>
          </main>
        </template>

        <template v-if="!!slots['content-right']">
          <div data-slot="pageRightWrapper" :class="b24ui.pageRightWrapper({ class: props.b24ui?.pageRightWrapper })">
            <slot name="content-right" :is-loading="isLoading" :b24ui="b24ui" />
          </div>
        </template>
      </div>
      <template v-if="!!slots['content-bottom']">
        <!-- Page Bottom -->
        <div data-slot="pageBottomWrapper" :class="b24ui.pageBottomWrapper({ class: props.b24ui?.pageBottomWrapper })">
          <slot name="content-bottom" :is-loading="isLoading" :b24ui="b24ui" />
        </div>
      </template>
    </div>
  </primitive>
</template>
