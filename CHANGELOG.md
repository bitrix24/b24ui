# Changelog

## [2.1.7](https://github.com/bitrix24/b24ui/compare/v2.1.6...v2.1.7) (2025-11-xx)

* docs(installation/vue): typo fix
* docs(typography/CardGroup): typo fix
* docs(ComponentCode): add missing cast imports

## [2.1.6](https://github.com/bitrix24/b24ui/compare/v2.1.5...v2.1.6) (2025-11-20)

### Bug Fixes

* **Link:** ensure consistency across Nuxt, Vue and Inertia
* **Link:** define NuxtLinkProps instead of importing from `#app`

### Docs

* update props schema to prevent hydration issues
* **ComponentCode:** Improve import generation
* **llms:** Improve llms format
* **llms:** Improve llms format callout

## [2.1.5](https://github.com/bitrix24/b24ui/compare/v2.1.4...v2.1.5) (2025-11-19)

### Bug Fixes

* **NavigationMenu:** proxy `modelValue` / `defaultValue` in vertical orientation
* **NavigationMenu:** hide label and trailing with css when collapsed
* **ContentSearchButton/DashboardSearchButton:** hide label and trailing with css when collapsed
* **CheckboxGroup/RadioGroup/Switch:** consistent disabled styles

### Docs

* **navigation-menu:** incorrect index in model value example

### Chore

* **deps:** remove @vueuse/nuxt

## [2.1.4](https://github.com/bitrix24/b24ui/compare/v2.1.3...v2.1.4) (2025-11-18)

### Features

* **Table:** handle virtualizer `estimateSize` as function

### Bug Fixes

* **module:** scan layers when using component detection
* **ColorModeButton:** use css to display color mode icon
* **components:** calc virtualizer estimateSize based on item description
* **InputMenu:** prevent change event when selecting create item

### Docs

* improve llms

## [2.1.3](https://github.com/bitrix24/b24ui/compare/v2.1.2...v2.1.3) (2025-11-17)

### Features

* **components:** add `data-slot` attributes

### Bug Fixes

* **types:** export missing utils types
* **CommandPalette/ContentSearch:** improve performances and filtering logic
* **inertia:** set serverRendered dynamically to prevent SSR crash

### Docs

* **app:** improve navigation filtering logic
* **components:** add search to filter navigation

### Chore

* **deps:** update

## [2.1.2](https://github.com/bitrix24/b24ui/compare/v2.1.1...v2.1.2) (2025-11-13)

### Features

* **FileUpload:** add `preview` prop
* **icons:** use @bitrix24/b24icons-nuxt

### Bug Fixes

* **Link:** partial extend for `vue-router` and `inertia`
* **ProseCallout:** add MdnWebDocIcon|InfoCircleIcon

### Docs

* **config:** add extraAllowedHosts
* **input-date:** add DatePicker and DateRangePicker examples

## [2.1.1](https://github.com/bitrix24/b24ui/compare/v2.1.0...v2.1.1) (2025-11-11)

### Bug Fixes

* **components:** remove `locale` / `dir` props proxy
* **Advice:** restore icons and avatar
* **ChatMessage:** icons color improve

### Docs

* **mcp:** update deprecated server.tool()
* **chatAi:** add DeepSeek in dev mode
* **playground\nuxt:** add DeepSeek in dev mode

## [2.1.0](https://github.com/bitrix24/b24ui/compare/v2.0.9...v2.1.0) (2025-11-10)

### ⚠ BREAKING CHANGES

* **module:** properly export composables from module
* **components:** consistent exposed refs

### Features

* **components:** extend native HTML attributes
* **InputDate:** new component
* **InputTime:** new component

### Bug Fixes

* **FileUpload:** ensure native validation works with required
* **Input/InputNumber/Textarea:** make `modelModifiers` generic
* **components:** clean html attributes extend
* **vue:** check `import.meta.env.SSR` to support `vite-ssg`
* **Table:** apply styles to `th` based on column meta

### Docs

* **form:** type validate method schema
* **locale-select:** use `model-value` instead of `v-model` in examples

### Chore

* **deps:** update all non-major dependencies
* **deps:** update nuxt framework to ^4.2.1

