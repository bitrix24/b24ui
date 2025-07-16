/**
 * SidebarLayout
 * You incorporate a sidebar in the slider and CRM entity tab embedding. Overall, it's stylish, trendy, and youthful
 * ---
 * @todo: docs
 * @todo: test
 * @todo: playground
 */

export default {
  slots: {
    root: [
      '--app',
      'text-(--ui-color-design-plain-content)',
      'bg-(--ui-color-gray-05) edge-light:bg-transparent', // edge-light:bg-(--ui-color-gray-05)
      'dark:bg-(--ui-color-bg-content-primary) edge-dark:bg-transparent', // edge-dark:bg-(--ui-color-g-content-grey-4)
      'min-h-svh w-full',
      'flex max-lg:flex-col',
      'relative isolate'
    ].join(' '),
    sidebar: [
      'w-[240px]',
      'pe-[3px] rtl:me-[14px]',
      'fixed inset-y-0 left-0',
      'max-lg:hidden',
      'bg-(--ui-color-bg-content-secondary)',
      'dark:bg-[#262626]',
      'edge-light:bg-(--ui-color-base-black-fixed)/2',
      'edge-light:backdrop-blur-(--ui-bg-blur-less)',
      'edge-dark:bg-(--ui-color-base-white-fixed)/3',
      'edge-dark:backdrop-blur-(--ui-bg-blur-less)'
    ].join(' '),
    sidebarSlideoverContainer: [
      'max-w-80'
    ].join(' '),
    sidebarSlideover: [
      'h-full',
      'overflow-hidden',
      'flex flex-col text-(--ui-color-design-plain-content)',
      'bg-(--ui-color-base-white-fixed) dark:bg-(--ui-color-bg-content-primary) edge-dark:bg-[#21334cf0]',
      'ring-1 ring-base-950/5 dark:ring-white/10',
      'shadow-xs',
      'rounded-none'
    ].join(' '),
    sidebarSlideoverBtnClose: [
      '-mb-3',
      'px-4 pt-3'
    ].join(' '),
    contentWrapper: [
      'flex-1 flex flex-col',
      'lg:pl-[240px]'
    ].join(' '),
    header: [
      'px-(--content-area-shift) min-h-(--topbar-height)',
      'flex items-center',
      'bg-(--ui-color-bg-content-primary)', // 'bg-(--ui-color-base-black-fixed)/5', // ',
      'dark:bg-[#2d2d2d]',
      'edge-light:bg-(--ui-color-base-black-fixed)/5 edge-light:backdrop-blur-(--ui-bg-blur-less)',
      'edge-dark:bg-(--ui-color-base-white-fixed)/10 edge-dark:backdrop-blur-(--ui-bg-blur-less)'
    ].join(' '),
    headerMenuIcon: [
      'lg:hidden'
    ].join(' '),
    headerWrapper: [
      'min-w-0 flex-1',
      'h-full'
    ].join(' '),
    container: [
      'relative',
      'flex-1 flex flex-col',
      'lg:min-w-0'
    ].join(' '),
    containerWrapper: [
      'grow'
    ].join(' '),
    pageTopWrapper: [
      'text-(--ui-color-base-1)',
      'py-[22px]',
      'min-h-[78px]',
      'flex items-center'
    ].join(' '),
    pageActionsWrapper: '',
    containerWrapperInner: '',
    pageBottomWrapper: '',
    // loadingWrapper: 'w-full flex flex-row flex-nowrap items-center justify-center',
    loadingWrapper: 'isolate absolute inline-block top-[50%] left-[50%] transform-[translate3d(-50%,-50%,0)] size-[110px]',
    loadingIcon: 'size-full animate-spin-slow'
  },
  variants: {
    useSidebar: {
      true: {
        container: 'lg:px-(--content-area-shift)'
      },
      false: {
        container: 'px-(--content-area-shift) pb-2 lg:pt-2 lg:px-2',
        contentWrapper: 'lg:pl-0'
      }
    },
    useLightContent: {
      true: {
        container: [
          'lg:pb-2'
        ].join(' '),
        pageTopWrapper: [
          'px-6 lg:px-0'
        ].join(' '),
        pageActionsWrapper: [
          'p-6 lg:p-[15px]'
        ].join(' '),
        containerWrapper: [
          'p-6 lg:p-[15px]',
          'lg:rounded-(--ui-border-radius-md)',
          'light --ui-context-content-light',
          'text-(--ui-color-design-plain-content) bg-(--ui-color-base-white-fixed)', // /87
          ''
        ].join(' ')
      },
      false: {
        containerWrapper: [
          'bg-(--ui-color-background-transparent)'
        ].join(' ')
      }
    },
    loading: {
      true: ''
    },
    useNavbar: {
      true: {
        // loadingWrapper: 'h-[calc(100dvh-var(--topbar-height))]'
      },
      false: {
        // loadingWrapper: 'h-dvh'
      }
    }
  },
  compoundVariants: [],
  defaultVariants: {
    useLightContent: true
  }
}
