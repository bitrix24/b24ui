<template>
  <B24ChatMessages
    :messages="[
      {
        id: '1',
        role: 'user',
        parts: [{ type: 'text', text: 'Hello! Can you help me with something?' }]
      }
    ]"
    status="submitted"
    :should-scroll-to-bottom="false"
    :user="{
      avatar: { src: '/b24ui/avatar/employee.png' },
      variant: 'message',
      side: 'right'
    }"
  >
    <template #indicator>
      <B24Button
        class="px-0"
        color="air-secondary-no-accent"
        loading
        label="Thinking..."
      />
    </template>
  </B24ChatMessages>
</template>
