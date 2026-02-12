<template>
  <PlaygroundPage>
    <div class="flex flex-col items-center gap-4 mx-auto">
      <div class="flex items-center gap-2">
        <B24ColorModeSwitch />
        <B24ColorModeSelect />
        <B24ColorModeButton />
      </div>

      <div class="flex items-center gap-2">
        <B24ColorModeAvatar light="https://github.com/vuejs.png" dark="https://github.com/nuxt.png" />
        <B24ColorModeImage light="https://github.com/vuejs.png" dark="https://github.com/nuxt.png" class="size-8" />
      </div>
    </div>
  </PlaygroundPage>
</template>
