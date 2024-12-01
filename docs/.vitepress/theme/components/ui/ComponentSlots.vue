<script setup lang="ts">
import { upperFirst, camelCase } from 'scule'
import B24UIMeta from '@bitrix24/b24ui-nuxt/meta'

const $props = withDefaults(defineProps<{
  component: string
}>(), {})

const camelName = camelCase($props.component)
const name = `B24${upperFirst(camelName)}`
const meta = B24UIMeta[name] || {}

// @todo style
// @todo add ProseCode
// @todo add <HighlightInlineType v-if="slot.type" :type="slot.type" />
// @todo add <MDC v-if="slot.description" :value="slot.description" class="text-[var(--ui-text-toned)] mt-1" />
</script>

<template>
  <div class="info-wrapper">
    <table class="info">
      <thead>
        <tr>
          <th class="value-info-1">
            Slot
          </th>
          <th class="value-info-3">
            Type
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="slot in (meta?.meta?.slots || [])"
          :key="slot.name"
        >
          <td translate="no" class="variable">
            {{ slot.name }}
          </td>
          <td translate="no" class="value">
            <div v-if="slot.type">
              {{ slot.type }}
            </div>

            <div v-if="slot.description" class="text-red-500 mt-1">
              {{ slot.description }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
