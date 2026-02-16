<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-var(--topbar-height))]">
    <B24Card class="mx-4 text-center backdrop-blur-xl max-w-96">
      <template #header>
        <ProseH1 class="mb-0">
          Demo Playground
        </ProseH1>
      </template>
      <ProseP class="bitrix-mobile:hidden bitrix-desktop:hidden">
        Explore and test all Bitrix24 UI components in an interactive environment.
      </ProseP>

      <ProseP class="hidden bitrix-mobile:inline-block">
        It's magic! 🔮 Check out what the Bitrix24 Mobile UI is capable of. You're doing great! 😎
      </ProseP>

      <ProseP class="hidden bitrix-desktop:inline-block">
        Pure magic! ✨ Look at what the Bitrix24 Desktop UI can do. You rock! 🔥
      </ProseP>
    </B24Card>
  </div>
</template>
