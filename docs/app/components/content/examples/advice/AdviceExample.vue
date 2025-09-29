<script setup lang="ts">
import DotsIcon from '@bitrix24/b24icons-vue/button/DotsIcon'
</script>

<template>
  <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
    <B24Advice :avatar="{ src: '/b24ui/avatar/assistant.png' }">
      <span>Typically, instructions on how to add a SAML application and add the ACS URL and SP Entity ID can be found in the Microsoft Azure technical documentation. </span>
      <B24Link to="https://github.com/bitrix24/b24ui/" target="_blank" is-action>
        Read more
      </B24Link>
    </B24Advice>
    <B24Advice angle="top" :avatar="{ src: '/b24ui/avatar/employee.png' }">
      <div class="flex flex-col items-start justify-between gap-1.5">
        <div class="font-(--ui-font-weight-bold)">
          Reference information
        </div>
        <div>Typically, instructions on how to add a SAML application and add the ACS URL and SP Entity ID can be found in the Microsoft Azure technical documentation.</div>
        <div class="mt-2 flex flex-row flex-wrap items-start justify-between gap-2">
          <B24Button size="xs" color="air-primary" label="Some Action 1" />
          <B24Button size="xs" color="air-secondary-accent-2" label="Some Action 2" />
          <B24Button size="xs" color="air-tertiary" :icon="DotsIcon" />
        </div>
      </div>
    </B24Advice>
  </div>
</template>
