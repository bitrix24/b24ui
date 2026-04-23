---
title: Card
description: Render the content within a card component comprising a header, body, and footer section.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Card.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/card
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/card
---

## Usage

Use the `header`, `default` and `footer` slots to add content to the Card.

::component-code
---
prettier: true
hide:
  - class
props:
  class: 'w-full'
slots:
  header: |

    <Placeholder class="h-8" />

  default: |

    <Placeholder class="h-32" />

  footer: |

    <Placeholder class="h-8" />
---

#header
:placeholder{class="h-8"}

#default
:placeholder{class="h-32"}

#footer
:placeholder{class="h-8"}
::

### Title :badge{label="Soon" class="align-text-top"}

Use the `title` prop to set the title of the Card's header.

::component-code
---
prettier: true
ignore:
  - class
props:
  title: 'Card with title'
  class: 'w-full'
slots:
  default: |

    <Placeholder class="h-32" />
---

#default
:placeholder{class="h-32"}
::

### Description :badge{label="Soon" class="align-text-top"}

Use the `description` prop to set the description of the Card's header.

::component-code
---
prettier: true
ignore:
  - title
  - class
props:
  title: 'Card with description'
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  class: 'w-full'
slots:
  default: |

    <Placeholder class="h-32" />
---

#default
:placeholder{class="h-32"}
::

### Variant

Use the `variant` prop to change the variant of the Card.

::component-code
---
prettier: true
hide:
  - class
props:
  variant: outline
  class: 'w-full'
slots:
  header: |

    <Placeholder class="h-8" />

  default: |

    <Placeholder class="h-32" />

  footer: |

    <Placeholder class="h-8" />
---

#header
:placeholder{class="h-8"}

#default
:placeholder{class="h-32"}

#footer
:placeholder{class="h-8"}
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
