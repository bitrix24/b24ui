# Changelog

## [0.6.8](https://github.com/bitrix24/b24ui/compare/v0.6.7...v0.6.8) (2025-06-04)

### Chore

* **deps:** update all non-major dependencies
* **tests:** improve
* **Calendar:** improve types

### Docs

* **form:** add example for external validate

## [0.6.7](https://github.com/bitrix24/b24ui/compare/v0.6.6...v0.6.7) (2025-04-24)

### Features

* **components:** add new `content-top` and `content-bottom` slots
* **Modal/Popover/Slideover:** add `close:prevent` event

### Bug Fixes

* **InputMenu/SelectMenu:** remove `valueKey` string case

### Docs

* **installation:** update instructions for inertia

### Chore

* **Skeleton:** remove `aria-busy:cursor-progress` class

## [0.6.6](https://github.com/bitrix24/b24ui/compare/v0.6.5...v0.6.6) (2025-04-23)

### Bug Fixes

* **usePortal:** adjust portal target resolution logic
* **Skeleton:** improve accessibility

### Docs

* **calendar:** add external controls example

## [0.6.5](https://github.com/bitrix24/b24ui/compare/v0.6.4...v0.6.5) (2025-04-22)

### Bug Fixes

* **App:** fix server side for `portal` prop

## [0.6.4](https://github.com/bitrix24/b24ui/compare/v0.6.3...v0.6.4) (2025-04-22)

### Features

* **Form:** add `attach` prop to opt-out of nested form attachement
* **App:** add global `portal` prop

### Bug Fixes

* **Form:** input and output type inference
* **Alert/Toast:** display actions when using slots

### Chore

* **deps:** update all non-major dependencies

## [0.6.3](https://github.com/bitrix24/b24ui/compare/v0.6.2...v0.6.3) (2025-04-18)

### Bug Fixes

* **Link:** proxy `download` property
* **components:** respect `transform-origin` in popper content
* **InputMenu/Select/SelectMenu:** add `min-w-fit` to `content` slot
* **vite:** vitest skipping nuxt imports transformations

### Docs

* **color-mode:** fix computed setter logic in `ColorModeButton.vue` example

## [0.6.2](https://github.com/bitrix24/b24ui/compare/v0.6.1...v0.6.2) (2025-04-16)

### Features

* **unplugin:** routing support for inertia

### Bug Fixes

* **Form:** loses focus on submit
* **types:** improve dynamic slots

### Chore

* **deps:** update all non-major dependencies
* **deps:** update tailwindcss to ^4.1.4

### Docs

* **form:** fix typo in expose section
* **installation:** improve `.vscode/settings.json` json

## [0.6.1](https://github.com/bitrix24/b24ui/compare/v0.6.0...v0.6.1) (2025-04-14)

### Features

* **Form:** export loading state
* **Tabs:** add `list-leading` and `list-trailing` slots
* **components:** refactor types after `@nuxt/module-builder` upgrade
* **types:** handle `ClassValue` in `b24ui` prop

### Chore

* run test suite on **windows**
* **deps:** update all non-major dependencies

## [0.6.0](https://github.com/bitrix24/b24ui/compare/v0.5.11...v0.6.0) (2025-04-10)

### ⚠ BREAKING CHANGES

* **deps:** update `@nuxt/module-builder`
* **OverlayProvider:** return an overlay instance from `.open()`

### Features

* **InputMenu/SelectMenu:** handle `resetSearchTermOnSelect`
* **Select:** handle `onSelect` field in items

### Bug Fixes
* **InputMenu/SelectMenu:** prevent `disabled` items to be selected

### Chore

* **deps:** update all non-major dependencies
* **package:** export utils, types

### Docs

* **form:** improve types

## [0.5.11](https://github.com/bitrix24/b24ui/compare/v0.5.10...v0.5.11) (2025-04-07)

### Bug Fixes

