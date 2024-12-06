<script setup lang="ts">
const items = [{
  label: 'Team',
  icon: 'i-lucide-users'
}, {
  label: 'Invite users',
  icon: 'i-lucide-user-plus',
  children: [{
    label: 'Invite by email',
    icon: 'i-lucide-send-horizontal'
  }, {
    label: 'Invite by link',
    icon: 'i-lucide-link'
  }]
}, {
  label: 'New team',
  icon: 'i-lucide-plus'
}]
</script>

<template>
  <B24ButtonGroup>
    <B24Button color="neutral" variant="subtle" label="Settings" />

    <B24DropdownMenu :items="items">
      <B24Button
        color="neutral"
        variant="outline"
        icon="i-lucide-chevron-down"
      />
    </B24DropdownMenu>
  </B24ButtonGroup>
</template>
