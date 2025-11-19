---
title: NavigationMenu
description: A link list that can be arranged in horizontal or vertical orientation.
category: navigation
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/NavigationMenu.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/navigation-menu
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/navigation-menu
  - label: NavigationMenu
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/navigation-menu
---

## Usage

Use the NavigationMenu component to display a list of links horizontally or vertically.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
props:
  items:
    - label: Sales management
      type: trigger
      children:
        - label: Lead management
        - label: Deal management
        - label: 'Pipelines'
        - label: 'Access permissions'
    - label: Collaboration
      type: trigger
      children:
        - label: Online workspace
          to: https://www.bitrix24.com/tools/communications/online-workspace.php
        - label: CoPilot in Chat
          to: https://www.bitrix24.com/tools/copilot-ai-powered-tools-for-business.php#copilot-in-chat
        - label: useToast
          to: /docs/composables/use-toast
    - label: HR & Automation
      type: trigger
      badge: +5
      active: true
      children:
        - label: Employee management
          to: https://www.bitrix24.com/tools/hr_automation/employee-management.php
        - label: Culture & engagement
          to: https://www.bitrix24.com/tools/hr_automation/culture-and-engagement.php
        - label: Automation
          to: https://www.bitrix24.com/tools/hr_automation/automation.php
          target: _blank
    - label: GitHub
      to: https://github.com/bitrix24/b24ui
      target: _blank
    - label: Help
      disabled: true
  class: 'w-full justify-center'
