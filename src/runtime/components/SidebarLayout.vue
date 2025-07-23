<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar-layout'
import type { ComponentConfig } from '../types/utils'
import type { Ref } from 'vue'
import type { SidebarLayoutApi } from '../composables/useSidebarLayout'

/**
 * @todo add docs
 */
type SidebarLayout = ComponentConfig<typeof theme, AppConfig, 'sidebarLayout'>
export interface SidebarLayoutProps {
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
   * Set inner mode. Use in slideover, modal and etc
   * @defaultValue 'false'
   */
  isInner?: boolean
  class?: any
  b24ui?: Pick<SidebarLayout['slots'], 'root' | 'sidebar' | 'sidebarSlideoverContainer' | 'sidebarSlideover' | 'sidebarSlideoverBtnClose' | 'contentWrapper' | 'header' | 'headerMenuIcon' | 'headerWrapper' | 'container' | 'containerWrapper' | 'pageTopWrapper' | 'pageActionsWrapper' | 'containerWrapperInner' | 'pageBottomWrapper' | 'loadingWrapper' | 'loadingIcon'>
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
  /**
   * Loading state. You need to use `useSidebarLayout` to control it.
   */
  'loading': (props?: { isLoading: boolean }) => any
}

export interface SidebarLayoutInstance {
  api: SidebarLayoutApi
  isLoading: Readonly<Ref<boolean>>
  setLoading: (value: boolean) => void
  setRootLoading: (value: boolean) => void
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, readonly, provide, inject } from 'vue'
import { useRoute } from 'vue-router'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { sidebarLayoutInjectionKey } from '../composables/useSidebarLayout'
import { tv } from '../utils/tv'
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
  isInner: false
})
const slots = defineSlots<SidebarLayoutSlots>()

const { t } = useLocale()
const appConfig = useAppConfig() as SidebarLayout['AppConfig']

const route = useRoute()
const isUseSideBar = computed(() => !!slots.sidebar)
const isUseNavbar = computed(() => !!slots.navbar)
const openSidebarSlideover = ref(false)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebarLayout || {}) })({
  useSidebar: isUseSideBar.value,
  useNavbar: isUseNavbar.value,
  useLightContent: Boolean(props.useLightContent),
  loading: Boolean(isLoading.value),
  inner: Boolean(props.isInner)
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

// Get the parent API (if it exists)
const parentApi = inject(sidebarLayoutInjectionKey, null)

// 1. Determine the root boot state
// For the root component we use our own state
// For nested - use the root state of the parent
const rootRef: Ref<boolean> = parentApi
  ? (parentApi as any).rootRef
  : ref(false)

// 2. Current component loading state
const isLoading = ref(false)

// 3. Computed states
const isParentLoading = computed(() =>
  parentApi?.isLoading.value ?? false
)

const isRootLoading = computed(() =>
  rootRef.value
)

// 4. Create an API for the current component
const api: SidebarLayoutApi = {
  isLoading: readonly(isLoading) as Readonly<Ref<boolean>>,
  isParentLoading: readonly(isParentLoading) as Readonly<Ref<boolean>>,
  isRootLoading: readonly(isRootLoading) as Readonly<Ref<boolean>>,

  setLoading: (value: boolean) => { isLoading.value = value },

  setParentLoading: (value: boolean) => {
    if (parentApi) {
      parentApi.setLoading(value)
    }
  },

  setRootLoading: (value: boolean) => {
    rootRef.value = value
  },

  rootRef
}

// 5. Exposing API to Child Components
provide(sidebarLayoutInjectionKey, api)

defineExpose<SidebarLayoutInstance>({
  api,
  isLoading,
  setLoading: api.setLoading,
  setRootLoading: api.setRootLoading
})
</script>

<template>
  <Primitive
    :data-state="isLoading ? 'loading' : 'show'"
    :as="as"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <!-- isLoading -->
    <slot name="loading" :is-loading="isLoading">
      <div
        v-if="isLoading"
        :class="b24ui.loadingWrapper({ class: props.b24ui?.loadingWrapper })"
      >
        <BtnSpinnerIcon
          :class="b24ui.loadingIcon({ class: props.b24ui?.loadingIcon })"
          aria-hidden="true"
        />
      </div>
    </slot>
    <template v-if="isUseSideBar">
      <div :class="b24ui.sidebar({ class: props.b24ui?.sidebar })">
        <B24Sidebar>
          <slot name="sidebar" :handle-click="handleNavigationClick" :is-loading="isLoading" />
        </B24Sidebar>
      </div>
    </template>

    <div :class="b24ui.contentWrapper({ class: props.b24ui?.contentWrapper })">
      <header
        v-if="isUseNavbar"
        :class="b24ui.header({ class: props.b24ui?.header })"
      >
        <div
          v-if="isUseSideBar"
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
              <div :class="b24ui.sidebarSlideover({ class: props.b24ui?.sidebarSlideover })">
                <B24Sidebar>
                  <div :class="b24ui.sidebarSlideoverBtnClose({ class: props.b24ui?.sidebarSlideoverBtnClose })">
                    <B24ModalDialogClose>
                      <B24Button
                        color="air-tertiary"
                        size="lg"
                        :icon="Cross50Icon"
                        :aria-label="t('sidebarLayout.close')"
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
          <B24Navbar>
            <slot name="navbar" :is-loading="isLoading" />
          </B24Navbar>
        </div>
      </header>

      <template v-if="!!slots['content-top'] || !!slots['content-actions'] || !!slots['default']">
        <main :class="b24ui.container({ class: props.b24ui?.container })">
          <template v-if="!!slots['content-top']">
            <!-- Page Top -->
            <div :class="b24ui.pageTopWrapper({ class: props.b24ui?.pageTopWrapper })">
              <slot name="content-top" :is-loading="isLoading" />
            </div>
          </template>

          <template v-if="!!slots['content-actions']">
            <!-- Page Actions -->
            <div :class="b24ui.pageActionsWrapper({ class: props.b24ui?.pageActionsWrapper })">
              <slot name="content-actions" :is-loading="isLoading" />
            </div>
          </template>

          <template v-if="!!slots['default']">
            <!-- Page Content -->
            <div
              :data-content="props.useLightContent ? 'light' : 'empty'"
              :class="b24ui.containerWrapper({ class: props.b24ui?.containerWrapper })"
            >
              <div :class="b24ui.containerWrapperInner({ class: props.b24ui?.containerWrapperInner })">
                <slot :is-loading="isLoading" />
              </div>
            </div>
          </template>
        </main>
      </template>

      <template v-if="!!slots['content-bottom']">
        <!-- Page Bottom -->
        <div :class="b24ui.pageBottomWrapper({ class: props.b24ui?.pageBottomWrapper })">
          <slot name="content-bottom" :is-loading="isLoading" />
        </div>
      </template>
    </div>
  </primitive>
</template>
