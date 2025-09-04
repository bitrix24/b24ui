import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Bahasa Indonesia',
  code: 'id',
  locale: 'id',
  messages: {
    alert: {
      close: 'Tutup'
    },
    authForm: {
      hidePassword: 'Sembunyikan kata sandi',
      showPassword: 'Tampilkan kata sandi',
      submit: 'Lanjutkan'
    },
    banner: {
      close: 'Tutup'
    },
    calendar: {
      nextMonth: 'Bulan berikutnya',
      nextYear: 'Tahun berikutnya',
      prevMonth: 'Bulan sebelumnya',
      prevYear: 'Tahun sebelumnya'
    },
    carousel: {
      dots: 'Pilih slide untuk ditampilkan',
      goto: 'Pergi ke {slide}',
      next: 'Selanjutnya',
      prev: 'Sebelumnya'
    },
    chatPrompt: {
      placeholder: 'Ketik pesan Anda di sini...'
    },
    chatPromptSubmit: {
      label: 'Kirim'
    },
    colorMode: {
      dark: 'Gelap',
      light: 'Terang',
      switchToDark: 'Beralih ke mode gelap',
      switchToLight: 'Beralih ke mode terang',
      system: 'Sistem'
    },
    commandPalette: {
      back: 'Kembali',
      close: 'Tutup',
      noData: 'Tidak ada data',
      noMatch: 'Tidak ditemukan hasil yang cocok',
      placeholder: 'Ketik perintah atau cari...'
    },
    contentSearch: {
      links: 'Hasil',
      theme: 'Tema'
    },
    contentSearchButton: {
      label: 'Cari...'
    },
    contentToc: {
      title: 'Di halaman ini'
    },
    dashboardSearch: {
      theme: 'Tema'
    },
    dashboardSearchButton: {
      label: 'Cari...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Ciutkan panel samping',
      expand: 'Bentangkan panel samping'
    },
    dashboardSidebarToggle: {
      close: 'Tutup panel samping',
      open: 'Buka panel samping'
    },
    error: {
      clear: 'Coba lagi'
    },
    fileUpload: {
      removeFile: 'Hapus {filename}'
    },
    header: {
      close: 'Tutup menu',
      open: 'Buka menu'
    },
    inputMenu: {
      create: 'Buat "{label}"',
      noData: 'Tidak ada data',
      noMatch: 'Tidak ditemukan hasil yang cocok'
    },
    inputNumber: {
      decrement: 'Kurangi',
      increment: 'Tambah'
    },
    modal: {
      close: 'Tutup'
    },
    pricingTable: {
      caption: 'Perbandingan paket harga'
    },
    prose: {
      codeCollapse: {
        closeText: 'Sembunyikan',
        name: 'kode',
        openText: 'Tampilkan'
      },
      collapsible: {
        closeText: 'Sembunyikan',
        name: 'properti',
        openText: 'Tampilkan'
      },
      pre: {
        copy: 'Salin'
      }
    },
    selectMenu: {
      create: 'Buat "{label}"',
      noData: 'Tidak ada data',
      noMatch: 'Tidak ditemukan hasil yang cocok',
      search: 'Cari...'
    },
    slideover: {
      close: 'Tutup'
    },
    table: {
      noData: 'Tidak ada data'
    },
    toast: {
      close: 'Tutup'
    },
    sidebarLayout: {
      open: 'Buka navigasi',
      close: 'Tutup navigasi',
      slideoverTitle: 'Navigasi',
      slideoverDescription: 'Navigasi konten'
    }
  }
})
