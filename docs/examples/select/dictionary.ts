import { ref } from 'vue'
import type { SelectItem } from '@bitrix24/b24ui-nuxt'
// import theme from '#build/b24ui/button'

export const selectItems = ['CRM settings', 'My company details', 'Access permissions'] satisfies SelectItem[]
export const selectItem = ref(selectItems[2])
