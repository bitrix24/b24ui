---
title: DropdownMenu
description: A contextual menu for actions triggered by clicking an element.
category: overlay
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DropdownMenu.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/dropdown-menu
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dropdown-menu
  - label: DropdownMenu
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/dropdown-menu
---

## Usage

Use a [Button](/docs/components/button/) or any other component in the default slot of the DropdownMenu.

::component-code
---
prettier: true
collapse: true
ignore:
  - items
  - ui.content
external:
  - items
props:
  items:
    - - label: Bitrix24
        avatar:
          src: 'https://github.com/bitrix24.png'
        type: label
    - - label: Profile
      - label: Billing
      - label: Settings
        kbds:
          - ','
      - label: Keyboard shortcuts
    - - label: Team
      - label: Invite users
        children:
          - - label: Email
            - label: Message
          - - label: More
      - label: New team
        kbds:
          - meta
          - n
    - - label: GitHub
        to: 'https://github.com/bitrix24/b24ui'
        target: _blank
      - label: Support
        to: '/docs/components/dropdown-menu/'
      - label: API
        disabled: true
    - - label: Logout
        kbds:
          - shift
          - meta
          - q
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}
- `kbds?: string[] | KbdProps[]`{lang="ts-type"}
- [`type?: "link" | "label" | "separator" | "checkbox"`{lang="ts-type"}](#with-checkbox-items)
- [`color?: "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-copilot" | "air-primary-warning" `{lang="ts-type"}](#with-color-items)
- [`checked?: boolean`{lang="ts-type"}](#with-checkbox-items)
- `disabled?: boolean`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `onSelect?: (e: Event) => void`{lang="ts-type"}
- [`onUpdateChecked?: (checked: boolean) => void`{lang="ts-type"}](#with-checkbox-items)
- `children?: DropdownMenuItem[] | DropdownMenuItem[][]`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelExternalIcon?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue }`{lang="ts-type"}

You can pass any property from the [Link](/docs/components/link/#props) component such as `to`, `target`, etc.

::component-code
---
prettier: true
collapse: true
ignore:
  - items
  - ui.content
external:
  - items
externalTypes:
  - DropdownMenuItem[][]
props:
  items:
    - - label: Bitrix24
        avatar:
          src: 'https://github.com/bitrix24.png'
        type: label
    - - label: Profile
      - label: Billing
      - label: Settings
        kbds:
          - ','
      - label: Keyboard shortcuts
    - - label: Team
      - label: Invite users
        children:
          - - label: Email
            - label: Message
          - - label: More
      - label: New team
        kbds:
          - meta
          - n
    - - label: GitHub
        to: 'https://github.com/bitrix24/b24ui'
        target: _blank
      - label: Support
        to: '/docs/components/dropdown-menu/'
      - label: API
        disabled: true
    - - label: Logout
        kbds:
          - shift
          - meta
          - q
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

::tip
Each item can take a `children` array of objects with the same properties as the `items` prop to create a nested menu which can be controlled using the `open`, `defaultOpen` and `content` properties.
::

### Content

Use the `content` prop to control how the DropdownMenu content is rendered, like its `align` or `side` for example.

::component-code
---
prettier: true
collapse: true
ignore:
  - items
  - ui.content
external:
  - items
externalTypes:
  - DropdownMenuItem[]
items:
  content.align:
    - start
    - center
    - end
  content.side:
    - right
    - left
    - top
    - bottom
props:
  items:
    - label: Profile
    - label: Billing
    - label: Settings
  content:
    align: start
    side: bottom
    sideOffset: 8
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

### Arrow

Use the `arrow` prop to display an arrow on the DropdownMenu.

::component-code
---
prettier: true
collapse: true
ignore:
  - arrow
  - items
  - ui.content
external:
  - items
externalTypes:
  - DropdownMenuItem[]
props:
  arrow: true
  items:
    - label: Profile
    - label: Billing
    - label: Settings
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

### Modal

Use the `modal` prop to control whether the DropdownMenu blocks interaction with outside content. Defaults to `true`.

::component-code
---
prettier: true
collapse: true
ignore:
  - items
  - b24ui.content
external:
  - items
externalTypes:
  - DropdownMenuItem[]
props:
  modal: false
  items:
    - label: Profile
    - label: Billing
    - label: Settings
  b24ui:
    content: 'w-48'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

### Disabled

Use the `disabled` prop to disable the DropdownMenu.

::component-code
---
prettier: true
collapse: true
ignore:
  - items
  - ui.content
external:
  - items
externalTypes:
  - DropdownMenuItem[]
props:
  disabled: true
  items:
    - label: Profile
    - label: Billing
    - label: Settings
  ui:
    content: 'w-48'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

## Examples

### With checkbox items

You can use the `type` property with `checkbox` and use the `checked` / `onUpdateChecked` properties to control the checked state of the item.

::component-example
---
collapse: true
name: 'dropdown-menu-checkbox-items-example'
---
::

::note
To ensure reactivity for the `checked` state of items, it's recommended to wrap your `items` array inside a `computed`.
::

### With color items

You can use the `color` property to highlight certain items with a color.

::component-example
---
collapse: true
name: 'dropdown-menu-color-items-example'
---
::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
collapse: true
name: 'dropdown-menu-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the DropdownMenu by pressing :kbd{value="O"}.
::

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{lang="ts-type"}
- `#{{ item.slot }}-leading`{lang="ts-type"}
- `#{{ item.slot }}-label`{lang="ts-type"}
- `#{{ item.slot }}-trailing`{lang="ts-type"}

::component-example
---
collapse: true
name: 'dropdown-menu-custom-slot-example'
---
::

::tip{to="#slots"}
You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` slots to customize all items.
::

### With trigger content width

You can expand the content to the full width of its button by adding the `w-(--reka-dropdown-menu-trigger-width)` class on the `b24ui.content` and `b24ui.viewport` slot.

::component-example
---
collapse: true
name: 'dropdown-menu-content-width-example'
---
::

### Extract shortcuts

Use the [extractShortcuts](/docs/composables/extract-shortcuts/) utility to automatically define shortcuts from menu items with a `kbds` property. It recursively extracts shortcuts and returns an object compatible with [defineShortcuts](/docs/composables/define-shortcuts/).
```vue
<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'

const items: DropdownMenuItem[] = [{
  label: 'Invite users',
  children: [{
    label: 'Invite by email',
    kbds: ['meta', 'e'],
    onSelect() {
      console.log('Invite by email clicked')
    }
  }, {
    label: 'Invite by link',
    kbds: ['meta', 'i'],
    onSelect() {
      console.log('Invite by link clicked')
    }
  }]
}, {
  label: 'New team',
  kbds: ['meta', 'n'],
  onSelect() {
    console.log('New team clicked')
  }
}]

defineShortcuts(extractShortcuts(items))
</script>
```

::note
In this example, :kbd{value="meta"} :kbd{value="E"}, :kbd{value="meta"} :kbd{value="I"} and :kbd{value="meta"} :kbd{value="N"} would trigger the `select` function of the corresponding item.
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
