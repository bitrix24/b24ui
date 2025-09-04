import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'العربية',
  code: 'ar',
  locale: 'ar',
  dir: 'rtl',
  messages: {
    alert: {
      close: 'إغلاق'
    },
    authForm: {
      hidePassword: 'إخفاء كلمة المرور',
      showPassword: 'إظهار كلمة المرور',
      submit: 'متابعة'
    },
    banner: {
      close: 'إغلاق'
    },
    calendar: {
      nextMonth: 'الشهر التالي',
      nextYear: 'السنة التالية',
      prevMonth: 'الشهر السابق',
      prevYear: 'السنة السابقة'
    },
    carousel: {
      dots: 'اختر شريحة للعرض',
      goto: 'انتقل إلى {slide}',
      next: 'التالي',
      prev: 'السابق'
    },
    chatPrompt: {
      placeholder: 'اكتب رسالتك هنا...'
    },
    chatPromptSubmit: {
      label: 'إرسال'
    },
    colorMode: {
      dark: 'مظلم',
      light: 'فاتح',
      switchToDark: 'التغيير إلى الوضع المظلم',
      switchToLight: 'التغيير إلى الوضع الفاتح',
      system: 'النظام'
    },
    commandPalette: {
      back: 'رجوع',
      close: 'إغلاق',
      noData: 'لا توجد بيانات',
      noMatch: 'لم يتم العثور على نتائج',
      placeholder: 'أدخل أمرًا أو ابحث...'
    },
    contentSearch: {
      links: 'النتائج',
      theme: 'الموضوع'
    },
    contentSearchButton: {
      label: 'بحث...'
    },
    contentToc: {
      title: 'في هذه الصفحة'
    },
    dashboardSearch: {
      theme: 'الموضوع'
    },
    dashboardSearchButton: {
      label: 'بحث...'
    },
    dashboardSidebarCollapse: {
      collapse: 'طي الشريط الجانبي',
      expand: 'توسيع الشريط الجانبي'
    },
    dashboardSidebarToggle: {
      close: 'إغلاق الشريط الجانبي',
      open: 'فتح الشريط الجانبي'
    },
    error: {
      clear: 'حاول مرة أخرى'
    },
    fileUpload: {
      removeFile: 'حذف {filename}'
    },
    header: {
      close: 'إغلاق القائمة',
      open: 'فتح القائمة'
    },
    inputMenu: {
      create: 'إنشاء "{label}"',
      noData: 'لا توجد بيانات',
      noMatch: 'لم يتم العثور على نتائج'
    },
    inputNumber: {
      decrement: 'إنقاص',
      increment: 'زيادة'
    },
    modal: {
      close: 'إغلاق'
    },
    pricingTable: {
      caption: 'مقارنة الخطط التسعيرية'
    },
    prose: {
      codeCollapse: {
        closeText: 'إخفاء',
        name: 'الكود',
        openText: 'إظهار'
      },
      collapsible: {
        closeText: 'إخفاء',
        name: 'الخصائص',
        openText: 'إظهار'
      },
      pre: {
        copy: 'نسخ'
      }
    },
    selectMenu: {
      create: 'إنشاء "{label}"',
      noData: 'لا توجد بيانات',
      noMatch: 'لم يتم العثور على نتائج',
      search: 'بحث...'
    },
    slideover: {
      close: 'إغلاق'
    },
    table: {
      noData: 'لا توجد بيانات'
    },
    toast: {
      close: 'إغلاق'
    },
    sidebarLayout: {
      open: 'فتح التنقل',
      close: 'إغلاق التنقل',
      slideoverTitle: 'التنقل',
      slideoverDescription: 'التنقل بين المحتويات'
    }
  }
})
