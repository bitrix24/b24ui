<script setup lang="ts">
import theme from '#build/b24ui/avatar'
import IncertImageIcon from '@bitrix24/b24icons-vue/editor/IncertImageIcon'

const sizes = Object.keys(theme.variants.size)
const attrs = reactive({
  size: [theme.defaultVariants.size]
})

const showGroup = ref(false)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24Switch v-model="showGroup" label="Group" />
    </template>

    <Matrix
      v-slot="props"
      :attrs="attrs"
      :b24ui="{
        root: 'max-w-100',
        body: [showGroup ? 'flex-col' : 'flex-row', 'flex-wrap overflow-x-auto']
      }"
    >
      <template v-if="showGroup">
        <B24AvatarGroup :max="3" :size="props?.size">
          <B24Avatar
            src="/avatar/employee.png"
            alt="Employee Name"
            :chip="{ inset: true, text: '1', color: 'air-primary-alert' }"
          />
          <B24Avatar src="/avatar/assistant.png" alt="Assistant Name" />
          <B24Avatar src="/avatar/employee.png" alt="Employee Name" class="grayscale" />
          <B24Avatar src="/avatar/employee.png" alt="Employee Name" />
          <B24Avatar src="/avatar/assistant.png" alt="Assistant Name" />
        </B24AvatarGroup>
        <B24AvatarGroup :max="2" v-bind="props">
          <B24Avatar src="/avatar/employee.png" alt="Employee Name" />
          <B24Avatar src="/avatar/assistant.png" alt="Assistant Name" />
        </B24AvatarGroup>
      </template>
      <template v-else>
        <B24Avatar src="/avatar/employee.png" alt="Employee Name" v-bind="props" />
        <B24Avatar :icon="IncertImageIcon" v-bind="props" />
        <B24Avatar alt="Assistant Name" v-bind="props" />
        <B24Avatar :text="props?.size" v-bind="props" />
      </template>
    </Matrix>
  </PlaygroundPage>
</template>
