<script setup lang="ts">
import { upperFirst, camelCase } from 'scule'
import B24UIMeta from '@bitrix24/b24ui-nuxt/meta'
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
}>(), {})

const camelName = camelCase($props.component)
const name = `B24${upperFirst(camelName)}`
const meta = B24UIMeta[name] || {}
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh>
          Slot
        </ProseTh>
        <ProseTh>
          Type
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr
        v-for="slot in (meta?.meta?.slots || [])"
        :key="slot.name"
      >
        <ProseTd translate="no">
          <ProseCode>{{ slot.name }}</ProseCode>
        </ProseTd>
        <ProseTd translate="no">
          <ProseCode v-if="slot.type">
            {{ slot.type.replace(' | undefined', '').replace('undefined | ', '') }}
          </ProseCode>

          <ProseData v-if="slot.description">
            {{ slot.description }}
          </ProseData>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
