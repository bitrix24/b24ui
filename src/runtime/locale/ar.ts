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
      dots: 'اختر الشريحة لعرضها',
      goto: 'انتقل إلى {slide}',
      next: 'التالي',
      prev: 'السابق'
    },
    chatPrompt: {
      placeholder: 'أدخل رسالتك هنا...'
    },
    chatPromptSubmit: {
      label: 'إرسال'
    },
    colorMode: {
      dark: 'داكن',
      light: 'فاتح',
      switchToDark: 'التبديل إلى الوضع الداكن',
      switchToLight: 'التبديل إلى الوضع الفاتح',
      system: 'النظام'
    },
    commandPalette: {
      back: 'رجوع',
      close: 'إغلاق',
      noData: 'لا توجد بيانات',
      noMatch: 'لم يتم العثور على تطابقات',
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
    dropdownMenu: {
      noMatch: 'لا توجد بيانات مطابقة',
      search: 'بحث...'
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
      removeFile: 'إزالة {filename}'
    },
    header: {
      close: 'إغلاق القائمة',
      open: 'فتح القائمة'
    },
    inputMenu: {
      create: 'إنشاء "{label}"',
      noData: 'لا توجد بيانات',
      noMatch: 'لم يتم العثور على تطابقات'
    },
    inputNumber: {
      decrement: 'إنقاص',
      increment: 'زيادة'
    },
    modal: {
      close: 'إغلاق'
    },
    pricingTable: {
      caption: 'مقارنة خطط التسعير'
    },
    prose: {
      codeCollapse: {
        closeText: 'إخفاء',
        name: 'code',
        openText: 'إظهار'
      },
      collapsible: {
        closeText: 'إخفاء',
        name: 'properties',
        openText: 'إظهار'
      },
      pre: {
        copy: 'نسخ'
      }
    },
    chatReasoning: {
      thinking: 'جاري التفكير...',
      thought: 'فكرة',
      thoughtFor: 'فكرة لمدة {duration}'
    },
    sidebar: {
      close: 'إغلاق',
      toggle: 'تبديل'
    },
    selectMenu: {
      create: 'إنشاء "{label}"',
      noData: 'لا توجد بيانات',
      noMatch: 'لم يتم العثور على تطابقات',
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
      slideoverDescription: 'تنقل المحتوى'
    }
  }
})
