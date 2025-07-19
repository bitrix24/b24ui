/**
 * SidebarLayout
 * You incorporate a sidebar in the slider and CRM entity tab embedding. Overall, it's stylish, trendy, and youthful
 * ---
 * @todo: docs
 * @todo: test
 * @todo: playground
 * @todo: docs add in-data-[content=dd-light]:bg-red-500 group-data-[content=light]/layout-content:bg-red-500
 * @todo: docs add inner{true|false}
 */

export default {
  slots: {
    root: [
      'text-(--ui-color-design-plain-content)',
      'bg-(--ui-color-gray-05) edge-light:bg-transparent', // edge-light:bg-(--ui-color-gray-05)
      'dark:bg-(--ui-color-bg-content-primary) edge-dark:bg-transparent', // edge-dark:bg-(--ui-color-g-content-grey-4)
      'min-h-svh w-full',
      'flex max-lg:flex-col'
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
    sidebarSlideoverContainer: 'max-w-80',
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
      'flex items-center gap-x-1',
      'bg-(--ui-color-bg-content-primary)', // 'bg-(--ui-color-base-black-fixed)/5', // ',
      'dark:bg-[#2d2d2d]',
      'edge-light:bg-(--ui-color-base-black-fixed)/5 edge-light:backdrop-blur-(--ui-bg-blur-less)',
      'edge-dark:bg-(--ui-color-base-white-fixed)/10 edge-dark:backdrop-blur-(--ui-bg-blur-less)'
    ].join(' '),
    headerMenuIcon: 'lg:hidden',
    headerWrapper: [
      'min-w-0 flex-1',
      'h-full'
    ].join(' '),
    container: [
      'flex-1 flex flex-col gap-[22px]',
      'lg:min-w-0',
      'mt-[22px]'
    ].join(' '),
    containerWrapper: [
      'grow group/layout-content'
    ].join(' '),
    pageTopWrapper: [
      'text-(--ui-color-base-1)',
      'min-h-[30px]',
      'flex items-center'
    ].join(' '),
    pageActionsWrapper: '',
    containerWrapperInner: '',
    pageBottomWrapper: '',
    // @memo save
    loadingWrapper: [
      'cursor-wait',
      'isolate absolute z-1000 inset-0',
      'w-full h-dvh',
      'flex flex-row flex-nowrap items-center justify-center',
      // 'bg-[#00204e]/52', //  //#000000/66 // [#00204e]/52
      // 'motion-safe:backdrop-blur-sm'
      ''
    ].join(' '),
    loadingIcon: 'text-(--ui-color-g-glass-grey-bg-2) size-[110px] animate-spin-slow'
  },
  variants: {
    inner: {
      true: {
        root: [
          '--inner light --ui-context-content-light ',
          'h-full' // relative isolate
        ].join(' '),
        container: [
          'overflow-y-scroll'
        ].join(' ')
      },
      false: {
        root: [
          '--app',
          'h-dvh' // relative isolate
        ].join(' '),
        container: 'relative'
      }
    },
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
        container: 'lg:pb-2',
        pageTopWrapper: 'px-6 lg:px-0',
        // @todo fix this
        pageActionsWrapper: 'p-6 lg:p-[15px]',
        containerWrapper: [
          'p-6 lg:p-[15px]',
          'lg:rounded-(--ui-border-radius-md)',
          'light --ui-context-content-light',
          'text-(--ui-color-design-plain-content) bg-(--ui-color-base-white-fixed)', // /87
          ''
        ].join(' ')
      },
      false: {
        container: 'px-(--content-area-shift)'
      }
    },
    loading: {
      true: ''
    },
    useNavbar: {
      true: {
        // @memo save
        // loadingWrapper: 'h-[calc(100dvh-var(--topbar-height))]'
        container: 'h-[calc(100dvh-var(--topbar-height))]'
      },
      false: {
        // @memo save
        // loadingWrapper: 'h-dvh'
        loadingWrapper: 'h-full',
        container: 'h-full'
      }
    }
  },
  compoundVariants: [
    {
      inner: true,
      useLightContent: true,
      class: {
        pageTopWrapper: [
          'px-0 lg:px-0'
        ].join(' ')
      }
    }
  ],
  defaultVariants: {
    inner: false,
    useLightContent: true
  }
}
