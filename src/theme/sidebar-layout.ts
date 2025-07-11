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
      'text-(--ui-color-design-plain-na-content)',
      // 'dark:text-(--ui-color-base-1)', // fix
      'bg-(--ui-color-gray-05) edge-light:bg-transparent', // edge-light:bg-(--ui-color-gray-05)
      'dark:bg-(--ui-color-bg-content-primary) edge-dark:bg-transparent', // edge-dark:bg-(--ui-color-g-content-grey-4)
      'min-h-svh w-full',
      'flex max-lg:flex-col',
      'relative isolate'
    ].join(' '),
    sidebar: [
      'w-[240px]',
      'pr-[3px]',
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
      'light --ui-context-content-light',
      'max-w-80',
      'p-2',
      'bg-transparent dark:bg-transparent sm:shadow-none'
    ].join(' '),
    sidebarSlideover: [
      'h-full',
      'overflow-hidden',
      'flex flex-col text-(--ui-color-design-plain-na-content)',
      // 'bg-white dark:bg-base-dark', // fix
      'bg-(--ui-color-base-white-fixed)/94',
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
      'lg:pl-[calc(240px)]'
    ].join(' '),
    header: [
      'lg:px-(--content-area-shift) h-(--topbar-height)',
      'flex items-center',
      // 'lg:hidden', fix
      'bg-(--ui-color-bg-content-primary)',
      'dark:bg-[#2d2d2d]',
      'edge-light:bg-(--ui-color-base-black-fixed)/5',
      'edge-light:backdrop-blur-(--ui-bg-blur-less)',
      'edge-dark:bg-(--ui-color-base-white-fixed)/10',
      'edge-dark:backdrop-blur-(--ui-bg-blur-less)'
    ].join(' '),
    headerMenuIcon: [
      'lg:hidden'
    ].join(' '),
    headerPaddings: [
      // 'py-2.5' // fix
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
          'light --ui-context-content-light',
          'p-6 lg:p-[15px]',
          'bg-(--ui-color-base-white-fixed)/87',
          'dark:bg-(--ui-color-base-white-fixed)/97',
          // 'lg:ring-1 lg:ring-base-950/5 dark:lg:ring-white/10', // fix
          // 'lg:shadow-xs', // fix
          'lg:rounded-(--ui-border-radius-md)'
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
