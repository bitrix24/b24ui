import './assets/css/main.css'

import { createApp, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import b24UiPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'

import App from './app.vue'

const pages = import.meta.glob(['../../nuxt/app/pages/*.vue', '../../nuxt/app/pages/components/*.vue', '../../nuxt/app/pages/components/prose/*.vue'])

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\.\/\.\.\/nuxt\/app\/pages(.*)\.vue$/)![1].toLowerCase()
  return {
    path: name === '/index' ? '/' : name,
    component: pages[path]
  }
})

const router = createRouter({
  routes,
  history: createWebHistory()
})

// detect-platform.global
router.beforeEach((to, from, next) => {
  const userAgent = navigator.userAgent;

  // @todo fix this
  // console.warn({ userAgent, to, from })
  alert(JSON.stringify({ userAgent, to, from }, null, 2))
  const isNativeApp = userAgent.includes('MyCoolApp');
  const platformValue = isNativeApp ? 'mobile' : 'web';

  document.documentElement.setAttribute('data-platform', platformValue);

  // Optional: You can push this to the global state (Pinia)
  // const store = useAppStore();
  // store.setPlatform(platformValue);

  next()
})

const app = createApp(App)

app.use(router)
app.use(b24UiPlugin)

// @ts-expect-error unknown global property
globalThis.useFetch = async (url: string, options: RequestInit & { transform?: (data) => any } = {}) => {
  const data = ref()
  const status = ref('idle')
  async function _fetch() {
    status.value = 'loading'
    try {
      data.value = await fetch(url, options).then(r => r.json()).then(r => options.transform ? options.transform(r) : r)
      status.value = 'success'
    } catch (error) {
      console.error(error)
      status.value = 'error'
    }
  }
  _fetch()
  return Promise.resolve({
    data,
    status
  })
}

app.mount('#app')
