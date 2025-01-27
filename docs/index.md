---
layout: home

hero:
  name: "@bitrix24/b24ui"
  text: "Bitrix24 UI-Kit"
  tagline: for REST API web-application development
  actions:
    - theme: brand
      text: Docs
      link: /guide/getting-started
    - theme: brand
      text: Components
      link: /components/app
    - theme: alt
      text: GitHub
      link: https://github.com/bitrix24/b24ui
---
<script setup>
import PromoExample from '/examples/index/Promo_v1.vue';
</script>

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <PromoExample />
  </ClientOnly>
</div>
