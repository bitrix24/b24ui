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
      label: 'تاريخ الحدث',
      monthPicker: 'منتقي الشهر',
      nextMonth: 'الشهر التالي',
      nextYear: 'السنة القادمة',
      prevMonth: 'الشهر السابق',
      prevYear: 'السنة السابقة',
      yearPicker: 'منتقي السنة'
    },
    carousel: {
      dots: 'اختر الشريحة لعرضها',
      goto: 'انتقل إلى {slide}',
      next: 'التالي',
      prev: 'السابق'
    },
    chatMessages: {
      autoScroll: 'التمرير إلى الأسفل'
    },
    chatPrompt: {
      placeholder: 'أدخل رسالتك هنا…'
    },
    chatPromptSubmit: {
      label: 'إرسال',
      reload: 'إعادة المحاولة',
      stop: 'إيقاف التوليد'
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
      placeholder: 'أدخل أمرًا أو ابحث…',
      results: 'النتائج'
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
    dateTimePicker: {
      backToDate: 'العودة إلى التاريخ',
      openPicker: 'افتح المنتقي',
      hours: 'ساعات',
      minutes: 'دقائق',
      presets: {
        today: 'اليوم',
        tomorrow: 'غدًا',
        endOfWeek: 'نهاية الأسبوع',
        inAWeek: 'بعد أسبوع',
        endOfMonth: 'نهاية الشهر'
      }
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
      noMatch: 'لم يتم العثور على نتائج',
      trigger: 'إظهار الخيارات'
    },
    inputNumber: {
      decrement: 'إنقاص',
      increment: 'زيادة',
      roledescription: 'حقل رقمي'
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
    pagination: {
      first: 'الصفحة الأولى',
      last: 'الصفحة الأخيرة',
      next: 'الصفحة التالية',
      page: 'الصفحة {page}',
      prev: 'الصفحة السابقة'
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
    },
    breadcrumb: {
      label: 'مسار التنقل'
    },
    inputDate: {
      day: 'اليوم',
      dayPeriod: 'ص/م',
      era: 'العصر',
      hour: 'الساعة',
      minute: 'الدقيقة',
      month: 'الشهر',
      second: 'الثانية',
      timeZoneName: 'المنطقة الزمنية',
      year: 'السنة'
    },
    inputRating: {
      rate: 'تقييم {value} من {length}'
    },
    inputTime: {
      dayPeriod: 'ص/م',
      hour: 'الساعة',
      minute: 'الدقيقة',
      second: 'الثانية',
      timeZoneName: 'المنطقة الزمنية'
    },
    pinInput: {
      input: 'رمز PIN، الخانة {index} من {length}'
    },
    skeleton: {
      label: 'جارٍ التحميل'
    },
    range: {
      max: 'الحد الأقصى',
      min: 'الحد الأدنى',
      thumb: 'مقبض',
      value: 'القيمة {index} من {total}'
    },
    stepper: {
      label: 'التقدم'
    },
    toaster: {
      label: 'إشعار',
      viewport: 'الإشعارات ({hotkey})'
    }
  }
})
