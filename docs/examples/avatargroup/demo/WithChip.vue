<template>
  <B24AvatarGroup>
    <B24Avatar
      src="/b24ui/avatar/employee.png"
      alt="Employee Name"
      size="md"
      :chip="{ inset: true, color: 'air-primary-success', position: 'top-left' }"
    />
    <B24Avatar
      src="/b24ui/avatar/assistant.png"
      alt="Assistant Name"
      size="md"
      :chip="{ inset: true, color: 'air-primary-copilot', position: 'top-left' }"
    />
    <B24Avatar
      src="/b24ui/avatar/employee.png"
      alt="Employee Name"
      class="rotate-y-180"
      size="md"
      :chip="{ inset: true, color: 'air-primary-alert', position: 'top-left' }"
    />
  </B24AvatarGroup>
</template>
