<script setup lang="ts">
import { upperFirst, camelCase } from 'scule'
import { computed, type ComputedRef } from 'vue'
import B24UIMeta from '@bitrix24/b24ui-nuxt/meta'
import type { ComponentMeta } from 'vue-component-meta'
import ProseTable from '../prose/ProseTable.vue'
import ProseThead from '../prose/ProseThead.vue'
import ProseTbody from '../prose/ProseTbody.vue'
import ProseTr from '../prose/ProseTr.vue'
import ProseTh from '../prose/ProseTh.vue'
import ProseTd from '../prose/ProseTd.vue'
import ProseCode from '../prose/ProseCode.vue'
import ProseData from '../prose/ProseData.vue'

const $props = withDefaults(defineProps<{
  component: string
  ignore?: string[]
}>(), {
  ignore: () => [
    'activeClass',
    'inactiveClass',
    'exactActiveClass',
    'ariaCurrentValue',
    'href',
    'rel',
    'noRel',
    'prefetch',
    'prefetchOn',
    'noPrefetch',
    'prefetchedClass',
    'replace',
    'exact',
    'exactQuery',
    'exactHash',
    'external',
    'onClick'
  ]
})

const camelName = camelCase($props.component)
const name = `B24${upperFirst(camelName)}`
const meta = B24UIMeta[name] || {}

const metaProps: ComputedRef<ComponentMeta['props']> = computed(() => {
  if (!meta?.meta?.props?.length) {
    return []
  }

  return meta.meta.props.filter((prop) => {
    return !$props.ignore?.includes(prop.name)
  }).map((prop) => {
    // @todo fix this ////
    // prop.default = prop.default ?? prop.tags?.find(tag => tag.name === 'defaultValue')?.text ?? componentTheme?.defaultVariants?.[prop.name]
    prop.default = prop.default ?? prop.tags?.find(tag => tag.name === 'defaultValue')?.text
    // @ts-expect-error - Type is not correct
    prop.type = !prop.type.startsWith('boolean') && prop.schema?.kind === 'enum' && Object.keys(prop.schema.schema)?.length ? Object.values(prop.schema.schema).map(schema => schema?.type ? schema.type : schema).join(' | ') : prop.type
    return prop
  }).sort((a, b) => {
    if (a.name === 'as') {
      return -1
    }

    if (b.name === 'as') {
      return 1
    }

    if (a.name === 'ui') {
      return 1
    }

    if (b.name === 'ui') {
      return -1
    }

    return 0
  })
})

// @todo style
// @todo add ProseCode
// @todo add <HighlightInlineType v-if="prop.default" :type="prop.default" />
// @todo add <HighlightInlineType v-if="prop.type" :type="prop.type" />
// @todo add <MDC v-if="prop.description" :value="prop.description" class="text-(--ui-text-toned) mt-1" />
// @todo add <ComponentPropsLinks v-if="prop.tags?.length" :prop="prop" />
// @todo add <ComponentPropsSchema v-if="prop.schema" :prop="prop" :ignore="ignore" />
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh class="value-info-1">
          Prop
        </ProseTh>
        <ProseTh class="value-info-2">
          Default
        </ProseTh>
        <ProseTh class="value-info-3">
          Type
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr
        v-for="prop in metaProps"
        :key="prop.name"
      >
        <ProseTd translate="no">
          <ProseCode>
            {{ prop.name }}
          </ProseCode>
        </ProseTd>
        <ProseTd translate="no">
          <ProseCode v-if="prop.default">
            {{ prop.default }}
          </ProseCode>
        </ProseTd>
        <ProseTd translate="no">
          <ProseCode v-if="prop.type">
            {{ prop.type.replace(' | undefined', '').replace('undefined | ', '') }}
          </ProseCode>

          <ProseData v-if="prop.description">
            {{ prop.description }}
          </ProseData>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
