<template>
  <B24AvatarGroup size="xl">
    <B24Avatar
      src="/b24ui/avatar/assistant.png"
      alt="Assistant Name"
      :chip="{ inset: true, color: 'air-primary-success', position: 'top-left' }"
    />

    <B24Avatar
      src="https://github.com/bitrix24.png"
      alt="Bitrix24"
      :chip="{ inset: true, color: 'air-primary-warning', position: 'top-left' }"
    />

    <B24Avatar
      src="/b24ui/avatar/employee.png"
      alt="Employee Name"
      :chip="{ inset: true, color: 'air-primary-alert' }"
    />
  </B24AvatarGroup>
</template>
