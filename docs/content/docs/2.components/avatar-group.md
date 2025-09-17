---
title: AvatarGroup
description: Pile multiple avatars into a single group.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/AvatarGroup.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/avatar
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui4.nuxt.com/docs/components/avatar-group
---

## Usage

Wrap multiple [Avatar](/docs/components/avatar/) within an AvatarGroup to stack them.

::component-code
---
prettier: true
slots:
  default: |
  
    <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" />
    <B24Avatar src="https://github.com/bitrix24.png" alt="Bitrix24" />
    <B24Avatar src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
---
:b24-avatar{src="/b24ui/avatar/employee.png" alt="Employee Name"}
:b24-avatar{src="https://github.com/bitrix24.png" alt="Bitrix24"}
:b24-avatar{src="/b24ui/avatar/assistant.png" alt="Assistant Name"}
::

### Size

Use the `size` prop to change the size of all the avatars.

::component-code
---
prettier: true
props:
  size: xl
slots:
  default: |

    <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" />
    <B24Avatar src="https://github.com/bitrix24.png" alt="Bitrix24" />
    <B24Avatar src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
---
:b24-avatar{src="/b24ui/avatar/employee.png" alt="Employee Name"}
:b24-avatar{src="https://github.com/bitrix24.png" alt="Bitrix24"}
:b24-avatar{src="/b24ui/avatar/assistant.png" alt="Assistant Name"}
::

### Max

Use the `max` prop to limit the number of avatars displayed. The rest is displayed as an `+X` avatar.

::component-code
---
prettier: true
props:
  max: 2
slots:
  default: |

    <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" />
    <B24Avatar src="https://github.com/bitrix24.png" alt="Bitrix24" />
    <B24Avatar src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
---
:b24-avatar{src="/b24ui/avatar/employee.png" alt="Employee Name"}
:b24-avatar{src="https://github.com/bitrix24.png" alt="Bitrix24"}
:b24-avatar{src="/b24ui/avatar/assistant.png" alt="Assistant Name"}
::

## Examples

### With tooltip

Wrap each avatar with a [Tooltip](/docs/components/tooltip/) to display a tooltip on hover.

:component-example{name="avatar-group-tooltip-example"}

### With chip

Wrap each avatar with a [Chip](/docs/components/chip/) to display a chip around the avatar.

:component-example{name="avatar-group-chip-example"}

### With link

Wrap each avatar with a [Link](/docs/components/link/) to make them clickable.

:component-example{name="avatar-group-link-example"}

### With mask

Wrap an avatar with a CSS mask to display it with a custom shape.

:component-example{name="avatar-group-mask-example"}

::warning
The `chip` prop does not work correctly when using a mask. Chips may be cut depending on the mask shape.
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