## [2.0.9](https://github.com/bitrix24/b24ui/compare/v2.0.8...v2.0.9) (2025-11-04)

### Features

* **Modal:** add `scrollable` prop
* **module:** add `theme.prefix` option

### Bug Fixes

* **Form:** refine `nested` prop type handling and simplify logic

### Chore

* **deps:** update vue-tsc to ^3.1.3

## [2.0.8](https://github.com/bitrix24/b24ui/compare/v2.0.7...v2.0.8) (2025-11-01)

### Chore

* **deps:** remove `unimport` resolution

### Bug Fixes

* **RadioGroup:** update `update:modelValue` emit type
* **vite:** write theme templates

### Docs

* **llms:** expand `components-list` in raw markdown

## [2.0.7](https://github.com/bitrix24/b24ui/compare/v2.0.6...v2.0.7) (2025-10-30)

### Chore

* **ChatPrompt:** improve
* **ChatPromptSubmit:** improve
* **ChatPalette:** improve
* **deps:** update nuxt framework to ^4.2.0
* **deps:** patch `@nuxt/vite-builder`
* **Form:** skip tests because of race condition

### Docs

* **nuxt.config:** reduce component meta bundle size

### Bug Fixes

* **module:** detect lazy components when using `experimental.componentDetection`
* **NavigationMenu/Tabs:** ensure proper badge display
* **Button:** width for one icon

## [2.0.6](https://github.com/bitrix24/b24ui/compare/v2.0.5...v2.0.6) (2025-10-28)

### Features

* **dictionary/icons:** add arrowDown,arrowUp,stop,reload
* **chat:** new components: ChatMessages, ChatPalette, ChatPrompt, ChatPromptSubmit

### Chore

* **deps:** update all non-major dependencies
* **deps:** update vue-tsc to ^3.1.2
* **deps:** update devdependency vite to ^7.1.12

### Bug Fixes

* **utils\dashboard|SidebarLayout:** downgrade
* **ChatMessage:** some improve

## [2.0.5](https://github.com/bitrix24/b24ui/compare/v2.0.4...v2.0.5) (2025-10-27)

### Features

* **ChatMessage:** new component

### Bug Fixes

* **utils\dashboard:** added a little entropy

## [2.0.4](https://github.com/bitrix24/b24ui/compare/v2.0.3...v2.0.4) (2025-10-27)

### Bug Fixes
* **useFieldGroup:** change Symbol
* **DashboardGroup:** improve props

## [2.0.3](https://github.com/bitrix24/b24ui/compare/v2.0.2...v2.0.3) (2025-10-24)

### Features
* **InputNumber:** handle `increment` / `decrement` as booleans
* **SidebarLayout/DashboardGroup:** improve sidebarLoading hook

### Bug Fixes
* **Error:** render as `div` instead of `main`

## [2.0.2](https://github.com/bitrix24/b24ui/compare/v2.0.1...v2.0.2) (2025-10-23)

### Features
* **SidebarLayout/DashboardGroup:** add sidebarLoading hook

### Chore
* **deps:** update dependency reka-ui to v2.6.0

## [2.0.1](https://github.com/bitrix24/b24ui/compare/v2.0.0...v2.0.1) (2025-10-22)

### Features

* **ProseImg:** improve `zoom` transition
* **CommandPalette:** preserve group order in search results
* **CommandPalette:** add `children-icon` prop to use `trailing-icon` in input

### Bug Fixes
* **Breadcrumb:** handle `active` in items
* **ContextMenu/DropdownMenu:** allow item content class override
* **CommandPalette/ContextMenu/DropdownMenu:** ensure items truncate work & itemTrailingIcon color
* **ContentSearch:** de-duplicate description and suffix

## [2.0.0](https://github.com/bitrix24/b24ui/compare/v1.0.4...v2.0.0) (2025-10-21)

### ⚠ BREAKING CHANGES
* **components:** rename nullify modifier to nullable and add optional
* **Form:** don't mutate the form's state if transformations are enabled
* **Table:** consistent args order in select event
* **Slideover|SidebarLayout:** remove composable useSidebarLayout
* **FieldGroup:** rename from ButtonGroup

