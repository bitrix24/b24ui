<script setup lang="ts">
import Cross50Icon from '@bitrix24/b24icons-vue/actions/Cross50Icon'

const open = ref(false)
const openDismissible = ref(false)
const inset = ref(false)
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'flex-col gap-2 max-w-100 mx-auto' }">
    <template #controls>
      <B24Switch v-model="inset" label="Inset" />
    </template>

    <div class="flex flex-col gap-2 min-h-0">
      <B24Drawer v-model:open="open" title="Drawer with v-model" description="This is useful to control the state yourself." :inset="inset">
        <B24Button color="air-secondary-accent" label="Open with v-model" />

        <template #body>
          <Placeholder class="h-48 w-full" />
        </template>

        <template #footer>
          <B24Button label="Submit" color="air-primary-success" />
          <B24Button label="Cancel" @click="open = false" />
        </template>
      </B24Drawer>

      <B24Drawer should-scale-background title="Drawer with `should-scale-background`" description="You need to add the `data-vaul-drawer-wrapper` directive to your content to make it work." :inset="inset">
        <B24Button label="Open with scale" />

        <template #body>
          <Placeholder class="h-screen w-full" />
        </template>
      </B24Drawer>

      <B24Drawer title="Drawer with nested" :inset="inset" :b24ui="{ content: 'h-full' }">
        <B24Button color="air-secondary-accent" label="Open nested" />

        <template #footer>
          <B24Drawer :inset="inset" nested :b24ui="{ content: 'h-full' }">
            <B24Button color="air-primary" label="Open nested" />

            <template #content>
              <Placeholder class="flex-1 m-4" />
            </template>
          </B24Drawer>
        </template>
      </B24Drawer>

      <B24Drawer
        v-model:open="openDismissible"
        :dismissible="false"
        :modal="false"
        :overlay="false"
        :inset="inset"
      >
        <B24Button label="Open unclosable" />

        <template #body>
          <div class="flex items-center justify-between gap-4 mb-4">
            <ProseH2 class="mb-0">
              Drawer non-dismissible
            </ProseH2>

            <B24Button color="air-tertiary" :icon="Cross50Icon" @click="openDismissible = false" />
          </div>

          <Placeholder class="size-full min-h-48" />
        </template>
      </B24Drawer>

      <B24Drawer title="Drawer with bottom direction" direction="bottom" :inset="inset">
        <B24Button color="air-secondary-accent" label="Open on bottom" />

        <template #body>
          <Placeholder class="h-96 w-full" />
        </template>
      </B24Drawer>

      <B24Drawer title="Drawer with left direction" direction="left" :inset="inset">
        <B24Button label="Open on left" />

        <template #body>
          <Placeholder class="w-96 h-full" />
        </template>
      </B24Drawer>

      <B24Drawer title="Drawer with top direction" direction="top" :inset="inset">
        <B24Button color="air-secondary-accent" label="Open on top" />

        <template #body>
          <Placeholder class="h-96 w-full" />
        </template>
      </B24Drawer>

      <B24Drawer title="Drawer with right direction" direction="right" :inset="inset">
        <B24Button label="Open on right" />

        <template #body>
          <Placeholder class="w-96 h-full" />
        </template>
      </B24Drawer>
    </div>
  </PlaygroundPage>
</template>