* **deps:** back `@nuxt/module-builder` v0.8.4

## [0.5.10](https://github.com/bitrix24/b24ui/compare/v0.5.9...v0.5.10) (2025-04-07)

### Bug Fixes

* **Popover:** arrow stroke at dark
* **InputMenu/SelectMenu:** support arbitrary `value`
* **NavigationMenu:** improve content slot

### Chore

* **NavigationMenu:** remove slots types in `createReusableTemplate`
* **module:** update metas
* **deps:** update `@nuxt/module-builder`
* **deps:** update all non-major dependencies

### Docs

* **radio-group:** items only accept strings or numbers

## [0.5.9](https://github.com/bitrix24/b24ui/compare/v0.5.8...v0.5.9) (2025-04-02)

### Features

* **Textarea:** add `autoresize-delay` prop
* **Textarea:** add `resize-none` class with `autoresize` prop
* **Textarea:** add `icon`, `loading`, etc. props to match Input

### Chore

* **Input/InputNumber/Textarea:** clean functions order
* **deps:** update nuxt framework to ^3.16.2

## [0.5.8](https://github.com/bitrix24/b24ui/compare/v0.5.7...v0.5.8) (2025-04-01)

### Features

* **InputNumber:** add support for `stepSnapping` & `disableWheelChange` props
* **RadioGroup:** add `card` and `table` variants

### Bug Fixes

* **InputMenu/SelectMenu:** correctly call `onSelect` events
* **InputMenu:** emit `change` on multiple item removal
* **DropdownMenu:** handle RTL mode

## [0.5.7](https://github.com/bitrix24/b24ui/compare/v0.5.6...v0.5.7) (2025-03-31)

### Bug Fixes

* **Avatar:** proxy `$attrs` to default slot
* **vue:** mock `nuxtApp.hooks` & `useRuntimeHook`
* **useOverlay:** refine `open` method type to infer close emit return type
* **DropdownMenuContent:** remove unwanted `any`

### Chore

* **layout:** add StackedLayout & SidebarLayout

### Docs

* **SidebarLayout/B24StackedLayout:** add demo link

## [0.5.6](https://github.com/bitrix24/b24ui/compare/v0.5.5...v0.5.6) (2025-03-28)

### Features

* **StackedLayout:** improve

### Bug Fixes

* InputMenu: reset `searchTerm` on `update:open`
* input:tag: improve

### Chore

* **SidebarLayout:** improve
* **playground:** improve
* **playground:** use StackedLayout

## 0.5.5 (2025-03-27)

### Bug Fixes

* **FormField:** add `help` to `aria-describedby` attribute
* **Form:** clear dirty state after submit

### Chore

* **deps:** update all non-major dependencies
* **NavigationMenu:** improve

### Docs

* **Collapsible:** improve

## 0.5.4 (2025-03-26)

### Features

* **Calendar:** allow year and month buttons styling

### Bug Fixes

* **Switch:** prevent transition on focus
* **Tabs:** remove `focus:outline-hidden` class
* **Button:** use `focus:outline-none` instead of `focus:outline-hidden`
* **NavigationMenu:** add `z-index` on viewport
* **Link:** properly pick all `aria-*` & `data-*` attrs
* **Link:** proxy `onClick`
* **Link:** prevent `active="true"` binding on html
* **Link:** handle `aria-current` like `NuxtLink` / `RouterLink`
* **components:** improve generic types
* **Container:** add `w-full` class

### Chore

