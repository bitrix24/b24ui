import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: '中文（繁體)',
  code: 'tc',
  locale: 'zh-TW',
  messages: {
    alert: {
      close: '關閉'
    },
    authForm: {
      hidePassword: '隱藏密碼',
      showPassword: '顯示密碼',
      submit: '繼續'
    },
    banner: {
      close: '關閉'
    },
    calendar: {
      nextMonth: '下個月',
      nextYear: '明年',
      prevMonth: '上個月',
      prevYear: '去年'
    },
    carousel: {
      dots: '選擇要顯示的幻燈片',
      goto: '前往 {slide}',
      next: '下一個',
      prev: '上一個'
    },
    chatPrompt: {
      placeholder: '在此輸入您的訊息...'
    },
    chatPromptSubmit: {
      label: '傳送'
    },
    colorMode: {
      dark: '深色',
      light: '淺色',
      switchToDark: '切換至深色模式',
      switchToLight: '切換至淺色模式',
      system: '系統'
    },
    commandPalette: {
      back: '返回',
      close: '關閉',
      noData: '無資料',
      noMatch: '找不到符合項目',
      placeholder: '輸入指令或搜尋...'
    },
    contentSearch: {
      links: '結果',
      theme: '主題'
    },
    contentSearchButton: {
      label: '搜尋...'
    },
    contentToc: {
      title: '本頁內容'
    },
    dropdownMenu: {
      noMatch: '沒有符合的資料',
      search: '搜尋…'
    },
    dashboardSearch: {
      theme: '主題'
    },
    dashboardSearchButton: {
      label: '搜尋...'
    },
    dashboardSidebarCollapse: {
      collapse: '收合側邊欄',
      expand: '展開側邊欄'
    },
    dashboardSidebarToggle: {
      close: '關閉側邊欄',
      open: '開啟側邊欄'
    },
    error: {
      clear: '重試'
    },
    fileUpload: {
      removeFile: '移除 {filename}'
    },
    header: {
      close: '關閉選單',
      open: '開啟選單'
    },
    inputMenu: {
      create: '建立 "{label}"',
      noData: '無資料',
      noMatch: '找不到符合項目'
    },
    inputNumber: {
      decrement: '減少',
      increment: '增加'
    },
    modal: {
      close: '關閉'
    },
    pricingTable: {
      caption: '價格方案比較'
    },
    prose: {
      codeCollapse: {
        closeText: '隱藏',
        name: 'code',
        openText: '顯示'
      },
      collapsible: {
        closeText: '隱藏',
        name: 'properties',
        openText: '顯示'
      },
      pre: {
        copy: '複製'
      }
    },
    selectMenu: {
      create: '建立 "{label}"',
      noData: '無資料',
      noMatch: '找不到符合項目',
      search: '搜尋...'
    },
    slideover: {
      close: '關閉'
    },
    table: {
      noData: '無資料'
    },
    toast: {
      close: '關閉'
    },
    sidebarLayout: {
      open: '開啟導覽',
      close: '關閉導覽',
      slideoverTitle: '導覽',
      slideoverDescription: '內容導覽'
    }
  }
})
