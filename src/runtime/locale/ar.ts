import type { Messages } from '../types/locale'
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
      nextYear: 'السنة القادمة',
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
      placeholder: 'أدخل رسالتك هنا…'
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
      noMatch: 'لم يتم العثور على نتائج',
      placeholder: 'أدخل أمرًا أو ابحث…'
    },
    contentSearch: {
      links: 'النتائج',
      search: 'النتائج',
      theme: 'السمة'
    },
    contentSearchButton: {
      label: 'بحث…'
    },
    contentToc: {
      title: 'في هذه الصفحة'
    },
    dropdownMenu: {
      noMatch: 'لا توجد بيانات مطابقة',
      search: 'بحث…'
    },
    dashboardSearch: {
      theme: 'السمة'
    },
    dashboardSearchButton: {
      label: 'بحث…'
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
      noMatch: 'لم يتم العثور على نتائج'
    },
    inputNumber: {
      decrement: 'إنقاص',
      increment: 'زيادة'
    },
    listbox: {
      noData: 'لا توجد بيانات',
      noMatch: 'لا توجد بيانات مطابقة',
      search: 'بحث…'
    },
    modal: {
      close: 'إغلاق'
    },
    drawer: {
      close: 'إغلاق'
    },
    pricingTable: {
      caption: 'مقارنة خطط الأسعار'
    },
    prose: {
      codeCollapse: {
        closeText: 'إخفاء',
        name: 'رمز',
        openText: 'إظهار'
      },
      collapsible: {
        closeText: 'إخفاء',
        name: 'خصائص',
        openText: 'إظهار'
      },
      pre: {
        copy: 'نسخ الرمز إلى الحافظة'
      },
      prompt: {
        copy: 'نسخ الموجه',
        openIn: 'فتح في {name}'
      }
    },
    chatReasoning: {
      thinking: 'يفكر…',
      thought: 'تم التفكير',
      thoughtFor: 'استغرق التفكير {duration}'
    },
    sidebar: {
      close: 'إغلاق',
      toggle: 'تبديل'
    },
    selectMenu: {
      create: 'إنشاء "{label}"',
      noData: 'لا توجد بيانات',
      noMatch: 'لم يتم العثور على نتائج',
      search: 'بحث…'
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