### Features

* **components:** implement virtualization and expose `b24ui` in slot props
* **components:** add `description` support in items and icons position
* **module:** add `experimental.componentDetection` option
* **overlays:** add `close` method to Popover slots
* **useToast:** handle `max` global configuration
* **menus:** add global event handlers and checkbox examples
* **prose:** new components (Callout, Collapsible, CodeCollapse, CodeIcon, Tabs, Accordion, Badge, Kbd, Steps, Card, CodeGroup, CodePreview, Script)
* **layout:** new components (Error, PageLinks, ContentSurround, ContentToc, Empty, PageCard, PageGrid, PageColumns, PageList)
* **inputs:** new components (CheckboxGroup, ColorPicker, FileUpload, InputTags, PinInput)
* **navigation:** new components (ContextMenu, Pagination, Timeline, User, Breadcrumb, ContentSearch, DashboardGroup, Stepper)
* **data-display:** new components (Table, Banner, Card)
* **color-mode:** improve configuration across all components
* **locale:** improve configuration

### Bug Fixes

* **prose:** fix colors, sizes and add hash support for headings
* **prose:** improve code hover and table sizing
* **layouts:** improve SidebarLayout theme and Slideover close button
* **NavigationMenu:** improve theme
* **Form:** remove Joi and Yup in favor of @standard-schema/spec
* **Form:** fix nested validation and reactivity issues
* **inputs:** fix hover states and remove unwanted styles
* **Table:** fix hydration errors and footer spacing
* **FileUpload:** fix focus management and image preview
* **Calendar:** fix width and color issues
* **unplugin:** handle components resolution with subpath

### Docs

* **app:** implement AI search
* **components:** add props, slots display components
* **examples:** add input mask demonstration

### Chore

* **deps:** import `@nuxt/ui-pro` components
* **tests:** add accessibility tests
* **style:** fix CSS variable naming

## [1.0.4](https://github.com/bitrix24/b24ui/compare/v1.0.3...v1.0.4) (2025-09-02)

### Features

* **useFormField:** export form errors injection key

### Bug Fixes

* **components:** broken types for `update:model-value` event
* **Form:** update `Form` interface to accept RegExp
* **InputMenu/Select/SelectMenu:** show placeholder when model value is falsy
* **InputMenu:** prevent `focus-outside` event on content

## [1.0.3](https://github.com/bitrix24/b24ui/compare/v1.0.2...v1.0.3) (2025-08-26)

### Bug Fixes
* **SidebarLayout**: for mode `useLightContent` set new padding, restore `containerWrapper` context `light`

## [1.0.2](https://github.com/bitrix24/b24ui/compare/v1.0.1...v1.0.2) (2025-08-25)

### Bug Fixes
* **SidebarLayout**: color for `loadingIcon` for `edge-dark` context when using `useLightContent`

### Features
* **Slideover**: add b24ui `sidebarLayoutLoadingWrapper` and `sidebarLayoutLoadingIcon`

## [1.0.1](https://github.com/bitrix24/b24ui/compare/v0.7.2...v1.0.1) (2025-08-20)

