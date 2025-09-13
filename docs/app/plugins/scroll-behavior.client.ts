import { useRouter } from 'vue-router'

export default defineNuxtPlugin({
  enforce: 'post',
  setup() {
    if (import.meta.client && typeof window !== 'undefined') {
      const router = useRouter()
      router.afterEach(async (to) => {
        if (to.hash) {
          const targetElement = document.querySelector(to.hash)
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            })
            return
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  }
})
