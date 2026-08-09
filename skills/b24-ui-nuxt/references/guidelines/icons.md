# Import icon and use it

The icon metadata from `@bitrix24/b24icons-vue` is stored in `node_modules/@bitrix24/b24icons-vue/dist/info-metadata.json` (all data in English).

**When the user asks for an icon:**

1. **Search** the metadata file **case-insensitively** by partial match on the icon name. If multiple matches exist, show the most relevant ones.
2. **Extract** from the matching entry:
   - `code` (e.g., `"outline::AchievementIcon"`)
   - `type` (e.g., `"outline"` or `"solid"`)
   - `icon` – the component name (e.g., `"AchievementIcon"`)
3. **Generate** the import statement, substituting the `icon` and `type` fields from step 2 into
   `import <icon> from '@bitrix24/b24icons-vue/<type>/<icon>'`. Each icon is a **default** export — the name is never braced, so `import { AchievementIcon } from …` does not work.
4. **Provide usage examples** (Vue 3 `<script setup>` style), following the worked example below exactly: render the icon as a component, and pass it to `:icon` as the imported component itself — not a string, and not an object literal such as `:icon="{AchievementIcon}"`.

**Answer format** (copy-paste ready):
- Import line
- Minimal Vue component example with icon and optional `B24Button`

**Example response for "achievement":**
```ts
import AchievementIcon from '@bitrix24/b24icons-vue/outline/AchievementIcon'
```
```vue
<script setup>
import AchievementIcon from '@bitrix24/b24icons-vue/outline/AchievementIcon'
</script>

<template>
  <AchievementIcon class="size-5" />
  <B24Button :icon="AchievementIcon" />
</template>
```