### AirWeb
* **TableWrapper** fix `color`
* **ProseHr\ProseUl\ProseOl\ProseA\ProseBlockquote** fix color
* **ProseP** fix `color`, add prop `small`, add prop accent `{default, accent, accent-more, less, less-more}`
* **ProseH*** fix `color`, add prop `accent` `{default, accent, accent-more, less, less-more}`
* **ProseH1\ProseH2\ProseH3\ProseH4\ProseH5\ProseH6** fix color, add prop accent `{default, accent, accent-more, less, less-more}`
* **ProseCode** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **ProseCode** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **NavbarDivider\SidebarHeading** fix `color`
* **Popover** fix `color`, `arrow`
* **DropdownMenu** fix color, `arrow`, remove `size`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **NavigationMenu** fix `hint`, `delayDuration`, remove `contentOrientation`, `highlight`, `highlightColor`, `arrow`, `color`, `variant.link`
* **StackedLayout** remove, use SidebarLayout
* **SidebarLayout** add slots `content-top`, `content-actions`, `loading`, add prop `inner`, `offContentScrollbar` 
* **useSidebarLayout** add composable 
* **Button** prop `normal-case` now `true`, new size `{xl, lg, md, sm, xs, xss}`, deprecate prop `depth`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-secondary, air-secondary-alert, air-secondary-accent, air-secondary-accent-1, air-secondary-accent-2, air-secondary-no-accent, air-tertiary, air-tertiary-accent, air-tertiary-no-accent, air-selection, air-boost}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai, link}`
* **Separator** add type `double`, remove prop `color`, add prop `accent` `{default, accent, less}`, prop `size` `{thin, thick}`
* **Skeleton** add prop `accent` `{default, accent, less}`
* **Slideover** remove prop `scrollbarThin`, prop `side` now `bottom`, calc size from `max-w-*`, use `SidebarLayout` for render content
* **Modal** fix `color`, add slot `contentWrapper`
* **Kbd** fix `arrow`, fix `color`, remove `depth`, add prop `accent` `{default, accent, less}`
* **Tooltip** fix `arrow`, fix `color`, remove `kbdsDepth`, add prop `kbdsAccent` from `Kbd`
* **Toast** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Alert** fix `color`, add prop `inverted`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary, air-secondary-alert, air-secondary-accent, air-secondary-accent-1, air-secondary-accent-2, air-tertiary}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Container** fix `size`
* **Accordion** fix `color`
* **Advice** fix `color`, remove empty `Avatar`
* **Chip** fix `color`, add prop `hideZero`, add prop `trailingIcon`, add prop `inverted`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary, air-secondary-accent, air-secondary-accent-1, air-tertiary}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`, deprecate `size` `{3xs, 2xs, xs, xl, 2xl, 3xl}`
* **Badge** fix `color`, add prop `inverted`, remove `depth`, remove `useFill` now use `inverted`, new `size` `{xss, xs, sm, md, lg, xl}`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary, air-secondary-alert, air-secondary-accent, air-secondary-accent-1, air-secondary-accent-2, air-tertiary, air-selection}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Switch** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Checkbox** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **RadioGroup** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Progress** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Range** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Calendar** fix `color`, off `yearControls`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **DescriptionList** fix `color`
* **Input\InputNumber\Textarea** fix `color`, fix `size`, use `Badge` as tag, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Select\SelectMenu\InputMenu** fix `color`, fix `size`, fix dropdown height, use `Badge` as tag, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **From\FormField** fix `color`, fix `size`
* **Tabs** fix `color`, fix `size`, remove prop `color`, remove variant `pill`

### Features

* **Form:** support error RegExp in exposed methods
* **useOverlay:** return promise on `open` method

### Bug Fixes

* **Input:** incorrect rendering of type `date` / `time` on iOS
* **InputMenu/Select/SelectMenu:** add display value fallback when no items found
* **Select/InputMenu:** handle focus via label inside a FormField
* **Tabs:** add missing Badge import
* **Toast:** add type for progress `ui` prop
* **Tooltip:** render only if `text` or `kbds` are present
* **Link** ensure target `_blank` is flagged as external for Inertia and Vue
* **Form** default slot types

## [0.7.2](https://github.com/bitrix24/b24ui/compare/v0.7.1...v0.7.2) (2025-07-14)

### Bug Fixes

* **Prose/Em:** improve types

## [0.7.1](https://github.com/bitrix24/b24ui/compare/v0.7.0...v0.7.1) (2025-07-13)

### Bug Fixes

* **Slideover/Modal:** dialogContent class

### Features

* **AirWeb:** start work with new theme

## [0.7.0](https://github.com/bitrix24/b24ui/compare/v0.6.9...v0.7.0) (2025-07-01)

### ⚠ BREAKING CHANGES

* **components:** `class` should have priority over `ui` prop
* **NavigationMenu:** revert new `collapsible` field
* **InputMenu/Select/SelectMenu:** manual viewport to display scrollbars
* **useOverlay:** correct spelling of `unmount` function

### Features

