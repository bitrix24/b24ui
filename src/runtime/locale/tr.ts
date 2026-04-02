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
      hidePassword: 'Parolayı gizle',
      showPassword: 'Parolayı göster',
      submit: 'Devam et'
    },
    banner: {
      close: 'Kapat'
    },
    calendar: {
      nextMonth: 'Sonraki ay',
      nextYear: 'Sonraki yıl',
      prevMonth: 'Önceki ay',
      prevYear: 'Önceki yıl'
    },
    carousel: {
      dots: 'Görüntülenecek slaydı seç',
      goto: '{slide} sayfasına git',
      next: 'Sonraki',
      prev: 'Önceki'
    },
    chatPrompt: {
      placeholder: 'Mesajınızı buraya girin...'
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
      placeholder: 'Komut gir veya ara...'
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
    dropdownMenu: {
      noMatch: 'Eşleşen veri yok',
      search: 'Ara…'
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
      clear: 'Tekrar dene'
    },
    fileUpload: {
      removeFile: '{filename} dosyasını kaldır'
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
      increment: 'Arttır'
    },
    modal: {
      close: 'Kapat'
    },
    pricingTable: {
      caption: 'Fiyat planları karşılaştırması'
    },
    prose: {
      codeCollapse: {
        closeText: 'Gizle',
        name: 'code',
        openText: 'Göster'
      },
      collapsible: {
        closeText: 'Gizle',
        name: 'properties',
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
      open: 'Navigasyonu aç',
      close: 'Navigasyonu kapat',
      slideoverTitle: 'Navigasyon',
      slideoverDescription: 'İçerik navigasyonu'
    }
  }
})
