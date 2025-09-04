import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: '日本語',
  code: 'ja',
  locale: 'ja',
  messages: {
    alert: {
      close: '閉じる'
    },
    authForm: {
      hidePassword: 'パスワードを非表示',
      showPassword: 'パスワードを表示',
      submit: '続ける'
    },
    banner: {
      close: '閉じる'
    },
    calendar: {
      nextMonth: '次の月',
      nextYear: '次の年',
      prevMonth: '前の月',
      prevYear: '前の年'
    },
    carousel: {
      dots: '表示するスライドを選択',
      goto: '{slide}に移動',
      next: '次へ',
      prev: '前へ'
    },
    chatPrompt: {
      placeholder: 'メッセージを入力してください...'
    },
    chatPromptSubmit: {
      label: '送信'
    },
    colorMode: {
      dark: 'ダーク',
      light: 'ライト',
      switchToDark: 'ダークモードに切り替え',
      switchToLight: 'ライトモードに切り替え',
      system: 'システム'
    },
    commandPalette: {
      back: '戻る',
      close: '閉じる',
      noData: 'データなし',
      noMatch: '一致する項目が見つかりません',
      placeholder: 'コマンドを入力または検索...'
    },
    contentSearch: {
      links: '検索結果',
      theme: 'テーマ'
    },
    contentSearchButton: {
      label: '検索...'
    },
    contentToc: {
      title: 'このページの内容'
    },
    dashboardSearch: {
      theme: 'テーマ'
    },
    dashboardSearchButton: {
      label: '検索...'
    },
    dashboardSidebarCollapse: {
      collapse: 'サイドバーを折りたたむ',
      expand: 'サイドバーを展開する'
    },
    dashboardSidebarToggle: {
      close: 'サイドバーを閉じる',
      open: 'サイドバーを開く'
    },
    error: {
      clear: '再試行'
    },
    fileUpload: {
      removeFile: '{filename}を削除'
    },
    header: {
      close: 'メニューを閉じる',
      open: 'メニューを開く'
    },
    inputMenu: {
      create: '"{label}"を作成',
      noData: 'データなし',
      noMatch: '一致する項目が見つかりません'
    },
    inputNumber: {
      decrement: '減らす',
      increment: '増やす'
    },
    modal: {
      close: '閉じる'
    },
    pricingTable: {
      caption: 'プラン比較'
    },
    prose: {
      codeCollapse: {
        closeText: '折りたたむ',
        name: 'コード',
        openText: '展開する'
      },
      collapsible: {
        closeText: '折りたたむ',
        name: 'プロパティ',
        openText: '展開する'
      },
      pre: {
        copy: 'コピー'
      }
    },
    selectMenu: {
      create: '"{label}"を作成',
      noData: 'データなし',
      noMatch: '一致する項目が見つかりません',
      search: '検索...'
    },
    slideover: {
      close: '閉じる'
    },
    table: {
      noData: 'データなし'
    },
    toast: {
      close: '閉じる'
    },
    sidebarLayout: {
      open: 'ナビゲーションを開く',
      close: 'ナビゲーションを閉じる',
      slideoverTitle: 'ナビゲーション',
      slideoverDescription: 'コンテンツナビゲーション'
    }
  }
})