* **components:** add `b24ui` field in items
* **useOverlay:** add `closeAll` method
* **useOverlay:** add `isOpen` method to check overlay state
* **NavigationMenu:** handle `tooltip` in items
* **NavigationMenu:** add `collapsible` field in items
* **NavigationMenu:** handle `vertical` orientation with Accordion instead of Collapsible
* **NavigationMenu:** add `tooltip` and `popover` props
* **NavigationMenu:** add `trigger` type in items
* **Modal/Slideover:** add `after:enter` event
* **Modal/Slideover:** add `close` method in slots
* **Modal/Slideover:** add `actions` slot
* **Popover:** add `anchor` slot
* **Toast:** add `progress` prop to hide progress bar
* **Select/SelectMenu:** handle dynamic `autofocus`
* **Select/SelectMenu/Tabs:** expose trigger refs
* **Badge:** add `square` prop
* **Avatar:** add `chip` prop
* **Form:** expose loading state to default slot
* **InputNumber:** add `increment-disabled` / `decrement-disabled` props
* **extendLocale:** new composable
* **Accordion:** new component
* **Tooltip:** add `reference` prop
* **Input/Textarea:** add `default-value` prop

### Bug Fixes

* **defineShortcuts:** bring back `meta` to `ctrl` convert on non macros platforms
* **RadioGroup:** improve items `value` field type
* **useOverlay:** improve types and docs
* **templates:** put back args to watch in dev
* **templates:** dont write unused variants in theme files
* **Calendar:** add `place-items-center` to grid row
* **theme:** improve app config types for `b24ui` object
* **inertia|vue:** link always render as anchor tag
* **Tabs:** prevent trigger truncate without parent width
* **Tabs:** set `focus:outline-none` with `link` variant
* **Badge/Button:** handle zero value in label correctly
* **Select:** support more primitive types in `value` field
* **Toaster:** allow `base` slot override
* **vue:** make `useAppConfig` reactive
* **inertia:** make `useAppConfig` reactive
* **NavigationMenu:** arrow position conflict
* **Link:** consistent behavior between nuxt, vue and inertia
* **Input/Textarea:** handle generic types
* **Range:** handle generic types
* **FormField:** use `div` for `error` and `help` slots
* **module:** configure fix
* **FormField:** block form field injection after use
* **Checkbox/RadioGroup:** render correct element without `variant`
* **InputNumber:** handle inside button group
* **ButtonGroup:** add `z-index` on focused element
* **NavigationMenu:** incorrect hover when disabled and active
* **Tooltip:** increase padding for consistency
* **CheckboxGroup/RadioGroup:** variant `table` borders in RTL mode
* **Input/Textarea:** define model modifiers types
* **DropdownMenu:** wrap groups in a viewport
* **NavigationMenu:** set content `max-height` in `horizontal` orientation
* **Select/SelectMenu:** display falsy values
* **Select/SelectMenu:** prevent empty string display when multiple
* **Form:** conditionally type form data via `transform` prop
* **Toast:** calc height on next tick
* **useOverlay:** use original props when not provided to `open`
* **Modal/Slideover:** don't emit `close:prevent` on `closeAutoFocus`
* **defineShortcuts:** allow `meta_-` shortcut
* **useOverlay:** set props to original props when `defaultOpen` is set
* **NavigationMenu:** nested accordion context at every level
* **Toaster:** smoother visibility transition for stacked toasts
* **components:** remove default `md` size on buttons
* **Modal:** prevent scrollbars overflow
* **Form:** expose reactive fields
* **SelectMenu:** dynamic input size
* **use-overlay:** add caveats section regarding provide/inject limit
* **vue:** handle override when importing from `@nuxt/ui`
* **playground:** set ButtonGroup ps|pe for Button = color.link
* **NavigationMenu:** dark color for hover

### Docs 
* **input:** add mask example
* **installation:** add tip to improve types in vue
* **examples:** use `useClipboard` instead of `navigator.clipboard`

## [0.6.9](https://github.com/bitrix24/b24ui/compare/v0.6.8...v0.6.9) (2025-06-05)

### Docs

- **hero:** improve demo

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

* **Form:**** drop explicit support for `zod` and `valibot`

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
