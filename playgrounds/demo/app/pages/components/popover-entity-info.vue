<script setup lang="ts">
const modes = ['hover', 'click'] as const

const mode = ref<typeof modes[number]>('hover')
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'flex-col max-w-md mx-auto' }">
    <template #controls>
      <B24Tooltip text="mode (first popover)" size="xs">
        <B24Select v-model="mode" placeholder="mode" size="xs" :items="[...modes]" />
      </B24Tooltip>
    </template>

    <p class="leading-7">
      Latest activity on the
      <EntityInfoPopover
        title="ACME Corp."
        caption="12 contacts"
        primary-action-label="Open account"
        owner-name="Sample owner"
        created-at="Oct 6, 2024 08:37"
        category="Enterprise"
        :mode="mode"
      >
        <B24Link is-action>
          ACME Corp.
        </B24Link>
      </EntityInfoPopover>
      account — pipeline value grew by 12% this quarter.
    </p>

    <p class="leading-7">
      Click the deal name to inspect
      <EntityInfoPopover
        title="Q3 Enterprise Renewal"
        caption="Stage: Negotiation"
        primary-action-label="Open deal"
        owner-name="Sample owner"
        created-at="Sep 18, 2024 14:02"
        category="Inbound lead"
        mode="click"
      >
        <B24Link is-action>
          Q3 Enterprise Renewal
        </B24Link>
      </EntityInfoPopover>
      before assigning it to the next sales rep.
    </p>
  </PlaygroundPage>
</template>
