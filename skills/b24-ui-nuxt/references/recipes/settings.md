# Settings layouts

Patterns for showing user-facing settings — single choice, multiple toggles, capability flags. Pick the right component first; only reach for a custom layout when each option truly needs an image, link or multi-line explanation.

## Decision matrix

| Choice                                   | Each option needs              | Use                                                    |
|------------------------------------------|--------------------------------|--------------------------------------------------------|
| Pick **one** of 2–4 short labels         | A label                        | `B24RadioGroup` (`variant="list"`)                     |
| Pick **one** with a short description    | Label + 1 sentence             | `B24RadioGroup` (`variant="card"`)                     |
| Pick **one** that needs an icon + sentence | Label + icon + description   | `B24PageCardGroup` — see [card-pickers](./card-pickers.md) |
| Pick **one** that needs a preview image, longer text and a "Learn more" link | Title + description + link + image | `B24RadioGroup` `variant="card"` + `#label` slot (this recipe) |
| Toggle **several** features              | Label                          | `B24CheckboxGroup` (`variant="list"`) or many `B24Switch` |
| Toggle several that need rich previews   | Title + description + link + image | `B24CheckboxGroup` `variant="card"` + `#label` slot (this recipe) |
| Single boolean (on/off)                  | One thing                      | `B24Switch`                                            |

If your options each need an icon-in-a-circle + description and you want a tidy grid, prefer `B24PageCardGroup` — see [card-pickers](./card-pickers.md). This recipe is for the heavier case where the option deserves a full preview image and an inline link to documentation.

## Rich card with preview, description and link (single choice)

Use `variant="card"` and override the `#label` slot. The slot renders inside a `<span>`, so you can put any phrasing-content layout there — flex columns, links, images, etc. — without HTML parsing surprises.

For strict typing of `item.*` in the slot, declare a local interface and use it as the array type — passing the broad `RadioGroupItem[]` widens user-defined fields to `any` (loses autocomplete).

```vue
<script setup lang="ts">
type LayoutItem = {
  value: string
  title: string
  text: string
  preview: string
  href: string
}

const layout = ref<string>('columns')

const items: LayoutItem[] = [
  {
    value: 'columns',
    title: 'In columns',
    text: 'Pick this for resources that must always be visible to the manager. These are the primary resources the schedule is built around.',
    preview: '/radio-card-columns.png',
    href: 'https://helpdesk.bitrix24.com/'
  },
  {
    value: 'list',
    title: 'In a secondary list',
    text: 'Pick this for resources that are booked only in addition to a primary one. For instance, when specialists are the primary resource, equipment goes into the secondary list.',
    preview: '/radio-card-list.png',
    href: 'https://helpdesk.bitrix24.com/'
  }
]
</script>

<template>
  <B24RadioGroup
    v-model="layout"
    variant="card"
    size="md"
    :items="items"
    class="w-full max-w-2xl"
  >
    <template #label="{ item }">
      <span class="flex gap-3 items-start w-full">
        <span class="flex-1 min-w-0 flex flex-col gap-1">
          <span class="text-(length:--ui-font-size-md) font-(--ui-font-weight-medium)">
            {{ item.title }}
          </span>
          <span class="text-(length:--ui-font-size-sm) text-(--ui-color-base-70) font-(--ui-font-weight-regular)">
            {{ item.text }}
          </span>
          <B24Link
            :to="item.href"
            target="_blank"
            class="self-start mt-1 text-(length:--ui-font-size-sm)"
            @click.stop
          >
            Learn more
          </B24Link>
        </span>
        <img
          :src="item.preview"
          :alt="item.title"
          class="hidden sm:block shrink-0 w-[120px] h-[72px] rounded-(--ui-border-radius-sm) ring-1 ring-(--ui-color-base-5) object-cover"
        >
      </span>
    </template>
  </B24RadioGroup>
</template>
```

## Same recipe for multi-select

Swap the component for `B24CheckboxGroup` and bind `v-model` to an array. The slot markup, item shape, image, link — all stay identical.

