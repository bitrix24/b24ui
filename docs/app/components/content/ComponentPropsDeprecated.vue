<script setup lang="ts">
import { kebabCase } from 'scule'
import type { PropertyMeta } from 'vue-component-meta'

const props = defineProps<{
  prop: PropertyMeta
}>()

const route = useRoute()

/**
 * Reads the `@deprecated` / `@removed` pair off the prop's JSDoc.
 *
 * Both survive the pipeline unfiltered: `vue-component-meta` passes every tag
 * through, and `compactProp` drops only `defaultValue`. Before this component
 * existed, nothing in the docs read `@deprecated` at all — the two props that
 * carried a deprecation were hidden by a hardcoded name list instead, which
 * left a third one (`Textarea`'s `fixed`) rendering as an ordinary prop while
 * its JSDoc said it does nothing.
 */
const deprecated = computed(() => props.prop.tags?.find((tag: any) => tag.name === 'deprecated'))
const removed = computed(() => props.prop.tags?.find((tag: any) => tag.name === 'removed')?.text?.trim())
</script>

<template>
  <div v-if="deprecated" class="mt-2">
    <B24Badge
      size="xs"
      color="air-primary-warning"
      :label="removed ? `Deprecated — removed in ${removed}` : 'Deprecated'"
    />
    <MDC
      v-if="deprecated.text"
      :value="deprecated.text"
      class="text-toned mt-1"
      :cache-key="`${kebabCase(route.path)}-${prop.name}-deprecated`"
    />
  </div>
</template>