* **defineLocale:** put back `@__NO_SIDE_EFFECTS__`
* **docs/playground:** add `vite.optimizeDeps
* **github:** improve module workflow
* **deps:** declare form validation libraries as `peerDependencies`
* **choredeps:** remove `typescript` resolution
* **deps:** add `zod`

### Docs

* **i18n:** remove `next` tag from `@nuxtjs/i18n` installation

## 0.5.3 (2025-03-24)

### Chore

* **deps:** move `@standard-schema/spec` to `dependencies`

### Docs

* **NavigationMenu:** improve

### Bug Fixes

* **defineLocale/defineShortcuts:** remove `@__NO_SIDE_EFFECTS__`

## 0.5.2 (2025-03-22)

### Chore

* **NavigationMenu:** improve

## 0.5.1 (2025-03-21)

### Features

* **components:** handle events in `content` prop

### Bug Fixes

* **Modal/Slideover/Toast:** prevent unnecessary close instantiation
* **module:** handle tailwindcss import without `theme(static)`
* **RadioGroup:** handle `disabled` on items

### Chore
* **deps:** update all non-major dependencies
* **deps:** update `vaul-vue`
* **deps:** update tailwindcss to ^4.0.15
* **NavigationMenu:** improve

## 0.5.0 (2025-03-20)

### ⚠ BREAKING CHANGES

* **refactor(Form):** drop explicit support for `zod` and `valibot`

### Bug Fixes

* **DropdownMenu:** remove `any` from `proxySlots`

### Chore

* **Playground:** improve navigation
* **Form:** improve TSDoc
* **deps:** update nuxt framework to ^3.16.1
* **NavigationMenu:** improve
* **Navbar.../Sidebar...:** improve

## 0.4.11 (2025-03-19)

### Features

* **Collapsible:** add new component
* **NavigationMenu:** add new component

### Bug Fixes

* **useLocale**: unique symbol
* **module:** mark functions used in exports as pure

### Chore

* **components:** add eol in script tag to fix syntax highlight
* **SidebarLayout:** make auto close Slideover
* **Navbar.../Sidebar...:** improve tv

## 0.4.10 (2025-03-18)

### Docs

* **installation:** improve vscode recommendations

### Features

* **SidebarLayout:** new components (documentation is being prepared)

### Bug Fixes
* **vue:** missing unhead context
* **unplugin:** include `@compodium/examples` in auto-imports paths

### Chore

* **deps:** update
* **Demo/Playground/Playground-Vue:** use SidebarLayout

## 0.4.9 (2025-03-14)

### Docs

* **Prose:** add content and typography

### Chore

* **deps:** update

## 0.4.8 (2025-03-13)

### Features

* **Calendar:** new component

### Chore

* **deps:** update
* **Locales:** add iso `locale`

## 0.4.7 (2025-03-12)

### Features

* **Form:** global errors
* **Popover:** new component
* **Demo:** add prose page

### Bug Fixes

* **vue:** prevent calling `useHead` in colors

## 0.4.6 (2025-03-11)

### Features
* **useLocale:** handle generic messages
* **ProseTable:** add new prose

### Chore
* **deps:** update vueuse monorepo to v13
* **deps:** remove `happy-dom` resolution
* **deps:** update all non-major dependencies
* **deps:** add `vue` / `vue-router` as dependencies
* **vitest:** improve config to ignore docs `.c12`

## 0.4.5 (2025-03-10)

### Features

* **Input/Textarea:** allow `null` value in model
* **ProseImg:** add new prose

### Bug Fixes

* **Button:** missing import
* **Form:** input blur validation on submit

### Chore

* **deps:** update tailwindcss to ^4.0.12
* **deps:** update all non-major dependencies
* **deps:** update dependency tailwind-variants to v1
* **deps:** update nuxt framework to ^3.16.0
* **deps:** update @unhead/vue to ^2.0.0-rc.9
* **LinkBase:** update types for `nuxt@3.16`

## 0.4.4 (2025-03-08)

### Features

* **i18n:** the list of localizations matches Bitrix24

### Docs
* **i18n:** add info for vue & nuxt

## 0.4.3 (2025-03-07)

### Chore

* **Avatar:** add props `style`
* **Prose:** improve
* **deps:** update all non-major dependencies

## 0.4.2 (2025-03-06)

### Features
* **Button:** handle `active` state
* **Modal/Slideover:** add props `overlayBlur`

### Chore
* **deps:** update tailwindcss to ^4.0.10

## 0.4.1 (2025-03-05)

### Bug Fixes

* **InputMenu:** wrong `required` in multiple mode
* **InputMenu/SelectMenu:** proxy `required` in root props

### Features

* **prose:** new prose components

### Chore

* **Slideover:** add safeList
* **components:** add `@IconComponent` tag on icon properties
* **components:** improve tsdoc
* **deps:** update dependency ohash to v2
* **Modal/Slideover:** add backdrop blur
* **DescriptionList:** move from `components/content` to `components`
* **TableWrapper:** move from `components/prose` to `components/content`

### Docs

* **getting-started:** improve

## 0.4.0 (2025-03-03)

### Bug Fixes

* **Button:** loader state
* **OverlayProvider:** fix types

### Features

* **package:** export `components` and `composables`

## 0.3.5 (2025-02-28)

### Bug Fixes

* **Toaster:** modal & toast
* **Button:** loader state

## 0.3.4 (2025-02-28)

### ⚠ BREAKING CHANGES

* **useOverlay:** handle programmatic modals and slideovers

### Features
* **Slideover:** new component

### Chore

* **vue:** stub `useColorMode`
* **vue:** auto import `useAppConfig`

## 0.3.3 (2025-02-27)

### Docs

* **ColorMode:** add info

### Chore

* **css:** source to root dir
* **vue:** add `useCookie` stub
* **vue:** export `defineShortcuts` & `useLocale` & `useConfetti` composables

### Bug Fixes

* **Link:** improve external links handling in vue

## 0.3.2 (2025-02-26)

### Features
* **useConfetti:** add composable to programmatically control `canvas-confetti`

### Docs
* **install:** improve info

### Chore
* **tailwindcss/vite:** improve source

## 0.3.1 (2025-02-25)

### Features
* **Modal:** add `scrollbarThin` prop

### Bug Fixes
* **FormFields:** required label dark class
* **Toaster:** add def position
* **Button:** loader size
* **Modal:** header min-height

### Docs
* **InputMenu:** improve

### Chore
* **deps:** update
* **docs:** improve app
* **demo:** improve
* **Form:** improve example

## 0.3.0 (2025-02-24)

### ⚠ BREAKING CHANGES

* **tailwindcss/vite:** improve for tailwindcss/vite v4.0.8

### Features
* **DropdownMenu/InputMenu/Select:** add item attr `color`

### Bug Fixes
* **components:** missing `$attrs` bind
* **Switch:** use with Tooltip

## 0.2.9 (2025-02-21)

### Features
* **Form:** add prop to disable state transformation
* **TableWrapper:** new component

### Docs
* **Installation:** improve
* **TableWrapper:** new component

### Bug Fixes
* **Tooltip:** bind `$attrs` on trigger
* **Form:** ensure loading state resets to false after an error
* **Modal:** disable close autofocus
* **Modal:** use `dvh` unit
* **Avatar:** render on SSR
* **vite:** exclude `@nuxt/ui` from vite pre-optimization
* **Modal:** fixed header height

### Chore
* **deps:** update `reka-ui` and `vaul-vue`
* **Toaster:** fix ts error

## 0.2.8 (2025-02-18)

### Docs

* **SelectMenu:** improve

### Bug Fixes

* **module:** use key when merging modules options
* **Badge:** improve show underline

### Chore
* **Avatar/Stepper:** fix types for `vue-tsc@2.2.0`
* **playground/playground-vue/demo:** move styles into `main.css`

## 0.2.7 (2025-02-17)

### Bug Fixes

* **Modal:** fix max-w

## 0.2.6 (2025-02-17)

### Features

* **DropdownMenu:** add `external-icon` prop
* **Link:** allow usage without `vue-router` in vue

### Docs

* **InputNumber:** improve
* **DropdownMenu:** improve

### Chore

* **demo:** make self workspace for demo

### Bug Fixes

* **InputMenu/Textarea:** add missing `PartialString` type on `b24ui` prop
* **Modal:** always fullscreen on mobile

## 0.2.5 (2025-02-12)

### Docs

* **Modal:** improve

### Chore

* **deps:** update
* **test-vue:** add content & prose folders

### Bug Fixes

* **SelectMenu:** wrap content with `FocusScope`
* **DescriptionList:** display description in the dark
* **RadioGroup:** make `RadioGroup.legend` eq `FormField.label`

## 0.2.4 (2025-02-11)

### Features

* **InputNumber:** new component

### Chore

* **module:** fix some style, test & etc

### Bug Fixes

* **Modal:** addPlugin

## 0.2.3 (2025-02-09)

### Features

* **Modal/ModalProvider/ModalDialogClose:** new component
* **useModal:** new composables

### Chore

* **css:** use new syntax for css variables

### Bug Fixes

* **Button:** px-0 for link color
* **Button/Checkbox/RadioGroup/Range/Switch:** focus-visible state

## 0.2.2 (2025-02-07)

### Features

* **module:** fake generate `tailwindcss` theme colors (for compatibility only)
* **DropdownMenu:** new component

## 0.2.1 (2025-02-06)

### Features

* **Alert/Toast/DescriptionList:** add `orientation` prop
* **Toast:** handle vnodes in `title` and `description`
* **useToast:** proxy emits
* **InputMenu:** new component

### Bug Fixes

* **Toast:** rename `click` to `onClick` for consistency
* **useToast:** don't return a promise on `add`

### Docs

* **Install:** improve
* **SelectMenu:** improve
* **InputMenu:** improve

## 0.1.7 (2025-02-05)

### Features

* **SelectMenu:** new component

### Bug Fixes

* **Button:** not render loaders if not loading
* **form:** import types from `@bitrix24/b24ui-nuxt`
* **App:** wrap `ModalProvider` / `SlideoverProvider` inside `TooltipProvider`

### Chore
* **types:** export `utils`
* **templates:** import from `@bitrix24/b24ui-nuxt`
* **package:** export `utils`

## 0.1.6 (2025-02-04)

### Features
* **Select:** improve
* **ButtonGroup:** improve split mode
* **Badge:** add support within button groups

### Bug Fixes

* **Link:** add import B24LinkBase

### Docs

* **Tooltip:** improve
* **Avatar:** improve

## 0.1.5 (2025-01-31)

### Features
* **unplugin:**  expose options for embedded plugins, throw warnings for duplication

### Bug Fixes

* **test-vue:** improve

### Docs

* **Toast:** improve
* **Progress:** improve

## 0.1.4 (2025-01-30)

### Docs
* **Advice:** improve
* **Chip:** improve

### Bug Fixes

* **Badge:** missing `B24Avatar` import
* **Toast|Alert:** if/else for Icons and Avatars
* **Select:** remove from useFormField deferInputValidation
* **theme:** Cast them slots types to string
* **Test:** improve

## 0.1.3 (2025-01-29)

### Bug Fixes

* **Tooltip:** bg-color

## 0.1.2 (2025-01-29)

### Bug Fixes

* **icon:** fixed typing of icons in components

## 0.1.1 (2025-01-28)

### Features
- components
  - Advice
  - Alert
  - App
  - Avatar
  - AvatarGroup
  - Badge
  - Button
  - ButtonGroup
  - Checkbox
  - Chip
  - Container
  - Countdown
  - Form
  - FormField
  - Input
  - Kbd
  - Link
  - LinkBase
  - Progress
  - RadioGroup
  - Range
  - Select
  - Separator
  - Skeleton
  - Switch
  - Tabs
  - Textarea
  - Toast
  - Toaster
  - Tooltip
- components::content
  - DescriptionList
- vue plugin
- playground
- docs