```vue
<script setup lang="ts">
type CapabilityItem = {
  value: string
  title: string
  text: string
  preview: string
  href: string
}

const enabled = ref<string[]>(['columns'])

const items: CapabilityItem[] = [
  { value: 'columns', title: 'In columns',           text: '…', preview: '/preview-a.png', href: '/help/a' },
  { value: 'list',    title: 'In a secondary list',  text: '…', preview: '/preview-b.png', href: '/help/b' }
]
</script>

<template>
  <B24CheckboxGroup
    v-model="enabled"
    variant="card"
    size="md"
    :items="items"
    class="w-full max-w-2xl"
  >
    <template #label="{ item }">
      <span class="flex gap-3 items-start w-full">
        <span class="flex-1 min-w-0 flex flex-col gap-1">
          <span class="text-(length:--ui-font-size-md) font-(--ui-font-weight-medium)">
            {{ item.title }}
          </span>
          <span class="text-(length:--ui-font-size-sm) text-(--ui-color-base-70) font-(--ui-font-weight-regular)">
            {{ item.text }}
          </span>
          <B24Link
            :to="item.href"
            target="_blank"
            class="self-start mt-1 text-(length:--ui-font-size-sm)"
            @click.stop
          >
            Learn more
          </B24Link>
        </span>
        <img
          :src="item.preview"
          :alt="item.title"
          class="hidden sm:block shrink-0 w-[120px] h-[72px] rounded-(--ui-border-radius-sm) ring-1 ring-(--ui-color-base-5) object-cover"
        >
      </span>
    </template>
  </B24CheckboxGroup>
</template>
```

## Implementation notes

- **Why `<span>` everywhere inside the slot.** The library renders the label slot as `<span>` for `card` and `table` variants (and as `<label>` for `list`). Nest spans with `class="block"` or `flex` inside it — that stays in HTML5 phrasing content. Block elements like `<div>` are tolerated by browsers but technically violate phrasing-content; prefer span if you have a choice.
- **Strict typing for slot props.** Declaring `const items: RadioGroupItem[] = [...]` widens user-defined fields (`title`, `preview`, `href`, …) to `any` via the `[key: string]: any` index in the public item type. Declare a local interface as in the examples to keep autocomplete and type-checking on the slot's `item`.
- **Don't pass a `description` field.** `B24RadioGroup` / `B24CheckboxGroup` auto-render `item.description` as a separate paragraph. If you also override `#label` you'll get duplicate text. Name your field anything else (`text`, `summary`, `body`).
- **`@click.stop` on the inline link.** The whole card is wrapped in `<label>` for the `card` variant — clicking inside selects the option. Without `@click.stop`, opening the "Learn more" link will also toggle the radio/checkbox.
- **Validate `item.href` if it comes from an untrusted source** (CMS, API, user input). Allow only `http(s):` or relative paths; reject `javascript:` / `data:` URIs and open redirects before binding to `B24Link :to`. The library does not sanitize URLs — that's the caller's responsibility. Same applies to `item.preview` when it points at external images (consider a CSP `img-src` policy).
- **`target="_blank"` is safe.** `B24Link` adds `rel="noopener noreferrer"` automatically for external targets, so no tabnabbing.
- **Responsiveness.** Hide the preview on small screens with `hidden sm:block` so the text gets the full width on mobile. The radio/checkbox itself stays at the start because `card` variant uses `items-start`.
- **Stay on semantic colors.** Use `text-(--ui-color-base-70)`, `ring-(--ui-color-base-5)`, etc. — never raw Tailwind palette colors.
- **Form integration.** Both groups honour `useFormField`, so wrap them in `B24FormField` for label + error display when used inside `B24Form`. See [forms](../guidelines/forms.md).

## When NOT to use this pattern

- **Two binary toggles.** Use two `B24Switch` controls, not a `card` `B24CheckboxGroup` with rich content.
- **Many options (5+) with similar weight.** A grid of `B24PageCardGroup` cards reads better than a tall stack of dense card rows. See [card-pickers](./card-pickers.md).
- **The options don't need explanation.** Plain `variant="list"` is faster to scan.
