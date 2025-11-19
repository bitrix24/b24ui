---
title: Timeline
description: 'A component for displaying a chronological sequence of events, with dates, titles, and supporting icons or avatars.'
category: data
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Timeline.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/timeline
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/timeline
---

## Usage

Use the Timeline component to display a list of items in a timeline.

::component-code
---
collapse: true
hide:
  - class
  - defaultValue
ignore:
  - items
  - class
  - defaultValue
external:
  - items
props:
  defaultValue: 2
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization. Deployed the application to production.'
  class: 'w-[384px]'
---
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `date?: string`{lang="ts-type"}
- `title?: string`{lang="ts-type"}
- `description?: AvatarProps`{lang="ts-type"}
- [`icon?: IconComponent`{lang="ts-type"}](#with-alternating-layout)
- `avatar?: AvatarProps`{lang="ts-type"}
- `value?: string | number`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, container?: ClassNameValue, indicator?: ClassNameValue, separator?: ClassNameValue, wrapper?: ClassNameValue, date?: ClassNameValue, title?: ClassNameValue, description?: ClassNameValue }`{lang="ts-type"}

::component-code
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  defaultValue: 2
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization. Deployed the application to production.'
  class: 'w-[384px]'
---
::

### Color

Use the `color` prop to change the color of the active items in a Timeline.

::component-code
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  color: air-primary
  defaultValue: 2
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization. Deployed the application to production.'
  class: 'w-[384px]'
---
::

### Size

Use the `size` prop to change the size of the Timeline.

::component-code
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  size: xs
  defaultValue: 2
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization. Deployed the application to production.'
  class: 'w-[384px]'
---
::

### Orientation

Use the `orientation` prop to change the orientation of the Timeline. Defaults to `vertical`.

::component-code
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  orientation: 'horizontal'
  defaultValue: 2
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment.'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops.'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development.'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization.'
  class: 'w-full'
class: 'overflow-x-auto'
---
::

### Reverse

Use the reverse prop to reverse the direction of the Timeline.

::component-code
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  reverse: true
  modelValue: 2
  orientation: 'vertical'
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment.'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops.'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development.'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization.'
  class: 'w-full'
class: 'overflow-x-auto'
---
::

## Examples

### Control active item

You can control the active item by using the `default-value` prop or the `v-model` directive with the `value` of the item. If no `value` is provided, it defaults to the index.

:component-example{name="timeline-model-value-example" prettier}

### With alternating layout

Use the `b24ui` prop to create a Timeline with alternating layout.

:component-example{name="timeline-alternating-layout-example" prettier}

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}-indicator`{lang="ts-type"}
- `#{{ item.slot }}-date`{lang="ts-type"}
- `#{{ item.slot }}-title`{lang="ts-type"}
- `#{{ item.slot }}-description`{lang="ts-type"}

:component-example{name="timeline-custom-slot-example" prettier}

### With slots

Use the available slots to create a more complex Timeline.

:component-example{name="timeline-slots-example" prettier}

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
