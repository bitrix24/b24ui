import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Türkçe',
  code: 'tr',
  locale: 'tr',
  messages: {
    alert: {
      close: 'Kapat'
    },
    authForm: {
      hidePassword: 'Parolayı Gizle',
      showPassword: 'Parolayı Göster',
      submit: 'Devam Et'
    },
    banner: {
      close: 'Kapat'
    },
    calendar: {
      nextMonth: 'Sonraki Ay',
      nextYear: 'Sonraki Yıl',
      prevMonth: 'Önceki Ay',
      prevYear: 'Önceki Yıl'
    },
    carousel: {
      dots: 'Gösterilecek slaytı seçin',
      goto: '{slide}\'a git',
      next: 'İleri',
      prev: 'Geri'
    },
    chatPrompt: {
      placeholder: 'Mesajınızı buraya yazın...'
    },
    chatPromptSubmit: {
      label: 'Gönder'
    },
    colorMode: {
      dark: 'Koyu',
      light: 'Açık',
      switchToDark: 'Koyu moda geç',
      switchToLight: 'Açık moda geç',
      system: 'Sistem'
    },
    commandPalette: {
      back: 'Geri',
      close: 'Kapat',
      noData: 'Veri yok',
      noMatch: 'Eşleşme bulunamadı',
      placeholder: 'Bir komut girin veya arama yapın...'
    },
    contentSearch: {
      links: 'Sonuçlar',
      theme: 'Tema'
    },
    contentSearchButton: {
      label: 'Ara...'
    },
    contentToc: {
      title: 'Bu sayfada'
    },
    dashboardSearch: {
      theme: 'Tema'
    },
    dashboardSearchButton: {
      label: 'Ara...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Kenar çubuğunu daralt',
      expand: 'Kenar çubuğunu genişlet'
    },
    dashboardSidebarToggle: {
      close: 'Kenar çubuğunu kapat',
      open: 'Kenar çubuğunu aç'
    },
    error: {
      clear: 'Tekrar Dene'
    },
    fileUpload: {
      removeFile: '{filename} dosyasını sil'
    },
    header: {
      close: 'Menüyü kapat',
      open: 'Menüyü aç'
    },
    inputMenu: {
      create: '"{label}" oluştur',
      noData: 'Veri yok',
      noMatch: 'Eşleşme bulunamadı'
    },
    inputNumber: {
      decrement: 'Azalt',
      increment: 'Artır'
    },
    modal: {
      close: 'Kapat'
    },
    pricingTable: {
      caption: 'Fiyat planlarının karşılaştırılması'
    },
    prose: {
      codeCollapse: {
        closeText: 'Gizle',
        name: 'kod',
        openText: 'Göster'
      },
      collapsible: {
        closeText: 'Gizle',
        name: 'özellikler',
        openText: 'Göster'
      },
      pre: {
        copy: 'Kopyala'
      }
    },
    selectMenu: {
      create: '"{label}" oluştur',
      noData: 'Veri yok',
      noMatch: 'Eşleşme bulunamadı',
      search: 'Ara...'
    },
    slideover: {
      close: 'Kapat'
    },
    table: {
      noData: 'Veri yok'
    },
    toast: {
      close: 'Kapat'
    },
    sidebarLayout: {
      open: 'Gezintiyi aç',
      close: 'Gezintiyi kapat',
      slideoverTitle: 'Gezinti',
      slideoverDescription: 'İçerik gezintisi'
    }
  }
})
