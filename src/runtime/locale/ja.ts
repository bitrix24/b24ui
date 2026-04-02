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
      hidePassword: 'パスワードを隠す',
      showPassword: 'パスワードを表示',
      submit: '続ける'
    },
    banner: {
      close: '閉じる'
    },
    calendar: {
      nextMonth: '翌月',
      nextYear: '翌年',
      prevMonth: '前月',
      prevYear: '前年'
    },
    carousel: {
      dots: '表示するスライドを選択',
      goto: '{slide} に移動',
      next: '次へ',
      prev: '前へ'
    },
    chatPrompt: {
      placeholder: 'メッセージを入力...'
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
      noData: 'データがありません',
      noMatch: '一致する結果が見つかりません',
      placeholder: 'コマンドまたは検索を入力...'
    },
    contentSearch: {
      links: '結果',
      theme: 'テーマ'
    },
    contentSearchButton: {
      label: '検索...'
    },
    contentToc: {
      title: 'このページの内容'
    },
    dropdownMenu: {
      noMatch: '一致するデータがありません',
      search: '検索…'
    },
    dashboardSearch: {
      theme: 'テーマ'
    },
    dashboardSearchButton: {
      label: '検索...'
    },
    dashboardSidebarCollapse: {
      collapse: 'サイドバーを折りたたむ',
      expand: 'サイドバーを展開'
    },
    dashboardSidebarToggle: {
      close: 'サイドバーを閉じる',
      open: 'サイドバーを開く'
    },
    error: {
      clear: '再試行'
    },
    fileUpload: {
      removeFile: '{filename} を削除'
    },
    header: {
      close: 'メニューを閉じる',
      open: 'メニューを開く'
    },
    inputMenu: {
      create: '"{label}" を作成',
      noData: 'データがありません',
      noMatch: '一致する結果が見つかりません'
    },
    inputNumber: {
      decrement: '減らす',
      increment: '増やす'
    },
    modal: {
      close: '閉じる'
    },
    pricingTable: {
      caption: '料金プラン比較'
    },
    prose: {
      codeCollapse: {
        closeText: '隠す',
        name: 'コード',
        openText: '表示'
      },
      collapsible: {
        closeText: '隠す',
        name: 'プロパティ',
        openText: '表示'
      },
      pre: {
        copy: 'コピー'
      }
    },
    selectMenu: {
      create: '"{label}" を作成',
      noData: 'データがありません',
      noMatch: '一致する結果が見つかりません',
      search: '検索...'
    },
    slideover: {
      close: '閉じる'
    },
    table: {
      noData: 'データがありません'
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
