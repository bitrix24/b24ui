<script setup lang="ts">
import { ref } from 'vue'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'
import DotsIcon from '@bitrix24/b24icons-vue/button/DotsIcon'

const description = ref('Let\'s signal the manager that the deal is not moving, the manager does not call the client back and does not respond to his messages. Let\'s assign a task to the manager on behalf of the manager')
</script>

<template>
  <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
    <B24Advice :description="description" />
    <B24Advice angle="top" :description="description" />
  </div>

  <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
    <B24Advice :description="description" :icon="InfoIcon" />
    <B24Advice angle="top" :description="description" :icon="InfoIcon" />
  </div>

  <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
    <B24Advice :description="description" :avatar="{ src: '/b24ui/avatar/assistant.png' }" />
    <B24Advice angle="top" :description="description" :avatar="{ src: '/b24ui/avatar/employee.png' }" />
  </div>

  <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
    <B24Advice :avatar="{ src: '/b24ui/avatar/assistant.png' }">
      <span>Typically, instructions on how to add a SAML application and add the ACS URL and SP Entity ID can be found in the Microsoft Azure technical documentation. </span>
      <B24Link to="https://github.com/bitrix24/b24ui/" target="_blank" is-action>
        Read more
      </B24Link>
    </B24Advice>
    <B24Advice angle="top" :avatar="{ src: '/b24ui/avatar/employee.png' }">
      <div class="flex flex-col items-start justify-between gap-1.5">
        <div class="font-bold">
          Reference information
        </div>
        <div>Typically, instructions on how to add a SAML application and add the ACS URL and SP Entity ID can be found in the Microsoft Azure technical documentation.</div>
        <div class="mt-2 flex flex-row items-start justify-between gap-2">
          <B24Button size="xs" color="primary" label="some action 1" />
          <B24Button size="xs" color="link" depth="dark" label="some action 2" />
          <B24Button size="xs" color="link" depth="light" :icon="DotsIcon" />
        </div>
      </div>
    </B24Advice>
  </div>
</template>