---
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}
- `badge?: string | number | BadgeProps`{lang="ts-type"}
- `hint?: string`{lang="ts-type"}
- `tooltip?: TooltipProps`{lang="ts-type"}
- `trailingIcon?: IconComponent`{lang="ts-type"}
- `type?: 'label' | 'trigger' | 'link'`{lang="ts-type"}
- `defaultOpen?: boolean`{lang="ts-type"}
- `open?: boolean`{lang="ts-type"}
- `value?: string`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- [`viewportRtl?: boolean`{lang="ts-type"}](#orientation)
- `onSelect?: (e: Event) => void`{lang="ts-type"}
- `children?: NavigationMenuChildItem[]`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { linkLeadingAvatarSize?: ClassNameValue, linkLeadingAvatar?: ClassNameValue, linkLeadingIcon?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkTrailing?: ClassNameValue, linkLeadingHint?: ClassNameValue, linkLeadingBadgeSize?: ClassNameValue, linkLeadingBadge?: ClassNameValue, linkTrailingIcon?: ClassNameValue, label?: ClassNameValue, link?: ClassNameValue, content?: ClassNameValue, childList?: ClassNameValue, childLabel?: ClassNameValue, childItem?: ClassNameValue, childLink?: ClassNameValue, childLinkIcon?: ClassNameValue, childLinkHint?: ClassNameValue, childLinkBadgeSize?: ClassNameValue, childLinkBadge?: ClassNameValue, childLinkWrapper?: ClassNameValue, childLinkLabel?: ClassNameValue, childLinkLabelExternalIcon?: ClassNameValue, popoverWrapper?: ClassNameValue }`{lang="ts-type"}

You can pass any property from the [Link](/docs/components/link/#props) component such as `to`, `target`, etc.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  items:
    - label: Sales management
      type: trigger
      hint: note
      children:
        - label: Lead management
        - label: Deal management
        - label: Pipelines
          hint: note
        - label: Access permissions
    - label: Collaboration
      type: trigger
      children:
        - label: Online workspace
          to: https://www.bitrix24.com/tools/communications/online-workspace.php
        - label: CoPilot in Chat
          to: https://www.bitrix24.com/tools/copilot-ai-powered-tools-for-business.php#copilot-in-chat
        - label: useToast
          to: /docs/composables/use-toast
    - label: HR & Automation
      type: trigger
      badge: +5
      active: true
      children:
        - label: Employee management
          to: https://www.bitrix24.com/tools/hr_automation/employee-management.php
        - label: Culture & engagement
          to: https://www.bitrix24.com/tools/hr_automation/culture-and-engagement.php
        - label: Automation
          to: https://www.bitrix24.com/tools/hr_automation/automation.php
          target: _blank
    - label: GitHub
      to: https://github.com/bitrix24/b24ui
      target: _blank
    - label: Help
      disabled: true
  class: 'w-full justify-center'
---
::

::note
You can also pass an array of arrays to the `items` prop to display groups of items.
::

::tip
Use a flat `children` array of objects to define submenus:

- `label: string`
- `icon?: IconComponent`
- `onSelect?(e: Event): void`
- `class?: any`

::

### Orientation

Use the `orientation` prop to change the orientation of the NavigationMenu.

::note
When orientation is `vertical`, an [Accordion](/docs/components/accordion/) component is used to display each group. You can control the open state of each item using the `open` and `defaultOpen` properties and change the behavior using the [`collapsible`](/docs/components/accordion/#collapsible) and [`type`](/docs/components/accordion/#multiple) props.
::

::warning
The last top-level menu item needs to have `viewportRtl` set to ensure the drop-down menu is positioned correctly.
::

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[][]
props:
  orientation: 'vertical'
  items:
    - - label: Links
        type: 'label'
      - label: Sales management
        type: trigger
        hint: note
        defaultOpen: true 
        children:
          - label: Lead management
          - label: Deal management
          - label: Pipelines
            hint: note
          - label: Access permissions
    - - label: GitHub
        to: https://github.com/bitrix24/b24ui
        target: _blank
      - label: Help
        disabled: true
      - label: HR & Automation
        type: trigger
        viewportRtl: true 
        badge: +5
        active: true
        children:
          - label: Employee management
            to: https://www.bitrix24.com/tools/hr_automation/employee-management.php
          - label: Culture & engagement
            to: https://www.bitrix24.com/tools/hr_automation/culture-and-engagement.php
          - label: Automation
            to: https://www.bitrix24.com/tools/hr_automation/automation.php
            target: _blank
  class: 'data-[orientation=vertical]:w-[430px]'
---
::

::note
Groups will be spaced when orientation is `horizontal` and separated when orientation is `vertical`.
::

### Collapsed

In `vertical` orientation, use the `collapsed` prop to collapse the NavigationMenu, this can be useful in a sidebar for example.

::note
You can use the [`tooltip`](#with-tooltip-in-items) and [`popover`](#with-popover-in-items) props to display more information on the collapsed items.
::

::component-example
---
collapse: true
name: 'navigation-menu-collapsed-example'
---
::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](https://bitrix24.github.io/b24icons/icons/) of each item. This icon is only displayed when an item has children.

::tip
You can also set an icon for a specific item by using the `trailingIcon` property in the item object.
::

::component-code
---
collapse: true
ignore:
  - items
  - class
  - trailingIcon
cast:
  trailingIcon: 'RocketIcon'
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  trailingIcon: 'RocketIcon'
  items:
    - label: Sales management
      type: trigger
      children:
        - label: Lead management
        - label: Deal management
        - label: 'Pipelines'
        - label: 'Access permissions'
    - label: Collaboration
      type: trigger
      children:
        - label: Online workspace
          to: https://www.bitrix24.com/tools/communications/online-workspace.php
        - label: CoPilot in Chat
          to: https://www.bitrix24.com/tools/copilot-ai-powered-tools-for-business.php#copilot-in-chat
        - label: useToast
          to: /docs/composables/use-toast
    - label: HR & Automation
      type: trigger
      badge: +5
      active: true
      children:
        - label: Employee management
          to: https://www.bitrix24.com/tools/hr_automation/employee-management.php
        - label: Culture & engagement
          to: https://www.bitrix24.com/tools/hr_automation/culture-and-engagement.php
        - label: Automation
          to: https://www.bitrix24.com/tools/hr_automation/automation.php
          target: _blank
  class: 'w-full justify-center'
---
::

### Unmount

Use the `unmount-on-hide` prop to control the content unmounting behavior. Defaults to `true`.

::component-code
---
collapse: true
ignore:
  - items
  - arrow
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  unmountOnHide: false
  items:
    - label: Sales management
      type: trigger
      children:
        - label: Lead management
        - label: Deal management
        - label: 'Pipelines'
        - label: 'Access permissions'
    - label: Collaboration
      type: trigger
      children:
        - label: Online workspace
          to: https://www.bitrix24.com/tools/communications/online-workspace.php
        - label: CoPilot in Chat
          to: https://www.bitrix24.com/tools/copilot-ai-powered-tools-for-business.php#copilot-in-chat
        - label: useToast
          to: /docs/composables/use-toast
    - label: HR & Automation
      type: trigger
      badge: +5
      active: true
      children:
        - label: Employee management
          to: https://www.bitrix24.com/tools/hr_automation/employee-management.php
        - label: Culture & engagement
          to: https://www.bitrix24.com/tools/hr_automation/culture-and-engagement.php
        - label: Automation
          to: https://www.bitrix24.com/tools/hr_automation/automation.php
          target: _blank
  class: 'w-full justify-center'
---
::

::note
You can inspect the DOM to see each item's content being rendered.
::

## Examples

### With tooltip in items

When orientation is `vertical` and the menu is `collapsed`, you can set the `tooltip` prop to `true` to display a [Tooltip](/docs/components/tooltip/) around items with their label but you can also use the `tooltip` property on each item to override the default tooltip.

You can pass any property from the [Tooltip](/docs/components/tooltip/) component globally or on each item.

::component-example
---
collapse: true
name: 'navigation-menu-collapsed-tooltip-example'
---
::

### With popover in items

When orientation is `vertical` and the menu is `collapsed`, you can set the `popover` prop to `true` to display a [Popover](/docs/components/popover/) around items with their children but you can also use the `popover` property on each item to override the default popover.

You can pass any property from the [Popover](/docs/components/popover/) component globally or on each item.

::component-example
---
collapse: true
name: 'navigation-menu-collapsed-popover-example'
---
::

::tip{to="#with-content-slot"}
You can use the `#content` slot to customize the content of the popover in the `vertical` orientation.
::

### Control active item

You can control the active item(s) by using the `default-value` prop or the `v-model` directive with the `value` of the item. If no `value` is provided, it defaults to `item-${index}` for top-level items or `item-${level}-${index}` for nested items.

::component-example
---
collapse: true
name: 'navigation-menu-model-value-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can switch the active item by pressing :kbd{value="1"}, :kbd{value="2"}, or :kbd{value="3"}.
::

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{lang="ts-type"}
- `#{{ item.slot }}-leading`{lang="ts-type"}
- `#{{ item.slot }}-label`{lang="ts-type"}
- `#{{ item.slot }}-trailing`{lang="ts-type"}
- `#{{ item.slot }}-content`{lang="ts-type"}

::component-example
---
name: 'navigation-menu-custom-slot-example'
---
::

::tip{to="#slots"}
You can also use the `#item`, `#item-leading`, `#item-label`, `#item-trailing` and `#item-content` slots to customize all items.
::

### With content slot

Use the `#item-content` slot or the `slot` property (`#{{ item.slot }}-content`) to customize the content of a specific item.

::component-example
---
collapse: true
name: 'navigation-menu-content-slot-example'
---
::

::note
In this example, we add the `sm:w-(--reka-navigation-menu-viewport-width)` class on the `viewport` to have a dynamic width. This requires to set a width on the content's first child.
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
