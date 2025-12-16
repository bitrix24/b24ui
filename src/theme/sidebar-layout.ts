/**
 * SidebarLayout
 * You incorporate a sidebar in the slider and CRM entity tab embedding. Overall, it's stylish, trendy, and youthful
 * ---
 * @todo: docs
 * @todo: test
 * @todo: playground
 * @todo: docs add in-data-[content=light]:bg-red-500 group-data-[content=light]/layout-content:bg-red-500
 * @todo: docs add inner {true|false}
 */

export default {
  slots: {
    root: [
      // @memo use src/runtime/index.css
      'sidebar-layout',
      'text-(--b24ui-typography-label-color)',
      'w-full',
      'flex'
    ].join(' '),
    sidebar: [
      // @memo use src/runtime/air-design-tokens/components/navigation-menu.css
      'air-sidebar',
      'before:absolute before:inset-0 before:z-[-1]',
      'before:bg-(--leftmenu-bg-expanded)',
      'w-[240px]',
      'pe-[3px] rtl:me-[14px]',
      'inset-y-0 left-0',
      'max-lg:hidden'
    ].join(' '),
    sidebarSlideoverContainer: 'w-full sm:max-w-80',
    sidebarSlideover: [
      'h-full',
      'overflow-hidden',
      'flex flex-col text-(--b24ui-typography-label-color)',
      'bg-(--ui-color-base-white-fixed) dark:bg-(--ui-color-bg-content-primary) edge-dark:bg-[#21334cf0]',
      'ring-1 ring-(--ui-color-divider-vibrant-less)',
      'shadow-xs',
      'rounded-none'
    ].join(' '),
    sidebarSlideoverBtnClose: [
      '-mb-3',
      'px-4 pt-3'
    ].join(' '),
    contentWrapper: [
      'flex-1 flex flex-col' // h-full --- min-h-full
    ].join(' '),
    header: [
      // @memo use src/runtime/air-design-tokens/components/navigation-menu.css
      'air-header',
      'px-(--content-area-shift) min-h-(--topbar-height)',
      'flex items-center gap-x-1'
    ].join(' '),
    headerMenuIcon: 'lg:hidden',
    headerWrapper: [
      'min-w-0 flex-1',
      'h-full'
    ].join(' '),
    pageWrapper: [
      'flex flex-col',
      'lg:grid lg:grid-cols-12 lg:gap-[22px]' // h-full ... min-h-full
    ].join(' '),
    container: [
      'lg:col-span-12',
      'lg:min-w-0',
      'flex-1 flex flex-col lg:gap-[22px]'
    ].join(' '),
    containerWrapper: [
      'grow group/layout-content'
    ].join(' '),
    pageTopWrapper: [
      'text-(--ui-color-base-1)',
      'flex items-center gap-[12px]'
    ].join(' '),
    pageActionsWrapper: [
      // 'min-h-[28px]', // @memo not work
      'flex flex-col md:flex-row items-start md:items-center justify-start gap-[12px]'
    ].join(' '),
    containerWrapperInner: 'size-full',
    pageRightWrapper: '',
    pageBottomWrapper: '',
    loadingWrapper: [
      'cursor-wait',
      // 'isolate absolute z-1000 inset-0',
      'w-full h-dvh',
      'flex flex-row flex-nowrap items-center justify-center'
      // @memo save
      // 'bg-[#00204e]/52', //  //#000000/66 // [#00204e]/52
      // 'motion-safe:backdrop-blur-sm'
    ].join(' '),
    loadingIcon: [
      'text-(--ui-color-design-plain-content-icon-secondary)',
      'size-[110px] animate-spin-slow'
    ].join(' ')
  },
  variants: {
    inner: {
      true: {
        root: [
          'base-mode --inner',
          // 'light', base-mode
          'relative isolate',
          'h-full',
          'overflow-hidden'
        ].join(' '),
        sidebar: [
          'relative',
          'z-[0]'
        ].join(' '),
        header: [
          'relative'
        ].join(' '),
        container: [
          'mt-0'
        ].join(' '),
        containerWrapper: '',
        pageBottomWrapper: 'flex-0'
      },
      false: {
        root: [
          '--app',
          // 'h-screen min-h-screen',
          'max-lg:flex-col'
        ].join(' '),
        sidebar: [
          'h-screen lg:sticky' // 'fixed'
        ].join(' '),
        header: [
          'relative'
        ].join(' '),
        container: [
          'relative'
        ].join(' '),
        containerWrapper: ''
      }
    },
    offContentScrollbar: {
      false: '',
      true: ''
    },
    useSidebar: {
      true: '',
      false: ''
    },
    useLightContent: {
      true: {
        containerWrapper: [
          'base-mode',
          'text-(--ui-color-text-primary)',
          'bg-(--ui-color-bg-content-primary)'
        ].join(' '),
        loadingIcon: [
          'edge-dark:text-(--ui-color-gray-70)'
        ].join(' ')
      },
      false: {
        pageWrapper: 'px-(--content-area-shift)',
        container: '' // px-(--content-area-shift)'
      }
    },
    loading: {
      true: ''
    },
    useNavbar: {
      true: '',
      false: ''
    },
    useRightBar: {
      true: {
        pageWrapper: '',
        container: 'lg:col-span-10',
        pageRightWrapper: 'lg:col-span-2 order-first lg:order-last' //  z-[2]
      },
      false: {
        container: ''
      }
    }
  },
  compoundVariants: [
    // region inner||main.useLightContent ////
    {
      inner: true,
      useLightContent: true,
      class: {
        container: '',
        pageTopWrapper: 'px-0 lg:px-0',
        pageActionsWrapper: 'px-0 lg:px-0',
        containerWrapper: [
          'p-[20px]',
          'rounded-(--ui-border-radius-md)'
        ].join(' ')
      }
    },
    {
      inner: false,
      useLightContent: true,
      class: {
        container: '', // lg:pb-2
        // pageTopWrapper: 'px-6 lg:px-0',
        // pageActionsWrapper: 'px-6 lg:px-0',
        containerWrapper: [
          'p-6 lg:px-[22px] lg:py-[15px]',
          'lg:rounded-(--ui-border-radius-md)'
        ].join(' ')
      }
    },
    // endregion ////
    // region inner.noContentScrollbar ////
    {
      inner: true,
      offContentScrollbar: false,
      class: {
        // pageWrapper: 'scrollbar-thin scrollbar-transparent overflow-y-scroll'
        // root: 'scrollbar-thin scrollbar-transparent' //  overflow-y-scroll
      }
    },
    // endregion ////
    // region main.useSidebar ////
    {
      inner: true,
      useSidebar: [true, false],
      class: {
        pageWrapper: 'pb-[20px] lg:pt-0 lg:px-[20px] lg:ps-[20px] lg:pe-[20px]'
      }
    },
    {
      inner: false,
      useSidebar: true,
      class: {
        // @memo --content-area-left-shift
        // container: 'lg:px-[calc(var(--content-area-shift)-6px)]',
        header: 'ps-[calc(var(--content-area-shift)-10px)] pe-[calc(var(--content-area-shift))] lg:px-(--content-area-shift)',
        pageWrapper: 'lg:px-(--content-area-shift)',
        container: '', // lg:mx-(--content-area-shift)
        contentWrapper: '' // 'lg:pl-[240px] '
      }
    },
    {
      inner: false,
      useSidebar: false,
      class: {
        pageWrapper: 'px-(--content-area-shift)',
        container: '', // pb-2 lg:pt-2 lg:px-2 px-(--content-area-shift)
        contentWrapper: 'lg:pl-0'
      }
    },
    // endregion ////
    // region main.useNavbar ////
    {
      inner: true,
      useNavbar: [true, false],
      class: {
        container: 'h-full'
      }
    },
    {
      inner: false,
      useNavbar: true,
      class: {
        // pageWrapper: 'min-h-[calc(100dvh-var(--topbar-height))]', // ??
        container: 'h-auto' // min-h-[calc(100dvh-var(--topbar-height))]
      }
    },
    {
      inner: false,
      useNavbar: false,
      class: {
        container: 'h-full'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    inner: false,
    noContentScrollbar: false,
    useLightContent: true
  }
}
